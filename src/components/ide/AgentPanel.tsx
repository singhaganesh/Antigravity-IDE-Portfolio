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

const AgentPanel = () => {
  return (
    <div className="w-[300px] h-full bg-[#181818] border-l border-border-color hidden lg:flex flex-col select-none">
      {/* Header */}
      <div className="h-[35px] flex items-center justify-between px-4 border-b border-border-color bg-bg-sidebar">
        <div className="flex items-center gap-2">
          <Users size={14} className="text-muted" />
          <span className="text-[11px] font-bold text-muted uppercase tracking-wider">Open Agent Manager</span>
        </div>
        <div className="flex items-center gap-2">
          <LayoutGrid size={14} className="text-muted cursor-pointer hover:text-white" />
          <Monitor size={14} className="text-muted cursor-pointer hover:text-white" />
          <X size={14} className="text-muted cursor-pointer hover:text-white" />
        </div>
      </div>

      {/* Main Title Area */}
      <div className="px-6 py-10">
        <h2 className="text-white text-[18px] font-bold font-display">Antigravity-IDE-Portfolio</h2>
      </div>

      {/* Chat Input Area (matching screenshot) */}
      <div className="flex-1 flex flex-col px-4">
        <div className="bg-[#1e1e1e] border border-border-color rounded-xl p-4 flex flex-col min-h-[140px] shadow-lg">
          <div className="flex-1 text-muted text-[13px] font-mono leading-relaxed">
            Ask anything, @ to mention, / for workflows
          </div>
          
          <div className="flex items-center justify-between border-t border-border-color pt-3 mt-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-muted text-[11px] hover:text-white cursor-pointer transition-colors bg-[#ffffff05] px-2 py-1 rounded-md border border-transparent hover:border-border-color">
                <Plus size={12} />
                <span>Planning</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted text-[11px] hover:text-white cursor-pointer transition-colors bg-[#ffffff05] px-2 py-1 rounded-md border border-transparent hover:border-border-color">
                <ChevronDown size={12} />
                <span>Gemini 3 Flash</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Mic size={14} className="text-muted hover:text-white cursor-pointer" />
              <div className="bg-[#ffffff10] p-1.5 rounded-md hover:bg-[#ffffff20] transition-colors cursor-pointer group">
                <Send size={14} className="text-muted group-hover:text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="p-6 text-center">
        <p className="text-[10px] text-muted font-mono leading-relaxed opacity-60">
          AI may make mistakes. Double-check all generated code.
        </p>
      </div>
    </div>
  );
};

export default AgentPanel;
