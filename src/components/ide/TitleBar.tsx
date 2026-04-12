'use client';

import React from 'react';
import { Search, Minus, Square, X, Menu, Settings, Sparkles, LayoutPanelLeft, LayoutPanelTop, LayoutPanelRight } from 'lucide-react';
import { useActiveFile } from '@/context/ActiveFileContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const TitleBar = () => {
  const { 
    activeFile, 
    isMobileMenuOpen, 
    setIsMobileMenuOpen,
    isSidebarOpen,
    setIsSidebarOpen,
    isTerminalOpen,
    setIsTerminalOpen,
    isAgentPanelOpen,
    setIsAgentPanelOpen,
    setIsCommandPaletteOpen
  } = useActiveFile();

  return (
    <div className="h-[35px] bg-bg-sidebar border-b border-border-color flex items-center justify-between select-none px-3 shrink-0">
      {/* Left: macOS Traffic Lights / Hamburger */}
      <div className="flex items-center gap-2">
        <div className="md:hidden">
          <Menu 
            size={16} 
            className="text-muted hover:text-white cursor-pointer" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>
        <div className="hidden md:flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        
        <div className="hidden xl:flex items-center gap-1 ml-4 text-[13px] text-muted">
          {['File', 'Edit', 'Selection', 'View', 'Go', 'Run', 'Terminal', 'Help'].map(m => (
            <span key={m} className="px-2 py-0.5 hover:bg-bg-hover rounded transition-colors cursor-pointer">{m}</span>
          ))}
        </div>
      </div>

      {/* Center: Search / Command Palette Trigger */}
      <div className="flex-1 flex justify-center items-center px-8">
        <div 
          onClick={() => setIsCommandPaletteOpen(true)}
          className="bg-[#3c3c3c] border border-border-color/50 rounded-md px-4 py-0.5 text-[12px] text-muted w-full max-w-[500px] flex items-center justify-between hover:bg-[#454545] cursor-pointer transition-colors group"
        >
          <div className="flex items-center gap-2 overflow-hidden truncate">
            <Search size={12} className="text-muted flex-shrink-0 group-hover:text-white" />
            <span className="truncate group-hover:text-white">ganesh-singha : {activeFile.name}</span>
          </div>
          <div className="hidden md:block bg-[#4e4e4e] text-muted text-[10px] px-1.5 rounded flex-shrink-0 ml-2 border border-border-color/50">
            Ctrl P
          </div>
        </div>
      </div>

      {/* Right: Layout Controls & Window Buttons */}
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-1 mr-4 bg-[#ffffff05] p-0.5 rounded-md border border-border-color/50">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className={cn("p-1 rounded transition-colors", isSidebarOpen ? "bg-[#ffffff15] text-white" : "text-muted hover:text-white")} title="Toggle Sidebar"><SidebarIcon isActive={isSidebarOpen} /></button>
          <button onClick={() => setIsTerminalOpen(!isTerminalOpen)} className={cn("p-1 rounded transition-colors", isTerminalOpen ? "bg-[#ffffff15] text-white" : "text-muted hover:text-white")} title="Toggle Terminal"><TerminalIcon isActive={isTerminalOpen} /></button>
          <button onClick={() => setIsAgentPanelOpen(!isAgentPanelOpen)} className={cn("p-1 rounded transition-colors", isAgentPanelOpen ? "bg-[#ffffff15] text-white" : "text-muted hover:text-white")} title="Toggle Agent Panel"><AgentIcon isActive={isAgentPanelOpen} /></button>
        </div>

        <div className="hidden lg:flex items-center gap-3 mr-4 text-muted border-l border-border-color pl-4">
          <Search size={14} className="hover:text-white cursor-pointer" onClick={() => setIsCommandPaletteOpen(true)} />
          <Settings size={14} className="hover:text-white cursor-pointer" />
          <Sparkles size={14} className="text-[#00e5cc] cursor-pointer" />
          <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-[10px] text-white font-bold cursor-pointer">G</div>
        </div>
        
        <div className="flex items-center gap-4 text-muted">
          <Minus size={14} className="hover:text-white cursor-pointer" />
          <Square size={12} className="hover:text-white cursor-pointer" />
          <X size={14} className="hover:text-[#ff5f57] cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

const SidebarIcon = ({ isActive }: { isActive: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={isActive ? "opacity-100" : "opacity-60"}><rect x="2.5" y="2.5" width="11" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M6.5 2.5V13.5" stroke="currentColor" strokeWidth="1.2"/>{!isActive && <rect x="3" y="3" width="3" height="10" fill="currentColor" opacity="0.2"/>}</svg>
);

const TerminalIcon = ({ isActive }: { isActive: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={isActive ? "opacity-100" : "opacity-60"}><rect x="2.5" y="2.5" width="11" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M2.5 10.5H13.5" stroke="currentColor" strokeWidth="1.2"/>{!isActive && <rect x="3" y="11" width="10" height="2" fill="currentColor" opacity="0.2"/>}</svg>
);

const AgentIcon = ({ isActive }: { isActive: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={isActive ? "opacity-100" : "opacity-60"}><rect x="2.5" y="2.5" width="11" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M9.5 2.5V13.5" stroke="currentColor" strokeWidth="1.2"/>{!isActive && <rect x="10" y="3" width="3" height="10" fill="currentColor" opacity="0.2"/>}</svg>
);

export default TitleBar;
