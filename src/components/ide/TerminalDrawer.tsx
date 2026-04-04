'use client';

import React, { useState, useEffect } from 'react';
import { useActiveFile } from '@/context/ActiveFileContext';
import { X, ChevronRight, MoreHorizontal, LayoutGrid, Monitor, ChevronDown } from 'lucide-react';

const TerminalDrawer = () => {
  const { isTerminalOpen, setIsTerminalOpen } = useActiveFile();

  const terminalContent = [
    { text: "ganesh@ganesh:~/Work/Projects/Antigravity-IDE-Portfolio$ ^C", color: "text-[#4ec9b0]" },
    { text: "ganesh@ganesh:~/Work/Projects/Antigravity-IDE-Portfolio$ npm run dev", color: "text-[#4ec9b0]" },
    { text: "./src/components/ide/Sidebar.tsx", color: "text-white" },
    { text: " ", color: "" },
    { text: "./src/components/ide/Sidebar.tsx", color: "text-white" },
    { text: "Attempted import error: 'FileCss' is not exported from '__barrel_optimize_?names=ChevronDown,FileCode,FileCss,FileJson,FileSearch,FileText,FileType,X!==lucide-react' (imported as 'FileCss').", color: "text-[#f44747]" },
    { text: " ", color: "" },
    { text: "Import trace for requested module:", color: "text-white" },
    { text: "./src/components/ide/Sidebar.tsx", color: "text-[#f44747]" },
    { text: "GET /search 404 in 102ms", color: "text-white" },
    { text: "GET /git 404 in 36ms", color: "text-white" },
  ];

  if (!isTerminalOpen) return null;

  return (
    <div className="h-[200px] bg-bg-editor border-t border-border-color flex flex-col font-mono animate-in slide-in-from-bottom duration-200">
      {/* Terminal Toolbar */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-[#1e1e1e] border-b border-border-color">
        <div className="flex gap-4 text-[11px] font-bold text-muted uppercase tracking-wider">
          <span className="hover:text-white cursor-pointer transition-colors">Problems</span>
          <span className="hover:text-white cursor-pointer transition-colors">Output</span>
          <span className="text-white border-b-2 border-white pb-1">Terminal</span>
          <MoreHorizontal size={14} className="hover:text-white cursor-pointer" />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-muted text-[11px] hover:text-white cursor-pointer bg-[#ffffff08] px-2 py-0.5 rounded">
            <span className="text-[10px] scale-90">⬚</span>
            <span>npm</span>
            <PlusIcon />
            <ChevronDown size={12} />
          </div>
          <div className="w-[1px] h-4 bg-border-color mx-1" />
          <LayoutGrid size={14} className="text-muted hover:text-white cursor-pointer" />
          <Monitor size={14} className="text-muted hover:text-white cursor-pointer" />
          <X 
            size={14} 
            className="text-muted hover:text-white cursor-pointer" 
            onClick={() => setIsTerminalOpen(false)}
          />
        </div>
      </div>

      {/* Terminal Area */}
      <div className="flex-1 p-4 overflow-y-auto text-[13px] leading-relaxed scrollbar-thin">
        {terminalContent.map((line, i) => (
          <div key={i} className={line.color}>
            {line.text}
          </div>
        ))}
        <div className="flex items-center gap-2 text-[#4ec9b0] mt-1">
          <span>ganesh@ganesh:~/Work/Projects/Antigravity-IDE-Portfolio$</span>
          <div className="w-2.5 h-5 bg-text-muted animate-blink" />
        </div>
      </div>
    </div>
  );
};

const PlusIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

export default TerminalDrawer;
