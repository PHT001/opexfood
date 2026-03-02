import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function DemoCTA() {
  return (
    <section className="py-24 sm:py-32 bg-white">
      <Container>
        <div className="flex flex-col items-center text-center">
          <h2 className="reveal text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-text leading-tight">
            Convaincu ?
          </h2>
          <p className="reveal reveal-delay-1 mt-4 max-w-xl text-lg text-text-secondary leading-relaxed">
            Cette demo, c&apos;est exactement ce que vos clients vivront.
            Deploiement en 48h, sans engagement.
          </p>
          <div className="reveal reveal-delay-2 mt-8 flex flex-col sm:flex-row gap-4">
            <a href="/#tarifs">
              <Button variant="primary" size="lg">
                Tester maintenant
              </Button>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
