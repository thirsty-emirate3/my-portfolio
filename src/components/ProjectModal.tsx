import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';
import type { Project } from '../data/projects';

interface ProjectModalProps {
  open: boolean;
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal = ({ open, project, onClose }: ProjectModalProps) => {
  const targetUrl = project?.demoUrl || project?.repoUrl;

  return (
    <AnimatePresence>
      {open && project ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-[92%] max-w-5xl overflow-hidden rounded-3xl border border-orange-200/70 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 160, damping: 18 }}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-orange-200 bg-white text-slate-700 transition hover:-translate-y-0.5 hover:border-orange-300 hover:text-orange-700"
              aria-label="閉じる"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="relative aspect-video overflow-hidden bg-slate-100">
                <img src={project.imageUrl} alt={project.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              </div>

              <div className="space-y-4 p-6 sm:p-8">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.25em] text-orange-700/80">Project</p>
                  <h3 className="text-2xl font-semibold text-slate-900">{project.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-700">{project.description}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-orange-200 bg-white px-3 py-1 text-xs font-semibold text-orange-700 shadow-sm shadow-orange-100"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  {targetUrl && (
                    <a
                      href={targetUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-orange-300/40 transition hover:-translate-y-0.5 hover:shadow-orange-400/50"
                    >
                      <ExternalLink className="h-4 w-4" /> サイトを開く
                    </a>
                  )}
                  <button
                    onClick={onClose}
                    className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-orange-700 transition hover:-translate-y-0.5 hover:border-orange-300 hover:text-orange-800"
                  >
                    閉じる
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
