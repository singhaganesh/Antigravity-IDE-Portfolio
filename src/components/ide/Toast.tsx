'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useActiveFile } from '@/context/ActiveFileContext';

const Toast = () => {
  const { toastMessage } = useActiveFile();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (toastMessage) {
      setIsVisible(true);
      const timer = setTimeout(() => setIsVisible(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  return (
    <AnimatePresence>
      {isVisible && toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          className="fixed bottom-10 right-4 z-[9000] bg-[#252526] border border-[#007acc] shadow-lg px-4 py-2 rounded-md font-mono text-[12px] text-white flex items-center gap-2"
        >
          <span className="text-[#00e5cc]">&gt;</span> {toastMessage}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
