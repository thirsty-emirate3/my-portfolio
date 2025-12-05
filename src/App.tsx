import { useMemo, useState } from 'react';
import { Github, Mail, Twitter, Youtube } from 'lucide-react';
import { Hero } from './components/Hero';
import { GameModal } from './components/GameModal';
import { ProjectCard } from './components/ProjectCard';
import { ProjectModal } from './components/ProjectModal';
import { projects, type Project } from './data/projects';

const youtubeVideos = [
  {
    id: 'bE8SMp3bU7Y',
    title: '最新動画 #01',
    views: '風刺スケッチ',
    published: 'YouTube 更新',
    thumbnail: 'https://img.youtube.com/vi/bE8SMp3bU7Y/hqdefault.jpg',
  },
  {
    id: 'DgTM37Pncsg',
    title: '最新動画 #02',
    views: '風刺スケッチ',
    published: 'YouTube 更新',
    thumbnail: 'https://img.youtube.com/vi/DgTM37Pncsg/hqdefault.jpg',
  },
  {
    id: '7IrzJPex-f0',
    title: '最新動画 #03',
    views: '風刺スケッチ',
    published: 'YouTube 更新',
    thumbnail: 'https://img.youtube.com/vi/7IrzJPex-f0/hqdefault.jpg',
  },
];

