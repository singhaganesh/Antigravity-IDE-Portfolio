'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
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
  "/about": { name: "about.html", lang: "HTML", tabBorder: "#e34c26", dot: "#e34c26", color: "#e34c26", letter: "H", path: "/about" },
  "/projects": { name: "projects.js", lang: "JavaScript", tabBorder: "#f7df1e", dot: "#f7df1e", color: "#f7df1e", letter: "J", path: "/projects" },
  "/skills": { name: "skills.json", lang: "JSON", tabBorder: "#cbcb41", dot: "#cbcb41", color: "#cbcb41", letter: "J", path: "/skills" },
  "/experience": { name: "experience.log", lang: "Markdown", tabBorder: "#407af3", dot: "#407af3", color: "#407af3", letter: "L", path: "/experience" },
  "/contact": { name: "contact.css", lang: "CSS", tabBorder: "#563d7c", dot: "#563d7c", color: "#563d7c", letter: "C", path: "/contact" },
};

export interface CursorPosition {
  line: number;
  column: number;
}

interface ActiveFileContextType {
  activeFile: FileMetadata;
  openTabs: string[];
  closeTab: (path: string) => void;
  openTab: (path: string) => void;
  isTerminalOpen: boolean;
  setIsTerminalOpen: (open: boolean) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  isAgentPanelOpen: boolean;
  setIsAgentPanelOpen: (open: boolean) => void;
  agentPanelWidth: number;
  setAgentPanelWidth: (width: number) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  cursorPosition: CursorPosition;
  setCursorPosition: (pos: CursorPosition) => void;
}

const ActiveFileContext = createContext<ActiveFileContextType | undefined>(undefined);

export const ActiveFileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [activeFile, setActiveFile] = useState<FileMetadata>(FILE_MAP["/"]);
  const [openTabs, setOpenTabs] = useState<string[]>(["/"]);
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAgentPanelOpen, setIsAgentPanelOpen] = useState(true);
  const [agentPanelWidth, setAgentPanelWidth] = useState(300);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({ line: 1, column: 1 });

  // Track if we're in the middle of a close operation
  const isClosingTab = useRef(false);

  const handleSetCursorPosition = useCallback((pos: CursorPosition) => {
    setCursorPosition(pos);
  }, []);

  // Only react to pathname changes - NOT openTabs changes
  useEffect(() => {
    const currentFile = FILE_MAP[pathname];
    if (currentFile) {
      setActiveFile(currentFile);
      // Only add tab if we're not closing a tab and tab doesn't exist
      if (!isClosingTab.current) {
        setOpenTabs(prev => {
          if (!prev.includes(pathname)) {
            return [...prev, pathname];
          }
          return prev;
        });
      }
      // Reset the flag after the effect runs
      isClosingTab.current = false;
    }
    setIsMobileMenuOpen(false);
    setCursorPosition({ line: 1, column: 1 });
  }, [pathname]);

  const openTab = useCallback((path: string) => {
    setOpenTabs(prev => {
      if (!prev.includes(path)) {
        return [...prev, path];
      }
      return prev;
    });
    router.push(path);
  }, [router]);

  const closeTab = useCallback((path: string) => {
    isClosingTab.current = true;
    setOpenTabs(prev => {
      const newTabs = prev.filter(t => t !== path);
      // Navigate to another tab if closing the active one
      if (pathname === path) {
        if (newTabs.length > 0) {
          router.push(newTabs[newTabs.length - 1]);
        } else {
          router.push("/");
        }
      }
      return newTabs;
    });
  }, [pathname, router]);

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
      isAgentPanelOpen,
      setIsAgentPanelOpen,
      agentPanelWidth,
      setAgentPanelWidth,
      isMobileMenuOpen, 
      setIsMobileMenuOpen,
      cursorPosition,
      setCursorPosition: handleSetCursorPosition
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
