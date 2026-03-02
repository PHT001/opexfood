"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

interface ThemeLoadingOverlayProps {
  isVisible: boolean;
  onComplete?: () => void;
}

export default function ThemeLoadingOverlay({
  isVisible,
  onComplete,
}: ThemeLoadingOverlayProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onAnimationComplete={(def) => {
            // When the exit animation finishes, call onComplete
            if (!isVisible && onComplete) {
              onComplete();
            }
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.85)", backdropFilter: "blur(20px)" }}
        >
          {/* Animated glow ring */}
          <motion.div
            className="relative mb-8"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          >
            {/* Spinning outer ring */}
            <motion.div
              className="w-24 h-24 rounded-full border-[3px] border-white/10"
              style={{ borderTopColor: "rgba(255,255,255,0.6)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="w-8 h-8 text-white/90" />
              </motion.div>
            </div>
          </motion.div>

          {/* Main text */}
          <motion.h2
            className="text-2xl font-bold text-white mb-2 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Chargement de votre Restaurant
          </motion.h2>

          {/* Sub text */}
          <motion.p
            className="text-sm text-white/50 mb-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Nous préparons votre interface personnalisée…
          </motion.p>

          {/* Progress bar */}
          <motion.div
            className="w-64 h-1.5 rounded-full bg-white/10 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-white/60 to-white/90"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.9, duration: 2.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </motion.div>

          {/* Floating particles for extra polish */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/30"
              style={{
                left: `${20 + i * 12}%`,
                top: `${30 + (i % 3) * 15}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
