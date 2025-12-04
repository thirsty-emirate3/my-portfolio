import { useMemo, useState } from 'react';
import { Github, Mail, Twitter, Youtube } from 'lucide-react';
import { Hero } from './components/Hero';
import { GameModal } from './components/GameModal';
import { ProjectCard } from './components/ProjectCard';
import { projects, type Project } from './data/projects';

const youtubeVideos = [
  {
    id: 'bE8SMp3bU7Y',
    title: 'リクライニング騒動',
    views: '469万回視聴',
    published: '1 週間前',
    thumbnail: 'https://img.youtube.com/vi/bE8SMp3bU7Y/hqdefault.jpg',
  },
  {
    id: 'DgTM37Pncsg',
    title: 'リクライニング騒動②',
    views: '400万回視聴',
    published: '2 週間前',
    thumbnail: 'https://img.youtube.com/vi/DgTM37Pncsg/hqdefault.jpg',
  },
  {
    id: '7IrzJPex-f0',
    title: '赤ちゃんにインタビュー',
    views: '1.5万回視聴',
    published: '3 週間前',
    thumbnail: 'https://img.youtube.com/vi/7IrzJPex-f0/hqdefault.jpg',
  },
];

const skillTags = ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Unity', 'C#', 'Figma', 'AI Prompt'];

function App() {
  const [activeGame, setActiveGame] = useState<Project | null>(null);

  const games = useMemo(() => projects.filter((p) => p.isGame), []);
  const webWorks = useMemo(() => projects.filter((p) => !p.isGame), []);
  const quickLinks = [
    { label: 'Web制作', value: `${webWorks.length}件`, desc: 'AI文脈のUI/UX / LP / Dashboard', href: '#web' },
    { label: 'ゲーム', value: `${games.length}本`, desc: 'ブラウザで遊べる自作タイトル', href: '#games' },
    { label: 'YouTube', value: '1.1万人登録者', desc: '毎週更新ショートアニメ', href: '#youtube' },
    { label: 'お問い合わせ', value: '24h以内に返信', desc: 'コラボ・案件相談歓迎', href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-amber-50 text-slate-900">
      <div className="pointer-events-none fixed inset-0 bg-grid-glow opacity-50 mix-blend-multiply" aria-hidden />
      <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-14 px-4 py-12 sm:px-6 lg:px-0 lg:py-16">
        <section className="glass-panel rounded-2xl border border-slate-200/70 p-6 shadow-xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">概要</p>
              <h2 className="text-xl font-semibold text-slate-900">須﨑陽翔のポートフォリオ</h2>
              <p className="text-sm text-slate-700">
                AI × Creative を軸に、Web とゲームの体験デザインから実装までスピーディに形にします。明るく開いたトーンで、すぐに全体像が
                つかめるポートフォリオです。
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-sm text-slate-700">
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 shadow-sm">AIプロトタイピング</span>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 shadow-sm">UI/UX 設計</span>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 shadow-sm">マイクロインタラクション</span>
            </div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex flex-col gap-1 rounded-xl border border-slate-200 bg-white/90 px-4 py-3 text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-neon/40 hover:shadow-md"
              >
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span>{item.label}</span>
                  <span className="text-sky-700">{item.value}</span>
                </div>
                <p className="text-xs text-slate-600">{item.desc}</p>
              </a>
            ))}
          </div>
        </section>

        <Hero />

        <section id="about" className="glass-panel rounded-3xl border border-slate-200/70 p-10 shadow-2xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-4">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">プロフィール</p>
              <h2 className="text-3xl font-semibold text-slate-900">AI × Creative を軸にしたフロントエンドとゲーム制作</h2>
              <p className="text-slate-700">
                ユーザー体験を起点に、デザインシステム構築からインタラクション実装までを担当。AIを活用したプロトタイピングで
                スピーディに検証しつつ、手触りの良いUIと没入感ある演出を届けます。
              </p>
              <div className="flex flex-wrap gap-2">
                {skillTags.map((skill) => (
                  <span key={skill} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 shadow-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid w-full max-w-md gap-3">
              <div className="rounded-2xl border border-slate-200 bg-white/95 p-4 text-sm text-slate-700 shadow-sm">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Focus</p>
                <p className="text-lg font-semibold text-slate-900">マイクロインタラクション / モーションデザイン</p>
                <p className="text-sm text-slate-700">Framer Motion と GLSL を組み合わせ、AIの知性を感じさせる動きをデザイン。</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/95 p-4 text-sm text-slate-700 shadow-sm">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Value</p>
                <p className="text-lg font-semibold text-slate-900">AI活用DX</p>
                <p className="text-sm text-slate-700">プロンプト設計から自動化まで、一連の開発フローを効率化する仕組みづくりが得意です。</p>
              </div>
            </div>
          </div>
        </section>

        <section id="games" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">ゲーム</p>
              <h2 className="text-3xl font-semibold text-slate-900">プレイアブルな自作ゲーム</h2>
            </div>
            <span className="rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-xs font-semibold text-sky-700">ブラウザですぐ遊べる</span>
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
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Web</p>
              <h2 className="text-3xl font-semibold text-slate-900">AI文脈のWeb制作</h2>
            </div>
            <span className="rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-xs font-semibold text-purple-700">UI/UX 作品</span>
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
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">YouTube</p>
              <h2 className="text-3xl font-semibold text-slate-900">風刺スケッチ (@sketchsyakai)</h2>
              <p className="text-sm text-slate-700">社会を切り取るショートアニメーションを毎週投稿。チャンネル登録者数 1.1万人。</p>
            </div>
            <a
              href="https://www.youtube.com/@sketchsyakai/shorts"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-neon/60 hover:text-sky-600"
            >
              <Youtube className="h-4 w-4" /> チャンネルを見る
            </a>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {youtubeVideos.map((video) => (
              <article
                key={video.id}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition hover:-translate-y-1"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img src={video.thumbnail} alt={video.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                </div>
                <div className="space-y-2 p-4">
                  <h3 className="text-base font-semibold text-slate-900">{video.title}</h3>
                  <p className="text-xs text-slate-600">{video.views} · {video.published}</p>
                  <div className="overflow-hidden rounded-xl border border-slate-200">
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

        <section id="contact" className="glass-panel grid gap-6 rounded-3xl border border-slate-200/70 p-10 shadow-2xl lg:grid-cols-2">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">お問い合わせ</p>
            <h2 className="text-3xl font-semibold text-slate-900">プロジェクトのご相談・コラボレーション</h2>
            <p className="text-slate-700">Web や ゲーム、動画演出まで幅広く対応可能です。お気軽にご連絡ください。</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <a
              href="mailto:hello@creative.ai"
              className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-neon/60 hover:text-sky-600"
            >
              <Mail className="h-4 w-4" /> hello@creative.ai
            </a>
            <a
              href="https://github.com/example"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-neon/60 hover:text-sky-600"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-purple-300 hover:text-purple-700"
            >
              <Twitter className="h-4 w-4" /> X (Twitter)
            </a>
            <a
              href="https://www.youtube.com/@sketchsyakai/shorts"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-purple-300 hover:text-purple-700"
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
