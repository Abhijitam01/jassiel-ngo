"use client";

import { useState, useEffect } from "react";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Wait for all resources to be fully loaded
    const handleLoad = () => {
      // Wait for images and other resources
      if (document.readyState === "complete") {
        // Additional delay to ensure all content is rendered
        setTimeout(() => {
          setIsLoading(false);
          // Fade out animation
          setTimeout(() => {
            setIsVisible(false);
          }, 600); // Fade out duration
        }, 500);
      }
    };

    // Check if already loaded
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      // Also listen for DOMContentLoaded as fallback
      document.addEventListener("DOMContentLoaded", handleLoad);
      
      return () => {
        window.removeEventListener("load", handleLoad);
        document.removeEventListener("DOMContentLoaded", handleLoad);
      };
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black transition-opacity duration-600 ${
        isLoading ? "opacity-100" : "opacity-0"
      }`}
      style={{ pointerEvents: isLoading ? "auto" : "none" }}
    />
  );
}

