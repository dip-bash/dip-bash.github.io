import React from 'react';
import { Project } from '../types';
import Icon from './Icon';

interface ProjectsProps {
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <section className="space-y-6">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-xl font-medium tracking-tight text-text-main">Selected projects</h2>
        <span className="font-mono text-xs tabular-nums text-text-subtle">{String(projects.length).padStart(2, '0')}</span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {projects.map((project, idx) => {
          const icon = project.icon?.split(' ').pop()?.replace('fa-', '') || 'terminal';
          const iconName = icon === 'desktop' ? 'monitor' : icon;
          return (
            <article
              key={idx}
              className="flex min-h-52 flex-col rounded-xl border border-border bg-surface p-6 transition-colors duration-150 hover:border-text-subtle"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-bg text-accent">
                  <Icon name={iconName} className="h-5 w-5" />
                </div>
                <div className="flex items-center gap-4 text-text-muted">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} source on GitHub`}
                      className="transition-colors duration-150 hover:text-accent"
                    >
                      <Icon name="github" className="h-4 w-4" />
                    </a>
                  )}
                  {project.external && (
                    <a
                      href={project.external}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${project.title}`}
                      className="transition-colors duration-150 hover:text-accent"
                    >
                      <Icon name="arrow-up-right" className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
              <h3 className="mb-2 text-base font-medium text-text-main">{project.title}</h3>
              <p className="text-sm leading-6 text-text-muted">{project.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
