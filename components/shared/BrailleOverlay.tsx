"use client";

import { useState, useRef, useEffect } from "react";
import { useBrailleMode } from "./BrailleModeProvider";
import { useLanguage } from "./LanguageProvider";
import BrailleConverter from "./BrailleConverter";
import { t } from "@/lib/translations";

/**
 * BrailleOverlay component that overlays braille version on top of normal website
 * Reveals normal version on hover
 */
export default function BrailleOverlay({ children }: { children: React.ReactNode }) {
  const { isBrailleMode } = useBrailleMode();
  const { language } = useLanguage();
  const [showNormal, setShowNormal] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle mouse enter - show normal version immediately
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setShowNormal(true);
  };

  // Handle mouse leave - hide normal version with delay
  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setShowNormal(false);
    }, 100);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Set body attribute for braille mode styling
  useEffect(() => {
    if (isBrailleMode) {
      document.body.setAttribute("data-braille-mode", "true");
    } else {
      document.body.removeAttribute("data-braille-mode");
    }
    return () => {
      document.body.removeAttribute("data-braille-mode");
    };
  }, [isBrailleMode]);

  if (!isBrailleMode) {
    return <>{children}</>;
  }

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Normal Website - Always rendered, visible on hover */}
      <div
        className={`fixed inset-0 z-[100] bg-white transition-opacity duration-500 ease-in-out overflow-y-auto ${
          showNormal
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ visibility: showNormal ? "visible" : "hidden" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        data-braille-skip="true"
      >
        <div className="min-h-screen" data-braille-skip="true">
          {children}
        </div>
      </div>

      {/* Braille Overlay - Always on top when braille mode is active */}
      <div
        className={`relative z-[110] min-h-screen transition-opacity duration-500 ${
          showNormal ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
        }`}
      >
        <BrailleConverter />
        <div className="min-h-screen bg-gradient-to-br from-secondary via-secondary-dark to-primary">
          {children}
        </div>

        {/* Hover Hint */}
        <div
          className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30 transition-opacity duration-300 z-[120] ${
            showNormal ? "opacity-0" : "opacity-100"
          }`}
          data-braille-skip="true"
        >
          <p className="text-white text-sm text-center" style={{ fontFamily: "Courier New, monospace" }}>
            {t("braille.hoverHint", language)}
          </p>
        </div>
      </div>
    </div>
  );
}

