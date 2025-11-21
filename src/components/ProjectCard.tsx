import { motion } from 'framer-motion';
import { ExternalLink, Play, Github } from 'lucide-react';
import type { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  onPlay?: (project: Project) => void;
}

export const ProjectCard = ({ project, onPlay }: ProjectCardProps) => {
  const isGame = project.isGame;

  return (
    <motion.article
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 shadow-glass transition hover:-translate-y-1"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        {isGame && (
          <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-neon">
            <Play className="h-3.5 w-3.5" /> Playable
          </span>
        )}
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-50">{project.title}</h3>
            <p className="text-sm text-slate-300">{project.description}</p>
          </div>
          {!isGame && project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-neon/60 hover:text-neon"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span key={tech} className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 pt-1">
          {isGame && onPlay ? (
            <button
              onClick={() => onPlay(project)}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-neon to-aurora px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-neon/10 transition hover:shadow-aurora/20"
            >
              <Play className="h-4 w-4" /> Play Now
            </button>
          ) : (
            <div className="flex gap-2">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-neon/60 hover:text-neon"
                >
                  <Github className="h-4 w-4" /> GitHub
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-aurora/60 hover:text-aurora"
                >
                  <ExternalLink className="h-4 w-4" /> Live Demo
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
};
