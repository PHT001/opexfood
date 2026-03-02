import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/server";
import { createClient } from "@/lib/supabase/server";
import { MODULE_PRICES } from "@/lib/stripe/config";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { moduleIds, billing, priceIds, successUrl, cancelUrl } =
      await request.json();

    let resolvedPriceIds: string[] = [];

    if (priceIds && Array.isArray(priceIds)) {
      // Direct price IDs (backward compat)
      resolvedPriceIds = priceIds;
    } else if (moduleIds && Array.isArray(moduleIds)) {
      // Resolve from module IDs + billing period
      const period = billing === "annual" ? "annual" : "monthly";
      resolvedPriceIds = moduleIds
        .map((id: string) => MODULE_PRICES[id]?.[period])
        .filter(Boolean);
    }

    if (resolvedPriceIds.length === 0) {
      return NextResponse.json(
        { error: "Aucun module sélectionné" },
        { status: 400 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";

    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      mode: "subscription",
      line_items: resolvedPriceIds.map((priceId: string) => ({
        price: priceId,
        quantity: 1,
      })),
      success_url:
        successUrl ||
        `${appUrl}/dashboard/onboarding?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${appUrl}/#pricing`,
      metadata: {
        user_id: user.id,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la session" },
      { status: 500 }
    );
  }
}
