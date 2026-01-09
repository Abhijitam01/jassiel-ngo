"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BLACK_SCREEN_DURATION = 5000; // 5 seconds of black screen
const MESSAGE_DELAY = 5000; // Show message after 5 seconds
const MESSAGE_DISPLAY_DURATION = 3000; // Show message for 3 seconds
const TOTAL_DURATION = BLACK_SCREEN_DURATION + MESSAGE_DISPLAY_DURATION; // 8 seconds total
const SESSION_STORAGE_KEY = "blindness-intro-shown";

export default function BlindnessAwarenessIntro() {
  const [showIntro, setShowIntro] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // Check if intro has been shown in this session
    const hasShown = sessionStorage.getItem(SESSION_STORAGE_KEY);
    
    if (!hasShown) {
      setShowIntro(true);
      
      // Show message after black screen duration
      const messageTimer = setTimeout(() => {
        setShowMessage(true);
      }, MESSAGE_DELAY);
      
      // Hide intro after total duration
      const hideTimer = setTimeout(() => {
        setShowIntro(false);
        sessionStorage.setItem(SESSION_STORAGE_KEY, "true");
      }, TOTAL_DURATION);
      
      return () => {
        clearTimeout(messageTimer);
        clearTimeout(hideTimer);
      };
    }
  }, []);

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 bg-black z-[9999] flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showMessage ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-center px-4"
          >
            <div className="space-y-4">
              <p className="text-2xl md:text-4xl font-bold">
                This is what blind people experience every day.
              </p>
              <p className="text-lg md:text-2xl font-medium text-white/90 mt-4">
                Click 'View in Braille' to experience our website as they do.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

