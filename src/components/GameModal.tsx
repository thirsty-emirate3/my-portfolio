import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { Project } from '../data/projects';

interface GameModalProps {
  open: boolean;
  project: Project | null;
  onClose: () => void;
}

export const GameModal = ({ open, project, onClose }: GameModalProps) => {
  return (
    <AnimatePresence>
      {open && project ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="glass-panel relative w-[95%] max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0f172a]/80 to-[#0b1222]/90"
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 160, damping: 20 }}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-neon/60 hover:text-neon"
              aria-label="Close game"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-6 sm:p-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-white/50">Play Now</p>
                  <h3 className="text-2xl font-semibold text-slate-50">{project.title}</h3>
                  <p className="text-sm text-slate-300">{project.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-black/40">
                {project.demoUrl ? (
                  <iframe
                    src={project.demoUrl}
                    title={project.title}
                    className="aspect-video w-full"
                    allowFullScreen
                  />
                ) : (
                  <div className="flex aspect-video items-center justify-center text-slate-300">
                    デモURLが設定されていません。
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
