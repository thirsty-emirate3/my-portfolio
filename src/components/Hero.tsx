import { motion } from 'framer-motion';
import { HeroVisual } from './HeroVisual';
import myVisionImg from '../assets/myvision.png';

export const Hero = () => {
  return (
    <section className="relative bg-white text-slate-900 px-4 sm:px-6 lg:px-10 py-12">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex flex-col gap-3 border-b border-slate-200 pb-3">
          <div className="flex flex-col gap-1 lg:flex-row lg:items-end lg:justify-between">
            <h1 className="text-5xl sm:text-7xl font-bold tracking-[0.08em] text-slate-500 font-['Bebas_Neue','Inter','sans-serif'] whitespace-nowrap uppercase">
              Haruto Suzaki
            </h1>
            <p className="text-lg sm:text-xl font-medium text-slate-500 whitespace-nowrap text-right">
              筑波大学大学院 知能機能システム学位プログラム
            </p>
          </div>
          <div className="h-px bg-slate-300 w-full" />
        </div>

        <div className="grid gap-10 lg:gap-14 lg:grid-cols-[1.05fr_0.95fr] items-start mt-8">

          {/* Left: Illustration + Message */}
          <div className="space-y-8">
            <div className="w-full h-full">
              <img
                src={myVisionImg}
                alt="技術とユーザーをつなぐイラスト"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Right: Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative w-full aspect-[4/3] sm:aspect-[4/3] lg:aspect-[4/3] flex items-center justify-center overflow-hidden rounded-none border border-slate-200 shadow-[0_32px_90px_-40px_rgba(15,23,42,0.35)] bg-gradient-to-br from-white to-slate-100"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
