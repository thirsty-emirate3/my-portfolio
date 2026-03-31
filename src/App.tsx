
import { useMemo, useState, useEffect, useRef } from 'react';
import { Github, Mail, Youtube, ChevronDown, ChevronUp } from 'lucide-react';
import { Hero } from './components/Hero';
import { HeroStories } from './components/HeroStories';
import { GameModal } from './components/GameModal';
import { ProjectCard } from './components/ProjectCard';
import { ProjectModal } from './components/ProjectModal';
import { TechStack } from './components/TechStack';
import { AchievementProvider } from './context/AchievementContext';
import { AchievementNotification } from './components/common/AchievementNotification';
import { projects, type Project } from './data/projects';
import { PatternPage } from './PatternPage';
import { WarpspacePage } from './WarpspacePage';

type AlgoTab = 'All' | 'Graph' | 'Simulation' | 'Logic';

const ALGO_CATEGORIES: Record<Exclude<AlgoTab, 'All'>, number[]> = {
  Graph: [11, 21, 15, 24], // Dijkstra, A*, Maze, TSP
  Simulation: [12, 13, 25, 26, 27], // Life, Tree, Fourier, Cloth, Boids
  Logic: [6, 14, 20, 22, 23], // Sort, BST, Merge, Queens, Hanoi
};

const useAutoScroll = (
  ref: React.RefObject<HTMLDivElement>,
  enabled: boolean,
  deps: ReadonlyArray<unknown> = [],
) => {
  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    const id = window.setInterval(() => {
      const max = el.scrollWidth - el.clientWidth;
      const next = el.scrollLeft + el.clientWidth * 0.6;
      el.scrollTo({ left: next >= max ? 0 : next, behavior: 'smooth' });
    }, 4500);
    return () => window.clearInterval(id);
  }, [ref, enabled, ...deps]);
};

const youtubeVideos = [
  {
    id: 'bE8SMp3bU7Y',
    title: '人気動画①',
    views: '1000万回再生',
    thumbnail: 'https://img.youtube.com/vi/bE8SMp3bU7Y/hqdefault.jpg',
  },
  {
    id: 'DgTM37Pncsg',
    title: '人気動画②',
    views: '700万回再生',
    thumbnail: 'https://img.youtube.com/vi/DgTM37Pncsg/hqdefault.jpg',
  },
  {
    id: '7IrzJPex-f0',
    title: '人気動画③',
    views: '400万回再生',
    thumbnail: 'https://img.youtube.com/vi/7IrzJPex-f0/hqdefault.jpg',
  },
];

