import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import FloatingElements from "@/components/ui/FloatingElements";
import MascotCTA from "./MascotCTA";

export default function CTASection() {
  return (
    <section id="cta" className="relative overflow-hidden bg-white">
      <FloatingElements variant="cta" />
      {/* Text content on white background */}
      <Container className="relative z-10 pt-10 sm:pt-14">
        <div className="flex flex-col items-center text-center">
          <h2 className="reveal text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 leading-tight">
            Prêt à transformer votre restaurant ?
          </h2>

          <p className="reveal reveal-delay-1 mt-4 text-lg text-slate-400">
            (Sans les frais d'agence)
          </p>

          <div className="reveal reveal-delay-2 mt-8 flex flex-col sm:flex-row gap-4">
            <Button variant="primary" size="lg">
              Demander une Démo Gratuite
            </Button>
            <a href="/demo">
              <Button variant="outline" size="lg">
                Tester maintenant
              </Button>
            </a>
          </div>
        </div>
      </Container>

      {/* Mascot emerging from clouds */}
      <div className="reveal reveal-delay-3">
        <MascotCTA />
      </div>
    </section>
  );
}
