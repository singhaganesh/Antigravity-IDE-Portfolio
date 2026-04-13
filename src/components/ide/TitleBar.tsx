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
    setIsCommandPaletteOpen,
    setSidebarView
  } = useActiveFile();

  const handleSearchClick = () => {
    setSidebarView('search');
    setIsSidebarOpen(true);
  };

  return (
    <div className="h-[35px] bg-bg-sidebar border-b border-border-color flex items-center justify-between select-none px-3 shrink-0">
      {/* Left: Logo / Hamburger */}
      <div className="flex items-center gap-2">
        <div className="md:hidden">
          <Menu 
            size={16} 
            className="text-muted hover:text-white cursor-pointer" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>
        <div className="hidden md:flex items-center ml-1">
          <Image 
            src="/assets/icons/Antigravity-logo.svg" 
            alt="Antigravity Logo" 
            width={18} 
            height={18}
            className="opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
          />
        </div>
        
        <div className="hidden xl:flex items-center gap-1 ml-4 text-[13px] text-muted">
          {['File', 'Edit', 'Selection', 'View', 'Go', 'Run', 'Terminal', 'Help'].map(m => (
            <span key={m} className="px-2 py-0.5 hover:bg-bg-hover rounded transition-colors cursor-pointer">{m}</span>
          ))}
        </div>
      </div>

      {/* Center: Branding Text */}
      <div className="flex-1 flex justify-center items-center px-8">
        <div className="text-[12px] text-muted flex items-center gap-1 max-w-[500px] truncate">
          <span>Antigravity-IDE-Portfolio</span>
          <span>-</span>
          <span>Antigravity</span>
          <span>-</span>
          <span className="text-white font-medium">{activeFile.name}</span>
        </div>
      </div>

      {/* Right: Layout Controls & Window Buttons */}
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 mr-4">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className={cn("p-1 rounded-md transition-colors", isSidebarOpen ? "text-white" : "text-muted hover:text-white")} title="Toggle Sidebar"><PanelIcon isActive={isSidebarOpen} panel="left" /></button>
          <button onClick={() => setIsTerminalOpen(!isTerminalOpen)} className={cn("p-1 rounded-md transition-colors", isTerminalOpen ? "text-white" : "text-muted hover:text-white")} title="Toggle Terminal"><PanelIcon isActive={isTerminalOpen} panel="bottom" /></button>
          <button onClick={() => setIsAgentPanelOpen(!isAgentPanelOpen)} className={cn("p-1 rounded-md transition-colors", isAgentPanelOpen ? "text-white" : "text-muted hover:text-white")} title="Toggle Agent Panel"><PanelIcon isActive={isAgentPanelOpen} panel="right" /></button>
        </div>

        <div className="hidden lg:flex items-center gap-3 mr-4 text-muted border-l border-border-color pl-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 50 50"
            className="hover:text-white cursor-pointer transform -scale-x-100 transition-colors"
            onClick={() => setIsCommandPaletteOpen(true)}
          >
            <path fill="currentColor" d="M 21 3 C 11.6 3 4 10.6 4 20 C 4 29.4 11.6 37 21 37 C 24.354553 37 27.47104 36.01984 30.103516 34.347656 L 42.378906 46.621094 L 46.621094 42.378906 L 34.523438 30.279297 C 36.695733 27.423994 38 23.870646 38 20 C 38 10.6 30.4 3 21 3 z M 21 7 C 28.2 7 34 12.8 34 20 C 34 27.2 28.2 33 21 33 C 13.8 33 8 27.2 8 20 C 8 12.8 13.8 7 21 7 z"></path>
          </svg>
          <Settings size={20} className="hover:text-white cursor-pointer" />
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

const PanelIcon = ({ 
  isActive, 
  panel 
}: { 
  isActive: boolean, 
  panel: 'left' | 'bottom' | 'right' 
}) => {
  const clipId = `clip-${panel}`;
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={isActive ? "text-white cursor-pointer" : "text-muted hover:text-white cursor-pointer"}>
      <defs>
        <clipPath id={clipId}>
          <rect x="2.5" y="2.5" width="11" height="11" rx="1.5" />
        </clipPath>
      </defs>
      
      {/* Background fill if active */}
      {isActive && panel === 'left' && <rect x="2" y="2" width="4.5" height="12" fill="currentColor" clipPath={`url(#${clipId})`} />}
      {isActive && panel === 'bottom' && <rect x="2" y="10" width="12" height="5" fill="currentColor" clipPath={`url(#${clipId})`} />}
      {isActive && panel === 'right' && <rect x="9.5" y="2" width="5" height="12" fill="currentColor" clipPath={`url(#${clipId})`} />}

      {/* The outline */}
      <rect x="2.5" y="2.5" width="11" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2" fill="none" />

      {/* The divider line */}
      {panel === 'left' && <path d="M6.5 2.5V13.5" stroke="currentColor" strokeWidth="1.2" />}
      {panel === 'bottom' && <path d="M2.5 10H13.5" stroke="currentColor" strokeWidth="1.2" />}
      {panel === 'right' && <path d="M9.5 2.5V13.5" stroke="currentColor" strokeWidth="1.2" />}
    </svg>
  );
};

export default TitleBar;
