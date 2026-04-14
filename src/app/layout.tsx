'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import TitleBar from "@/components/ide/TitleBar";
import ActivityBar from "@/components/ide/ActivityBar";
import Sidebar from "@/components/ide/Sidebar";
import SearchSidebar from "@/components/ide/SearchSidebar";
import TabBar from "@/components/ide/TabBar";
import Breadcrumb from "@/components/ide/Breadcrumb";
import StatusBar from "@/components/ide/StatusBar";
import TerminalDrawer from "@/components/ide/TerminalDrawer";
import AgentPanel from "@/components/ide/AgentPanel";
import CommandPalette from "@/components/ide/CommandPalette";
import { ActiveFileProvider, useActiveFile } from "@/context/ActiveFileContext";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const { 
    isSidebarOpen, 
    sidebarView,
    isAgentPanelOpen, 
    agentPanelWidth, 
    setAgentPanelWidth,
    isLoadingFile
  } = useActiveFile();
  const [isResizing, setIsResizing] = useState(false);

  const startResizing = useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (mouseMoveEvent: MouseEvent) => {
      if (isResizing) {
        const newWidth = window.innerWidth - mouseMoveEvent.clientX;
        if (newWidth > 250 && newWidth < 500) {
          setAgentPanelWidth(newWidth);
        }
      }
    },
    [isResizing, setAgentPanelWidth]
  );

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  return (
    <div className={`flex flex-col h-screen overflow-hidden bg-bg-editor ${isResizing ? 'cursor-col-resize select-none' : ''}`}>
      <TitleBar />
      
      <div className="flex flex-1 overflow-hidden relative">
        <div className="flex h-full shrink-0 relative z-40">
          <ActivityBar />
          {isSidebarOpen && (
            sidebarView === 'explorer' ? <Sidebar /> : <SearchSidebar />
          )}
        </div>

        <main className="flex-1 flex flex-col min-w-0 bg-bg-editor overflow-hidden relative">
          <TabBar />
          <Breadcrumb />
          <div className="flex-1 overflow-y-auto scrollbar-thin flex flex-col relative">
            {isLoadingFile && (
              <div className="absolute inset-0 z-50 bg-bg-editor flex flex-col items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-border-color border-t-[#00e5cc] animate-spin mb-4" />
                <div className="text-[#00e5cc] text-[13px] font-mono animate-pulse tracking-widest uppercase">
                  Reading file...
                </div>
              </div>
            )}
            <div className={`flex-1 w-full h-full ${isLoadingFile ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}>
              {children}
            </div>
          </div>
          <TerminalDrawer />
        </main>

        {isAgentPanelOpen && (
          <div 
            onMouseDown={startResizing}
            className="w-1 cursor-col-resize hover:bg-[#007acc] active:bg-[#007acc] transition-colors z-50 absolute right-0 h-full"
            style={{ right: `${agentPanelWidth}px` }}
          />
        )}

        <div 
          style={{ width: isAgentPanelOpen ? `${agentPanelWidth}px` : '0px' }}
          className="h-full overflow-hidden flex-shrink-0"
        >
          <AgentPanel />
        </div>
      </div>

      <StatusBar />
      <CommandPalette />
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased font-mono">
        <ActiveFileProvider>
          <WorkspaceLayout>{children}</WorkspaceLayout>
        </ActiveFileProvider>
      </body>
    </html>
  );
}
