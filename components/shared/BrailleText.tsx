"use client";

import { useBrailleMode } from "./BrailleModeProvider";
import { textToBraille } from "@/lib/braille";
import { useState } from "react";

interface BrailleTextProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export default function BrailleText({
  children,
  className = "",
  as: Component = "span",
}: BrailleTextProps) {
  const { isBrailleMode } = useBrailleMode();
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Extract text content from children
  const getTextContent = (node: React.ReactNode): string => {
    if (typeof node === "string") return node;
    if (typeof node === "number") return String(node);
    if (Array.isArray(node)) {
      return node.map(getTextContent).join("");
    }
    if (node && typeof node === "object" && "props" in node) {
      return getTextContent(node.props.children);
    }
    return "";
  };

  const originalText = getTextContent(children);
  const brailleText = isBrailleMode ? textToBraille(originalText) : originalText;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isBrailleMode) {
      setTooltipPosition({ x: e.clientX, y: e.clientY });
    }
  };

  if (!isBrailleMode) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <Component
      className={`${className} braille-text relative cursor-help`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onMouseMove={handleMouseMove}
      aria-label={originalText}
    >
      {brailleText}
      {showTooltip && originalText && (
        <div
          className="fixed z-[10000] bg-gray-900 text-white px-3 py-2 rounded-lg shadow-xl text-sm pointer-events-none whitespace-nowrap max-w-xs"
          style={{
            left: `${tooltipPosition.x + 10}px`,
            top: `${tooltipPosition.y - 40}px`,
            transform: "translateX(-50%)",
          }}
        >
          {originalText}
          <div className="absolute left-1/2 top-full -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </Component>
  );
}

