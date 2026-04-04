'use client';

import React from 'react';
import { 
  Users, 
  ChevronDown, 
  LayoutGrid, 
  Monitor, 
  Mic, 
  Send,
  X,
  Plus
} from 'lucide-react';
import { useActiveFile } from '@/context/ActiveFileContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const AgentPanel = () => {
  const { agentPanelWidth } = useActiveFile();
  
  // Define breakpoints for the internal layout
  const isNarrow = agentPanelWidth < 320;
  const isVeryNarrow = agentPanelWidth < 280;

  return (
    <div className="w-full h-full bg-[#181818] border-l border-border-color flex flex-col select-none overflow-hidden">
      {/* Header */}
      <div className="h-[35px] flex items-center justify-between px-4 border-b border-border-color bg-bg-sidebar flex-shrink-0">
        <div className="flex items-center gap-2 overflow-hidden">
          <Users size={14} className="text-muted flex-shrink-0" />
          <span className="text-[11px] font-bold text-muted uppercase tracking-wider truncate">
            {isVeryNarrow ? "Agent" : "Open Agent Manager"}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {!isVeryNarrow && <LayoutGrid size={14} className="text-muted cursor-pointer hover:text-white" />}
          {!isVeryNarrow && <Monitor size={14} className="text-muted cursor-pointer hover:text-white" />}
          <X size={14} className="text-muted cursor-pointer hover:text-white" />
        </div>
      </div>

      {/* Main Title Area */}
      <div className={cn("px-6 py-10 transition-all", isNarrow && "px-4 py-6")}>
        <h2 className={cn("text-white font-bold font-display break-words", isNarrow ? "text-[16px]" : "text-[18px]")}>
          Antigravity-IDE-Portfolio
        </h2>
      </div>

      {/* Chat Input Area */}
      <div className="flex-1 flex flex-col px-4 min-w-0">
        <div className="bg-[#1e1e1e] border border-border-color rounded-xl p-4 flex flex-col min-h-[140px] shadow-lg overflow-hidden">
          <div className="flex-1 text-muted text-[13px] font-mono leading-relaxed mb-4 overflow-hidden">
            Ask anything, @ to mention, / for workflows
          </div>
          
          <div className={cn(
            "flex border-t border-border-color pt-3 mt-auto",
            isNarrow ? "flex-col gap-3" : "flex-row items-center justify-between"
          )}>
            <div className={cn(
              "flex gap-2 min-w-0",
              isNarrow ? "flex-wrap" : "items-center"
            )}>
              <div className="flex items-center gap-1.5 text-muted text-[11px] hover:text-white cursor-pointer transition-colors bg-[#ffffff05] px-2 py-1 rounded-md border border-transparent hover:border-border-color whitespace-nowrap">
                <Plus size={12} />
                <span>Planning</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted text-[11px] hover:text-white cursor-pointer transition-colors bg-[#ffffff05] px-2 py-1 rounded-md border border-transparent hover:border-border-color whitespace-nowrap overflow-hidden">
                <ChevronDown size={12} />
                <span className="truncate">Gemini 3 Flash</span>
              </div>
            </div>
            
            <div className={cn(
              "flex items-center gap-3",
              isNarrow ? "justify-end border-t border-border-color/30 pt-2" : ""
            )}>
              <Mic size={14} className="text-muted hover:text-white cursor-pointer" />
              <div className="bg-[#ffffff10] p-1.5 rounded-md hover:bg-[#ffffff20] transition-colors cursor-pointer group">
                <Send size={14} className="text-muted group-hover:text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="p-6 text-center mt-auto">
        <p className="text-[10px] text-muted font-mono leading-relaxed opacity-60">
          AI may make mistakes. Double-check all generated code.
        </p>
      </div>
    </div>
  );
};

export default AgentPanel;
