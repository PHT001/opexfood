import Container from "@/components/ui/Container";

const productLinks = [
  { label: "Modules", href: "#modules" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "Demo", href: "#modules" },
  { label: "Changelog", href: "#" },
];

const resourceLinks = [
  { label: "Blog", href: "#" },
  { label: "Documentation", href: "#" },
  { label: "API", href: "#" },
  { label: "Support", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 bg-slate-900 text-white">
      <Container>
        <div className="py-16 sm:py-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Column 1: Logo + tagline */}
            <div className="reveal">
              <a href="#hero" className="flex items-center gap-0.5">
                <span className="text-xl font-bold text-white">Opex</span>
                <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Food</span>
              </a>
              <p className="mt-4 text-sm text-slate-400 leading-relaxed">
                La plateforme IA qui automatise votre restaurant.
              </p>
              <p className="mt-4 text-xs text-slate-500">
                &copy; 2026 OpexFood
              </p>
            </div>

            {/* Column 2: Produit */}
            <div className="reveal reveal-delay-1">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
                Produit
              </h4>
              <ul className="mt-4 space-y-3">
                {productLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Ressources */}
            <div className="reveal reveal-delay-2">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
                Ressources
              </h4>
              <ul className="mt-4 space-y-3">
                {resourceLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div className="reveal reveal-delay-3">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
                Contact
              </h4>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="mailto:contact@opexfood.com"
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    contact@opexfood.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+33123456789"
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    +33 1 23 45 67 89
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; 2026 OpexFood. Tous droits r&eacute;serv&eacute;s.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-xs text-slate-500 hover:text-white transition-colors"
            >
              CGV
            </a>
            <a
              href="#"
              className="text-xs text-slate-500 hover:text-white transition-colors"
            >
              Politique de confidentialit&eacute;
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
