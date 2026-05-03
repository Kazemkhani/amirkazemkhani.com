import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "nova-fomo-banner-dismissed";

const FomoBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) setVisible(true);
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -48, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -48, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          style={{ height: "40px" }}
          className="fixed top-0 left-0 right-0 z-[9999] flex items-center justify-between px-4 bg-indigo-900 text-white text-sm"
        >
          <a
            href="https://novalabs.ae"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center hover:underline truncate pr-8"
          >
            🎙️ NOVA — AI clones your voice and calls your leads while you sleep.{" "}
            <span className="font-semibold">Early access →</span>
          </a>
          <button
            onClick={dismiss}
            aria-label="Dismiss banner"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-lg leading-none"
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FomoBanner;
