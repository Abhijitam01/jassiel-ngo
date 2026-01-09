"use client";

import { useEffect, useRef } from "react";
import { useBrailleMode } from "./BrailleModeProvider";
import { textToBraille } from "@/lib/braille";

/**
 * Global braille converter that processes all text nodes on the page
 * when braille mode is enabled
 */
export default function BrailleConverter() {
  const { isBrailleMode } = useBrailleMode();
  const originalTextsRef = useRef<Map<Node, string>>(new Map());
  const observerRef = useRef<MutationObserver | null>(null);

  useEffect(() => {
    // Check if we're on the braille landing page (it handles its own braille display)
    const isBraillePage = document.querySelector("[data-braille-page]");
    
    // Update body attribute for cursor hiding
    if (isBrailleMode && !isBraillePage) {
      document.body.setAttribute("data-braille-mode", "true");
    } else {
      document.body.removeAttribute("data-braille-mode");
    }

    // Early return if braille page exists or braille mode is off
    if (isBraillePage || !isBrailleMode) {
      // Restore original text if needed
      if (!isBrailleMode) {
        originalTextsRef.current.forEach((originalText, node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            node.textContent = originalText;
          }
          const parent = node.parentElement;
          if (parent) {
            parent.removeAttribute("data-braille-original");
            parent.removeAttribute("data-braille-converted");
            parent.classList.remove("braille-text-element");
          }
        });
        originalTextsRef.current.clear();
        
        // Disconnect observer
        if (observerRef.current) {
          observerRef.current.disconnect();
          observerRef.current = null;
        }
      }
      return;
    }

    // Convert text to braille
    const convertTextNodes = (root: Node) => {
      const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node) => {
            const text = node.textContent?.trim() || "";
            const parent = node.parentElement;
            
            // Skip empty text nodes
            if (!text) return NodeFilter.FILTER_REJECT;
            
            // Skip if already converted
            if (parent?.hasAttribute("data-braille-converted")) {
              return NodeFilter.FILTER_REJECT;
            }
            
            // Skip certain elements
            if (parent) {
              const tagName = parent.tagName;
              if (
                tagName === "SCRIPT" ||
                tagName === "STYLE" ||
                tagName === "NOSCRIPT" ||
                parent.hasAttribute("data-braille-skip") ||
                parent.closest("[data-braille-skip]") ||
                parent.closest("[data-braille-page]")
              ) {
                return NodeFilter.FILTER_REJECT;
              }
            }
            
            return NodeFilter.FILTER_ACCEPT;
          },
        }
      );

      const textNodes: Node[] = [];
      let node;
      while ((node = walker.nextNode())) {
        textNodes.push(node);
      }

      textNodes.forEach((textNode) => {
        const originalText = textNode.textContent || "";
        const brailleText = textToBraille(originalText);
        const parent = textNode.parentElement;

        if (parent && originalText.trim()) {
          // Store original text on the text node itself
          originalTextsRef.current.set(textNode, originalText);
          
          // Also store on parent for quick access
          parent.setAttribute("data-braille-original", originalText);
          parent.setAttribute("data-braille-converted", "true");
          parent.classList.add("braille-text-element");
          
          // Store reference to text node on parent for cursor detection
          (parent as any).__brailleTextNode = textNode;
          
          // Update text content
          textNode.textContent = brailleText;
        }
      });
    };

    // Process the main content area with a slight delay to ensure DOM is ready
    const processContent = () => {
      const mainContent = document.querySelector("main");
      if (mainContent) {
        convertTextNodes(mainContent);
      }
    };

    // Initial conversion - use requestAnimationFrame for better timing
    requestAnimationFrame(() => {
      setTimeout(processContent, 50);
    });

    // Observe DOM changes to convert new content
    const mainContent = document.querySelector("main");
    if (mainContent) {
      let isProcessing = false;
      
      observerRef.current = new MutationObserver((mutations) => {
        // Prevent multiple simultaneous conversions
        if (isProcessing) return;
        isProcessing = true;
        
        // Use requestAnimationFrame to batch mutations
        requestAnimationFrame(() => {
          mutations.forEach((mutation) => {
            // Only process if nodes were added, not attribute changes
            if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
              mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) {
                  // Skip if already converted
                  if (node.nodeType === Node.ELEMENT_NODE) {
                    const element = node as Element;
                    if (element.hasAttribute("data-braille-converted")) {
                      return;
                    }
                  }
                  convertTextNodes(node);
                }
              });
            }
          });
          isProcessing = false;
        });
      });

      observerRef.current.observe(mainContent, {
        childList: true,
        subtree: true,
        // Don't observe attribute changes to prevent flickering
        attributes: false,
        characterData: false,
      });
    }

    // Cleanup function
    const originalTextsMap = originalTextsRef.current;
    const observer = observerRef.current;
    
    return () => {
      originalTextsMap.forEach((originalText, node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          node.textContent = originalText;
        }
        const parent = node.parentElement;
        if (parent) {
          parent.removeAttribute("data-braille-original");
          parent.removeAttribute("data-braille-converted");
          parent.classList.remove("braille-text-element");
        }
      });
      originalTextsMap.clear();
      
      if (observer) {
        observer.disconnect();
        observerRef.current = null;
      }
    };
  }, [isBrailleMode]);

  return null;
}

