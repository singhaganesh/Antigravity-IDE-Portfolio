'use client';

import React from 'react';
import { 
  Users, 
  ChevronDown, 
  MoreHorizontal, 
  LayoutGrid, 
  Monitor, 
  Search, 
  Settings, 
  Mic, 
  Send,
  Zap
} from 'lucide-react';

const AgentPanel = () => {
  return (
    <div className="w-[300px] h-full bg-bg-editor border-l border-border-color hidden lg:flex flex-col select-none">
      {/* Header */}
      <div className="h-[35px] flex items-center justify-between px-4 border-b border-border-color bg-bg-sidebar">
        <div className="flex items-center gap-2">
          <Users size={14} className="text-muted" />
          <span className="text-[11px] font-bold text-muted uppercase tracking-wider">Open Agent Manager</span>
        </div>
        <div className="flex items-center gap-2">
          <LayoutGrid size={14} className="text-muted cursor-pointer hover:text-white" />
          <Monitor size={14} className="text-muted cursor-pointer hover:text-white" />
          <XIcon />
        </div>
      </div>

      {/* Title */}
      <div className="p-6">
        <h2 className="text-white text-[18px] font-bold font-display">Antigravity-IDE-Portfolio</h2>
      </div>

      {/* Chat Area Placeholder */}
      <div className="flex-1 flex flex-col p-4 overflow-hidden">
        <div className="bg-bg-sidebar/50 border border-border-color rounded-lg p-4 flex flex-col gap-4">
          <div className="text-muted text-[13px] font-mono leading-relaxed">
            Ask anything, @ to mention, / for workflows
          </div>
          <div className="flex items-center justify-between border-t border-border-color pt-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-muted text-[11px] hover:text-white cursor-pointer transition-colors">
                <PlusIcon />
                <span>Planning</span>
              </div>
              <div className="flex items-center gap-1 text-muted text-[11px] hover:text-white cursor-pointer transition-colors">
                <ChevronDown size={12} />
                <span>Gemini 3 Flash</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mic size={14} className="text-muted hover:text-white cursor-pointer" />
              <div className="bg-text-muted/20 p-1.5 rounded-md">
                <Send size={14} className="text-muted" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="p-4 text-center">
        <span className="text-[10px] text-muted font-mono opacity-50">
          AI may make mistakes. Double-check all generated code.
        </span>
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

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted cursor-pointer hover:text-white">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default AgentPanel;
