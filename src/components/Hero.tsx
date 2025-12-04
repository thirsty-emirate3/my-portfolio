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
    <section className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white via-blue-50/50 to-purple-50/50 p-10 sm:p-14 shadow-2xl">
      <div className="absolute inset-0 grid-overlay"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-neon/10 via-transparent to-aurora/8 blur-3xl" />
      <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
        <div className="space-y-6">
          <motion.div
            className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-700 font-semibold shadow-sm"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="h-4 w-4 text-neon" />
            AI × Creative ポートフォリオ
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold leading-tight text-slate-900"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon to-aurora">須﨑陽翔</span>
            <br /> 
          </motion.h1>

          <motion.p
            className="max-w-2xl text-lg text-slate-800 font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            React と Unity を軸に、AI × Creativity をテーマにしたプロダクトをデザインから実装まで一気通貫。
            明るくクリーンなUIで、先端的でありながら使いやすい体験を届けます。
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
          >
            <a href="#web" className="rounded-full bg-gradient-to-r from-neon to-aurora px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-aurora/20 transition hover:shadow-neon/30">
              作品一覧を見る
            </a>
            <a href="#contact" className="rounded-full border border-slate-200 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-neon/50 hover:text-sky-700">
              相談・依頼をする
            </a>
          </motion.div>
        </div>

        <div className="relative grid gap-6">
          <motion.div
            className="glass-panel relative overflow-hidden rounded-2xl p-6"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between text-sm text-slate-800">
              <span className="font-semibold">Tech Stack</span>
              <span className="text-slate-600">AIファーストな制作フロー</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              {['React / Vite', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Unity', 'C#'].map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-lg border border-slate-200/80 bg-white px-3 py-2 text-slate-800 font-medium shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-gradient-to-r from-neon to-aurora shadow-sm" />
                  {item}
                </div>
              ))}
            </div>
            <motion.div
              className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-neon/25 to-aurora/18 blur-3xl"
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
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-neon/20 to-aurora/25 text-sky-700">
              <Atom />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-600">Latest Exploration</p>
              <p className="text-lg font-semibold text-slate-900">AI × Creative Coding / WebGL</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
