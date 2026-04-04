'use client';

import React from 'react';

const SkillsPage = () => {
  const clusters = [
    { 
      label: "Frontend",      
      color: "#9cdcfe", 
      icon: "◈",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML / CSS", "Framer Motion"] 
    },
    { 
      label: "Backend",       
      color: "#4ec9b0", 
      icon: "◉",
      skills: ["Node.js", "Express.js", "Python", "REST APIs", "GraphQL", "PostgreSQL"] 
    },
    { 
      label: "Tools & Infra", 
      color: "#dcdcaa", 
      icon: "◇",
      skills: ["Git", "Docker", "AWS", "MongoDB", "Vercel", "Linux"] 
    }
  ];

  const experience = [
    {
      role: "Full Stack Developer",
      company: "Freelance / Open Source",
      dates: "2023 - Present",
      description: "Building scalable web applications using React, Next.js, and Node.js. Contributing to various open-source projects."
    },
    {
      role: "Junior Web Developer",
      company: "Tech Solutions Inc.",
      dates: "2021 - 2023",
      description: "Developed and maintained client websites, improved performance by 30%, and collaborated with the design team for pixel-perfect UIs."
    }
  ];

  return (
    <div className="px-10 py-12 animate-fadeUp">
      {/* Code comment label */}
      <div className="text-text-green text-[15px] font-mono mb-8">
        {"// skills.json — my technical universe"}
      </div>

      {/* Section heading */}
      <div className="mb-10">
        <h1 className="text-[64px] font-black text-white leading-none font-display">Skills & Stack</h1>
        <p className="text-text-muted text-[14px] font-mono mt-2">
          {"// my technical universe"}
        </p>
      </div>

      {/* Skill clusters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {clusters.map((cluster) => (
          <div key={cluster.label} className="flex flex-col">
            <div className="flex items-center gap-2 mb-5">
              <span className="text-[18px]" style={{ color: cluster.color }}>{cluster.icon}</span>
              <span className="text-[13px] font-mono font-bold uppercase tracking-wider" style={{ color: cluster.color }}>
                {cluster.label}
              </span>
              <div className="flex-1 border-t border-border-color ml-2" />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {cluster.skills.map((skill, i) => (
                <span 
                  key={skill}
                  className="bg-bg-sidebar border border-border-color rounded text-[13px] font-mono text-text-primary px-3 py-1.5 hover:border-current transition-colors duration-150"
                  style={{ 
                    transitionProperty: 'border-color, color',
                    animation: `fadeUp 0.4s ease-out forwards ${i * 50}ms`,
                    opacity: 0
                  } as any}
                  onMouseEnter={(e) => (e.currentTarget.style.color = cluster.color)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#d4d4d4')}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Currently Learning */}
      <div className="mt-14">
        <div className="text-text-green font-mono text-[14px] mb-4">{"// currently_learning: []"}</div>
        <div className="flex gap-3">
          {["Rust", "Web3", "Go"].map((tech) => (
            <span key={tech} className="border border-dashed border-[#555] text-text-muted px-4 py-1.5 rounded text-[13px] font-mono">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Experience timeline */}
      <div className="mt-14">
        <div className="text-text-green font-mono text-[14px] mb-8">{"// experience_log:"}</div>
        <div className="border-l border-border-color ml-2 pl-8 space-y-10 relative">
          {experience.map((item) => (
            <div key={item.role} className="relative">
              <div className="w-3 h-3 rounded-full bg-[#00e5cc] absolute -left-[38.5px] top-1.5 shadow-[0_0_8px_rgba(0,229,204,0.5)]" />
              <h3 className="text-[16px] font-bold text-white font-mono">{item.role}</h3>
              <div className="text-[13px] text-text-muted font-mono mt-0.5">{item.company} | {item.dates}</div>
              <p className="text-[13px] text-text-primary font-mono mt-2 leading-relaxed max-w-2xl">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsPage;
