import { motion } from 'framer-motion';
import { Github, Mail, Youtube } from 'lucide-react';
import heroAbstract from '../assets/hero_workspace.png';

export const Hero = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-white text-slate-900 border border-slate-200 shadow-sm p-8 sm:p-12 lg:p-16">
      <div className="grid gap-12 lg:grid-cols-2 items-center">

        {/* Left Content */}
        <div className="space-y-5 relative z-10">
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold tracking-wider uppercase text-slate-600"
            >
              Tsukuba University
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl sm:text-6xl font-bold tracking-tight text-slate-900"
            >
              Haruto Suzaki
              <span className="block text-2xl sm:text-3xl mt-2 font-light text-slate-500">
                Creative Engineer / YouTuber
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-slate-600 leading-relaxed max-w-lg"
            >
              筑波大学大学院 知能機能システム学位プログラム所属。現在は大学院での研究活動に励みながら、個人開発や YouTube チャンネル『風刺スケッチ』での技術発信に注力しています。
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="mailto:s2520778@u.tsukuba.ac.jp"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 hover:-translate-y-0.5"
            >
              <Mail className="w-4 h-4" />
              Contact Me
            </a>
            <div className="flex items-center gap-2">
              <a href="https://github.com/thirsty-emirate3" target="_blank" rel="noreferrer" className="p-3 rounded-full hover:bg-slate-100 transition text-slate-600 hover:text-slate-900"><Github className="w-5 h-5" /></a>
              <a href="https://www.youtube.com/@sketchsyakai" target="_blank" rel="noreferrer" className="p-3 rounded-full hover:bg-slate-100 transition text-slate-600 hover:text-slate-900"><Youtube className="w-5 h-5" /></a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="pt-3 border-t border-slate-100"
          >
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Activities</p>
            <div className="flex flex-col gap-2 text-sm text-slate-600 font-mono">
              <div className="flex items-center gap-3">
                <span className="w-28 shrink-0 px-2 py-1 bg-orange-50 text-orange-700 border border-orange-200 rounded text-center font-semibold">YouTube</span>
                <span>風刺スケッチ (1.2万人)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-28 shrink-0 px-2 py-1 bg-slate-50 border border-slate-200 rounded text-center">Research</span>
                <span>超敏感柔軟センサの開発</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-28 shrink-0 px-2 py-1 bg-slate-50 border border-slate-200 rounded text-center">Web / Game</span>
                <span>ゲーム、Webアプリ、アルゴリズム可視化</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="relative h-full min-h-[400px] flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-700"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-white via-transparent to-transparent z-10 sm:via-white/50" />
          <img
            src={heroAbstract}
            alt="Abstract AI Visualization"
            className="w-full object-contain drop-shadow-2xl mix-blend-multiply opacity-90"
          />
        </motion.div>
      </div>
    </section>
  );
};
