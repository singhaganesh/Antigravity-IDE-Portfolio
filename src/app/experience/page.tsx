'use client';

import React from 'react';
import experienceData from '@/data/experience.json';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ExternalLink, Code2 } from 'lucide-react';

const ExperiencePage = () => {
  return (
    <div className="px-10 py-12 animate-fadeUp">
      {/* Code comment label */}
      <div className="text-text-green text-[15px] font-mono mb-8">
        {"// experience.log — professional history"}
      </div>

      {/* Section heading */}
      <div className="mb-12">
        <h1 className="text-[64px] font-black text-white leading-none font-display">Experience</h1>
        <p className="text-text-muted text-[14px] font-mono mt-2">
          {"// mapping my career nodes"}
        </p>
      </div>

      {/* Timeline Wrapper */}
      <div className="relative border-l border-border-color ml-4 pl-10 space-y-16 py-4">
        {experienceData.map((exp, index) => (
          <motion.div 
            key={exp.company}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[51px] top-0 w-5 h-5 rounded-full bg-bg-editor border-2 border-[#00e5cc] shadow-[0_0_10px_rgba(0,229,204,0.3)] z-10 flex items-center justify-center">
               <div className="w-1.5 h-1.5 rounded-full bg-[#00e5cc] animate-pulse" />
            </div>

            {/* Content Card */}
            <div className="group bg-bg-sidebar/30 border border-border-color p-8 rounded-lg hover:border-[#00e5cc]/30 transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                <div>
                  <h2 className="text-[22px] font-bold text-white flex items-center gap-3">
                    <Briefcase size={20} className="text-[#00e5cc]" />
                    {exp.role}
                  </h2>
                  <div className="text-[#ffb86c] font-mono text-[16px] font-semibold mt-1 uppercase tracking-wider">
                    {exp.company}
                  </div>
                </div>
                <div className="flex flex-col items-start md:items-end gap-2 text-text-muted font-mono text-[13px]">
                  <span className="flex items-center gap-2">
                    <Calendar size={14} />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin size={14} />
                    {exp.location}
                  </span>
                </div>
              </div>

              <p className="text-text-primary text-[15px] leading-relaxed mb-6 max-w-3xl italic opacity-80">
                {exp.description}
              </p>

              {/* Highlights */}
              <div className="space-y-3 mb-8">
                {exp.highlights.map((highlight, hIndex) => (
                  <div key={hIndex} className="flex gap-3 items-start group/item">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-border-color group-hover/item:bg-[#00e5cc] transition-colors" />
                    <span className="text-[14px] text-text-primary/90 leading-snug">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-8">
                {exp.technologies.map((tech) => (
                  <span 
                    key={tech}
                    className="bg-bg-editor/50 text-text-cyan px-3 py-1 rounded-md text-[12px] font-mono border border-border-color/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Projects */}
              {exp.projects && exp.projects.length > 0 && (
                <div className="pt-6 border-t border-border-color/50">
                  <div className="text-text-green font-mono text-[13px] mb-4 flex items-center gap-2">
                    <Code2 size={14} />
                    {"// featured_contributions:"}
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {exp.projects.map((project) => (
                      <a 
                        key={project.name}
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-bg-editor border border-border-color px-4 py-2 rounded text-[13px] font-mono text-white hover:border-[#00e5cc] hover:bg-[#00e5cc]/5 transition-all"
                      >
                        {project.name}
                        <ExternalLink size={12} className="opacity-50" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExperiencePage;