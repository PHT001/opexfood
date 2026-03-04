import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { data: restaurant } = await supabase
      .from("restaurants")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (!restaurant) {
      return NextResponse.json({
        subscription: null,
        activeModules: [],
        invoices: [],
      });
    }

    // Get subscription
    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("restaurant_id", restaurant.id)
      .single();

    // Get active modules
    let activeModules: string[] = [];
    if (subscription?.stripe_subscription_id) {
      const { data: items } = await supabase
        .from("subscription_items")
        .select("module_id")
        .eq("subscription_id", subscription.stripe_subscription_id);

      activeModules = items?.map((i) => i.module_id) ?? [];
    }

    // Get invoices
    let invoices: Array<{
      id: string;
      date: string;
      amount: number;
      status: string;
      invoice_url: string | null;
      invoice_pdf: string | null;
    }> = [];
    if (subscription?.stripe_subscription_id) {
      const { data: invData } = await supabase
        .from("invoices")
        .select("*")
        .eq("subscription_id", subscription.stripe_subscription_id)
        .order("created_at", { ascending: false });

      invoices =
        invData?.map((inv) => ({
          id: inv.id,
          date: inv.period_start,
          amount: inv.amount_paid,
          status: inv.status,
          invoice_url: inv.invoice_url,
          invoice_pdf: inv.invoice_pdf,
        })) ?? [];
    }

    return NextResponse.json({
      subscription: subscription
        ? {
            status: subscription.status,
            currentPeriodEnd: subscription.current_period_end,
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
          }
        : null,
      activeModules,
      invoices,
    });
  } catch (error) {
    console.error("Dashboard billing error:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
