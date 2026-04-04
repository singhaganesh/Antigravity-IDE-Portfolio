'use client';

import React from 'react';

const ProjectsPage = () => {
  const projects = [
    {
      name: "OrbitCart",
      tag: "Full Stack",
      desc: "A full-stack e-commerce platform with authentication, cart management, and payment integration.",
      stack: ["React", "Node.js", "MongoDB", "Stripe"],
      tagColor: "#4ec9b0",
      demo: "#",
      github: "#"
    },
    {
      name: "NebulaChat",
      tag: "Real-time",
      desc: "A real-time messaging app with rooms, typing indicators, and WebSocket connections.",
      stack: ["Next.js", "Socket.io", "PostgreSQL", "Tailwind"],
      tagColor: "#9cdcfe",
      demo: "#",
      github: "#"
    },
    {
      name: "GravityDash",
      tag: "Analytics",
      desc: "An analytics dashboard with interactive charts, live data simulation, and CSV export.",
      stack: ["React", "TypeScript", "Chart.js", "REST API"],
      tagColor: "#dcdcaa",
      demo: "#",
      github: "#"
    }
  ];

  return (
    <div className="px-10 py-12 animate-fadeUp">
      {/* Code comment label */}
      <div className="text-text-green text-[15px] font-mono mb-8">
        {"// projects.js — things I've shipped"}
      </div>

      {/* Section heading */}
      <div className="mb-10">
        <h1 className="text-[64px] font-black text-white leading-none font-display">Projects</h1>
        <p className="text-text-muted text-[14px] font-mono mt-2">
          {"// things I've shipped"}
        </p>
      </div>

      {/* Projects grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project, i) => (
          <div 
            key={project.name}
            className="bg-bg-sidebar border border-border-color rounded-sm p-6 hover:border-[#00e5cc] transition-all duration-200 group"
          >
            <div className="flex justify-between items-start">
              <span 
                className="text-[11px] font-mono px-2 py-0.5 rounded border border-border-color bg-bg-editor"
                style={{ color: project.tagColor }}
              >
                {project.tag}
              </span>
            </div>

            <h3 className="text-[22px] font-bold text-white mt-4 font-display group-hover:text-[#00e5cc] transition-colors">
              {project.name}
            </h3>
            
            <p className="text-[13px] text-text-muted mt-2 leading-relaxed font-mono min-h-[60px]">
              {project.desc}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {project.stack.map((tech) => (
                <span 
                  key={tech}
                  className="bg-bg-editor text-text-primary text-[11px] font-mono px-2 py-0.5 border border-border-color rounded"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-4 mt-6 pt-4 border-t border-border-color">
              <a 
                href={project.demo} 
                className="text-[#00e5cc] text-[13px] font-mono hover:underline flex items-center gap-1"
              >
                ↗ Live Demo
              </a>
              <a 
                href={project.github} 
                className="text-text-muted text-[13px] font-mono hover:text-text-primary flex items-center gap-1"
              >
                ⌥ GitHub
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <a 
          href="https://github.com/ganeshsingha" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-text-muted hover:text-[#00e5cc] font-mono text-[14px] transition-colors"
        >
          {"// more_projects on GitHub →"}
        </a>
      </div>
    </div>
  );
};

export default ProjectsPage;
