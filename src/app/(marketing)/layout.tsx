import Script from "next/script";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "OpexFood",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Plateforme IA pour la restauration : chatbot, programme de fidélité et agent vocal.",
  url: "https://opexfood.vercel.app",
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "EUR",
    lowPrice: "49",
    highPrice: "79",
    offerCount: "3",
  },
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
