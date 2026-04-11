'use client';

import React from 'react';
import { learning, experience } from '@/data/skills';
import skillsData from '@/data/skills.json';
import { motion } from 'framer-motion';

const SkillsPage = () => {
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

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 mb-16">
        {Object.entries(skillsData).map(([category, skills]) => (
          <div key={category} className="flex flex-col">
            <div className="flex flex-col mb-6">
              <h2 className="text-[18px] font-bold text-[#ffb86c] tracking-[0.2em] uppercase font-mono mb-2">
                {category}
              </h2>
              <div className="h-[1px] w-full bg-border-color opacity-50" />
            </div>

            <div className="space-y-6">
              {skills.map((skill: any) => (
                <div key={skill.name} className="group">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[14px] font-mono text-text-muted group-hover:text-white transition-colors">
                      {skill.name}
                    </span>
                    <span className="text-[14px] font-mono font-bold" style={{ color: skill.color }}>
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-[2px] w-full bg-bg-sidebar relative overflow-hidden rounded-full">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="h-full absolute left-0 top-0"
                      style={{ 
                        backgroundColor: skill.color,
                        boxShadow: `0 0 10px ${skill.color}44`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Currently Learning */}
      <div className="mt-14">
        <div className="text-text-green font-mono text-[14px] mb-4">{"// currently_learning: []"}</div>
        <div className="flex gap-3">
          {learning.map((tech) => (
            <span key={tech} className="border border-dashed border-[#555] text-text-muted px-4 py-1.5 rounded text-[13px] font-mono">
              {tech}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
};

export default SkillsPage;
