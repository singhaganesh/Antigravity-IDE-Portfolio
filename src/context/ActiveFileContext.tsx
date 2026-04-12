'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export interface FileMetadata {
  name: string;
  lang: string;
  tabBorder: string;
  dot: string;
  color: string;
  letter: string;
  path: string;
}

export const FILE_MAP: { [key: string]: FileMetadata } = {
  "/": { name: "home.tsx", lang: "TypeScript React", tabBorder: "#61dafb", dot: "#61dafb", color: "#61dafb", letter: "R", path: "/" },
  "/readme": { name: "README.md", lang: "Markdown", tabBorder: "#4ec9b0", dot: "#4ec9b0", color: "#4ec9b0", letter: "M", path: "/readme" },
  "/experience": { name: "experience.ts", lang: "TypeScript", tabBorder: "#3178c6", dot: "#3178c6", color: "#3178c6", letter: "T", path: "/experience" },
  "/projects": { name: "projects.js", lang: "JavaScript", tabBorder: "#f7df1e", dot: "#f7df1e", color: "#f7df1e", letter: "J", path: "/projects" },
  "/skills": { name: "skills.json", lang: "JSON", tabBorder: "#cbcb41", dot: "#cbcb41", color: "#cbcb41", letter: "J", path: "/skills" },
  "/adventures": { name: "adventures.bike", lang: "Markdown", tabBorder: "#ff0000", dot: "#ff0000", color: "#ff0000", letter: "B", path: "/adventures" },
  "/contact": { name: "contact.css", lang: "CSS", tabBorder: "#563d7c", dot: "#563d7c", color: "#563d7c", letter: "C", path: "/contact" },
};

interface ActiveFileContextType {
  activeFile: FileMetadata;
  openTabs: string[];
  closeTab: (path: string) => void;
  openTab: (path: string) => void;
  isTerminalOpen: boolean;
  setIsTerminalOpen: (open: boolean) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  sidebarView: 'explorer' | 'search';
  setSidebarView: (view: 'explorer' | 'search') => void;
  isAgentPanelOpen: boolean;
  setIsAgentPanelOpen: (open: boolean) => void;
  agentPanelWidth: number;
  setAgentPanelWidth: (width: number) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  cursorPosition: { line: number; column: number };
  setCursorPosition: (pos: { line: number; column: number }) => void;
}

const ActiveFileContext = createContext<ActiveFileContextType | undefined>(undefined);

export const ActiveFileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [activeFile, setActiveFile] = useState<FileMetadata>(FILE_MAP["/"]);
  const [openTabs, setOpenTabs] = useState<string[]>(["/"]);
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarView, setSidebarView] = useState<'explorer' | 'search'>('explorer');
  const [isAgentPanelOpen, setIsAgentPanelOpen] = useState(true);
  const [agentPanelWidth, setAgentPanelWidth] = useState(300);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });

  useEffect(() => {
    const currentFile = FILE_MAP[pathname];
    if (currentFile) {
      setActiveFile(currentFile);
      if (!openTabs.includes(pathname)) {
        setOpenTabs(prev => [...prev, pathname]);
      }
    }
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const openTab = (path: string) => {
    if (!openTabs.includes(path)) {
      setOpenTabs(prev => [...prev, path]);
    }
    router.push(path);
  };

  const closeTab = (path: string) => {
    const newTabs = openTabs.filter(t => t !== path);
    setOpenTabs(newTabs);
    if (pathname === path) {
      if (newTabs.length > 0) {
        router.push(newTabs[newTabs.length - 1]);
      } else {
        router.push("/");
      }
    }
  };

  return (
    <ActiveFileContext.Provider value={{ 
      activeFile, 
      openTabs, 
      closeTab, 
      openTab,
      isTerminalOpen, 
      setIsTerminalOpen, 
      isSidebarOpen,
      setIsSidebarOpen,
      sidebarView,
      setSidebarView,
      isAgentPanelOpen,
      setIsAgentPanelOpen,
      agentPanelWidth,
      setAgentPanelWidth,
      isMobileMenuOpen, 
      setIsMobileMenuOpen,
      isCommandPaletteOpen,
      setIsCommandPaletteOpen,
      cursorPosition,
      setCursorPosition
    }}>
      {children}
    </ActiveFileContext.Provider>
  );
};

export const useActiveFile = () => {
  const context = useContext(ActiveFileContext);
  if (!context) {
    throw new Error('useActiveFile must be used within an ActiveFileProvider');
  }
  return context;
};
