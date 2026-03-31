import { useEffect, useRef } from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { heroSlides } from './components/HeroVisual';

const WARPSPACE_INDEX = 2;
const WARPSPACE_DRIVE_PREVIEW_SRC =
  'https://drive.google.com/file/d/1ugiJLhNrvW9hsoyBJlDYzpk0Ac5oINtb/preview';
const WARPSPACE_SITE = 'https://warpspace.jp/';

export const WarpspacePage = () => {
  const slide = heroSlides[WARPSPACE_INDEX];
  const pastRailRef = useRef<HTMLDivElement | null>(null);
  const lastUserActionAtRef = useRef<number>(0);

  useEffect(() => {
    const el = pastRailRef.current;
    if (!el) return;

    const getStep = () => {
      const first = el.querySelector<HTMLElement>('[data-slide="1"]');
      if (!first) return 360;
      const style = window.getComputedStyle(el);
      const gapRaw = style.gap || (style as unknown as { columnGap?: string }).columnGap || '0px';
      const gap = Number.parseFloat(gapRaw) || 0;
      return first.getBoundingClientRect().width + gap;
    };

    // Slow auto-slide (still user-scrollable). Pause briefly after user input.
    const timer = window.setInterval(() => {
      if (Date.now() - lastUserActionAtRef.current < 5000) return;
      const step = getStep();
      const nextLeft = el.scrollLeft + step;
      const maxLeft = el.scrollWidth - el.clientWidth - 4;

      if (nextLeft >= maxLeft) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollTo({ left: nextLeft, behavior: 'smooth' });
      }
    }, 8500);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-[0_12px_40px_-28px_rgba(15,23,42,0.55)] hover:bg-slate-50 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            戻る
          </a>
          <div className="text-sm font-semibold text-slate-600">Warpspace</div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-10">
        <section className="space-y-6">
          <div className="relative overflow-hidden rounded-[38px] bg-white shadow-[0_44px_140px_-68px_rgba(15,23,42,0.45)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(251,191,36,0.26),transparent_42%),radial-gradient(circle_at_74%_26%,rgba(239,68,68,0.16),transparent_44%),radial-gradient(circle_at_82%_72%,rgba(59,130,246,0.18),transparent_44%)] ws-aurora" />
            <div className="absolute inset-0 opacity-35 bg-[radial-gradient(rgba(15,23,42,0.16)_1px,transparent_1px)] [background-size:18px_18px]" />
            <div className="absolute inset-0 opacity-35 bg-[linear-gradient(90deg,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(0deg,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-6 top-8 select-none text-[86px] sm:text-[140px] font-extrabold italic tracking-[0.18em] text-transparent [-webkit-text-stroke:1px_rgba(15,23,42,0.18)] opacity-70"
            >
              WARP
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 bottom-2 select-none text-[72px] sm:text-[120px] font-extrabold italic tracking-[0.2em] text-transparent [-webkit-text-stroke:1px_rgba(15,23,42,0.14)] opacity-70"
            >
              SPACE
            </div>

            <div className="relative grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-extrabold tracking-[0.25em] text-white">
                    COMPANY SPOTLIGHT
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  </span>
                  <span className="rounded-full bg-white/80 px-4 py-2 text-xs font-extrabold tracking-[0.25em] text-slate-700 shadow-[0_12px_40px_-28px_rgba(15,23,42,0.55)]">
                    2024 - 現在
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-end gap-4">
                    <div className="text-5xl sm:text-7xl leading-none font-extrabold italic tracking-[0.06em] text-slate-900 font-['Bebas_Neue','Inter','sans-serif']">
                      WARPSPACE
                    </div>
                    <div className="hidden sm:block h-[2px] flex-1 bg-gradient-to-r from-slate-900/70 via-slate-900/10 to-transparent" />
                  </div>
                 
                  <p className="text-sm sm:text-base font-bold text-slate-700 line-clamp-3">
                    {slide?.detail ?? 'アプリから基盤まで幅広く開発し、現在は衛星Webアプリの開発を担当。'}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {[
                    '新言語Mojo',
                    '通信高速化',
                    'FPGA',
                    '宇宙放射線調査',
                    '衛星Webアプリ',
                  ].map((label) => (
                    <span
                      key={label}
                      className="rounded-full bg-white/85 px-3 py-1 text-sm font-extrabold text-slate-700 shadow-[0_12px_24px_-18px_rgba(15,23,42,0.4)]"
                    >
                      {label}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href={WARPSPACE_SITE}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-slate-900 to-slate-800 px-5 py-2.5 text-sm font-extrabold text-white shadow-[0_18px_50px_-26px_rgba(15,23,42,0.7)] hover:from-slate-800 hover:to-slate-700"
                  >
                    企業サイトを見る <ExternalLink className="h-4 w-4" />
                  </a>
                  <div className="rounded-full bg-white/85 px-4 py-2.5 text-sm font-extrabold text-slate-800 shadow-[0_12px_40px_-28px_rgba(15,23,42,0.55)]">
                    {slide?.title ?? '長期インターン（エンジニア）'}
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-white/70 blur-3xl" />
                <div className="rounded-[30px] bg-white/90 shadow-[0_28px_70px_-40px_rgba(15,23,42,0.5)] overflow-hidden">
                  <div className="aspect-[16/10] bg-white flex items-center justify-center p-8">
                    <img
                      src="/warpspace.png"
                      alt="Warpspace"
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[34px] bg-white shadow-[0_36px_110px_-60px_rgba(15,23,42,0.45)]">
            <div className="bg-white px-5 py-4 sm:px-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-xs font-extrabold tracking-[0.22em] text-white">
                    現在の仕事
                    <span className="h-1.5 w-1.5 rounded-full bg-white/90" />
                  </span>
                  <div className="text-sm sm:text-base font-extrabold text-slate-800">
                    DTS / 月面可視化（3DTile構築）
                  </div>
                </div>
                <div className="text-xs font-extrabold uppercase tracking-[0.24em] text-slate-500">
                  VIDEO
                </div>
              </div>
            </div>

            <div className="relative w-full aspect-video bg-slate-100">
              <iframe
                src={WARPSPACE_DRIVE_PREVIEW_SRC}
                className="absolute inset-0 h-full w-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="DTS demo video"
              />
            </div>

            <div className="bg-white px-4 py-5 sm:px-6">
              <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-2xl bg-white p-4 sm:p-5 shadow-[0_18px_60px_-44px_rgba(15,23,42,0.35)]">
                  <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-slate-500">
                    説明
                  </p>
                  <div className="mt-3 space-y-2 text-lg sm:text-xl leading-relaxed text-slate-700 font-bold">
                    <p>
                      <span className="text-slate-900 font-extrabold">目的:</span> 衛星の位置情報・時系列データを3Dで可視化し、運用判断と検証を効率化。
                    </p>
                    <p>
                      <span className="text-slate-900 font-extrabold">担当:</span> 月面可視化のための
                      <span className="text-red-600 font-extrabold">3DTile構築</span>。
                    </p>
                    <p>
                      <span className="text-slate-900 font-extrabold">運用:</span> 衛星の<span className="text-red-600 font-extrabold">軌道修正</span>と<span className="text-red-600 font-extrabold">確認</span>。
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-white p-4 sm:p-5 shadow-[0_18px_60px_-44px_rgba(15,23,42,0.35)]">
                  <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-slate-500">
                    3DTileでやったこと
                  </p>
                  <div className="mt-3 space-y-2 text-lg sm:text-xl leading-relaxed text-slate-700 font-bold">
                    <p>
                      <span className="text-slate-900 font-extrabold">タイル分割:</span> 大容量の月面データを分割し、必要な部分だけを読み込める形に。
                    </p>
                    <p>
                      <span className="text-slate-900 font-extrabold">LOD設計:</span> ズーム/表示範囲に応じて解像度を切り替える階層構造を設計。
                    </p>
                    <p>
                      <span className="text-slate-900 font-extrabold">整合性:</span> 既存の地球描画構造と矛盾しないデータ配置/ディレクトリを設計。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[34px] bg-white shadow-[0_36px_110px_-60px_rgba(15,23,42,0.45)]">
            <div className="bg-white px-5 py-4 sm:px-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-extrabold uppercase tracking-[0.25em] text-slate-500">
                    Past Work
                  </div>
                  <div className="mt-1 text-xl sm:text-2xl font-extrabold text-slate-900">
                    これまでの仕事（横スライド）
                  </div>
                </div>
                <div className="text-xs font-extrabold tracking-[0.2em] text-slate-500">
                  横スクロール
                </div>
              </div>
            </div>

            <div
              ref={pastRailRef}
              className="no-scrollbar flex gap-3 overflow-x-auto px-4 py-4 sm:px-6 scroll-smooth snap-x snap-proximity"
              style={{ WebkitOverflowScrolling: 'touch' }}
              onWheel={() => {
                lastUserActionAtRef.current = Date.now();
              }}
              onPointerDown={() => {
                lastUserActionAtRef.current = Date.now();
              }}
              onTouchStart={() => {
                lastUserActionAtRef.current = Date.now();
              }}
            >
              <article
                data-slide="1"
                className="snap-center shrink-0 w-[88vw] max-w-[860px] rounded-[26px] bg-white shadow-[0_26px_80px_-56px_rgba(15,23,42,0.45)] p-4 sm:p-5"
              >
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    Mojoを用いた開発
                  </div>
                  <div className="text-xs font-extrabold uppercase tracking-[0.25em] text-slate-500">
                    Case
                  </div>
                </div>

                <div className="mt-3 space-y-3 text-sm sm:text-base leading-relaxed text-slate-700 font-bold">
                  <p>
                    新言語Mojoを用いた通信における誤り訂正の開発に取り組んだ。当初は、自身の実務経験が浅いことに加え、Mojoに関する情報も少なく、開発が停滞していた。しかし、この課題は自分だけでなくチーム全体にも共通していると気づいた。
                  </p>
                  <p>
                    そこで私は、チーム全体の開発効率を向上させるため、「知識を整理・共有できる開発基盤の構築」を目標に設定した。4人チームの中で、私はこの基盤構築を一貫して担当した。
                  </p>
                  <p>
                    具体的には、<span className="text-red-600 font-extrabold">生成AI</span>を活用してMojoに関する情報を収集・整理し、Wikiとして体系化した。また、開発環境と連携させることで、必要なコードを即座に生成できる仕組みを整備した。さらに、メンバー全員が自由に情報を追記できるようにし、チーム全体で知識を蓄積できるよう工夫した。
                  </p>
                  <p>
                    その結果、開発基盤が知識基盤として機能し、開発速度は導入前と比較して
                    <span className="text-red-600 font-extrabold">3倍以上</span>に向上した。この経験から、未知の課題を構造的に整理し、AIを活用して解決する重要性を学んだ。
                  </p>
                </div>
              </article>

              {[
                {
                  title: '通信高速化',
                  lead: '通信の高速化に不可欠な誤り検出・訂正技術の開発を担当し、新興言語Mojoを用いてエンコーダの高速化を達成。',
                  accent: 'from-sky-50 to-white',
                },
                {
                  title: 'FPGAを用いた開発',
                  lead: 'ソフトウェアで実装した通信処理をハードウェア（FPGA）へ組み込む部分を担当。制約や挙動に苦労しながらも試行錯誤を重ね、目標を達成。',
                  accent: 'from-emerald-50 to-white',
                },
                {
                  title: '宇宙放射線調査',
                  lead: '宇宙空間で不可欠な宇宙放射線対策について、自ら調査を志願。関連技術やリスクを調査し、知見を社内に共有してチームの理解向上に貢献。',
                  accent: 'from-rose-50 to-white',
                },
                {
                  title: 'Webアプリ開発',
                  lead: '衛星系の情報を「見える化」し、意思決定が早くなるUIに落とす。',
                  accent: 'from-violet-50 to-white',
                },
              ].map((it) => (
                <article
                  key={it.title}
                  className="snap-start shrink-0 w-[320px] sm:w-[380px] rounded-[24px] bg-white shadow-[0_22px_70px_-52px_rgba(15,23,42,0.45)] p-4 sm:p-5"
                >
                  <div className={`rounded-2xl bg-gradient-to-b ${it.accent} p-4 sm:p-5 h-full`}>
                    <div className="text-xl sm:text-2xl font-extrabold text-slate-900">
                      {it.title}
                    </div>
                    <div className="mt-2 text-base sm:text-lg font-bold leading-relaxed text-slate-700">
                      {it.lead}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
