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
    <section className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-[#0b1222]/80 via-[#0f172a]/90 to-[#0b1222]/80 p-10 sm:p-14 shadow-2xl">
      <div className="absolute inset-0 grid-overlay"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-neon/10 via-transparent to-aurora/15 blur-3xl" />
      <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
        <div className="space-y-6">
          <motion.div
            className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="h-4 w-4 text-neon" />
            AI × Creative Portfolio
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold leading-tight text-slate-50"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            Hi, I’m <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon to-aurora">Yuki</span>
            <br /> Frontend Engineer &amp; Game Creator.
          </motion.h1>

          <motion.p
            className="max-w-2xl text-lg text-slate-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            React と Unity を軸に、AI × Creativity をテーマにしたプロダクトをデザインから実装まで一気通貫で手がけています。
            グラスモーフィズムやネオンライティングで、先端的でありながら使いやすいUIを追求しています。
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
          >
            <button className="rounded-full bg-gradient-to-r from-neon to-aurora px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-aurora/20 transition hover:shadow-neon/30">
              View Portfolio
            </button>
            <button className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-neon/50 hover:text-neon">
              Download CV
            </button>
          </motion.div>
        </div>

        <div className="relative grid gap-6">
          <motion.div
            className="glass-panel relative overflow-hidden rounded-2xl p-6"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between text-sm text-slate-200">
              <span className="font-semibold">Tech Stack</span>
              <span className="text-white/50">AI-first workflow</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              {['React / Vite', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Unity', 'C#'].map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-slate-200">
                  <span className="h-2 w-2 rounded-full bg-gradient-to-r from-neon to-aurora" />
                  {item}
                </div>
              ))}
            </div>
            <motion.div
              className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-neon/30 to-aurora/20 blur-3xl"
              variants={floatingVariants}
              initial="initial"
              animate="animate"
            />
          </motion.div>

          <motion.div
            className="glass-panel relative flex items-center gap-4 rounded-2xl p-6"
            variants={floatingVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-neon/20 to-aurora/25 text-neon">
              <Atom />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-white/50">Latest Exploration</p>
              <p className="text-lg font-semibold text-slate-100">AI × Creative Coding / WebGL</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
