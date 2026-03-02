import Container from "@/components/ui/Container";

const logos = [
  { name: "Le Kebab Gourmet", type: "Fast-casual" },
  { name: "Pasta Mia", type: "Italien" },
  { name: "Fresh Bowl", type: "Healthy" },
  { name: "Chez Fatima", type: "Traditionnel" },
  { name: "Nikkei Paris", type: "Japonais" },
  { name: "Le Bistrot du Coin", type: "Bistrot" },
  { name: "Burger Lab", type: "Fast-food" },
  { name: "Pho Saigon", type: "Vietnamien" },
];

function LogoItem({ name, type }: { name: string; type: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-5 py-2.5 rounded-xl bg-white border border-border shrink-0">
      <span className="text-sm font-bold text-slate-700 whitespace-nowrap">{name}</span>
      <span className="text-[10px] text-slate-400 uppercase tracking-wider">{type}</span>
    </div>
  );
}

export default function LogoBar() {
  return (
    <section className="bg-bg-soft py-10 overflow-hidden">
      <Container>
        <div className="flex flex-col items-center mb-6">
          <span className="reveal text-xs font-semibold uppercase tracking-widest text-text-muted">
            Ils nous font confiance
          </span>
          <p className="reveal reveal-delay-1 mt-2 text-sm text-text-secondary">
            +50 restaurants en France utilisent{" "}
            <span className="font-semibold text-slate-900">Opex</span>
            <span className="font-semibold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Food</span>
            {" "}au quotidien
          </p>
        </div>
      </Container>

      {/* Infinite scrolling marquee */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-16 sm:w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, var(--color-bg-soft, #f8fafc) 0%, transparent 100%)" }} />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, var(--color-bg-soft, #f8fafc) 0%, transparent 100%)" }} />

        <div className="flex animate-marquee gap-4">
          {/* First set */}
          {logos.map((logo, i) => (
            <LogoItem key={`a-${i}`} name={logo.name} type={logo.type} />
          ))}
          {/* Duplicate for seamless loop */}
          {logos.map((logo, i) => (
            <LogoItem key={`b-${i}`} name={logo.name} type={logo.type} />
          ))}
        </div>
      </div>
    </section>
  );
}
