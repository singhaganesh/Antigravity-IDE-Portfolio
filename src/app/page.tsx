'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, Cpu, Globe, Zap, Code2, ShieldCheck, Activity, 
  Layers, Server, Github, Linkedin, Mail, Instagram, Youtube,
  Binary, Monitor, Database, Phone
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Typewriter = ({ phrases }: { phrases: string[] }) => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[index];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentPhrase.substring(0, displayText.length + 1));
        if (displayText.length === currentPhrase.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentPhrase.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, index, phrases]);

  return (
    <div className="flex items-center gap-1">
      <span className="text-[14px] md:text-[16px] font-mono text-text-primary/80">{displayText}</span>
      <span className="w-1.5 h-4 bg-[#00e5cc] animate-blink" />
    </div>
  );
};

const ActivityLog = () => {
  const [logs, setLog] = useState<string[]>([]);
  const allLogs = [
    "[SYSTEM]: initializing_kernel...",
    "[AUTH]: user_verified: ganesh_singha",
    "[LOAD]: src/data/projects.json... [OK]",
    "[SYNC]: live_repo_count_synced",
    "[SYSTEM]: all_systems_operational",
    "[LOAD]: src/app/about/page.tsx... [OK]",
    "[PING]: latency: 18ms",
    "[SYSTEM]: port_443_listening"
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setLog(prev => [...prev.slice(-3), allLogs[i]]);
      i = (i + 1) % allLogs.length;
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#1e1e1e]/30 border border-border-color/50 p-4 rounded-xl font-mono text-[10px] space-y-1.5 min-w-[240px]">
      <div className="flex items-center gap-2 text-text-green mb-2 opacity-70">
        <Activity size={10} />
        <span>SYSTEM_LOG</span>
      </div>
      <AnimatePresence>
        {logs.map((log, idx) => (
          <motion.div key={log + idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-text-muted flex items-center gap-2">
            <span className="text-[#4ec9b0]/30">{">"}</span>
            <span className="truncate tracking-tighter">{log}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default function Home() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [repoCount, setRepoCount] = useState<number | null>(null);

  useEffect(() => {
    setIsClient(true);
    fetch('https://api.github.com/users/singhaganesh')
      .then(res => res.json())
      .then(data => setRepoCount(data.public_repos))
      .catch(() => setRepoCount(22));
  }, []);

  const stats = [
    { label: "CGPA", value: "8.97", color: "#4ec9b0" },
    { label: "PROJECTS", value: repoCount ? `${repoCount}+` : "...", color: "#61dafb" },
    { label: "INTERNSHIP", value: "1", color: "#c586c0" },
    { label: "YEARS EXP", value: "< 1 Year", color: "#ce9178" }
  ];

  const socialPorts = [
    { icon: Github, label: "GITHUB", port: "443", href: "https://github.com/singhaganesh" },
    { icon: Linkedin, label: "LINKEDIN", port: "22", href: "https://www.linkedin.com/in/ganesh-singha/" },
    { icon: Mail, label: "EMAIL", port: "587", href: "mailto:ganeshsingha741@gmail.com" },
    { icon: Instagram, label: "INSTA", port: "80", href: "https://www.instagram.com/biker_ganesh/" }
  ];

  return (
    <div className="relative min-h-full flex flex-col items-center justify-center p-6 overflow-hidden animate-fadeUp">
      
      {/* Top Section: System Header */}
      <div className="absolute top-10 w-full px-10 hidden xl:flex justify-between items-start pointer-events-none">
        <div className="flex flex-col gap-4 pointer-events-auto">
          <div className="bg-[#1e1e1e]/40 border border-border-color p-5 rounded-xl space-y-3">
            <div className="flex items-center gap-3 text-text-cyan border-b border-border-color/30 pb-2">
              <Cpu size={14} />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em]">Hardware_Monitor</span>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 font-mono text-[11px]">
              <span className="text-text-muted italic">CORE_OS:</span>
              <span className="text-white">ANTIGRAVITY_v1</span>
              <span className="text-text-muted italic">ARCHITECTURE:</span>
              <span className="text-white">SPRING_NEXT_ARM</span>
              <span className="text-text-muted italic">STATUS:</span>
              <span className="text-text-green font-bold animate-pulse">ACTIVE_SIGNAL</span>
            </div>
          </div>
          <ActivityLog />
        </div>

        <div className="bg-[#1e1e1e]/40 border border-border-color p-5 rounded-xl space-y-3 pointer-events-auto text-right">
          <div className="flex items-center justify-end gap-3 text-text-yellow border-b border-border-color/30 pb-2">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em]">Kernel_Modules</span>
            <Database size={14} />
          </div>
          <div className="flex flex-col gap-1 font-mono text-[11px] text-text-muted">
            <span>[LOADED]: POSTGRESQL_DB</span>
            <span>[LOADED]: OPENAI_RAG_ENGINE</span>
            <span>[LOADED]: ANDROID_SDK_KOTLIN</span>
          </div>
        </div>
      </div>

      {/* Center: Main Identity */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl">
        <div className="text-text-green text-[13px] font-mono mb-6 flex items-center gap-3">
          <Binary size={14} />
          {"// handshake_established: ganesh_singha.dev"}
        </div>

        <div className="animate-float">
          <h1 className="font-display font-black text-[72px] md:text-[110px] leading-[0.85] flex flex-col items-center">
            <span className="text-white">GANESH</span>
            <span className="text-[#00e5cc] tracking-tighter">SINGHA</span>
          </h1>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-text-muted font-mono text-[13px] md:text-[15px] opacity-80">
          <span>Backend Engineer</span>
          <span className="text-border-color">•</span>
          <span>Full-stack</span>
          <span className="text-border-color">•</span>
          <span>Mobile Dev</span>
          <span className="text-border-color">•</span>
          <span>AI/IoT</span>
        </div>

        <div className="mt-8 h-6">
          <Typewriter phrases={["Architecting scalable Java systems.", "Building high-end mobile experiences.", "Innovating with AI and IoT."]} />
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button onClick={() => router.push('/projects')} className="group bg-[#00b8a9] text-[#1e1e1e] font-bold px-8 py-3 rounded-xl text-[13px] hover:bg-[#00e5cc] transition-all flex items-center gap-3 shadow-[0_0_20px_rgba(0,184,169,0.1)] group">
            EXPLORE_PROJECTS( ) <Zap size={16} className="group-hover:fill-current" />
          </button>
          <button onClick={() => router.push('/readme')} className="bg-transparent border border-border-color text-text-primary px-8 py-3 rounded-xl text-[13px] hover:bg-bg-hover transition-all flex items-center gap-3">
            <Code2 size={16} /> VIEW_SOURCE
          </button>
        </div>
      </div>

      {/* Bottom Section: Integrated Stats Grid */}
      <div className="mt-20 w-full max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-4 border border-border-color bg-[#1e1e1e]/20 rounded-xl overflow-hidden shadow-2xl">
          {stats.map((stat, i) => (
            <div key={stat.label} className={cn(
              "flex flex-col items-center justify-center py-8 px-4 relative",
              i !== stats.length - 1 && "md:border-r border-border-color",
              i < 2 && "border-b md:border-b-0 border-border-color"
            )}>
              <span className="text-[32px] font-black font-display leading-none mb-2" style={{ color: stat.color }}>
                {stat.value}
              </span>
              <span className="text-[10px] font-mono text-text-muted font-bold tracking-[0.2em] uppercase opacity-60">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Social Ports: Bottom Connections */}
      <div className="mt-12 flex flex-wrap justify-center gap-3">
        {socialPorts.map((social) => (
          <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-[#1e1e1e]/40 border border-border-color px-4 py-2 rounded-lg hover:border-[#00e5cc]/50 transition-all group">
            <social.icon size={14} className="text-text-muted group-hover:text-[#00e5cc] transition-colors" />
            <div className="flex flex-col font-mono">
              <span className="text-[9px] text-text-muted leading-none opacity-50 uppercase font-bold">PORT:{social.port}</span>
              <span className="text-[12px] text-text-primary group-hover:text-white transition-colors">{social.label}</span>
            </div>
          </a>
        ))}
      </div>

      {/* Terminal Tip */}
      <div className="absolute bottom-10 left-10 hidden md:flex items-center gap-3 opacity-30 font-mono text-[10px] tracking-widest text-text-muted uppercase">
        <Monitor size={14} />
        <span>Established Connection: Terminal_v1.0.4</span>
      </div>
    </div>
  );
}
