import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const APP_URL = "https://opexfood.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "OpexFood | Plateforme IA pour la Restauration",
    template: "%s | OpexFood",
  },
  description:
    "Automatisez votre restaurant avec OpexFood. Chatbot IA, programme de fidélité, agent vocal et outils de gestion dans une seule plateforme SaaS.",
  keywords: [
    "restaurant",
    "SaaS",
    "chatbot IA",
    "fidélité",
    "CRM",
    "fast-food",
    "gestion restaurant",
    "agent vocal IA",
    "automatisation restaurant",
    "OpexFood",
  ],
  authors: [{ name: "OpexFood" }],
  creator: "OpexFood",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: APP_URL,
    siteName: "OpexFood",
    title: "OpexFood — Plateforme IA pour la Restauration",
    description:
      "Chatbot IA, programme de fidélité et agent vocal pour automatiser votre restaurant. Sans engagement.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "OpexFood" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "OpexFood — Plateforme IA pour la Restauration",
    description:
      "Chatbot IA, programme de fidélité et agent vocal pour automatiser votre restaurant.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "OpexFood",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <meta name="theme-color" content="#ea580c" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(function() {});
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
