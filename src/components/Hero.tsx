import { motion } from 'framer-motion';
import { Sparkles, Atom } from 'lucide-react';

const floatingVariants = {
  initial: { y: 0 },
  animate: {
    y: [0, -12, 0],
    transition: {
      repeat: Infinity,
      duration: 6,
      ease: 'easeInOut' as const,
    },
  },
};

export const Hero = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-orange-200/60 bg-gradient-to-br from-white via-orange-50/60 to-amber-100/60 p-10 sm:p-14 text-slate-900 shadow-[0_18px_60px_rgba(255,159,64,0.18)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(249,115,22,0.14),transparent_34%),radial-gradient(circle_at_80%_12%,rgba(251,146,60,0.16),transparent_32%),radial-gradient(circle_at_38%_82%,rgba(248,180,80,0.12),transparent_32%)]" />
      <div className="absolute inset-0 grid-overlay opacity-30"></div>
      <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_0.85fr]">
        <div className="space-y-6">
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-white/80 px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-orange-700 shadow-sm backdrop-blur"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="h-4 w-4 text-orange-500" />
            AI × Cinematic Engineering
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold leading-tight text-slate-900"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500">
              Haruto Suzaki
            </span>
            <br />
            <span className="text-lg font-semibold text-orange-700/90">須﨑 陽翔</span>
          </motion.h1>

          <motion.p
            className="max-w-2xl text-base sm:text-lg leading-relaxed text-slate-700"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            筑波大学大学院 理工情報生命学術院 システム情報工学研究群 知能機能システム学位プログラム。
            新しい技術への探究心が強く、現在は動画生成AI「Sora 2」に注力。グローバルに活躍するエンジニアを目指しています。
          </motion.p>

          <motion.p
            className="text-sm text-orange-700/90"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            Next.js / Docker / Python / Generative AI / Sora 2 / React / TypeScript
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
          >
            <a
              href="#web"
              className="rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-300/35 transition hover:-translate-y-0.5 hover:shadow-orange-400/40"
            >
              作品一覧を見る
            </a>
            <a
              href="#contact"
              className="rounded-full border border-orange-200 bg-white/90 px-6 py-3 text-sm font-semibold text-orange-700 transition hover:-translate-y-0.5 hover:border-orange-300 hover:text-orange-800"
            >
              相談・依頼をする
            </a>
          </motion.div>
        </div>

        <div className="relative grid gap-6">
          <motion.div
            className="relative overflow-hidden rounded-2xl border border-orange-200/60 bg-white/90 p-6 shadow-[0_16px_40px_rgba(255,159,64,0.18)] backdrop-blur"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between text-sm text-orange-800">
              <span className="font-semibold">Focus</span>
              <span className="text-orange-600/90">Sora 2 × Generative Pipeline</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              {['Next.js', 'Docker', 'Python', 'Generative AI', 'Sora 2', 'React / TypeScript'].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-lg border border-orange-200/70 bg-white px-3 py-2 font-medium text-slate-800 shadow-inner shadow-orange-200/40"
                >
                  <span className="h-2 w-2 rounded-full bg-gradient-to-r from-orange-400 to-amber-400 shadow-sm" />
                  {item}
                </div>
              ))}
            </div>
            <motion.div
              className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-orange-300/35 to-amber-300/25 blur-3xl"
              variants={floatingVariants}
              initial="initial"
              animate="animate"
            />
          </motion.div>

          <motion.div
            className="relative flex items-center gap-4 overflow-hidden rounded-2xl border border-orange-200/60 bg-gradient-to-br from-white via-orange-50/60 to-amber-100/70 p-6 shadow-[0_16px_40px_rgba(255,159,64,0.2)] backdrop-blur"
            variants={floatingVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400/20 to-amber-500/25 text-orange-700">
              <Atom />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-orange-700/80">Latest Exploration</p>
              <p className="text-lg font-semibold text-slate-900">AI 動画生成ワークフローと WebGL 演出</p>
              <p className="text-sm text-orange-700/80">YouTube「風刺スケッチ」で最新技術や開発ログを発信中。</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
