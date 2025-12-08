import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Play } from 'lucide-react';
import type { Project } from '../data/projects';

interface GameModalProps {
  open: boolean;
  project: Project | null;
  onClose: () => void;
}

export const GameModal = ({ open, project, onClose }: GameModalProps) => {
  // WebGLは直接iframeで埋め込める。Unity Playの場合は外部リンク
  const isUnityPlay = project?.demoUrl?.includes('play.unity.com') ?? false;
  const canEmbed = project?.demoUrl && !isUnityPlay;

  return (
    <AnimatePresence>
      {open && project ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="glass-panel relative flex w-[95%] max-w-5xl max-h-[90vh] flex-col overflow-hidden rounded-2xl border border-orange-200/70 bg-gradient-to-br from-white via-orange-50/60 to-amber-100/60"
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 160, damping: 20 }}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-orange-200 bg-white text-slate-700 transition hover:-translate-y-0.5 hover:border-orange-300 hover:text-orange-700"
              aria-label="閉じる"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-orange-700/80">ゲームをプレイ</p>
                  <h3 className="text-2xl font-semibold text-slate-900">{project.title}</h3>
                  <p className="text-sm text-slate-700">{project.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="rounded-full border border-orange-200 bg-white px-3 py-1 text-xs font-semibold text-orange-700 shadow-sm shadow-orange-100">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-xl border border-orange-200/70 bg-white shadow-sm">
                {project.component ? (
                  <div className="relative w-full bg-slate-50">
                    {/* Render the custom game component */}
                    <project.component />
                  </div>
                ) : canEmbed ? (
                  <div className="relative aspect-video w-full bg-slate-900">
                    <iframe
                      src={project.demoUrl}
                      title={project.title}
                      className="h-full w-full"
                      allowFullScreen
                      allow="autoplay; fullscreen; xr-spatial-tracking"
                    />
                  </div>
                ) : project.demoUrl ? (
                  <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="h-full w-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/20 p-6">
                      <div className="text-center space-y-2">
                        <p className="text-lg font-semibold text-white drop-shadow-lg">
                          Unity Playでゲームをプレイ
                        </p>
                        <p className="text-sm text-white/90">
                          新しいタブでゲームを開きます
                        </p>
                      </div>
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-300/40 transition hover:-translate-y-0.5 hover:shadow-orange-400/50"
                      >
                        <Play className="h-5 w-5" />
                        ゲームを開く
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="flex aspect-video items-center justify-center text-slate-600">
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
