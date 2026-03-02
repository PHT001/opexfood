import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion | OpexFood",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-white px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <a href="/" className="inline-block text-2xl font-bold">
            <span className="text-text">Opex</span>
            <span className="text-gradient-orange">Food</span>
          </a>
        </div>
        {children}
      </div>
    </div>
  );
}
