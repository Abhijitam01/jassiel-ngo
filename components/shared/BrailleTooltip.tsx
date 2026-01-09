"use client";

import { useState, useEffect, useRef } from "react";
import { useBrailleMode } from "./BrailleModeProvider";

// Helper function to extract word/phrase at cursor position
function getTextAtCursor(x: number, y: number): { text: string; element: HTMLElement | null } {
  // Try to get range at point
  let range: Range | null = null;
  
  if (document.caretRangeFromPoint) {
    range = document.caretRangeFromPoint(x, y);
  } else if ((document as any).caretPositionFromPoint) {
    const caretPos = (document as any).caretPositionFromPoint(x, y);
    if (caretPos) {
      range = document.createRange();
      range.setStart(caretPos.offsetNode, caretPos.offset);
      range.setEnd(caretPos.offsetNode, caretPos.offset);
    }
  }

  if (!range) {
    return { text: "", element: null };
  }

  const textNode = range.startContainer;
  
  // Find the braille element
  let currentElement: HTMLElement | null = textNode.parentElement;
  while (currentElement && !currentElement.classList.contains("braille-text-element")) {
    currentElement = currentElement.parentElement;
  }
  
  const brailleElement = currentElement;
  
  if (!brailleElement) {
    return { text: "", element: null };
  }

  const originalText = brailleElement.getAttribute("data-braille-original") || "";
  
  if (!originalText) {
    return { text: "", element: brailleElement };
  }

  // Get character offset in braille text
  const brailleText = textNode.textContent || "";
  const brailleOffset = range.startOffset;
  
  // Since each braille character roughly corresponds to one original character
  // (in our simplified mapping), we can estimate the position
  // But to be safe, we'll use a window around the cursor
  const estimatedOriginalOffset = Math.min(Math.max(0, brailleOffset), originalText.length - 1);
  
  // Extract a phrase around the cursor position
  // Look for word boundaries around the estimated position
  const startPos = Math.max(0, estimatedOriginalOffset - 30);
  const endPos = Math.min(originalText.length, estimatedOriginalOffset + 30);
  
  // Find word boundaries
  let actualStart = startPos;
  let actualEnd = endPos;
  
  // Move start to beginning of word
  while (actualStart > 0 && /\S/.test(originalText[actualStart - 1])) {
    actualStart--;
  }
  
  // Move end to end of word
  while (actualEnd < originalText.length && /\S/.test(originalText[actualEnd])) {
    actualEnd++;
  }
  
  // Extract the phrase
  let phrase = originalText.substring(actualStart, actualEnd).trim();
  
  // If we're near the start, include a bit more context
  if (actualStart === 0 && phrase.length < 50) {
    phrase = originalText.substring(0, Math.min(80, originalText.length));
  }
  
  // If phrase is too long, truncate it intelligently
  const maxLength = 120;
  if (phrase.length > maxLength) {
    // Try to cut at word boundary
    const truncated = phrase.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");
    phrase = lastSpace > maxLength - 20 
      ? truncated.substring(0, lastSpace) + "..." 
      : truncated + "...";
  }

  return { text: phrase || originalText.substring(0, 50), element: brailleElement };
}

export default function BrailleTooltip() {
  const { isBrailleMode } = useBrailleMode();
  const [tooltip, setTooltip] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);
  const rafRef = useRef<number>();
  const mousePositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!isBrailleMode) {
      setTooltip(null);
      return;
    }

    let hoveredText = "";
    let tooltipPosition = { x: 0, y: 0 };

    const updateTooltip = () => {
      if (hoveredText) {
        setTooltip({
          text: hoveredText,
          x: tooltipPosition.x,
          y: tooltipPosition.y,
        });
      } else {
        setTooltip(null);
      }
      rafRef.current = requestAnimationFrame(updateTooltip);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
      
      // Check if we're over a braille element first
      const target = e.target as HTMLElement;
      const brailleElement = target.closest(".braille-text-element") as HTMLElement;
      
      if (!brailleElement) {
        hoveredText = "";
        return;
      }
      
      // Get text at cursor position
      const result = getTextAtCursor(e.clientX, e.clientY);
      
      if (result.text && result.text.trim() && result.element) {
        hoveredText = result.text;
        tooltipPosition = { x: e.clientX, y: e.clientY };
      } else {
        hoveredText = "";
      }
    };

    // Start animation loop
    rafRef.current = requestAnimationFrame(updateTooltip);

    // Use capture phase for better event handling
    document.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      document.removeEventListener("mousemove", handleMouseMove);
      setTooltip(null);
    };
  }, [isBrailleMode]);

  if (!tooltip || !isBrailleMode) return null;

  return (
    <div
      className="fixed z-[10000] pointer-events-none"
      style={{
        left: `${tooltip.x}px`,
        top: `${tooltip.y}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Big circle container */}
      <div className="relative w-80 h-80 rounded-full bg-white backdrop-blur-sm border-4 border-primary shadow-2xl flex items-center justify-center p-10 animate-scale-in"
        style={{ 
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(37, 99, 235, 0.2)",
          backgroundColor: "rgba(255, 255, 255, 0.98)"
        }}>
        <p className="text-secondary text-center text-base font-semibold leading-relaxed max-w-[280px]">
          {tooltip.text}
        </p>
      </div>
    </div>
  );
}

