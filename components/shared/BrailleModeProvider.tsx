"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface BrailleModeContextType {
  isBrailleMode: boolean;
  toggleBrailleMode: () => void;
}

const BrailleModeContext = createContext<BrailleModeContextType | undefined>(
  undefined
);

export function BrailleModeProvider({ children }: { children: ReactNode }) {
  const [isBrailleMode, setIsBrailleMode] = useState(false);

  const toggleBrailleMode = () => {
    setIsBrailleMode((prev) => !prev);
  };

  return (
    <BrailleModeContext.Provider value={{ isBrailleMode, toggleBrailleMode }}>
      {children}
    </BrailleModeContext.Provider>
  );
}

export function useBrailleMode() {
  const context = useContext(BrailleModeContext);
  if (context === undefined) {
    throw new Error("useBrailleMode must be used within a BrailleModeProvider");
  }
  return context;
}

