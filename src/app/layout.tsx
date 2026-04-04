'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import TitleBar from "@/components/ide/TitleBar";
import ActivityBar from "@/components/ide/ActivityBar";
import Sidebar from "@/components/ide/Sidebar";
import TabBar from "@/components/ide/TabBar";
import Breadcrumb from "@/components/ide/Breadcrumb";
import StatusBar from "@/components/ide/StatusBar";
import TerminalDrawer from "@/components/ide/TerminalDrawer";
import AgentPanel from "@/components/ide/AgentPanel";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
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
  const { isSidebarOpen, isAgentPanelOpen, agentPanelWidth, setAgentPanelWidth } = useActiveFile();
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
        <div className="flex h-full overflow-hidden">
          <ActivityBar />
          {isSidebarOpen && <Sidebar />}
        </div>

        <main className="flex-1 flex flex-col min-w-0 bg-bg-editor overflow-hidden relative">
          <TabBar />
          <Breadcrumb />
          <ErrorBoundary>
            <div className="flex-1 overflow-y-auto scrollbar-thin flex">
              <div className="w-12 bg-bg-editor border-r border-transparent flex flex-col items-end pr-4 pt-12 select-none shrink-0">
                {Array.from({ length: 50 }).map((_, i) => (
                  <span key={i} className="text-[13px] text-muted font-mono leading-relaxed h-[22.5px]">
                    {i + 1}
                  </span>
                ))}
              </div>
              <div className="flex-1 min-w-0">
                {children}
              </div>
              <div className="w-16 hidden xl:block opacity-20 border-l border-border-color shrink-0 pt-12 pr-2">
                {Array.from({ length: 100 }).map((_, i) => (
                  <div key={i} className="h-[2px] w-full bg-text-muted mb-[1px]" />
                ))}
              </div>
            </div>
          </ErrorBoundary>
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
