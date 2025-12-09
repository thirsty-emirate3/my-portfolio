
import { useMemo, useState } from 'react';
import { Github, Mail, Youtube, ChevronDown, ChevronUp } from 'lucide-react';
import { Hero } from './components/Hero';
import { GameModal } from './components/GameModal';
import { ProjectCard } from './components/ProjectCard';
import { ProjectModal } from './components/ProjectModal';
import { TechStack } from './components/TechStack';
import { AchievementProvider } from './context/AchievementContext';
import { AchievementNotification } from './components/common/AchievementNotification';
import { projects, type Project } from './data/projects';

const youtubeVideos = [
  {
    id: 'bE8SMp3bU7Y',
    title: '人気動画①',
    views: '500万回再生',
    thumbnail: 'https://img.youtube.com/vi/bE8SMp3bU7Y/hqdefault.jpg',
  },
  {
    id: 'DgTM37Pncsg',
    title: '人気動画②',
    views: '380万回再生',
    thumbnail: 'https://img.youtube.com/vi/DgTM37Pncsg/hqdefault.jpg',
  },
  {
    id: '7IrzJPex-f0',
    title: '人気動画③',
    views: '200万回再生',
    thumbnail: 'https://img.youtube.com/vi/7IrzJPex-f0/hqdefault.jpg',
  },
];

function App() {
  const [activeGame, setActiveGame] = useState<Project | null>(null);
  const [showAllGames, setShowAllGames] = useState(false);
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

  const displayedGames = showAllGames ? games : games.slice(0, 6);
  const displayedAlgorithms = showAllAlgorithms ? filteredAlgorithms : filteredAlgorithms.slice(0, 6);


  return (
    <AchievementProvider>
      <div className="min-h-screen bg-[#fdfbf7] text-slate-800 selection:bg-orange-100 selection:text-orange-900 bg-noise">
        <AchievementNotification />

        {/* Floating Navigation (Wide) */}
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none">
          <nav className="pointer-events-auto flex flex-nowrap items-center justify-between w-full max-w-4xl px-4 sm:px-6 py-3 rounded-2xl border border-black/5 bg-white/80 shadow-sm shadow-black/5 backdrop-blur-md ring-1 ring-white/50 gap-4 overflow-hidden">
            <a href="/" className="text-sm sm:text-lg font-bold tracking-tight text-slate-900 hover:opacity-70 transition-opacity whitespace-nowrap shrink-0">
              Haruto Suzaki portfolio
            </a>

            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar mask-linear-fade">
              <a href="#games" className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-slate-600 rounded-lg hover:bg-black/5 hover:text-slate-900 transition-all whitespace-nowrap">Games</a>
              <a href="#algorithms" className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-slate-600 rounded-lg hover:bg-black/5 hover:text-slate-900 transition-all whitespace-nowrap">アルゴリズム</a>
              <a href="#web" className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-slate-600 rounded-lg hover:bg-black/5 hover:text-slate-900 transition-all whitespace-nowrap">Web Projects</a>
              <a href="#contact" className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-slate-600 rounded-lg hover:bg-black/5 hover:text-slate-900 transition-all whitespace-nowrap">Contact</a>
            </div>
          </nav>
        </div>

        <main className="relative z-10 mx-auto flex max-w-7xl flex-col gap-16 px-6 py-24 lg:px-12">

          <Hero />

          <TechStack />

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
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {displayedGames.map((project, index) => (
                <div key={project.id} className={(!showAllGames && index >= 4) ? 'hidden sm:block' : ''}>
                  <ProjectCard project={project} onSelect={setActiveGame} />
                </div>
              ))}
            </div>
            {(games.length > 6) && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => setShowAllGames(!showAllGames)}
                  className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
                >
                  {showAllGames ? (
                    <>
                      Show Less <ChevronUp className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      View All ({games.length}) <ChevronDown className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            )}
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

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 min-h-[300px]">
              {displayedAlgorithms.map((project, index) => (
                <div key={project.id} className={(!showAllAlgorithms && index >= 4) ? 'hidden sm:block' : ''}>
                  <ProjectCard project={project} onSelect={setActiveGame} />
                </div>
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
                <p className="text-xs uppercase tracking-[0.25em] text-red-600/80 font-bold">YouTube</p>
                <h2 className="text-3xl font-semibold text-slate-900">風刺スケッチ</h2>
                <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                  説明は日常のちょっとおかしい瞬間を切り取る社会風刺ショートチャンネル
                </p>
              </div>
              <a
                href="https://www.youtube.com/@sketchsyakai/videos"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-red-50 hover:text-red-600 hover:border-red-200 shadow-sm"
              >
                <Youtube className="h-5 w-5 text-red-600" /> チャンネルを見る
              </a>
            </div>
            <div className="flex overflow-x-auto gap-4 pb-4 snap-x no-scrollbar md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
              {youtubeVideos.map((video) => (
                <article
                  key={video.id}
                  className="min-w-[85vw] sm:min-w-[350px] md:min-w-0 snap-center group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl hover:shadow-red-900/5 hover:border-red-100"
                >
                  <div className="relative aspect-video overflow-hidden bg-slate-100">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600/90 text-white shadow-lg backdrop-blur-sm">
                        <Youtube className="h-6 w-6 fill-current" />
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="line-clamp-2 text-lg font-bold text-slate-900 group-hover:text-red-700 transition-colors">
                      {video.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-500 flex items-center gap-1">
                      <span>{video.views}</span>
                    </p>

                    {/* Embedded Player (Hidden by default or shown?) 
                        User had it shown. Let's keep it clean but maybe just show thumbnail 
                        as the 'card' usually links to video. 
                        The previous code had an iframe INSIDE the card. 
                        That's a bit heavy for a list. Let's stick to the visual link 
                        unless the user *really* wants inline playback. 
                        Actually, the previous code had a thumbnail AND an iframe below it?
                        "relative aspect-video ... img ... absolute ... bg-gradient ..."
                        AND then "iframe" below? 
                        Looking at lines 204-211 (IMG) and 217-225 (IFRAME).
                        That's redundant. I will simplify to just a clickable card associated with the styling.
                        Wait, typically users want to click to watch. 
                        I will make the whole card a link to the video, or keep the iframe but make it cleaner.
                        Let's keep the iframe but styled better if that's what was there, 
                        BUT having 3 iframes on a page is heavy.
                        I'll replace the iframe with a clean visual link to the YouTube video for better performance and style.
                     */}
                    <a
                      href={`https://www.youtube.com/watch?v=${video.id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 block w-full rounded-lg bg-slate-50 px-4 py-2 text-center text-sm font-semibold text-slate-600 transition hover:bg-red-600 hover:text-white"
                    >
                      Watch Video
                    </a>
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
      </div>
    </AchievementProvider>
  );
}

export default App;
