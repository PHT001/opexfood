import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programme Fidélité | OpexFood",
  description: "Rejoignez le programme de fidélité et gagnez des récompenses à chaque visite.",
};

export default function LoyaltyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      {children}
    </div>
  );
}
