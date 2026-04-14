'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Search, Minus, Square, X, Menu, Settings, Sparkles, ChevronRight } from 'lucide-react';
import { useActiveFile } from '@/context/ActiveFileContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { downloadResume } from '@/utils/terminalEngine';

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

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const desktopMenuRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  const {
    showToast,
    closeAllTabs,
    closeTab,
    openTab
  } = useActiveFile();

  useEffect(() => {
    setMounted(true);
    const handleClickOutside = (event: MouseEvent) => {
      if (
        (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) &&
        (desktopMenuRef.current && !desktopMenuRef.current.contains(event.target as Node))
      ) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const MENUS = {
    File: [
      { label: 'New Tab', shortcut: 'Ctrl+T', action: () => showToast('New tab created (simulated)') },
      { label: 'Open File...', shortcut: 'Ctrl+P', action: () => setIsCommandPaletteOpen(true) },
      { separator: true },
      { label: 'Close Tab', shortcut: 'Ctrl+W', action: () => { setOpenMenu(null); closeTab(activeFile.path); } },
      { label: 'Close All Tabs', action: () => closeAllTabs() },
      { separator: true },
      { label: 'OPEN RECENT', isHeader: true },
      { label: 'home.tsx', action: () => openTab("/") },
      { label: 'about.html', action: () => openTab("/readme") },
      { label: 'projects.js', action: () => openTab("/projects") },
      { label: 'skills.json', action: () => openTab("/skills") },
      { separator: true },
      { label: 'Download Resume', action: () => { setOpenMenu(null); downloadResume(); } }
    ],
    Edit: [
      { label: 'Undo', shortcut: 'Ctrl+Z', action: () => showToast("Nothing to undo — it's a portfolio!") },
      { label: 'Redo', shortcut: 'Ctrl+Y', action: () => showToast("Nothing to redo") },
      { separator: true },
      { label: 'Cut', shortcut: 'Ctrl+X', action: () => showToast("Nice try! 😏") },
      { label: 'Copy', shortcut: 'Ctrl+C', action: () => showToast("Portfolio contents are read-only") },
      { label: 'Paste', shortcut: 'Ctrl+V', action: () => showToast("Can't paste here") },
      { separator: true },
      { label: 'Find', shortcut: 'Ctrl+F', action: () => { setSidebarView('search'); setIsSidebarOpen(true); } },
      { label: 'Replace', shortcut: 'Ctrl+H', action: () => { setSidebarView('search'); setIsSidebarOpen(true); } },
      { separator: true },
      { label: 'Command Palette', shortcut: 'Ctrl+P', action: () => setIsCommandPaletteOpen(true) }
    ],
    Selection: [
      { label: 'Select All', shortcut: 'Ctrl+A', action: () => showToast("Everything's already selected 🎯") },
      { separator: true },
      { label: 'Copy Path', action: () => { navigator.clipboard.writeText(`/home/ganesh/src${activeFile.path}`); showToast("Path copied"); } },
      { label: 'Copy Relative Path', action: () => { navigator.clipboard.writeText(`src${activeFile.path}`); showToast("Relative path copied"); } }
    ],
    View: [
      { label: 'Command Palette', shortcut: 'Ctrl+P', action: () => setIsCommandPaletteOpen(true) },
      { separator: true },
      { label: 'Explorer', shortcut: 'Ctrl+Shift+E', action: () => { setSidebarView('explorer'); setIsSidebarOpen(!isSidebarOpen); } },
      { label: 'Search', shortcut: 'Ctrl+Shift+F', action: () => { setSidebarView('search'); setIsSidebarOpen(!isSidebarOpen); } },
      { separator: true },
      { label: 'Terminal', shortcut: 'Ctrl+`', action: () => setIsTerminalOpen(!isTerminalOpen) },
      { label: 'Copilot Chat', shortcut: 'Ctrl+Shift+C', action: () => setIsAgentPanelOpen(!isAgentPanelOpen) },
      { separator: true },
      { label: 'Appearance', subMenu: [
        { label: 'Toggle Sidebar', action: () => setIsSidebarOpen(!isSidebarOpen) },
        { label: 'Toggle Terminal', action: () => setIsTerminalOpen(!isTerminalOpen) },
        { label: 'Toggle Copilot Panel', action: () => setIsAgentPanelOpen(!isAgentPanelOpen) }
      ]},
      { separator: true },
      { label: 'Word Wrap', shortcut: 'Alt+Z', action: () => showToast("Word wrap toggled") }
    ],
    Go: [
      { label: 'Go to File...', shortcut: 'Ctrl+P', action: () => setIsCommandPaletteOpen(true) },
      { separator: true },
      { label: 'Home', action: () => openTab("/") },
      { label: 'Projects', action: () => openTab("/projects") },
      { label: 'Skills', action: () => openTab("/skills") },
      { label: 'Experience', action: () => openTab("/experience") },
      { label: 'Adventures', action: () => openTab("/adventures") },
      { label: 'Contact', action: () => openTab("/contact") },
      { label: 'README', action: () => openTab("/readme") }
    ],
    Run: [
      { label: 'Start Portfolio', shortcut: 'F5', action: () => showToast("Portfolio is already running! 🚀") },
      { label: 'Stop Portfolio', shortcut: 'Shift+F5', action: () => showToast("Can't stop, won't stop 😎") },
      { separator: true },
      { label: 'Open Terminal', action: () => setIsTerminalOpen(true) },
      { label: 'Run Build Task', shortcut: 'Ctrl+Shift+B', action: () => showToast("Build successful ✓") }
    ],
    Terminal: [
      { label: 'New Terminal', shortcut: 'Ctrl+`', action: () => setIsTerminalOpen(true) },
      { label: 'Toggle Terminal', shortcut: 'Ctrl+`', action: () => setIsTerminalOpen(!isTerminalOpen) },
      { separator: true },
      { label: 'Clear Terminal', action: () => showToast("Terminal history cleared") }
    ],
    Help: [
      { label: 'About Ganesh', action: () => openTab("/readme") },
      { separator: true },
      { label: 'GitHub', action: () => window.open('https://github.com/singhaganesh', '_blank') },
      { label: 'LinkedIn', action: () => window.open('#', '_blank') }, // Placeholder
      { separator: true },
      { label: 'Download Resume', action: () => { setOpenMenu(null); downloadResume(); } },
      { separator: true },
      { label: 'About Antigravity IDE', action: () => showToast("Antigravity IDE v1.0 — Built with ❤️ by Ganesh") }
    ]
  };

  if (!mounted) {
    return (
      <div className="h-[35px] bg-bg-sidebar border-b border-border-color flex items-center justify-between select-none px-3 shrink-0 relative z-50">
        <div className="flex items-center gap-2 h-full" />
        <div className="flex-1 flex justify-center items-center px-4">
          <div className="opacity-0">Loading...</div>
        </div>
        <div className="flex items-center gap-3 justify-end h-full" />
      </div>
    );
  }

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        showToast("Fullscreen not supported");
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className="h-[35px] bg-bg-sidebar border-b border-border-color flex items-center justify-between select-none px-3 shrink-0 relative z-50">
      {/* Left: Logo / Hamburger / Menus */}
      <div className="flex items-center gap-2 h-full shrink-0">
        <div className="xl:hidden flex items-center h-full relative" ref={mobileMenuRef}>
          <div 
            className={cn("px-2 flex items-center h-full rounded-sm transition-colors cursor-pointer", openMenu === 'mobile' ? "bg-bg-hover text-white" : "hover:bg-bg-hover text-muted hover:text-white")}
            onClick={() => setOpenMenu(openMenu === 'mobile' ? null : 'mobile')}
          >
            <Menu size={16} />
          </div>
          
          {openMenu === 'mobile' && (
             <div className="absolute top-[35px] left-0 mt-[1px] min-w-[240px] bg-[#252526] border border-border-color shadow-xl rounded-md py-1 z-[9999] max-h-[80vh] overflow-y-auto scrollbar-thin">
                {Object.entries(MENUS).map(([menuName, items]) => (
                  <div key={menuName}>
                     <div className="px-6 py-2 text-[10px] font-bold text-[#00e5cc] uppercase tracking-widest bg-[#1e1e1e]/50 border-y border-border-color/30">
                        {menuName}
                     </div>
                     {items.map((item, idx) => {
                       if (item.separator) return null;
                       if (item.isHeader) return <div key={`mb-h-${idx}`} className="px-6 py-2 text-[10px] font-bold text-muted uppercase tracking-widest opacity-60">{item.label}</div>;
                       if (item.subMenu) {
                         return item.subMenu.map((sub, sIdx) => (
                           <div key={`mb-sub-${sIdx}`} className="px-8 py-2 hover:bg-[#04395e] hover:text-white text-[13px] text-text-primary cursor-pointer" onClick={(e) => { e.stopPropagation(); sub.action(); setOpenMenu(null); }}>
                             {item.label}: {sub.label}
                           </div>
                         ));
                       }
                       return (
                         <div key={`mb-item-${idx}`} className="px-6 py-2 flex justify-between hover:bg-[#04395e] hover:text-white text-[13px] text-text-primary cursor-pointer" onClick={(e) => { e.stopPropagation(); item.action?.(); setOpenMenu(null); }}>
                           <span>{item.label}</span>
                         </div>
                       );
                     })}
                  </div>
                ))}
             </div>
          )}
        </div>
        <div className="flex items-center ml-1 mr-2 xl:mr-0">
          <Image 
            src="/assets/icons/Antigravity-logo.svg" 
            alt="Antigravity Logo" 
            width={16} 
            height={16}
            className="opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
          />
        </div>
        
        <div className="hidden xl:flex items-center ml-2 h-full text-[13px] text-muted relative" ref={desktopMenuRef}>
          {Object.entries(MENUS).map(([menuName, items]) => (
            <div key={menuName} className="h-full relative">
              <span 
                className={cn(
                  "px-2 flex items-center h-full rounded-sm transition-colors cursor-pointer",
                  openMenu === menuName ? "bg-bg-hover text-white" : "hover:bg-bg-hover hover:text-white"
                )}
                onClick={() => setOpenMenu(openMenu === menuName ? null : menuName)}
                onMouseEnter={() => { if (openMenu) setOpenMenu(menuName); }}
              >
                {menuName}
              </span>
              
              {openMenu === menuName && (
                <div className="absolute top-[35px] left-0 mt-[1px] min-w-[240px] bg-[#252526] border border-border-color shadow-xl rounded-md py-1 z-[9999]">
                  {items.map((item, idx) => {
                    if (item.separator) {
                      return <div key={`sep-${idx}`} className="h-[1px] bg-border-color my-1 mx-2" />;
                    }
                    if (item.isHeader) {
                      return (
                        <div key={`header-${idx}`} className="px-6 py-2 text-[10px] font-bold text-muted uppercase tracking-widest opacity-60 select-none cursor-default">
                          {item.label}
                        </div>
                      );
                    }
                    return (
                      <div 
                        key={item.label}
                        className="group relative flex items-center justify-between px-6 py-1.5 hover:bg-[#04395e] hover:text-white text-[13px] text-text-primary cursor-pointer transition-none"
                        onClick={(e) => {
                          if (item.subMenu) {
                            e.stopPropagation();
                            return;
                          }
                          item.action?.();
                          if (!item.subMenu) setOpenMenu(null);
                        }}
                      >
                        <span>{item.label}</span>
                        {item.shortcut && <span className="text-muted text-[11px] group-hover:text-white/70">{item.shortcut}</span>}
                        {item.subMenu && <ChevronRight size={14} className="ml-4 text-muted group-hover:text-white" />}
                        
                        {item.subMenu && (
                          <div className="hidden group-hover:block absolute top-0 left-full ml-0 min-w-[200px] bg-[#252526] border border-border-color shadow-xl rounded-md py-1 translate-y-[-4px]">
                            {item.subMenu.map((sub, sIdx) => (
                              <div 
                                key={sIdx}
                                className="px-6 py-1.5 hover:bg-[#04395e] hover:text-white text-[13px] text-text-primary cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  sub.action();
                                  setOpenMenu(null);
                                }}
                              >
                                {sub.label}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Center: Search / Command Palette Box */}
      <div className="flex-1 flex justify-center items-center px-4 min-w-0">
        <div className="text-[12px] text-muted flex items-center gap-1 max-w-[200px] md:max-w-[500px] truncate">
          <span className="hidden sm:inline">Antigravity-IDE-Portfolio</span>
          <span className="hidden sm:inline">-</span>
          <span className="hidden md:inline">Antigravity</span>
          <span className="hidden md:inline">-</span>
          <span className="text-white font-medium truncate">{activeFile.name}</span>
        </div>
      </div>

      {/* Right: Layout Controls */}
      <div className="flex items-center gap-3 justify-end shrink-0 h-full">
        <div className="hidden xl:flex items-center gap-2 mr-4">
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
        
        <div className="hidden md:flex items-center gap-4 text-muted">
          <Minus size={14} className="hover:text-white cursor-pointer" />
          <Square size={12} className="hover:text-white cursor-pointer" onClick={toggleFullScreen} />
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
