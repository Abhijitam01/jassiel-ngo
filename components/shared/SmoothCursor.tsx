"use client";

import { useEffect, useRef } from "react";
import { useBrailleMode } from "./BrailleModeProvider";

export function SmoothCursor() {
  const { isBrailleMode } = useBrailleMode();
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorFollowerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const cursorPosition = useRef({ x: 0, y: 0 });
  const followerPosition = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (!isBrailleMode) {
      // Hide cursor when braille mode is off
      if (cursorRef.current) {
        cursorRef.current.style.opacity = "0";
        cursorRef.current.style.pointerEvents = "none";
      }
      if (cursorFollowerRef.current) {
        cursorFollowerRef.current.style.opacity = "0";
        cursorFollowerRef.current.style.pointerEvents = "none";
      }
      return;
    }

    // Show cursor when braille mode is on
    if (cursorRef.current) {
      cursorRef.current.style.opacity = "1";
      cursorRef.current.style.pointerEvents = "none";
    }
    if (cursorFollowerRef.current) {
      cursorFollowerRef.current.style.opacity = "1";
      cursorFollowerRef.current.style.pointerEvents = "none";
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    // Initialize positions on first mouse move
    const handleInitialMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorPosition.current = { x: e.clientX, y: e.clientY };
        cursorRef.current.style.left = `${cursorPosition.current.x}px`;
        cursorRef.current.style.top = `${cursorPosition.current.y}px`;
      }
      if (cursorFollowerRef.current) {
        followerPosition.current = { x: e.clientX, y: e.clientY };
        cursorFollowerRef.current.style.left = `${followerPosition.current.x}px`;
        cursorFollowerRef.current.style.top = `${followerPosition.current.y}px`;
      }
      window.removeEventListener("mousemove", handleInitialMouseMove);
    };

    const animate = () => {
      // Smooth cursor (main dot)
      if (cursorRef.current) {
        cursorPosition.current.x +=
          (mousePosition.current.x - cursorPosition.current.x) * 0.15;
        cursorPosition.current.y +=
          (mousePosition.current.y - cursorPosition.current.y) * 0.15;

        cursorRef.current.style.left = `${cursorPosition.current.x}px`;
        cursorRef.current.style.top = `${cursorPosition.current.y}px`;
      }

      // Smooth follower (larger circle)
      if (cursorFollowerRef.current) {
        followerPosition.current.x +=
          (mousePosition.current.x - followerPosition.current.x) * 0.08;
        followerPosition.current.y +=
          (mousePosition.current.y - followerPosition.current.y) * 0.08;

        cursorFollowerRef.current.style.left = `${followerPosition.current.x}px`;
        cursorFollowerRef.current.style.top = `${followerPosition.current.y}px`;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousemove", handleInitialMouseMove);
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousemove", handleInitialMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isBrailleMode]);

  if (!isBrailleMode) {
    return null;
  }

  return (
    <>
      {/* Main cursor dot - round */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[10001] w-2.5 h-2.5 rounded-full bg-primary transform -translate-x-1/2 -translate-y-1/2 shadow-lg transition-opacity duration-200"
        style={{ opacity: 0, boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.8), 0 0 4px rgba(37, 99, 235, 0.6)" }}
      />
      {/* Follower circle - round */}
      <div
        ref={cursorFollowerRef}
        className="fixed pointer-events-none z-[10000] w-7 h-7 rounded-full border-2 border-primary transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200"
        style={{ opacity: 0, backgroundColor: "rgba(37, 99, 235, 0.1)" }}
      />
    </>
  );
}

