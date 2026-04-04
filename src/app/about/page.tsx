'use client';

import React from 'react';

const AboutPage = () => {
  const infoRows = [
    { label: "Location", value: "Burdwan, India", valueColor: "text-text-primary" },
    { label: "Available", value: "Immediately", valueColor: "text-text-cyan" },
    { label: "Languages", value: "English, Bengali, Hindi", valueColor: "text-text-primary" },
    { label: "Experience", value: "3+ Years", valueColor: "text-text-primary" },
  ];

  const stats = [
    { number: "3+", label: "Years Exp" },
    { number: "20+", label: "Projects" },
    { number: "10+", label: "Clients" },
  ];

  return (
    <div className="px-10 py-12 animate-fadeUp">
      {/* Code comment label */}
      <div className="text-text-green text-[15px] font-mono mb-8">
        {"<!-- about.html — the human behind the code -->"}
      </div>

      {/* Section heading */}
      <div className="mb-10">
        <h1 className="text-[64px] font-black text-white leading-none font-display">About Me</h1>
        <p className="text-text-muted text-[14px] font-mono mt-2">
          {"// the human behind the code"}
        </p>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-12">
        
        {/* Left — Profile Card */}
        <div className="bg-bg-sidebar border border-border-color rounded p-6 h-fit">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-bg-selected border-2 border-[#00e5cc] flex items-center justify-center">
              <span className="text-[28px] font-black text-[#00e5cc] font-display">GS</span>
            </div>
            <h2 className="text-[18px] font-bold text-white mt-4 font-display">Ganesh Singha</h2>
            <p className="text-[13px] font-mono text-text-blue mt-1">Full Stack Developer</p>
            
            <div className="mt-3 rounded-full bg-[#1e3a1e] text-[#4ec9b0] text-[12px] px-3 py-1 font-mono flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ec9b0]" />
              Open to Work
            </div>
          </div>

          <div className="border-t border-border-color my-4" />

          <div className="flex flex-col gap-1.5">
            {infoRows.map((row) => (
              <div key={row.label} className="flex justify-between text-[13px] font-mono py-1">
                <span className="text-text-muted">{row.label}</span>
                <span className={row.valueColor}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Bio + Stats */}
        <div className="flex flex-col">
          <div className="space-y-4 text-[15px] font-mono leading-relaxed text-text-primary">
            <p>
              Hi, I'm Ganesh — a <span className="text-text-cyan font-bold">Full Stack Developer</span> who loves building 
              <span className="text-text-orange"> scalable</span> web applications and purposeful user experiences.
            </p>
            <p>
              I work across the entire stack — from pixel-perfect <span className="text-text-blue">frontends</span> to 
              robust <span className="text-text-yellow">backend architectures</span>. I'm driven by clean code and real-world impact.
            </p>
            <p>
              When I'm not coding, I'm exploring new technologies, contributing to open source, or thinking about how software 
              can solve everyday problems.
            </p>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
            {stats.map((stat, i) => (
              <div 
                key={stat.label} 
                className="bg-bg-sidebar border border-border-color rounded p-5 text-center transition-transform hover:-translate-y-1"
                style={{ animationDelay: `${(i + 1) * 100}ms` }}
              >
                <div className="text-[32px] font-black text-[#00e5cc] font-display leading-tight">{stat.number}</div>
                <div className="text-[12px] font-mono text-text-muted mt-1 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
