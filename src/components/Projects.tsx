
import React from 'react';
import { Project } from '../types';

interface ProjectsProps {
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <section className="fade-in space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Selected Projects</h2>
        <div className="h-[1px] flex-1 bg-border mx-6 opacity-50"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {projects.map((project, idx) => (
          <article 
            key={idx} 
            className="group relative project-card bg-surface border border-border p-7 rounded-2xl transition-all duration-300 overflow-hidden"
          >
            {/* Subtle corner glow */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-accent/5 blur-2xl rounded-full group-hover:bg-accent/10 transition-colors"></div>
            
            <div className="relative flex justify-between items-start mb-5">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-bg border border-border group-hover:border-accent/30 transition-colors">
                <i className={`${project.icon} text-xl text-accent group-hover:scale-110 transition-transform`}></i>
              </div>
              <div className="flex gap-4 text-text-muted">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-lg">
                    <i className="fab fa-github"></i>
                  </a>
                )}
                {project.external && (
                  <a href={project.external} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors text-lg">
                    <i className="fas fa-external-link-alt"></i>
                  </a>
                )}
              </div>
            </div>
            
            <div className="relative">
              <h3 className="text-base font-bold mb-2 group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-[0.9rem] text-text-muted leading-relaxed font-main">
                {project.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;
