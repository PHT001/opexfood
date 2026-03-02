"use client";

import { testimonials } from "@/lib/constants";
import SectionHeader from "@/components/ui/SectionHeader";
import Container from "@/components/ui/Container";
import FloatingElements from "@/components/ui/FloatingElements";
import TestimonialCard from "@/components/landing/TestimonialCard";

export default function TestimonialsSection() {
  return (
    <section id="temoignages" className="relative py-24 sm:py-32 bg-bg-soft">
      <FloatingElements variant="testimonials" />
      <Container>
        <SectionHeader
          label="TÉMOIGNAGES"
          title={<>Ils ont adopté <span className="text-slate-900">Opex</span><span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Food</span></>}
          subtitle="Des restaurateurs comme vous partagent leur expérience."
        />

        {/* Masonry — cards have different heights, staggered naturally */}
        <div className="mt-16 columns-1 sm:columns-2 lg:columns-3 gap-4">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.authorName} className="break-inside-avoid mb-4">
              <TestimonialCard testimonial={testimonial} index={index} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
