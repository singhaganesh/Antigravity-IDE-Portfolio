'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export interface FileMetadata {
  name: string;
  lang: string;
  tabBorder: string;
  dot: string;
  color: string;
  letter: string;
}

const FILE_MAP: { [key: string]: FileMetadata } = {
  "/": { name: "home.tsx", lang: "TypeScript React", tabBorder: "#61dafb", dot: "#61dafb", color: "#61dafb", letter: "R" },
  "/about": { name: "about.html", lang: "HTML", tabBorder: "#e34c26", dot: "#e34c26", color: "#e34c26", letter: "H" },
  "/projects": { name: "projects.js", lang: "JavaScript", tabBorder: "#f7df1e", dot: "#f7df1e", color: "#f7df1e", letter: "J" },
  "/skills": { name: "skills.json", lang: "JSON", tabBorder: "#cbcb41", dot: "#cbcb41", color: "#cbcb41", letter: "J" },
  "/contact": { name: "contact.css", lang: "CSS", tabBorder: "#563d7c", dot: "#563d7c", color: "#563d7c", letter: "C" },
};

interface ActiveFileContextType {
  activeFile: FileMetadata;
  isTerminalOpen: boolean;
  setIsTerminalOpen: (open: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const ActiveFileContext = createContext<ActiveFileContextType | undefined>(undefined);

export const ActiveFileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const [activeFile, setActiveFile] = useState<FileMetadata>(FILE_MAP["/"]);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setActiveFile(FILE_MAP[pathname] || FILE_MAP["/"]);
    setIsMobileMenuOpen(false); // Close mobile menu on navigation
  }, [pathname]);

  return (
    <ActiveFileContext.Provider value={{ activeFile, isTerminalOpen, setIsTerminalOpen, isMobileMenuOpen, setIsMobileMenuOpen }}>
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
