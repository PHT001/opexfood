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

export default function LogoBar() {
  return (
    <section className="bg-bg-soft py-12">
      <Container>
        <div className="flex flex-col items-center">
          <span className="reveal text-xs font-semibold uppercase tracking-widest text-text-muted">
            Ils nous font confiance
          </span>
          <p className="reveal reveal-delay-1 mt-2 text-sm text-text-secondary">
            +50 restaurants en France utilisent <span className="font-semibold text-slate-900">Opex</span><span className="font-semibold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Food</span> au quotidien
          </p>

          <div className="reveal reveal-delay-2 mt-8 flex items-center gap-4 sm:gap-5 overflow-x-auto scrollbar-hide w-full justify-center flex-wrap">
            {logos.map((logo, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center px-5 py-3 rounded-xl bg-white border border-border opacity-60 hover:opacity-100 transition-all duration-300 shrink-0"
              >
                <span className="text-sm font-bold text-slate-700">
                  {logo.name}
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                  {logo.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
