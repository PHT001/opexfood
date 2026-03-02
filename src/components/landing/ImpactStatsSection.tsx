"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import { ShoppingBag, Users, Leaf, Clock, TrendingUp } from "lucide-react";

function useInView(threshold = 0.3) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function useCountUp(target: number, duration: number, inView: boolean) {
  const [value, setValue] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!inView || hasRun.current) return;
    hasRun.current = true;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

  return value;
}

/* ---- Mini bar chart (growing bars) ---- */
function MiniBarChart({ inView }: { inView: boolean }) {
  const bars = [35, 50, 42, 65, 55, 80, 95];
  return (
    <div className="flex items-end gap-[3px] h-12">
      {bars.map((h, i) => (
        <div
          key={i}
          className="w-[6px] rounded-t-sm bg-gradient-to-t from-orange-500 to-orange-300 transition-all duration-700 ease-out"
          style={{
            height: inView ? `${h}%` : "4%",
            transitionDelay: `${i * 80}ms`,
          }}
        />
      ))}
    </div>
  );
}

/* ---- Trend line SVG ---- */
function MiniTrendLine({ inView }: { inView: boolean }) {
  return (
    <svg viewBox="0 0 100 40" className="w-20 h-10" fill="none">
      <path
        d="M0 35 L15 28 L30 30 L45 22 L60 18 L75 10 L100 3"
        stroke="url(#trendGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-all duration-1000"
        strokeDasharray="160"
        strokeDashoffset={inView ? "0" : "160"}
      />
      <path
        d="M0 35 L15 28 L30 30 L45 22 L60 18 L75 10 L100 3 L100 40 L0 40 Z"
        fill="url(#trendFill)"
        className="transition-opacity duration-1000 delay-500"
        opacity={inView ? 0.15 : 0}
      />
      <defs>
        <linearGradient id="trendGrad" x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f97316" />
          <stop offset="1" stopColor="#ea580c" />
        </linearGradient>
        <linearGradient id="trendFill" x1="50" y1="0" x2="50" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f97316" />
          <stop offset="1" stopColor="#f97316" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ---- Circular progress ring ---- */
function CircleProgress({ value, inView }: { value: number; inView: boolean }) {
  const r = 20;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;

  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12">
      <circle cx="24" cy="24" r={r} fill="none" stroke="#fed7aa" strokeWidth="4" />
      <circle
        cx="24"
        cy="24"
        r={r}
        fill="none"
        stroke="url(#circGrad)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={inView ? offset : circ}
        className="transition-all duration-1500 ease-out"
        transform="rotate(-90 24 24)"
      />
      <defs>
        <linearGradient id="circGrad">
          <stop stopColor="#f97316" />
          <stop offset="1" stopColor="#ea580c" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ---- Clock saving visual ---- */
function ClockSaving({ inView }: { inView: boolean }) {
  return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      <div
        className={`absolute inset-0 rounded-full border-[3px] border-orange-200 transition-all duration-700 ${
          inView ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}
      />
      <Clock
        className={`w-6 h-6 text-orange-500 transition-all duration-500 delay-300 ${
          inView ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}
      />
      <div
        className={`absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center transition-all duration-300 delay-700 ${
          inView ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      >
        <TrendingUp className="w-3 h-3 text-white" />
      </div>
    </div>
  );
}

const cards = [
  {
    icon: ShoppingBag,
    iconBg: "from-orange-100 to-orange-50",
    iconColor: "text-orange-600",
    stat: 40,
    suffix: "%",
    prefix: "+",
    title: "de commandes en plus",
    subtitle: "Grâce au chatbot IA disponible 24h/24",
    visual: "bars",
  },
  {
    icon: Users,
    iconBg: "from-violet-100 to-violet-50",
    iconColor: "text-violet-600",
    stat: 3,
    suffix: "x",
    prefix: "",
    title: "plus de clients fidèles",
    subtitle: "Avec le programme de fidélité intégré",
    visual: "trend",
  },
  {
    icon: Leaf,
    iconBg: "from-emerald-100 to-emerald-50",
    iconColor: "text-emerald-600",
    stat: 25,
    suffix: "%",
    prefix: "-",
    title: "de gaspillage en moins",
    subtitle: "Prévisions IA sur vos ventes et stocks",
    visual: "circle",
  },
  {
    icon: Clock,
    iconBg: "from-cyan-100 to-cyan-50",
    iconColor: "text-cyan-600",
    stat: 2,
    suffix: "h",
    prefix: "",
    title: "gagnées par jour",
    subtitle: "Automatisation de la gestion quotidienne",
    visual: "clock",
  },
];

function ImpactCard({
  card,
  index,
  inView,
}: {
  card: (typeof cards)[number];
  index: number;
  inView: boolean;
}) {
  const Icon = card.icon;
  const count = useCountUp(card.stat, 2000, inView);

  return (
    <div
      className="reveal bg-white rounded-2xl border border-slate-100 p-4 sm:p-6 shadow-soft hover:shadow-soft-md hover:border-orange-200 transition-all duration-300"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center justify-between mb-5">
        <div
          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.iconBg} flex items-center justify-center`}
        >
          <Icon className={`w-5 h-5 ${card.iconColor}`} />
        </div>
        {card.visual === "bars" && <MiniBarChart inView={inView} />}
        {card.visual === "trend" && <MiniTrendLine inView={inView} />}
        {card.visual === "circle" && <CircleProgress value={75} inView={inView} />}
        {card.visual === "clock" && <ClockSaving inView={inView} />}
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl sm:text-4xl font-bold text-gradient-orange">
          {card.prefix}{count}{card.suffix}
        </span>
      </div>
      <p className="mt-2 text-sm font-semibold text-text">{card.title}</p>
      <p className="mt-1 text-xs text-text-secondary">{card.subtitle}</p>
    </div>
  );
}

export default function ImpactStatsSection() {
  const { ref, inView } = useInView(0.2);

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-16 sm:py-20 bg-white">
      <Container>
        <div className="text-center mb-14">
          <span className="reveal text-xs font-semibold uppercase tracking-widest text-orange-600">
            Résultats prouvés
          </span>
          <h2 className="reveal reveal-delay-1 mt-3 text-3xl sm:text-4xl font-bold text-text">
            L&apos;impact concret sur votre restaurant
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {cards.map((card, i) => (
            <ImpactCard key={card.title} card={card} index={i} inView={inView} />
          ))}
        </div>
      </Container>
    </section>
  );
}