function App() {
  const [activeGame, setActiveGame] = useState<Project | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const games = useMemo(() => projects.filter((p) => p.isGame), []);
  const webWorks = useMemo(() => projects.filter((p) => !p.isGame), []);
  const quickLinks = [
    { label: 'Webプロダクト', value: `${webWorks.length}件`, desc: 'Next.js / Docker / GenAI UI', href: '#web' },
    { label: 'Mini Games', value: `${games.length}本`, desc: 'Unity / WebGL プレイアブル', href: '#games' },
    { label: 'YouTube', value: '風刺スケッチ', desc: '最新技術や開発ログ', href: '#youtube' },
    { label: 'お問い合わせ', value: '24h以内に返信', desc: 'AI PoC・共同研究歓迎', href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-orange-50/40 to-amber-100/50 text-slate-900">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(249,115,22,0.12),transparent_40%),radial-gradient(circle_at_82%_8%,rgba(251,146,60,0.12),transparent_30%),linear-gradient(120deg,rgba(255,237,213,0.4),transparent)]" aria-hidden />
      <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-14 px-4 py-12 sm:px-6 lg:px-0 lg:py-16">
        <section className="rounded-2xl border border-orange-200/70 bg-white/90 p-6 shadow-[0_16px_50px_rgba(255,159,64,0.18)] backdrop-blur">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.25em] text-orange-700/80">Overview</p>
              <h2 className="text-xl font-semibold text-slate-900">Haruto Suzaki (須﨑 陽翔)</h2>
              <p className="text-sm leading-relaxed text-slate-700">
                筑波大学大学院 知能機能システム学位プログラム所属。Sora 2 を軸に、生成AIとモーションを掛け合わせた没入型 UI / 体験を設計・実装しています。
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-sm text-orange-800">
              <span className="rounded-full border border-orange-200 bg-white px-3 py-1 shadow-sm">Sora 2</span>
              <span className="rounded-full border border-orange-200 bg-white px-3 py-1 shadow-sm">Generative AI</span>
              <span className="rounded-full border border-orange-200 bg-white px-3 py-1 shadow-sm">Cinematic UI</span>
            </div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex flex-col gap-1 rounded-xl border border-orange-200/70 bg-white px-4 py-3 text-slate-800 shadow-sm shadow-orange-200/40 transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-orange-200/60"
              >
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span>{item.label}</span>
                  <span className="text-orange-600">{item.value}</span>
                </div>
                <p className="text-xs text-orange-700/80">{item.desc}</p>
              </a>
            ))}
          </div>
        </section>

        <Hero />

        <section id="games" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-orange-700/80">Games</p>
              <h2 className="text-3xl font-semibold text-slate-900">Unity / WebGL 自作ミニゲーム</h2>
            </div>
            <span className="rounded-full border border-orange-200 bg-white px-4 py-2 text-xs font-semibold text-orange-700">
              制作中 / 試遊可の順で追加中
            </span>
          </div>
          <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
            <aside className="rounded-2xl border border-orange-200 bg-white/90 p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between text-sm font-semibold text-orange-700">
                <span>Mini Game List</span>
                <span className="rounded-full bg-orange-100 px-2 py-1 text-[11px] text-orange-700">{games.length}本</span>
              </div>
              <div className="max-h-[420px] space-y-2 overflow-y-auto pr-1">
                {games.map((game) => (
                  <button
                    key={game.id}
                    onClick={() => setActiveProject(game)}
                    className="w-full rounded-xl border border-orange-100 bg-white px-3 py-2 text-left text-sm text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-orange-200/60"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="line-clamp-1 font-semibold">{game.title}</span>
                      <span className="text-[11px] text-orange-600">Open</span>
                    </div>
                    <p className="line-clamp-2 text-[12px] text-slate-600">{game.description}</p>
                  </button>
                ))}
              </div>
            </aside>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
              {games.map((project) => (
                <ProjectCard key={project.id} project={project} onPlay={setActiveGame} onSelect={setActiveProject} />
              ))}
            </div>
          </div>
        </section>

        <section id="web" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-orange-700/80">Web</p>
              <h2 className="text-3xl font-semibold text-slate-900">生成AI文脈の Web / プロトタイプ</h2>
            </div>
            <span className="rounded-full border border-orange-200 bg-white px-4 py-2 text-xs font-semibold text-orange-700">
              Next.js / Docker / GenAI
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {webWorks.map((project) => (
              <ProjectCard key={project.id} project={project} onSelect={setActiveProject} />
            ))}
          </div>
        </section>

        <section id="youtube" className="space-y-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-orange-700/80">YouTube</p>
              <h2 className="text-3xl font-semibold text-slate-900">風刺スケッチ</h2>
              <p className="text-sm text-slate-700">最新技術や開発ログを発信。Sora 2 の実験過程や実装 Tips をまとめています。</p>
            </div>
            <a
              href="https://www.youtube.com/@sketchsyakai/videos"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-orange-700 transition hover:-translate-y-0.5 hover:border-orange-300 hover:text-orange-800"
            >
              <Youtube className="h-4 w-4" /> チャンネルを見る
            </a>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {youtubeVideos.map((video) => (
              <article
                key={video.id}
                className="group overflow-hidden rounded-2xl border border-orange-200/70 bg-white shadow-[0_14px_45px_rgba(255,159,64,0.2)] transition hover:-translate-y-1"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/20 to-transparent" />
                </div>
                <div className="space-y-2 p-4">
                  <h3 className="text-base font-semibold text-slate-900">{video.title}</h3>
                  <p className="text-xs text-orange-700/80">
                    {video.views} · {video.published}
                  </p>
                  <div className="overflow-hidden rounded-xl border border-orange-200/70 bg-slate-900/5">
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

        <section id="contact" className="grid gap-6 rounded-3xl border border-orange-200/70 bg-white/95 p-10 shadow-[0_18px_60px_rgba(255,159,64,0.15)] backdrop-blur lg:grid-cols-2">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.25em] text-orange-700/80">お問い合わせ</p>
            <h2 className="text-3xl font-semibold text-slate-900">AI プロジェクトのご相談・コラボレーション</h2>
            <p className="text-slate-700">
              生成AIを絡めた Web / 動画演出 / プロトタイピングまで幅広く対応します。技術検証や共同研究のご相談もお気軽にどうぞ。
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <a
              href="mailto:hello@harutosuzaki.dev"
              className="inline-flex items-center gap-3 rounded-2xl border border-orange-200 bg-white px-4 py-3 text-sm font-semibold text-orange-700 transition hover:-translate-y-0.5 hover:border-orange-300 hover:text-orange-800"
            >
              <Mail className="h-4 w-4" /> hello@harutosuzaki.dev
            </a>
            <a
              href="https://github.com/example"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-2xl border border-orange-200 bg-white px-4 py-3 text-sm font-semibold text-orange-700 transition hover:-translate-y-0.5 hover:border-orange-300 hover:text-orange-800"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-2xl border border-orange-200 bg-white px-4 py-3 text-sm font-semibold text-orange-700 transition hover:-translate-y-0.5 hover:border-orange-300 hover:text-orange-800"
            >
              <Twitter className="h-4 w-4" /> X (Twitter)
            </a>
            <a
              href="https://www.youtube.com/@sketchsyakai/videos"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-2xl border border-orange-200 bg-white px-4 py-3 text-sm font-semibold text-orange-700 transition hover:-translate-y-0.5 hover:border-orange-300 hover:text-orange-800"
            >
              <Youtube className="h-4 w-4" /> YouTube
            </a>
          </div>
        </section>
      </main>

      <GameModal open={!!activeGame} project={activeGame} onClose={() => setActiveGame(null)} />
      <ProjectModal open={!!activeProject} project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  );
}

export default App;
