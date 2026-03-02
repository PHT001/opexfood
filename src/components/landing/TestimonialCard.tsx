import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import type { Testimonial } from "@/lib/constants";

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

export default function TestimonialCard({
  testimonial,
  index,
}: TestimonialCardProps) {
  const delayClass = `reveal-delay-${Math.min(index + 1, 5)}`;

  return (
    <div
      className={`reveal ${delayClass} bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-md transition-shadow duration-300`}
    >
      {/* Author header */}
      <div className="flex items-center gap-3">
        <Image
          src={testimonial.avatarUrl}
          alt={testimonial.authorName}
          width={40}
          height={40}
          className="rounded-full object-cover shrink-0"
        />
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="font-semibold text-slate-900 text-sm">{testimonial.authorName}</p>
            {testimonial.verified && (
              <BadgeCheck className="w-4 h-4 text-blue-500 shrink-0" />
            )}
          </div>
          <p className="text-xs text-slate-400">
            {testimonial.authorRole}, {testimonial.restaurantName}
          </p>
        </div>
      </div>

      {/* Quote */}
      <p className="mt-3 text-sm text-slate-600 leading-relaxed">
        {testimonial.quote}
      </p>

      {/* Highlight badge */}
      {testimonial.highlight && (
        <div className="mt-3 inline-block bg-orange-50 border border-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full">
          {testimonial.highlight}
        </div>
      )}

      {/* Date */}
      {testimonial.date && (
        <p className="mt-3 text-[11px] text-slate-300">
          FR - {testimonial.date}
        </p>
      )}
    </div>
  );
}
