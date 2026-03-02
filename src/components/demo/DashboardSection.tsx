"use client";

import { useEffect, useRef, useState } from "react";
import { LayoutDashboard, Bell, Zap, BarChart3 } from "lucide-react";
import Container from "@/components/ui/Container";
import DesktopMockup from "./DesktopMockup";
import StatsBar from "./StatsBar";
import OrderCard from "./OrderCard";
import { DASHBOARD_ORDERS, NEW_ORDER, DASHBOARD_STATS, type DemoOrder } from "@/lib/demo-data";

export default function DashboardSection() {
  const [orders, setOrders] = useState<DemoOrder[]>(DASHBOARD_ORDERS);
  const [showToast, setShowToast] = useState(false);
  const [showNewOrder, setShowNewOrder] = useState(false);
  const [statsBonus, setStatsBonus] = useState<{ orders: number; revenue: number } | undefined>(undefined);
  const [animateStats, setAnimateStats] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasPlayed) return;
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed) {
          setHasPlayed(true);
          observer.disconnect();
          playSequence();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPlayed]);

  function playSequence() {
    // Start counting stats
    setTimeout(() => setAnimateStats(true), 400);

    // Show toast notification after 1.5s
    setTimeout(() => setShowToast(true), 1500);

    // Hide toast + show new order in table after 3s
    setTimeout(() => {
      setShowNewOrder(true);
      setOrders((prev) => [NEW_ORDER, ...prev]);
      setStatsBonus({ orders: 1, revenue: 27 });
    }, 3000);

    // Hide toast after 4.5s
    setTimeout(() => setShowToast(false), 4500);
  }

  return (
    <section id="step-2" ref={sectionRef} className="relative py-20 sm:py-28 bg-white overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center overflow-hidden">
          {/* Desktop mockup side */}
          <div className="reveal-left lg:order-first flex justify-center max-w-full overflow-hidden">
            <DesktopMockup>
              <div className="relative p-4">
                {/* Stats */}
                <StatsBar
                  ordersToday={DASHBOARD_STATS.ordersToday}
                  revenue={DASHBOARD_STATS.revenue}
                  loyaltyCustomers={DASHBOARD_STATS.loyaltyCustomers}
                  animate={animateStats}
                  bonus={statsBonus}
                />

                {/* Orders list header */}
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-text">Commandes en cours</h3>
                  <span className="text-xs text-text-muted">{orders.length} commandes</span>
                </div>

                {/* Orders list */}
                <div className="space-y-2">
                  {orders.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      highlight={order.isNew && showNewOrder}
                    />
                  ))}
                </div>

                {/* Toast notification */}
                {showToast && (
                  <div className="absolute top-3 right-3 toast-slide-in bg-white border border-orange-200 rounded-xl shadow-soft-md px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-2 sm:gap-3 z-10 max-w-[calc(100%-24px)]">
                    <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center shrink-0">
                      <Bell className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-text">Nouvelle commande #247</p>
                      <p className="text-[10px] text-text-muted">Thomas B. — 27.40&euro;</p>
                    </div>
                  </div>
                )}
              </div>
            </DesktopMockup>
          </div>

          {/* Text side */}
          <div className="reveal-right lg:order-last min-w-0">
            {/* Module badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-50 border border-orange-200 mb-5 max-w-full">
              <LayoutDashboard className="w-4 h-4 text-orange-600 shrink-0" />
              <span className="text-xs font-medium text-orange-700 leading-tight">Votre CRM est offert avec le module Agent IA Vocal &amp; Chatbot</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text">
              Le restaurant reçoit la commande
            </h2>

            <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed">
              Que la commande vienne du chatbot ou d&apos;un appel téléphonique,
              elle apparaît instantanément sur le tableau de bord —
              entièrement personnalisé à l&apos;identité de votre restaurant.
            </p>

            <div className="mt-8 space-y-4">
              {[
                { icon: Bell, text: "Notification instantanée (chatbot + appels)" },
                { icon: Zap, text: "Statuts en temps réel : nouvelle, en préparation, prête" },
                { icon: BarChart3, text: "Dashboard et stats personnalisés à votre marque" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-50 shrink-0">
                      <Icon className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-sm text-text-secondary font-medium">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>

      <style jsx>{`
        @keyframes toastSlideIn {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .toast-slide-in {
          animation: toastSlideIn 0.4s ease-out forwards;
        }
        @keyframes orderCardEnter {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        :global(.order-card-enter) {
          animation: orderCardEnter 0.4s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
