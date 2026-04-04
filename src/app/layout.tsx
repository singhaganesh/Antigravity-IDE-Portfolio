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
            <main className="flex-1 flex flex-col min-w-0 bg-bg-editor overflow-hidden">
              <TabBar />
              <Breadcrumb />
              <div className="flex-1 overflow-y-auto scrollbar-thin">
                {children}
              </div>
              <TerminalDrawer />
            </main>
          </div>

          {/* Bottom Chrome */}
          <StatusBar />
        </ActiveFileProvider>
      </body>
    </html>
  );
}
