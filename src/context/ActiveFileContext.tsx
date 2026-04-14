'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export interface FileMetadata {
  name: string;
  lang: string;
  tabBorder: string;
  dot: string;
  path: string;
}

export const FILE_MAP: { [key: string]: FileMetadata } = {
  "/": { name: "home.tsx", lang: "TypeScript React", tabBorder: "#61dafb", dot: "#61dafb", path: "/" },
  "/readme": { name: "README.md", lang: "Markdown", tabBorder: "#4ec9b0", dot: "#4ec9b0", path: "/readme" },
  "/experience": { name: "experience.ts", lang: "TypeScript", tabBorder: "#3178c6", dot: "#3178c6", path: "/experience" },
  "/projects": { name: "projects.js", lang: "JavaScript", tabBorder: "#f7df1e", dot: "#f7df1e", path: "/projects" },
  "/skills": { name: "skills.java", lang: "Java", tabBorder: "#E76F00", dot: "#E76F00", path: "/skills" },
  "/adventures": { name: "adventures.bike", lang: "Markdown", tabBorder: "#ff0000", dot: "#ff0000", path: "/adventures" },
  "/contact": { name: "contact.json", lang: "JSON", tabBorder: "#cbcb41", dot: "#cbcb41", path: "/contact" },
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
  isLoadingFile: boolean;
  setIsLoadingFile: (loading: boolean) => void;
  toastMessage: string | null;
  showToast: (message: string) => void;
  closeAllTabs: () => void;
  isMobile: boolean;
}

const ActiveFileContext = createContext<ActiveFileContextType | undefined>(undefined);

export const ActiveFileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [activeFile, setActiveFile] = useState<FileMetadata>(FILE_MAP["/"]);
  const [openTabs, setOpenTabs] = useState<string[]>(["/"]);
  const [isLoadingFile, setIsLoadingFile] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarView, setSidebarView] = useState<'explorer' | 'search'>('explorer');
  const [isAgentPanelOpen, setIsAgentPanelOpen] = useState(false);
  const [agentPanelWidth, setAgentPanelWidth] = useState(300);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const closeAllTabs = () => {
    setOpenTabs(["/"]); // Ensure root at least exists if we don't handle empty states well yet. Or just [] if layout handles empty correctly. ActiveFileContext says activeFile must be a FileMetadata. Let's redirect to home.
    router.push("/");
  };

  useEffect(() => {
    const currentFile = FILE_MAP[pathname];
    if (currentFile) {
      setActiveFile(currentFile);
      setOpenTabs(prev => {
        if (!prev.includes(pathname)) {
          return [...prev, pathname];
        }
        return prev;
      });
    }
    setIsMobileMenuOpen(false);
    setIsLoadingFile(false);
  }, [pathname]);

  const openTab = (path: string) => {
    setOpenTabs(prev => {
      if (!prev.includes(path)) {
        return [...prev, path];
      }
      return prev;
    });
    
    if (isMobile) {
      setIsSidebarOpen(false);
    }
    
    if (path !== pathname) {
      setIsLoadingFile(true);
      router.push(path);
    }
  };

  const closeTab = (path: string) => {
    const newTabs = openTabs.filter(t => t !== path);
    if (newTabs.length === 0) {
      setOpenTabs(["/"]);
      if (pathname !== "/") {
        router.push("/");
      }
    } else {
      setOpenTabs(newTabs);
      if (pathname === path) {
        router.push(newTabs[newTabs.length - 1]);
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
      setCursorPosition,
      isLoadingFile,
      setIsLoadingFile,
      toastMessage,
      showToast,
      closeAllTabs,
      isMobile
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
