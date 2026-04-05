'use client';

import React, { useState, useMemo } from 'react';
import { Search, Github, ExternalLink, Star, GitFork, FolderOpen } from 'lucide-react';
import projectsData from '@/data/projects.json';
import { PROJECT_ORDER } from '@/data/projects-config';

interface Project {
  id: number;
  name: string;
  originalName: string;
  tag: string;
  desc: string;
  stack: string[];
  tagColor: string;
  demo: string;
  github: string;
  stars: number;
  forks: number;
  updatedAt: string;
}

const ProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const projects = useMemo(() => {
    const data = [...projectsData] as Project[];
    
    // Sort based on PROJECT_ORDER configuration
    return data.sort((a, b) => {
      const indexA = PROJECT_ORDER.indexOf(a.originalName);
      const indexB = PROJECT_ORDER.indexOf(b.originalName);

      // If both are in the config, use config order
      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }

      // If only one is in the config, prioritize it
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;

      // Fallback: sort by update date (newest first)
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = 
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.stack.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesSearch;
  });

  return (
    <div className="px-10 py-12 animate-fadeUp">
      {/* Code comment label */}
      <div className="text-text-green text-[15px] font-mono mb-8">
        {"// projects.js — curated work from my GitHub"}
      </div>

      {/* Section heading */}
      <div className="mb-10">
        <h1 className="text-[64px] font-black text-white leading-none font-display">Projects</h1>
        <p className="text-text-muted text-[14px] font-mono mt-2">
          {"// featured projects & selected experiments"}
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-bg-sidebar border border-border-color rounded pl-10 pr-4 py-2 text-[13px] font-mono text-text-primary focus:outline-none focus:border-[#00e5cc] transition-colors"
          />
        </div>
      </div>

      {/* Projects grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-bg-sidebar border border-border-color rounded-sm p-6 hover:border-[#00e5cc] transition-all duration-200 group flex flex-col"
            >
              <div className="flex justify-between items-start mb-2">
                <span
                  className="text-[11px] font-mono px-2 py-0.5 rounded border border-border-color bg-bg-editor"
                  style={{ color: project.tagColor }}
                >
                  {project.tag}
                </span>
              </div>

              <h3 className="text-[18px] font-bold text-white font-display group-hover:text-[#00e5cc] transition-colors">
                {project.name}
              </h3>

              <p className="text-[13px] text-text-muted mt-2 leading-relaxed font-mono flex-1">
                {project.desc}
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {project.stack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="bg-bg-editor text-text-primary text-[11px] font-mono px-2 py-0.5 border border-border-color rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border-color">
                <div className="flex items-center gap-1 text-text-muted text-[12px] font-mono">
                  <Star size={14} className="text-[#f7df1e]" />
                  <span>{project.stars}</span>
                </div>
                <div className="flex items-center gap-1 text-text-muted text-[12px] font-mono">
                  <GitFork size={14} />
                  <span>{project.forks}</span>
                </div>
              </div>

              <div className="flex gap-4 mt-4">
                {project.demo && project.demo !== '#' && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00e5cc] text-[13px] font-mono hover:underline flex items-center gap-1"
                  >
                    <ExternalLink size={14} /> Live Demo
                  </a>
                )}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted text-[13px] font-mono hover:text-white flex items-center gap-1 transition-colors"
                >
                  <Github size={14} /> GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-text-muted">
          <FolderOpen size={48} className="mb-4 opacity-50" />
          <p className="font-mono text-[14px] mb-2">No projects matching your search</p>
        </div>
      )}

      <div className="mt-10">
        <a
          href="https://github.com/singhaganesh"
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-muted hover:text-[#00e5cc] font-mono text-[14px] transition-colors flex items-center gap-2"
        >
          <Github size={16} />
          {"// view all repositories on GitHub →"}
        </a>
      </div>
    </div>
  );
};

export default ProjectsPage;
