'use client';

import React, { useState, useEffect } from 'react';
import { useActiveFile } from '@/context/ActiveFileContext';
import { X, ChevronRight } from 'lucide-react';

const TerminalDrawer = () => {
  const { isTerminalOpen, setIsTerminalOpen } = useActiveFile();
  const [terminalLines, setTerminalLines] = useState<string[]>([]);

  const phrases = [
    "$ antigravity --status",
    "All systems floating ✓",
    "$ launch --resume",
    "Deploying resume.pdf...",
    "$ contact --ping ganesh",
    "Signal transmitted..."
  ];

  useEffect(() => {
    if (isTerminalOpen) {
      let currentLine = 0;
      const interval = setInterval(() => {
        setTerminalLines(prev => [...prev, phrases[currentLine]]);
        currentLine = (currentLine + 1) % phrases.length;
        if (currentLine === 0) setTerminalLines([]); // Reset for loop feel
      }, 1500);
      return () => clearInterval(interval);
    } else {
      setTerminalLines([]);
    }
  }, [isTerminalOpen]);

  if (!isTerminalOpen) return null;

  return (
    <div className="h-[120px] bg-bg-editor border-t border-border-color flex flex-col font-mono animate-in slide-in-from-bottom duration-200">
      <div className="flex items-center justify-between px-4 py-1 bg-bg-sidebar border-b border-border-color">
        <div className="flex gap-4 text-[11px] font-bold text-muted uppercase tracking-wider">
          <span className="text-white border-b border-white">Terminal</span>
          <span>Output</span>
          <span>Debug Console</span>
        </div>
        <X 
          size={14} 
          className="text-muted hover:text-white cursor-pointer" 
          onClick={() => setIsTerminalOpen(false)}
        />
      </div>
      <div className="flex-1 p-4 overflow-y-auto text-[13px] scrollbar-thin">
        {terminalLines.map((line, i) => (
          <div key={i} className={line.startsWith('$') ? "text-text-primary" : "text-text-cyan"}>
            {line}
          </div>
        ))}
        <div className="flex items-center gap-1 text-text-primary">
          <ChevronRight size={14} className="text-text-blue" />
          <div className="w-2 h-4 bg-text-muted animate-blink" />
        </div>
      </div>
    </div>
  );
};

export default TerminalDrawer;
