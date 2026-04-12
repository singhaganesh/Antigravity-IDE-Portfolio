'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { aboutInfo, stats as baseStats } from '@/data/profile';
import educationData from '@/data/education.json';
import { motion } from 'framer-motion';
import { User, MapPin, Briefcase, Calendar, Globe, Rocket, Code2, Layout, Zap, Github, ExternalLink, GraduationCap, Terminal, ShieldCheck } from 'lucide-react';

const ReadmePage = () => {
  const [repoCount, setRepoCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const response = await fetch('https://api.github.com/users/singhaganesh');
        if (response.ok) {
          const data = await response.json();
          setRepoCount(data.public_repos);
        }
      } catch (error) {
        console.error('Failed to fetch GitHub stats:', error);
      }
    };

    fetchGitHubStats();
  }, []);

  // Update stats dynamically
  const stats = baseStats.map(stat => {
    if (stat.label === "Projects") {
      return {
        ...stat,
        number: repoCount !== null ? `${repoCount}+` : "..."
      };
    }
    return stat;
  });

  return (
    <div className="px-10 py-12 animate-fadeUp">
      {/* Code comment label */}
      <div className="text-text-green text-[15px] font-mono mb-8">
        {"<!-- README.md — human behind tech -->"}
      </div>

      {/* Header Section (Technical Refactor) */}
      <div className="mb-16">
        <div className="flex items-center gap-10">
          {/* Profile Photo */}
          <div className="relative group">
            <div className="w-44 h-44 rounded-2xl overflow-hidden border-2 border-[#00e5cc]/30 shadow-[0_0_40px_rgba(0,229,204,0.1)] flex-shrink-0 relative z-10 transition-transform duration-500 group-hover:scale-[1.02]">
              <Image
                src="/profile.jpeg"
                alt="Developer Profile"
                width={176}
                height={176}
                className="object-cover w-full h-full grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
            {/* Decorative background element */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-[#00e5cc]/10 to-transparent rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-1">
              {['Java', 'Spring Boot', 'React', 'Android'].map((tech) => (
                <span key={tech} className="bg-bg-sidebar border border-border-color text-text-muted text-[10px] font-mono font-bold px-2 py-0.5 rounded transition-colors hover:border-text-cyan hover:text-white cursor-default">
                  [{tech.toUpperCase()}]
                </span>
              ))}
            </div>
            
            <h1 className="text-[52px] font-black text-white leading-[1.1] font-display tracking-tight max-w-2xl">
              Full Stack Developer & <br />
              <span className="text-text-cyan">Mobile Engineer</span>
            </h1>

            <div className="flex items-center gap-6 mt-2">
              <div className="flex items-center gap-2 text-text-muted font-mono text-[13px]">
                <Terminal size={14} className="text-text-cyan" />
                <span className="text-white">user:</span>
                <span className="text-text-orange font-bold">ganesh_singha.dev</span>
              </div>
              <div className="flex items-center gap-2 text-text-muted font-mono text-[13px]">
                <Globe size={14} className="text-text-blue" />
                <span className="text-white">region:</span>
                <span className="text-text-blue">kolkata/india</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-16">
        {/* Main Content Area */}
        <div className="space-y-16">
          {/* Bio Section */}
          <section>
            <h2 className="text-[24px] font-bold text-white mb-6 border-b border-border-color pb-2 flex items-center gap-3">
              <Globe size={22} className="text-text-blue" />
              Overview
            </h2>
            <div className="space-y-6 text-[16px] font-mono leading-relaxed text-text-primary">
              <p>
                Hi, I&apos;m Ganesh — a <span className="text-text-cyan font-bold underline decoration-text-cyan/30">Backend-focused Full Stack Engineer</span> from Kolkata, India. My core strength lies in building robust, scalable systems with <span className="text-text-yellow font-semibold">Spring Boot</span>, and I bring that same precision to the full stack — from <span className="text-text-green font-semibold">React</span> on the web to <span className="text-text-green font-semibold">Jetpack Compose</span> on mobile, containerized with <span className="text-text-blue font-semibold">Docker</span> and shipped through solid <span className="text-text-blue font-semibold">CI/CD pipelines</span>.
              </p>
              <p>
                I stay sharp on the AI frontier too — working with modern <span className="text-text-purple font-semibold">CLI-based AI tools</span> and architecting <span className="text-text-cyan font-semibold">RAG (Retrieval-Augmented Generation)</span> systems that make intelligent applications actually useful in production.
              </p>
              <p>
                I have a track record of delivering high-impact work: a <span className="text-text-yellow font-semibold">patented EV charging platform</span>, and an <span className="text-text-green font-semibold">AI-powered IoT chatbot</span> that cut manual data querying by 60%. Currently at <span className="text-text-blue font-semibold underline decoration-text-blue/30">SEPLE NovaEdge</span>, I&apos;m connecting IoT ecosystems with AI automation — turning complex engineering problems into systems that just work.
              </p>
            </div>
          </section>

          {/* Education Section */}
          <section>
            <h2 className="text-[24px] font-bold text-white mb-8 border-b border-border-color pb-2 flex items-center gap-3">
              <GraduationCap size={22} className="text-text-purple" />
              Education
            </h2>
            <div className="space-y-10 border-l-2 border-border-color ml-3 pl-8">
              {educationData.map((edu, i) => (
                <div key={i} className="relative group">
                  <div className={`absolute -left-[41px] top-1.5 w-4 h-4 rounded-full border-2 border-bg-editor transition-all duration-300 ${edu.status === 'active' ? 'bg-text-green shadow-[0_0_10px_#4ec9b0]' : 'bg-text-muted opacity-50'}`} />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-white font-bold text-[18px] font-mono group-hover:text-text-cyan transition-colors">{edu.institution}</h3>
                    <div className="flex items-center gap-3 text-text-cyan font-mono text-[14px] font-semibold">
                      <span>{edu.degree}</span>
                      <span className="text-border-color">|</span>
                      <span className="text-text-yellow">{edu.grade}</span>
                    </div>
                    <p className="text-text-muted font-mono text-[13px] mt-1 italic">{edu.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Philosophy Section */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="bg-bg-sidebar/40 border border-border-color p-6 rounded-lg hover:border-text-blue/30 transition-colors group">
              <Code2 className="mb-4 text-text-blue group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-white mb-2 font-mono">Clean Code</h3>
              <p className="text-[13px] text-text-muted font-mono leading-snug">Readable, maintainable, and strictly typed logic.</p>
            </div>
            <div className="bg-bg-sidebar/40 border border-border-color p-6 rounded-lg hover:border-text-purple/30 transition-colors group">
              <Layout className="mb-4 text-text-purple group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-white mb-2 font-mono">Scalable UI</h3>
              <p className="text-[13px] text-text-muted font-mono leading-snug">Modular components designed for growth and performance.</p>
            </div>
            <div className="bg-bg-sidebar/40 border border-border-color p-6 rounded-lg hover:border-text-cyan/30 transition-colors group">
              <Rocket className="mb-4 text-text-cyan group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-white mb-2 font-mono">Modern Stack</h3>
              <p className="text-[13px] text-text-muted font-mono leading-snug">Leveraging the latest in Next.js, Spring Boot, and AI.</p>
            </div>
          </section>

          {/* Links Section */}
          <div className="flex gap-6 pt-4">
            <a href="https://github.com/singhaganesh" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-text-muted hover:text-white transition-colors font-mono text-[14px]">
              <Github size={16} />
              github.com/singhaganesh
            </a>
            <a href="/projects" className="flex items-center gap-2 text-[#00e5cc] hover:underline transition-colors font-mono text-[14px]">
              <ExternalLink size={16} />
              explore_projects( )
            </a>
          </div>
        </div>

        {/* Sidebar Info Area */}
        <div className="space-y-8">
          {/* Status Card */}
          <div className="bg-bg-sidebar border border-border-color rounded-xl p-8 shadow-2xl relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#00e5cc]/5 blur-[60px] rounded-full" />
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-text-green animate-pulse shadow-[0_0_8px_#4ec9b0]" />
              <span className="text-text-green font-mono text-[13px] font-bold uppercase tracking-widest">Active Signal</span>
            </div>
            <div className="space-y-5">
              {aboutInfo.map((info) => (
                <div key={info.label} className="flex flex-col gap-1">
                  <span className="text-[11px] font-mono text-text-muted uppercase tracking-tighter opacity-60">{info.label}</span>
                  <span className={`${info.valueColor} font-mono text-[14px] font-semibold`}>{info.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-border-color flex flex-col gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="flex justify-between items-end">
                  <span className="text-text-muted font-mono text-[12px]">{stat.label}</span>
                  <span className="text-[24px] font-black text-white font-display leading-none">{stat.number}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Terminal Hint */}
          <div className="bg-[#1e1e1e] border border-border-color p-4 rounded-lg font-mono text-[12px] text-text-muted opacity-60">
            <p className="">$ finger ganesh</p>
            <p className="text-white mt-1 font-bold">status: active_duty</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadmePage;
