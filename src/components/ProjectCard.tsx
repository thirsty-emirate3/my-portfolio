import { motion } from 'framer-motion';
import { ExternalLink, Play } from 'lucide-react';
import type { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  onPlay?: (project: Project) => void;
  onSelect?: (project: Project) => void;
}

export const ProjectCard = ({ project, onSelect }: ProjectCardProps) => {
  const isGame = project.isGame;
  const targetUrl = project.demoUrl || project.repoUrl;
  const hasExternal = !!targetUrl;

  const content = (
    <>
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/45 via-black/25 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.1),transparent_30%)] opacity-60" />
        {isGame && (
          <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full border border-white/50 bg-white/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-800 shadow-sm backdrop-blur">
            <Play className="h-3.5 w-3.5" /> Play
          </span>
        )}
        <div className="absolute inset-x-2 bottom-2 rounded-lg bg-white/85 px-2.5 py-2 shadow-md backdrop-blur">
          <div className="flex items-center justify-between text-[12px] font-semibold text-slate-900">
            <span className="line-clamp-1">{project.title}</span>
            {hasExternal && <ExternalLink className="h-3.5 w-3.5 text-orange-500" />}
          </div>
        </div>
      </div>
    </>
  );

  // Logic Fix: If we have an onSelect callback, we prioritize using the button (modal)
  // regardless of whether there is a targetUrl (external link).
  // This allows games with dummy URLs or real URLs to still open in the modal if desired.
  const Wrapper: React.ElementType = onSelect ? 'button' : (targetUrl ? 'a' : 'div');

  const wrapperProps = onSelect
    ? {
      type: 'button' as const,
      onClick: () => onSelect(project),
      className: 'absolute inset-0 w-full h-full text-left'
    }
    : (targetUrl
      ? { href: targetUrl, target: '_blank', rel: 'noreferrer' }
      : { role: 'button', tabIndex: 0 }
    );

  return (
    <motion.div
      className="group relative block aspect-square overflow-hidden rounded-xl border border-orange-100 bg-white shadow-[0_14px_40px_rgba(255,159,64,0.2)] transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(255,159,64,0.25)]"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Wrapper {...wrapperProps} className="absolute inset-0">
        {content}
      </Wrapper>
    </motion.div>
  );
};
