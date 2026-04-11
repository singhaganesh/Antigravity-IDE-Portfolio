'use client';

import React from 'react';
import Image from 'next/image';
import { Search, Minus, Square, X, Menu, Settings, Sparkles } from 'lucide-react';
import { useActiveFile } from '@/context/ActiveFileContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const CustomSearchIcon = ({ size = 14, className }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M 19 3 C 13.488281 3 9 7.488281 9 13 C 9 15.394531 9.839844 17.589844 11.25 19.3125 L 3.28125 27.28125 L 4.71875 28.71875 L 12.6875 20.75 C 14.410156 22.160156 16.605469 23 19 23 C 24.511719 23 29 18.511719 29 13 C 29 7.488281 24.511719 3 19 3 Z M 19 5 C 23.429688 5 27 8.570313 27 13 C 27 17.429688 23.429688 21 19 21 C 14.570313 21 11 17.429688 11 13 C 11 8.570313 14.570313 5 19 5 Z"></path>
  </svg>
);

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
    setIsAgentPanelOpen
  } = useActiveFile();

  return (
    <div className="h-[45px] bg-bg-sidebar border-b border-border-color flex items-center justify-between select-none px-3">
      {/* Left: macOS Traffic Lights / Hamburger */}
      <div className="flex items-center gap-2">
        <div className="md:hidden">
          <Menu 
            size={16} 
            className="text-muted hover:text-white cursor-pointer" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>
        <div className="hidden md:flex items-center gap-2 ml-1">
          <Image 
            src="/antigravity_logo.svg" 
            alt="Antigravity Logo" 
            width={22} 
            height={22}
            className="opacity-90"
          />
        </div>
        
        <div className="hidden xl:flex items-center gap-1 ml-4 text-[14px] text-muted">
          {['File', 'Edit', 'Selection', 'View', 'Go', 'Run', 'Terminal', 'Help'].map(m => (
            <span key={m} className="px-2 py-0.5 hover:bg-bg-hover rounded transition-colors cursor-pointer">{m}</span>
          ))}
        </div>
      </div>

      {/* Center: Project and File Name */}
      <div className="flex-1 flex justify-center items-center px-8">
        <div className="text-[13px] text-muted flex items-center gap-1 max-w-[500px] truncate">
          <span>Antigravity-IDE-Portfolio</span>
          <span>-</span>
          <span>Antigravity</span>
          <span>-</span>
          <span className="text-white font-medium">{activeFile.name}</span>
        </div>
      </div>

      {/* Right: Layout Controls & Window Buttons */}
      <div className="flex items-center gap-3">
        {/* Layout Toggles (Matching Screenshot) */}
        <div className="hidden md:flex items-center gap-1 mr-4 bg-[#ffffff05] p-0.5 rounded-md border border-border-color/50">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={cn(
              "p-1 rounded transition-colors",
              isSidebarOpen ? "bg-[#ffffff15] text-white" : "text-muted hover:text-white"
            )}
          >
            <SidebarIcon isActive={isSidebarOpen} />
          </button>
          <button 
            onClick={() => setIsTerminalOpen(!isTerminalOpen)}
            className={cn(
              "p-1 rounded transition-colors",
              isTerminalOpen ? "bg-[#ffffff15] text-white" : "text-muted hover:text-white"
            )}
          >
            <TerminalIcon isActive={isTerminalOpen} />
          </button>
          <button 
            onClick={() => setIsAgentPanelOpen(!isAgentPanelOpen)}
            className={cn(
              "p-1 rounded transition-colors",
              isAgentPanelOpen ? "bg-[#ffffff15] text-white" : "text-muted hover:text-white"
            )}
          >
            <AgentIcon isActive={isAgentPanelOpen} />
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-3 mr-4 text-muted border-l border-border-color pl-4">
          <CustomSearchIcon size={16} className="hover:text-white cursor-pointer" />
          <Settings size={16} className="hover:text-white cursor-pointer" />
          <Sparkles size={16} className="text-[#00e5cc] cursor-pointer" />
          <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center text-[11px] text-white font-bold cursor-pointer">
            G
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-muted">
          <Minus size={16} className="hover:text-white cursor-pointer" />
          <Square size={14} className="hover:text-white cursor-pointer" />
          <X size={16} className="hover:text-[#ff5f57] cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

/* Custom SVGs to match the screenshot exactly */
const SidebarIcon = ({ isActive }: { isActive: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={isActive ? "opacity-100" : "opacity-60"}>
    <rect x="2.5" y="2.5" width="11" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M6.5 2.5V13.5" stroke="currentColor" strokeWidth="1.2"/>
    {!isActive && <rect x="3" y="3" width="3" height="10" fill="currentColor" opacity="0.2"/>}
  </svg>
);

const TerminalIcon = ({ isActive }: { isActive: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={isActive ? "opacity-100" : "opacity-60"}>
    <rect x="2.5" y="2.5" width="11" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M2.5 10.5H13.5" stroke="currentColor" strokeWidth="1.2"/>
    {!isActive && <rect x="3" y="11" width="10" height="2" fill="currentColor" opacity="0.2"/>}
  </svg>
);

const AgentIcon = ({ isActive }: { isActive: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={isActive ? "opacity-100" : "opacity-60"}>
    <rect x="2.5" y="2.5" width="11" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M9.5 2.5V13.5" stroke="currentColor" strokeWidth="1.2"/>
    {!isActive && <rect x="10" y="3" width="3" height="10" fill="currentColor" opacity="0.2"/>}
  </svg>
);

export default TitleBar;
