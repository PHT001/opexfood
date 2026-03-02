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

export const metadata: Metadata = {
  title: "OpexFood | Plateforme IA pour la Restauration",
  description:
    "Automatisez votre restaurant avec OpexFood. Chatbot IA, programme de fidélité, CRM et outils de gestion dans une seule plateforme SaaS.",
  keywords: [
    "restaurant",
    "SaaS",
    "chatbot IA",
    "fidélité",
    "CRM",
    "fast-food",
    "gestion restaurant",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
