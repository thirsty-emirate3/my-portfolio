import { useMemo, useState } from 'react';
import { Github, Mail, Twitter, Youtube } from 'lucide-react';
import { Hero } from './components/Hero';
import { GameModal } from './components/GameModal';
import { ProjectCard } from './components/ProjectCard';
import { projects, type Project } from './data/projects';

const youtubeVideos = [
  {
    id: 'oHg5SJYRHA0',
    title: '風刺スケッチ - 社会を切り取る60秒',
    views: '1.2M 回視聴',
    published: '2 週間前',
    thumbnail: 'https://img.youtube.com/vi/oHg5SJYRHA0/hqdefault.jpg',
  },
  {
    id: 'dQw4w9WgXcQ',
    title: '生成AIで描く近未来コメディ',
    views: '860K 回視聴',
    published: '1 か月前',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
  },
  {
    id: 'Wch3gJG2GJ4',
    title: '世界を揺らすショート風刺',
    views: '540K 回視聴',
    published: '3 週間前',
    thumbnail: 'https://img.youtube.com/vi/Wch3gJG2GJ4/hqdefault.jpg',
  },
];

const skillTags = ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Unity', 'C#', 'Figma', 'AI Prompt'];

function App() {
  const [activeGame, setActiveGame] = useState<Project | null>(null);

  const games = useMemo(() => projects.filter((p) => p.isGame), []);
  const webWorks = useMemo(() => projects.filter((p) => !p.isGame), []);

  return (
    <div className="min-h-screen bg-night text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-grid-glow opacity-60" aria-hidden />
      <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-16 px-4 py-12 sm:px-6 lg:px-0 lg:py-16">
        <Hero />

        <section id="about" className="glass-panel rounded-3xl border border-white/5 p-10 shadow-2xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-4">
              <p className="text-xs uppercase tracking-[0.25em] text-white/50">About</p>
              <h2 className="text-3xl font-semibold text-slate-50">AI × Creative を軸にしたフロントエンドとゲーム制作</h2>
              <p className="text-slate-300">
                ユーザー体験を起点に、デザインシステム構築からインタラクション実装までを担当。AIを活用したプロトタイピングで
                スピーディに検証しつつ、手触りの良いUIと没入感ある演出を届けます。
              </p>
              <div className="flex flex-wrap gap-2">
                {skillTags.map((skill) => (
                  <span key={skill} className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid w-full max-w-md gap-3">
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-4 text-sm text-slate-200 shadow-glass">
                <p className="text-xs uppercase tracking-[0.25em] text-white/50">Focus</p>
                <p className="text-lg font-semibold text-slate-50">Micro-interaction / Motion Design</p>
                <p className="text-sm text-slate-300">Framer Motion と GLSL を組み合わせ、AIの知性を感じさせる動きをデザイン。</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-4 text-sm text-slate-200 shadow-glass">
                <p className="text-xs uppercase tracking-[0.25em] text-white/50">Value</p>
                <p className="text-lg font-semibold text-slate-50">AI-assisted DX</p>
                <p className="text-sm text-slate-300">プロンプト設計から自動化まで、一連の開発フローを効率化する仕組みづくりが得意です。</p>
              </div>
            </div>
          </div>
        </section>

        <section id="games" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-white/50">Games</p>
              <h2 className="text-3xl font-semibold text-slate-50">プレイアブルな自作ゲーム</h2>
            </div>
            <span className="rounded-full border border-neon/30 bg-neon/10 px-4 py-2 text-xs font-semibold text-neon">Play instantly</span>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {games.map((project) => (
              <ProjectCard key={project.id} project={project} onPlay={setActiveGame} />
            ))}
          </div>
        </section>

        <section id="web" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-white/50">Web Works</p>
              <h2 className="text-3xl font-semibold text-slate-50">AI文脈のWeb制作</h2>
            </div>
            <span className="rounded-full border border-aurora/30 bg-aurora/10 px-4 py-2 text-xs font-semibold text-aurora">UI/UX</span>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {webWorks.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        <section id="youtube" className="space-y-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-white/50">YouTube</p>
              <h2 className="text-3xl font-semibold text-slate-50">風刺スケッチ (@sketchsyakai)</h2>
              <p className="text-sm text-slate-300">社会を切り取るショートアニメーションを毎週投稿。チャンネル登録者数 12.4K。</p>
            </div>
            <a
              href="https://www.youtube.com/@sketchsyakai/shorts"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-neon/60 hover:text-neon"
            >
              <Youtube className="h-4 w-4" /> チャンネルを見る
            </a>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {youtubeVideos.map((video) => (
              <article
                key={video.id}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-glass transition hover:-translate-y-1"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img src={video.thumbnail} alt={video.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="space-y-2 p-4">
                  <h3 className="text-base font-semibold text-slate-50">{video.title}</h3>
                  <p className="text-xs text-slate-400">{video.views} · {video.published}</p>
                  <div className="overflow-hidden rounded-xl border border-white/10">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title={video.title}
                      className="h-40 w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="glass-panel grid gap-6 rounded-3xl border border-white/5 p-10 shadow-2xl lg:grid-cols-2">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.25em] text-white/50">Contact</p>
            <h2 className="text-3xl font-semibold text-slate-50">プロジェクトのご相談・コラボレーション</h2>
            <p className="text-slate-300">Web や ゲーム、動画演出まで幅広く対応可能です。お気軽にご連絡ください。</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <a
              href="mailto:hello@creative.ai"
              className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-neon/60 hover:text-neon"
            >
              <Mail className="h-4 w-4" /> hello@creative.ai
            </a>
            <a
              href="https://github.com/example"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-neon/60 hover:text-neon"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-aurora/60 hover:text-aurora"
            >
              <Twitter className="h-4 w-4" /> X (Twitter)
            </a>
            <a
              href="https://www.youtube.com/@sketchsyakai/shorts"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-aurora/60 hover:text-aurora"
            >
              <Youtube className="h-4 w-4" /> YouTube
            </a>
          </div>
        </section>
      </main>

      <GameModal open={!!activeGame} project={activeGame} onClose={() => setActiveGame(null)} />
    </div>
  );
}

export default App;
