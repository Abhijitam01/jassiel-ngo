"use client";

import { useBrailleMode } from "./BrailleModeProvider";
import { Eye, EyeOff } from "lucide-react";

export default function BrailleToggle() {
  const { isBrailleMode, toggleBrailleMode } = useBrailleMode();

  return (
    <button
      onClick={toggleBrailleMode}
      className={`fixed top-28 right-4 md:right-8 z-[200] flex items-center gap-2 px-4 py-2 rounded-full shadow-lg transition-all duration-200 hover:scale-105 ${
        isBrailleMode
          ? "bg-[#DC2626] text-white hover:bg-[#B91C1C]"
          : "bg-white text-[#DC2626] border-2 border-[#DC2626] hover:bg-gray-50"
      }`}
      style={{
        boxShadow: isBrailleMode 
          ? "0 4px 12px rgba(220, 38, 38, 0.4)" 
          : "0 2px 8px rgba(0, 0, 0, 0.1)"
      }}
      aria-label={isBrailleMode ? "Disable braille mode" : "Enable braille mode"}
      title={isBrailleMode ? "Disable braille mode" : "Experience the website as blind users do"}
    >
      {isBrailleMode ? (
        <>
          <EyeOff size={20} />
          <span className="hidden sm:inline font-medium">Braille Mode ON</span>
        </>
      ) : (
        <>
          <Eye size={20} />
          <span className="hidden sm:inline font-medium">View in Braille</span>
        </>
      )}
    </button>
  );
}

