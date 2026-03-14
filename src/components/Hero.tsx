import { motion } from 'framer-motion';
import { Github, Mail, Youtube } from 'lucide-react';
import { HeroVisual } from './HeroVisual';

export const Hero = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-white text-slate-900 border border-slate-200 shadow-sm p-6 sm:p-12 lg:p-16">
      <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 items-center">

        {/* Left Content */}
        <div className="space-y-5 relative z-10">
          <div className="space-y-3">

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-6xl font-bold tracking-tight text-slate-900 font-['Space_Grotesk']"
            >
              Haruto Suzaki
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-slate-700 leading-relaxed max-w-lg text-base sm:text-lg space-y-4"
            >
              <p className="text-slate-500">筑波大学大学院<br />知能機能システム学位プログラム</p>
              <div className="space-y-2 rounded-2xl border border-amber-200 bg-amber-50/80 px-4 py-3 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">目指す将来像</p>
                <p className="text-2xl sm:text-3xl font-bold leading-tight text-slate-900">技術を、誰もが直感的に使える<br />サービスとして届けるエンジニア</p>
              </div>
              <p>その将来像に向けて、これまで</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>チームで協働しながら成果を生み出す力</li>
                <li>技術力と最新技術への強い関心</li>
                <li>YouTube運営を通して培った顧客視点（登録者1.8万人）</li>
              </ul>
              <p>を通じて、<span className="font-bold text-red-600">技術力と利用者視点の双方</span>を磨いてきました。</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-3 sm:gap-4"
          >
            <a
              href="mailto:s2520778@u.tsukuba.ac.jp"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-semibold text-white transition hover:bg-slate-800 hover:-translate-y-0.5"
            >
              <Mail className="w-4 h-4" />
              お問い合わせ
            </a>
            <div className="flex items-center gap-2">
              <a href="https://github.com/thirsty-emirate3" target="_blank" rel="noreferrer" className="p-2.5 sm:p-3 rounded-full hover:bg-slate-100 transition text-slate-900"><Github className="w-5 h-5" /></a>
              <span aria-label="YouTube" className="p-2.5 sm:p-3 rounded-full text-[#FF0000]"><Youtube className="w-5 h-5" /></span>
            </div>
          </motion.div>
        </div>

        {/* Right Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] flex items-center justify-center overflow-hidden mt-6 lg:mt-0"
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  );
};
