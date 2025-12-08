import { useMemo, useState } from 'react';
import { Github, Mail, Youtube, ChevronDown, ChevronUp } from 'lucide-react';
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeGame, setActiveGame] = useState<Project | null>(null);
  const [showAllAlgorithms, setShowAllAlgorithms] = useState(false);
  const [algoTab, setAlgoTab] = useState<'All' | 'Graph' | 'Simulation' | 'Logic'>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const games = useMemo(() => projects.filter((p) => p.category === 'Game'), []);
  const algorithms = useMemo(() => projects.filter((p) => p.category === 'Algorithm'), []);
  const webWorks = useMemo(() => projects.filter((p) => p.category === 'Project' || (!p.category && !p.isGame)), []);

  const algoCategories = {
    'Graph': [11, 21, 15, 24], // Dijkstra, A*, Maze, TSP
    'Simulation': [12, 13, 25, 26, 27], // Life, Tree, Fourier, Cloth, Boids
    'Logic': [6, 14, 20, 22, 23] // Sort, BST, Merge, Queens, Hanoi
  };

  const filteredAlgorithms = useMemo(() => {
    if (algoTab === 'All') return algorithms;
    // @ts-ignore
    const targetIds = algoCategories[algoTab] || [];
    return algorithms.filter(p => targetIds.includes(p.id));
  }, [algoTab, algorithms]);

  const displayedAlgorithms = showAllAlgorithms ? filteredAlgorithms : filteredAlgorithms.slice(0, 6);


  return (
    <div className="min-h-screen bg-[#fdfbf7] text-slate-800 selection:bg-orange-100 selection:text-orange-900 bg-noise">

      {/* Floating Navigation (Wide) */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none">
        <nav className="pointer-events-auto flex items-center justify-between w-full max-w-4xl px-6 py-3 rounded-2xl border border-black/5 bg-white/80 shadow-sm shadow-black/5 backdrop-blur-md ring-1 ring-white/50">
          <a href="/" className="text-lg font-bold tracking-tight text-slate-900 hover:opacity-70 transition-opacity">
            HS
          </a>

          <div className="flex items-center gap-1 sm:gap-2">
            <a href="#games" className="px-4 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-black/5 hover:text-slate-900 transition-all">Games</a>
            <a href="#algorithms" className="px-4 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-black/5 hover:text-slate-900 transition-all">アルゴリズム</a>
            <a href="#web" className="px-4 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-black/5 hover:text-slate-900 transition-all">Web Projects</a>
            <a href="#contact" className="px-4 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-black/5 hover:text-slate-900 transition-all">Contact</a>
          </div>
        </nav>
      </div>

      <main className="relative z-10 mx-auto flex max-w-7xl flex-col gap-16 px-6 py-24 lg:px-12">

        <Hero />

        <section id="games" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-orange-700/80">Games</p>
              <h2 className="text-3xl font-semibold text-slate-900">自作ゲーム</h2>
            </div>
            <span className="rounded-full border border-orange-200 bg-white px-4 py-2 text-xs font-semibold text-orange-700">
              制作中 / 試遊可の順で追加中
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
            {games.map((project) => (
              <ProjectCard key={project.id} project={project} onSelect={setActiveGame} />
            ))}
          </div>
        </section>
        <section id="algorithms" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-orange-700/80">Algorithms</p>
              <h2 className="text-3xl font-semibold text-slate-900">アルゴリズム</h2>
            </div>

            {/* Category Tabs */}
            <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 no-scrollbar">
              {(['All', 'Graph', 'Simulation', 'Logic'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setAlgoTab(tab);
                    setShowAllAlgorithms(false); // Reset expansion when switching tabs
                  }}
                  className={`
                            px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all
                            ${algoTab === tab
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }
                        `}
                >
                  {tab === 'All' ? 'すべて' :
                    tab === 'Graph' ? '迷路・ルート' :
                      tab === 'Simulation' ? 'アート・シミュ' : 'パズル・整列'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4 min-h-[300px]">
            {displayedAlgorithms.map((project) => (
              <ProjectCard key={project.id} project={project} onSelect={setActiveGame} />
            ))}
          </div>

          {(filteredAlgorithms.length > 6) && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setShowAllAlgorithms(!showAllAlgorithms)}
                className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
              >
                {showAllAlgorithms ? (
                  <>
                    Show Less <ChevronUp className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    View All ({filteredAlgorithms.length}) <ChevronDown className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </section>

        <section id="web" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-orange-700/80">Web</p>
              <h2 className="text-3xl font-semibold text-slate-900">Webアプリ</h2>
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
              <p className="text-sm text-slate-700">登録者1.2万人。最新技術や開発ログを発信。Sora 2 の実験過程や実装 Tips をまとめています。</p>
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
              href="mailto:s2520778@u.tsukuba.ac.jp"
              className="inline-flex items-center gap-3 rounded-2xl border border-orange-200 bg-white px-4 py-3 text-sm font-semibold text-orange-700 transition hover:-translate-y-0.5 hover:border-orange-300 hover:text-orange-800"
            >
              <Mail className="h-4 w-4" /> s2520778@u.tsukuba.ac.jp
            </a>
            <a
              href="https://github.com/thirsty-emirate3"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-2xl border border-orange-200 bg-white px-4 py-3 text-sm font-semibold text-orange-700 transition hover:-translate-y-0.5 hover:border-orange-300 hover:text-orange-800"
            >
              <Github className="h-4 w-4" /> GitHub
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
    </div >
  );
}

export default App;
