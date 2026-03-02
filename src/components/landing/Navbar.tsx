"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-soft-sm border-b border-orange-100"
          : "bg-transparent"
      )}
    >
      <Container>
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-0.5 shrink-0">
            <span className="text-xl font-bold text-slate-900">Opex</span>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Food</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-orange-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => router.push("/login")}>
              Se Connecter
            </Button>
            <Button variant="primary" size="sm" onClick={() => document.getElementById("modules")?.scrollIntoView({ behavior: "smooth" })}>
              Tester maintenant
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-orange-600 transition-colors"
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </Container>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-40 bg-white lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 p-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-2xl font-semibold text-slate-800 hover:text-orange-600 transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}

              <div className="flex flex-col gap-4 w-full max-w-xs mt-8">
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full"
                  onClick={() => { setMobileOpen(false); router.push("/login"); }}
                >
                  Se Connecter
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={() => { setMobileOpen(false); document.getElementById("modules")?.scrollIntoView({ behavior: "smooth" }); }}
                >
                  Tester maintenant
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