function App() {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  const isPatternMode = pathname.startsWith('/patterns');
  const isWarpspaceMode = pathname.startsWith('/warpspace');

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  const [activeGame, setActiveGame] = useState<Project | null>(null);
  const [showAllGames, setShowAllGames] = useState(false);
  const [showAllAlgorithms, setShowAllAlgorithms] = useState(false);
  const [algoTab, setAlgoTab] = useState<AlgoTab>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const gamesRef = useRef<HTMLDivElement | null>(null);
  const algosRef = useRef<HTMLDivElement | null>(null);
  const webRef = useRef<HTMLDivElement | null>(null);

  const games = useMemo(() => projects.filter((p) => p.category === 'Game'), []);
  const algorithms = useMemo(() => projects.filter((p) => p.category === 'Algorithm'), []);
  const webWorks = useMemo(() => projects.filter((p) => p.category === 'Project' || (!p.category && !p.isGame)), []);

  const filteredAlgorithms = useMemo(() => {
    if (algoTab === 'All') return algorithms;
    const targetIds = ALGO_CATEGORIES[algoTab] || [];
    return algorithms.filter((p) => targetIds.includes(p.id));
  }, [algoTab, algorithms]);

  const displayedGames = showAllGames ? games : games.slice(0, 6);
  const displayedAlgorithms = showAllAlgorithms ? filteredAlgorithms : filteredAlgorithms.slice(0, 6);

  useAutoScroll(gamesRef, !showAllGames, [displayedGames.length]);
  useAutoScroll(algosRef, !showAllAlgorithms, [displayedAlgorithms.length, algoTab]);
  useAutoScroll(webRef, false, [webWorks.length]); // Webは手動のみ

  if (isPatternMode) return <PatternPage />;
  if (isWarpspaceMode) return <WarpspacePage />;


  return (
    <AchievementProvider>
      <div className="min-h-screen bg-white text-slate-800 selection:bg-orange-100 selection:text-orange-900">

        {/* Splash Loader */}
        {isLoading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-4">
              <img src="/src/assets/sitelogo.png" alt="Suzaki STUDIO" className="h-14 sm:h-16 w-auto object-contain animate-pulse" />
              <div className="h-1.5 w-28 rounded-full bg-slate-200 overflow-hidden">
                <div className="h-full w-1/3 rounded-full bg-red-500 animate-[loadingBar_1s_ease-in-out_infinite]" />
              </div>
            </div>
          </div>
        )}
        <AchievementNotification />

        {/* Floating Navigation (Wide) */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <nav className="flex items-center w-full px-4 sm:px-8 lg:px-12 py-4 border-b border-slate-200 bg-[#f5f5f5]/95 backdrop-blur">
            <div className="shrink-0">
              <a href="/" className="block">
                <img
                  src="/src/assets/sitelogo.png"
                  alt="Suzaki STUDIO"
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </a>
            </div>

            <div className="flex-1 flex items-center justify-center gap-6 sm:gap-10 overflow-x-auto no-scrollbar">
              {[
                { href: '#vision', label: '自身の夢' },
                { href: '#wanted', label: 'やりたい仕事' },
                { href: '#episodes', label: '主なエピソード' },
                { href: '#games', label: '自作ゲーム' },
                { href: '#algorithms', label: 'アルゴリズム' },
                { href: '#web', label: 'Webアプリ' },
                { href: '#contact', label: 'お問い合わせ' },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors whitespace-nowrap"
                  style={{ fontFamily: "'Inter', 'Noto Sans JP', sans-serif" }}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="hidden sm:flex items-center gap-2 sm:gap-3">
              <a
                href="mailto:s2520778@u.tsukuba.ac.jp"
                className="flex items-center justify-center rounded-full bg-slate-900 text-white h-9 w-9 hover:bg-slate-800 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/thirsty-emirate3"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center rounded-full bg-slate-900 text-white h-9 w-9 hover:bg-slate-800 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <span
                className="flex items-center justify-center rounded-full bg-red-600 text-white h-9 w-9 shadow-sm"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </span>
            </div>
          </nav>
        </div>

        <main className="relative z-10 mx-auto flex max-w-7xl flex-col gap-16 px-6 py-24 lg:px-12">

          <Hero />

          <HeroStories />

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
            {showAllGames ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {displayedGames.map((project) => (
                  <ProjectCard key={project.id} project={project} onSelect={setActiveGame} />
                ))}
              </div>
            ) : (
              <div ref={gamesRef} className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                {displayedGames.map((project) => (
                  <div key={project.id} className="min-w-[200px] sm:min-w-[220px]">
                    <ProjectCard project={project} onSelect={setActiveGame} />
                  </div>
                ))}
              </div>
            )}
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

            {showAllAlgorithms ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 min-h-[300px]">
                {displayedAlgorithms.map((project) => (
                  <ProjectCard key={project.id} project={project} onSelect={setActiveGame} />
                ))}
              </div>
            ) : (
              <div ref={algosRef} className="flex gap-4 overflow-x-auto no-scrollbar pb-2 min-h-[260px]">
                {displayedAlgorithms.map((project) => (
                  <div key={project.id} className="min-w-[200px] sm:min-w-[220px]">
                    <ProjectCard project={project} onSelect={setActiveGame} />
                  </div>
                ))}
              </div>
            )}

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
            {showAllAlgorithms ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {webWorks.map((project) => (
                  <ProjectCard key={project.id} project={project} onSelect={setActiveProject} />
                ))}
              </div>
            ) : (
              <div ref={webRef} className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                {webWorks.map((project) => (
                  <div key={project.id} className="min-w-[200px] sm:min-w-[220px]">
                    <ProjectCard project={project} onSelect={setActiveProject} />
                  </div>
                ))}
              </div>
            )}
          </section>

          <section id="youtube" className="space-y-6">
            <div className="space-y-2">
              <div className="w-full max-w-none">
                <p className="text-xs uppercase tracking-[0.25em] text-red-600/80 font-bold">YouTube</p>
                <h2 className="text-3xl font-semibold text-slate-900">チャンネル実績</h2>
                <p className="mt-1 w-full max-w-none text-base sm:text-lg leading-relaxed text-slate-700">
                  生成AIを活用し、日常のちょっとおかしい瞬間を切り取る社会風刺ショートを制作しています。
                </p>
                <p className="mt-3 w-full max-w-none text-base sm:text-xl leading-relaxed text-slate-700">
                  このチャンネルは3ヶ月で登録者数1.8万人を突破。
                  <span className="font-bold text-red-600">徹底した「見る手側の視点」</span>によって、
                  継続的な視聴維持とチャンネル成長を実現しました。
                </p>
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <article className="h-full rounded-2xl border border-red-100 bg-gradient-to-br from-red-50 to-white p-5 sm:p-6 flex flex-col">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">ターゲット層</p>
                <p className="mt-2 text-2xl font-extrabold text-slate-900">60代以上</p>
                <p className="mt-4 text-lg sm:text-xl leading-relaxed text-slate-800">見やすいテンポと分かりやすいテーマ設計で、安心して視聴できる動画体験を重視。</p>
                <p className="mt-auto rounded-xl border border-red-200/70 bg-white/80 px-4 py-3 text-base sm:text-lg font-semibold leading-relaxed text-slate-700">理由: 現在、YouTube視聴層の<span className="font-bold text-red-600">半数以上が高齢者</span>であるため。</p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">動画内容</p>
                <ul className="mt-2 space-y-2 text-base text-slate-800">
                  <li className="rounded-lg bg-slate-50 px-3 py-2.5">生成AIを用いた社会風刺動画</li>
                  <li className="rounded-lg bg-slate-50 px-3 py-2.5">昭和では当たり前だったこと</li>
                  <li className="rounded-lg bg-slate-50 px-3 py-2.5">生きる上での豆知識</li>
                </ul>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">などなど、<span className="font-bold text-red-600">視聴者の共感や会話</span>が生まれるテーマを幅広く扱っています。</p>
              </article>
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
                      className="h-full w-full object-cover blur-md transition duration-700 group-hover:scale-105"
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
                    <h3 className="line-clamp-2 text-lg font-bold text-slate-900 blur-[3px] select-none group-hover:text-red-700 transition-colors">
                      {video.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-500 flex items-center gap-1">
                      <span>{video.views}</span>
                    </p>
                    <div className="mt-4 block w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-center text-sm font-semibold text-slate-500">
                      動画リンクは非表示
                    </div>
                  </div >
                </article >
              ))}
            </div >
          </section >

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
        </main >

        <GameModal open={!!activeGame} project={activeGame} onClose={() => setActiveGame(null)} />
        <ProjectModal open={!!activeProject} project={activeProject} onClose={() => setActiveProject(null)} />
      </div >
    </AchievementProvider >
  );
}

export default App;
