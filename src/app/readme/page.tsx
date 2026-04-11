'use client';

import React from 'react';
import Image from 'next/image';
import { aboutInfo, stats } from '@/data/profile';
import { motion } from 'framer-motion';
import { User, MapPin, Briefcase, Calendar, Globe, Rocket, Code2, Layout, Zap, Github, ExternalLink } from 'lucide-react';

const ReadmePage = () => {
  return (
    <div className="px-10 py-12 animate-fadeUp">
      {/* Code comment label */}
      <div className="text-text-green text-[15px] font-mono mb-8">
        {"<!-- README.md — the human behind the code -->"}
      </div>

      {/* Header Section */}
      <div className="mb-16">
        <div className="flex items-center gap-8 mb-4">
           {/* Profile Photo at Left of Heading */}
           <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-[#00e5cc]/30 shadow-[0_0_30px_rgba(0,229,204,0.15)] flex-shrink-0">
              <Image 
                src="/profile.jpeg" 
                alt="Ganesh Singha" 
                width={128} 
                height={128}
                className="object-cover w-full h-full"
              />
           </div>
           <div>
              <h1 className="text-[72px] font-black text-white leading-tight font-display tracking-tight">Ganesh Singha</h1>
              <p className="text-text-muted text-[20px] font-mono mt-2 flex items-center gap-3">
                <Zap size={20} className="text-text-yellow" />
                Full Stack Developer & Mobile Engineer
              </p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-16">
        
        {/* Main Content Area */}
        <div className="space-y-12">
          
          {/* Bio Section */}
          <section>
            <h2 className="text-[24px] font-bold text-white mb-6 border-b border-border-color pb-2 flex items-center gap-3">
              <Globe size={22} className="text-text-blue" />
              Overview
            </h2>
            <div className="space-y-6 text-[16px] font-mono leading-relaxed text-text-primary">
              <p>
                Hi, I&apos;m Ganesh — a <span className="text-text-cyan font-bold underline decoration-text-cyan/30">Full Stack Developer</span> and Junior Engineer from Kolkata, India. I specialize in building highly scalable web architectures and immersive mobile experiences.
              </p>
              <p>
                I have a track record of delivering high-impact systems, including a <span className="text-text-yellow font-semibold">patented EV charging platform</span> and an <span className="text-text-green font-semibold">AI-powered IoT chatbot</span> that reduced manual data querying by 60%.
              </p>
              <p>
                Currently working at <span className="text-text-blue font-semibold underline decoration-text-blue/30">SEPLE NovaEdge</span>, I am bridging the gap between IoT ecosystems and AI automation, creating systems that solve complex real-world problems with simple, intuitive interfaces.
              </p>
            </div>
          </section>

          {/* Philosophy Section */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          <div className="bg-bg-sidebar border border-border-color rounded-xl p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-text-green animate-pulse shadow-[0_0_8px_#4ec9b0]" />
              <span className="text-text-green font-mono text-[13px] font-bold uppercase tracking-widest">Available Now</span>
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
             <p className="">$ whoami</p>
             <p className="text-white mt-1 font-bold">ganesh_singha.dev</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ReadmePage;