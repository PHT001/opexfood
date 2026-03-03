import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { generateSlug } from "@/lib/loyalty/queries";
import Stripe from "stripe";

/* eslint-disable @typescript-eslint/no-explicit-any */

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = supabaseAdmin;

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.user_id;
      if (!userId) break;

      const { data: restaurant } = await supabase
        .from("restaurants")
        .select("id, name")
        .eq("user_id", userId)
        .single();

      if (!restaurant) break;

      const subscriptionId = session.subscription as string;
      const stripeSub: any =
        await stripe.subscriptions.retrieve(subscriptionId);

      await supabase.from("subscriptions").upsert(
        {
          restaurant_id: restaurant.id,
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: subscriptionId,
          status: stripeSub.status,
          current_period_start: new Date(
            stripeSub.current_period_start * 1000
          ).toISOString(),
          current_period_end: new Date(
            stripeSub.current_period_end * 1000
          ).toISOString(),
          cancel_at_period_end: stripeSub.cancel_at_period_end,
        },
        { onConflict: "restaurant_id" }
      );

      for (const item of stripeSub.items.data) {
        const priceId = item.price.id;
        const moduleId = getModuleIdFromPrice(priceId);
        if (moduleId) {
          await supabase.from("subscription_items").upsert(
            {
              subscription_id: subscriptionId,
              stripe_item_id: item.id,
              module_id: moduleId,
              stripe_price_id: priceId,
              quantity: item.quantity || 1,
            },
            { onConflict: "stripe_item_id" }
          );

          // Auto-create loyalty config when fidelite module is subscribed
          if (moduleId === "fidelite" && restaurant) {
            const slug = generateSlug(
              restaurant.name ?? "restaurant",
              restaurant.id
            );
            await supabase.from("loyalty_configs").upsert(
              {
                restaurant_id: restaurant.id,
                slug,
                points_per_euro: 10,
                reward_threshold: 500,
                reward_description: "1 Bowl offert",
                welcome_points: 50,
                is_active: true,
              },
              { onConflict: "restaurant_id" }
            );
          }
        }
      }
      break;
    }

    case "invoice.paid": {
      const invoice: any = event.data.object;
      const subscriptionId = invoice.subscription as string;
      if (!subscriptionId) break;

      await supabase.from("invoices").upsert(
        {
          subscription_id: subscriptionId,
          stripe_invoice_id: invoice.id,
          amount_paid: invoice.amount_paid / 100,
          currency: invoice.currency,
          status: "paid",
          invoice_url: invoice.hosted_invoice_url,
          invoice_pdf: invoice.invoice_pdf,
          period_start: invoice.period_start
            ? new Date(invoice.period_start * 1000).toISOString()
            : null,
          period_end: invoice.period_end
            ? new Date(invoice.period_end * 1000).toISOString()
            : null,
        },
        { onConflict: "stripe_invoice_id" }
      );
      break;
    }

    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const subscription: any = event.data.object;

      await supabase
        .from("subscriptions")
        .update({
          status: subscription.status,
          cancel_at_period_end: subscription.cancel_at_period_end,
          current_period_start: new Date(
            subscription.current_period_start * 1000
          ).toISOString(),
          current_period_end: new Date(
            subscription.current_period_end * 1000
          ).toISOString(),
        })
        .eq("stripe_subscription_id", subscription.id);
      break;
    }
  }

  return NextResponse.json({ received: true });
}

function getModuleIdFromPrice(
  priceId: string
): "chatbot" | "agent_vocal" | "fidelite" | null {
  const env = process.env;
  if (
    priceId === env.STRIPE_PRICE_CHATBOT_MONTHLY ||
    priceId === env.STRIPE_PRICE_CHATBOT_ANNUAL
  )
    return "chatbot";
  if (
    priceId === env.STRIPE_PRICE_AGENT_MONTHLY ||
    priceId === env.STRIPE_PRICE_AGENT_ANNUAL
  )
    return "agent_vocal";
  if (
    priceId === env.STRIPE_PRICE_FIDELITE_MONTHLY ||
    priceId === env.STRIPE_PRICE_FIDELITE_ANNUAL
  )
    return "fidelite";
  return null;
}
