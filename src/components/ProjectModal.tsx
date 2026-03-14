import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';
import type { Project } from '../data/projects';

interface ProjectModalProps {
  open: boolean;
  project: Project | null;
  onClose: () => void;
}

const toGoogleDriveEmbedUrl = (url?: string) => {
  if (!url || !url.includes('drive.google.com/file/d/')) return null;

  const match = url.match(/\/file\/d\/([^/]+)/);
  if (!match) return null;

  return `https://drive.google.com/file/d/${match[1]}/preview`;
};

const toYouTubeEmbedUrl = (url?: string) => {
  if (!url) return null;

  const shortMatch = url.match(/youtu\.be\/([^?&#/]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;

  const watchMatch = url.match(/[?&]v=([^?&#/]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;

  return null;
};

export const ProjectModal = ({ open, project, onClose }: ProjectModalProps) => {
  const targetUrl = project?.demoUrl || project?.repoUrl;
  const embedUrl = toGoogleDriveEmbedUrl(project?.demoUrl) || toYouTubeEmbedUrl(project?.demoUrl);
  const shouldShowEmbed = !!embedUrl;
  const isLive2DProject = project?.id === 39;
  const isUnityRaceProject = project?.id === 40;
  const isLargeMediaProject = isLive2DProject || isUnityRaceProject;

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
            className={`relative w-[92%] overflow-hidden rounded-3xl border border-orange-200/70 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.35)] ${isLargeMediaProject ? 'max-w-7xl' : 'max-w-5xl'}`}
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

            <div className={`grid gap-0 ${isLargeMediaProject ? 'max-h-[88vh] lg:grid-cols-[1.15fr_0.85fr]' : 'lg:grid-cols-[1.1fr_0.9fr]'}`}>
              <div className={`relative overflow-hidden bg-slate-100 ${isLargeMediaProject ? 'aspect-video lg:aspect-auto lg:max-h-[88vh]' : 'aspect-video'}`}>
                {shouldShowEmbed ? (
                  <iframe
                    src={embedUrl!}
                    title={`${project.title} preview`}
                    className="h-full w-full"
                    loading="lazy"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <img src={project.imageUrl} alt={project.title} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                  </>
                )}
              </div>

              <div className={`space-y-4 p-6 sm:p-8 ${isLargeMediaProject ? 'overflow-y-auto lg:max-h-[88vh]' : ''}`}>
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

                {isLive2DProject && (
                  <div className="rounded-2xl border border-orange-200 bg-orange-50/70 p-4 space-y-3">
                    <p className="text-sm font-semibold text-orange-700">Live2Dとは</p>
                    <p className="text-sm leading-relaxed text-slate-700">
                      2Dイラストに自然な動きと表情変化を与え、キャラクターを生き生きと見せるための技術です。
                    </p>
                    <p className="text-sm font-semibold text-orange-700">使い道</p>
                    <p className="text-sm leading-relaxed text-slate-700">
                      配信アバター、教育コンテンツ、接客・案内キャラクター、学習アプリなど幅広いUI/UXに活用できます。
                    </p>
                    <p className="text-sm leading-relaxed text-slate-700">
                      今回は英会話アプリを作る際にLive2Dを使用し、親しみやすく継続しやすい学習体験を目指しました。
                    </p>
                    <p className="text-sm font-semibold text-red-600">このアプリは現在改良中です。</p>
                  </div>
                )}

                {isUnityRaceProject && (
                  <div className="rounded-2xl border border-sky-200 bg-sky-50/70 p-4 space-y-3">
                    <p className="text-sm font-semibold text-sky-700">制作背景</p>
                    <p className="text-sm leading-relaxed text-slate-700">
                      このゲームは大学の授業で制作したUnityレースゲームです。限られた期間の中で、企画から実装、調整までを一貫して行いました。
                    </p>
                    <p className="text-sm font-semibold text-sky-700">工夫した点</p>
                    <p className="text-sm leading-relaxed text-slate-700">
                      もっとも重視したのは、<span className="font-semibold text-sky-700">ゲームをプレイする側の視点</span>です。カメラ挙動、速度感、視認性、操作レスポンスを細かく調整し、直感的に楽しめる体験に仕上げました。
                    </p>
                    <p className="text-sm leading-relaxed text-slate-700">
                      特に「気持ちよく走れること」を軸に、コース上で迷わないUI配置と、リトライしやすいテンポ設計を意識しています。
                    </p>
                  </div>
                )}

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
