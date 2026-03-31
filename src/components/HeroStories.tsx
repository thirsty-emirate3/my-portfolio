import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { heroSlides } from './HeroVisual';
import wantedWorkImg from '../assets/wantedwork.png';

export const HeroStories = () => {
  const railRef = useRef<HTMLDivElement | null>(null);
  const [opened, setOpened] = useState<number | null>(null);
  const [wantedTab, setWantedTab] = useState(0);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const step = () => {
      const max = rail.scrollWidth - rail.clientWidth;
      const next = rail.scrollLeft + rail.clientWidth * 0.6;
      rail.scrollTo({ left: next >= max ? 0 : next, behavior: 'smooth' });
    };

    const id = window.setInterval(step, 4500);
    return () => window.clearInterval(id);
  }, []);

  const onCardClick = (index: number) => {
    // Warpspace is a dedicated page with a big video.
    if (index === 2) {
      window.location.assign('/warpspace');
      return;
    }
    setOpened(index);
  };

  return (
    <section className="relative space-y-6">
      <div
        id="vision"
        className="rounded-3xl bg-white shadow-[0_30px_70px_-40px_rgba(15,23,42,0.30)] px-5 py-6 sm:px-8 scroll-mt-28"
      >
        <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-red-600/90">自身の夢</p>

        <h3 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight text-slate-900 max-w-none">
          <span className="lg:whitespace-nowrap">
            子供から大人まで、さまざまなニーズを持つ人々の生活に溶け込み、
          </span>
          <br />
          意識せずとも使われ続けるサービスを実現したい。
        </h3>

        <div className="mt-4 max-w-[56rem] space-y-2 text-base sm:text-lg font-bold leading-relaxed text-slate-700">
          <p>
            <span className="text-red-600 font-extrabold">技術は使われなければ価値にならない。</span>
          </p>
          <p>
            飲食店でのアルバイトで現場の負担を増やしているレジPOSを目撃し、この思いが芽生えた。
          </p>
          <p>
            そのために、
            <span className="text-slate-900 font-extrabold">技術力</span>と、
            <span className="text-slate-900 font-extrabold">使い手側・見る側に立つ視点</span>、
            そして<span className="text-slate-900 font-extrabold">マネジメント力</span>を磨いてきた。
          </p>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-4 shadow-[0_18px_50px_-44px_rgba(15,23,42,0.25)]">
            <div className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">技術力</div>
            <div className="mt-2 text-sm sm:text-base font-bold leading-relaxed text-slate-700">
              研究 / 長期インターン / 趣味開発
            </div>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 shadow-[0_18px_50px_-44px_rgba(15,23,42,0.25)]">
            <div className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">使い手視点</div>
            <div className="mt-2 text-sm sm:text-base font-bold leading-relaxed text-slate-700">
              趣味開発 / 海外インターン / YouTube活動
            </div>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 shadow-[0_18px_50px_-44px_rgba(15,23,42,0.25)]">
            <div className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">マネジメント</div>
            <div className="mt-2 text-sm sm:text-base font-bold leading-relaxed text-slate-700">
              アルバイト / 長期インターン
            </div>
          </div>
        </div>
      </div>

      <div id="wanted" className="space-y-1 scroll-mt-28">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-700/80">Wanted Work</p>
        <h2 className="text-3xl font-semibold text-slate-900">やりたい仕事</h2>
      </div>

      <div className="overflow-hidden rounded-3xl bg-white shadow-[0_34px_90px_-60px_rgba(15,23,42,0.30)]">
        <div className="relative px-5 py-7 sm:px-8 sm:py-9">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(239,68,68,0.16),transparent_46%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.12),transparent_46%)]" />
          <div className="absolute inset-0 opacity-25 bg-[linear-gradient(90deg,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(0deg,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:56px_56px]" />

          <div className="relative grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
            <div className="min-w-0">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-slate-500">
                    やりたい仕事
                  </p>
                  <h3 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                    スマートライフ事業
                  </h3>
                  <p className="mt-2 text-sm sm:text-base font-extrabold text-slate-700">
                    無意識に使われるサービスを、生活の基盤から届ける
                  </p>
                  <p className="mt-2 text-sm sm:text-base font-bold text-slate-700">
                    <span className="text-slate-900 font-extrabold">やりたい理由:</span>{' '}
                    利用側の生活に密着したところで、実際に使われるサービスを作りたいからです。
                  </p>
                </div>
                <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-slate-500">
                  Smart Life / UIUX
                </p>
              </div>

              <div className="mt-5">
                <div className="no-scrollbar flex gap-2 overflow-x-auto">
                  {['問題意識', 'やりたいこと', '具体案', 'ドコモでやる理由'].map((label, idx) => {
                    const isActive = wantedTab === idx;
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setWantedTab(idx)}
                        className={`shrink-0 rounded-full px-3.5 py-2 text-xs sm:text-sm font-extrabold tracking-[0.12em] transition-colors ${
                          isActive
                            ? 'bg-red-600 text-white'
                            : 'bg-white/80 text-slate-800 hover:bg-white'
                        } shadow-[0_14px_40px_-30px_rgba(15,23,42,0.45)]`}
                        aria-pressed={isActive}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>

                  <div className="mt-4 overflow-hidden rounded-3xl bg-white/80 shadow-[0_26px_70px_-52px_rgba(15,23,42,0.40)]">
                    <motion.div
                      animate={{ x: `-${wantedTab * 25}%` }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="flex w-[400%]"
                    >
                      <div className="w-1/4 shrink-0 px-5 py-5 sm:px-6 sm:py-6">
                        <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
                          問題意識
                        </p>
                      <p className="mt-2 text-base sm:text-lg leading-relaxed font-bold text-slate-800">
                        アプリが増えすぎて、ユーザーが「どれを使えばいいか」迷う。特に高齢者にとっては、この複雑さが
                        <span className="text-red-600 font-extrabold">サービス利用の障壁</span>になっている。
                      </p>
                    </div>

                      <div className="w-1/4 shrink-0 px-5 py-5 sm:px-6 sm:py-6">
                        <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
                          やりたいこと
                        </p>
                      <p className="mt-2 text-base sm:text-lg leading-relaxed font-bold text-slate-800">
                        ユーザーがアプリを<span className="text-red-600 font-extrabold">選ばなくても</span>、
                        生活の中で<span className="text-red-600 font-extrabold">無意識に最適</span>なサービスが提供される体験を実現したい。
                      </p>
                    </div>

                      <div className="w-1/4 shrink-0 px-5 py-5 sm:px-6 sm:py-6">
                        <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
                          具体案
                        </p>
                      <p className="mt-2 text-base sm:text-lg leading-relaxed font-bold text-slate-800">
                        契約時点から利用シーンに応じて、決済・ポイント・健康サービスなどが
                        <span className="text-red-600 font-extrabold">シームレスに連携</span>し、
                        迷わず使える仕組みを<span className="text-red-600 font-extrabold">UI/UX設計</span>として落とし込む。
                      </p>
                    </div>

                      <div className="w-1/4 shrink-0 px-5 py-5 sm:px-6 sm:py-6">
                        <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
                          ドコモでやる理由
                        </p>
                      <p className="mt-2 text-base sm:text-lg leading-relaxed font-bold text-slate-800">
                        通信という<span className="text-red-600 font-extrabold">生活基盤</span>を持ち、
                        契約時からユーザーと接点を持てる御社だからこそ、
                        無意識に使われるサービスを現実にできると考えている。
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl bg-white/85 shadow-[0_26px_70px_-52px_rgba(15,23,42,0.40)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(239,68,68,0.12),transparent_55%),radial-gradient(circle_at_70%_70%,rgba(59,130,246,0.10),transparent_55%)]" />
              <div className="relative h-full min-h-[220px] sm:min-h-[260px] lg:min-h-[320px] bg-white">
                <img
                  src={wantedWorkImg}
                  alt="やりたい仕事 イラスト"
                  className="absolute inset-0 h-full w-full object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="episodes" className="space-y-1 scroll-mt-28">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-700/80">Main Episodes</p>
        <h2 className="text-3xl font-semibold text-slate-900">学生時代の主なエピソード</h2>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-slate-200/60 bg-white shadow-[0_30px_70px_-24px_rgba(15,23,42,0.35)]">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-50 via-white to-sky-50 opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(251,191,36,0.12),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.12),transparent_32%)]" />
        <div className="absolute left-0 right-0 top-20 h-px bg-gradient-to-r from-transparent via-slate-300/60 to-transparent pointer-events-none" />

        <div className="relative pb-8 pt-6 px-5 sm:px-8">
          <div ref={railRef} className="flex gap-5 sm:gap-7 overflow-x-auto overflow-y-hidden no-scrollbar">
            {heroSlides.map((slide, index) => (
              <motion.article
                key={`${slide.src}-${index}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index, duration: 0.5 }}
                className="group relative w-[22rem] sm:w-[24rem] shrink-0 snap-start rounded-3xl border border-slate-200/80 bg-white shadow-[0_25px_50px_-18px_rgba(15,23,42,0.28)] backdrop-blur cursor-pointer"
                onClick={() => onCardClick(index)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white to-transparent pointer-events-none rounded-3xl" />

                <div className="relative p-5 sm:p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700 tracking-[0.12em]">
                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-3 py-1 shadow-sm shadow-black/10">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-300 animate-pulse" />
                      {slide.period || '—'}
                    </div>
                    <div className="text-slate-500 uppercase">Episode {index + 1}</div>
                  </div>

                  <div className="relative overflow-hidden rounded-2xl border border-white/70 shadow-inner shadow-black/5">
                    <div
                      className="h-56 sm:h-60 w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url(${slide.src})` }}
                      aria-hidden
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-transparent pointer-events-none" />
                  </div>

                  <div className="space-y-2">
                    <div className="relative mx-auto w-max text-center text-sm font-semibold text-slate-800 leading-tight">
                      <div className="px-4 py-2 rounded-full border border-slate-200 bg-white/90 shadow-sm shadow-black/5 inline-flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
                        {slide.title}
                      </div>
                      <span className="absolute left-1/2 -bottom-3 h-3 w-3 -translate-x-1/2 rotate-45 bg-white border border-slate-200" />
                    </div>

                    <div className="text-base sm:text-lg leading-relaxed text-slate-800 pt-4 space-y-1">
                      {index === 0 && (
                        <p>
                          外国人を含む <span className="font-bold text-red-600">30名以上</span> をまとめるバイトリーダーとして、提供スピード大会で{' '}
                          <span className="font-bold text-red-600">地域1位</span> を獲得。
                        </p>
                      )}
                      {index === 1 && (
                        <p>
                          専門外のSNS運用に挑戦し、<span className="font-bold text-red-600">3週間で2倍以上</span>の成果を達成。
                        </p>
                      )}
                      {index === 2 && (
                        <p>
                          アプリから基盤まで幅広く開発し、現在は <span className="font-bold text-red-600">衛星Webアプリ</span> の開発を担当（
                          <span className="font-bold text-red-600">宇宙通信ベンチャー</span>）。
                        </p>
                      )}
                      {index === 3 && (
                        <p>
                          ハッカソンや個人開発で複数アプリを制作し、<span className="font-bold text-red-600">ユーザー視点</span> を重視した設計を実践。
                        </p>
                      )}
                      {index === 4 && (
                        <p>
                          計算知能・マルチメディア研究室に所属し、<span className="font-bold text-red-600">グラフェンスライムという未知分野</span>の研究に挑戦中。
                        </p>
                      )}
                      {index === 5 && (
                        <p>
                          YouTube運営を通して培った<span className="font-bold text-red-600">顧客視点</span>（登録者<span className="font-bold text-red-600">1.8万人</span>）。
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-center pt-2">
                    <span className="h-2 w-2 rounded-full bg-slate-900 shadow-[0_0_0_6px_rgba(15,23,42,0.12)]" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      {opened !== null && <HeroStoryModal index={opened} onClose={() => setOpened(null)} />}
    </section>
  );
};

// detail popup
export const HeroStoryModal = ({ index, onClose }: { index: number; onClose: () => void }) => {
  const slide = heroSlides[index];
  const isFirst = index === 0;

  const detail = isFirst
    ? [
        '飲食店のアルバイトにおいて、提供スピードを競う地域コンテストでチームとして1位を獲得した。',
        '前年度は外国人スタッフとの意思疎通不足による連携ミスが課題となり、3位に留まっていた。そこでマネージャーとしてメンバーと議論し、指示の英語統一と適材適所の人員配置を提案・実行した。',
        '導入時には抵抗もあったが、各メンバーと対話を重ねながら役割やシフトを調整し、現場への定着を図った。',
        'その結果、提供時間を約30%短縮し、地域コンテストで1位を達成した。多様な価値観を持つチームをまとめ、成果につなげる力を身につけた。',
      ]
    : slide.detail.split('。').filter(Boolean);

  const highlight = (text: string) => {
    const parts = text.split(/(1位|約30%短縮|30%短縮|2倍|3倍以上|1\.8万人)/);
    return parts.map((part, i) => {
      if (part === '') return null;
      if (
        part === '1位' ||
        part === '約30%短縮' ||
        part === '30%短縮' ||
        part === '2倍' ||
        part === '3倍以上' ||
        part === '1.8万人'
      ) {
        return (
          <span key={i} className="text-red-600 font-extrabold">
            {part}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/30 backdrop-blur-sm px-3 py-3 sm:px-4 sm:py-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-[520px] sm:max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[calc(100dvh-1.5rem)] mt-16 sm:mt-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 p-4 sm:p-5 border-b border-slate-200 bg-white sticky top-0 z-10">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-amber-700/80">Episode {index + 1}</p>
            <h3 className="text-xl sm:text-3xl font-extrabold text-slate-900 mt-1 leading-tight">
              {isFirst ? 'マクドナルドでの経験' : slide.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 inline-flex items-center justify-center h-10 w-10 rounded-full border border-slate-200 bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            aria-label="Close"
          >
            <span aria-hidden className="text-2xl leading-none">
              ×
            </span>
          </button>
        </div>
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-5 sm:gap-6 p-4 sm:p-6 flex-1 overflow-y-auto min-h-0">
          <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-inner shadow-black/5 bg-slate-50 h-48 sm:h-auto flex items-center justify-center">
            <img src={slide.src} alt={slide.title} className="w-full h-full object-contain" />
          </div>
          <div className="space-y-3 text-sm sm:text-lg leading-relaxed text-slate-700 font-bold">
            {detail.map((sentence, i) => {
              const normalized = sentence.endsWith('。') ? sentence : `${sentence}。`;
              return <p key={i}>{highlight(normalized)}</p>;
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
