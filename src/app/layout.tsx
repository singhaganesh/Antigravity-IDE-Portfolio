import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import TitleBar from "@/components/ide/TitleBar";
import MenuBar from "@/components/ide/MenuBar";
import ActivityBar from "@/components/ide/ActivityBar";
import Sidebar from "@/components/ide/Sidebar";
import TabBar from "@/components/ide/TabBar";
import Breadcrumb from "@/components/ide/Breadcrumb";
import StatusBar from "@/components/ide/StatusBar";
import TerminalDrawer from "@/components/ide/TerminalDrawer";
import AgentPanel from "@/components/ide/AgentPanel";
import { ActiveFileProvider } from "@/context/ActiveFileContext";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: {
    default: "Ganesh Singha",
    template: "%s — Ganesh Singha",
  },
  description: "Portfolio of Ganesh Singha, Full Stack Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased font-mono bg-bg-editor h-screen overflow-hidden flex flex-col">
        <ActiveFileProvider>
          {/* Top Chrome */}
          <TitleBar />
          <MenuBar />

          {/* Main Workspace */}
          <div className="flex flex-1 overflow-hidden">
            {/* Left Chrome */}
            <div className="hidden md:flex h-full">
              <ActivityBar />
              <Sidebar />
            </div>

            {/* Editor Area */}
            <main className="flex-1 flex flex-col min-w-0 bg-bg-editor overflow-hidden relative">
              <TabBar />
              <Breadcrumb />
              <div className="flex-1 overflow-y-auto scrollbar-thin flex">
                {/* Line Number Gutter */}
                <div className="w-12 bg-bg-editor border-r border-transparent flex flex-col items-end pr-4 pt-12 select-none shrink-0">
                  {Array.from({ length: 50 }).map((_, i) => (
                    <span key={i} className="text-[13px] text-muted font-mono leading-relaxed h-[22.5px]">
                      {i + 1}
                    </span>
                  ))}
                </div>
                {/* Page Content */}
                <div className="flex-1 min-w-0">
                  {children}
                </div>
                {/* Minimap Placeholder */}
                <div className="w-16 hidden xl:block opacity-20 border-l border-border-color shrink-0 pt-12 pr-2">
                  {Array.from({ length: 100 }).map((_, i) => (
                    <div key={i} className="h-[2px] w-full bg-text-muted mb-[1px]" />
                  ))}
                </div>
              </div>
              <TerminalDrawer />
            </main>

            {/* Right Chrome (Agent Panel) */}
            <AgentPanel />
          </div>

          {/* Bottom Chrome */}
          <StatusBar />
        </ActiveFileProvider>
      </body>
    </html>
  );
}
