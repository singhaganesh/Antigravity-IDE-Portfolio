'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Hardcoded Data to optimize performance
const skillsData = {
  "Languages": [
    { "name": "Java", "level": 90, "color": "#f89820" },
    { "name": "Kotlin", "level": 80, "color": "#a97bff" },
    { "name": "JavaScript", "level": 80, "color": "#f1fa8c" },
    { "name": "TypeScript", "level": 75, "color": "#8be9fd" },
    { "name": "Python", "level": 60, "color": "#ff79c6" },
    { "name": "SQL", "level": 70, "color": "#bd93f9" }
  ],
  "Generative AI & LLM Engineering": [
    { "name": "OpenAI API", "level": 80, "color": "#10a37f" },
    { "name": "Prompt Engineering", "level": 70, "color": "#ffb86c" },
    { "name": "RAG Pipelines", "level": 75, "color": "#8be9fd" }
  ],
  "Backend": [
    { "name": "Spring Boot", "level": 90, "color": "#6db33f" },
    { "name": "Spring Security", "level": 80, "color": "#f1502f" },
    { "name": "REST APIs", "level": 90, "color": "#ff79c6" },
    { "name": "WebSockets", "level": 75, "color": "#f1fa8c" }
  ],
  "Mobile / Android Engineering": [
    { "name": "Jetpack Compose", "level": 88, "color": "#4285f4" },
    { "name": "Android SDK", "level": 80, "color": "#3ddc84" },
    { "name": "MVVM Architecture", "level": 85, "color": "#ffb86c" },
    { "name": "Retrofit / Coroutines", "level": 82, "color": "#8be9fd" },
    { "name": "DataStore / Preferences", "level": 75, "color": "#ff79c6" }
  ],
  "Databases": [
    { "name": "PostgreSQL", "level": 85, "color": "#336791" },
    { "name": "MySQL", "level": 80, "color": "#4479a1" },
    { "name": "MongoDB", "level": 75, "color": "#47a248" },
    { "name": "Supabase", "level": 80, "color": "#3ecf8e" },
    { "name": "Redis", "level": 70, "color": "#ff79c6" }
  ],
  "DevOps & Tools": [
    { "name": "Git & GitHub", "level": 90, "color": "#f1502f" },
    { "name": "Docker", "level": 80, "color": "#2496ed" },
    { "name": "CI/CD", "level": 80, "color": "#2496ed" },
    { "name": "GitHub Actions", "level": 75, "color": "#2088ff" },
    { "name": "Linux", "level": 80, "color": "#fcc624" }
  ],
  "Cloud & AWS Infrastructure": [
    { "name": "AWS (EC2, RDS, S3)", "level": 80, "color": "#FF9900" },
    { "name": "Vercel / Netlify", "level": 90, "color": "#ffffff" },
    { "name": "Cloud Architecture", "level": 75, "color": "#8be9fd" },
    { "name": "IAM & Security", "level": 70, "color": "#ff79c6" },
    { "name": "Serverless (Lambda)", "level": 65, "color": "#f1fa8c" }
  ],
  "Frontend": [
    { "name": "React 19", "level": 88, "color": "#61dafb" },
    { "name": "Next.js", "level": 82, "color": "#ffffff" },
    { "name": "Tailwind CSS", "level": 90, "color": "#38b2ac" },
    { "name": "Redux Toolkit", "level": 80, "color": "#764abc" },
    { "name": "Material UI", "level": 75, "color": "#007fff" }
  ],
  "Design": [
    { "name": "Figma", "level": 70, "color": "#f24e1e" },
    { "name": "UI/UX Principles", "level": 75, "color": "#ff79c6" },
    { "name": "Responsive Design", "level": 85, "color": "#8be9fd" }
  ]
};

const learning = ["Rust", "Web3", "Go"];

const SkillsPage = () => {
  return (
    <div className="px-10 py-12 animate-fadeUp">
      {/* Code comment label */}
      <div className="text-text-green text-[15px] font-mono mb-8">
        {"// skills.java — my technical universe"}
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