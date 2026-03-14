import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const heroSlides = [
    { src: '/foregin_internship.png', title: '海外インターンシップの挑戦' },
    { src: '/mcdonalds.png', title: '飲食店バイトでのマネジメント' },
    { src: '/my_app.png', title: '趣味開発アプリ' },
    { src: '/my_lab.png', title: '私の研究室の様子' },
    { src: '/warpspace.png', title: '長期インターンシップでのエンジニア経験' },
];

export const HeroVisual = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeSlide = heroSlides[activeIndex];

    useEffect(() => {
        const intervalId = window.setInterval(() => {
            setActiveIndex((currentIndex) => (currentIndex + 1) % heroSlides.length);
        }, 3200);

        return () => window.clearInterval(intervalId);
    }, []);

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.16),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.16),transparent_55%)]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.8 }}
                className="relative z-10 w-full h-full"
            >
                <div className="relative w-full h-full overflow-hidden rounded-[1.5rem] bg-white/20 shadow-[0_30px_70px_rgba(15,23,42,0.22)]">
                    <div className="relative h-full w-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeSlide.src}
                                className="absolute inset-0"
                                initial={{ opacity: 0, x: 56 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -56 }}
                                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <div
                                    className="absolute inset-0 scale-110 bg-cover bg-center opacity-40 blur-xl"
                                    style={{ backgroundImage: `url(${activeSlide.src})` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-slate-950/8 via-transparent to-slate-950/18" />
                                <div className="absolute inset-0">
                                    <img
                                        src={activeSlide.src}
                                        alt="Haruto Suzaki portfolio visual"
                                        className="h-full w-full object-contain"
                                    />
                                </div>
                            </motion.div>
                        </AnimatePresence>
                        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-slate-950/30 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/35 to-transparent" />
                        <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-4">
                            <div className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 backdrop-blur-sm sm:text-sm">
                                {activeSlide.title}
                            </div>
                        </div>
                        <div className="absolute bottom-4 right-4 flex items-center gap-2">
                            <div className="flex items-center gap-2">
                                {heroSlides.map((slide, index) => (
                                    <span
                                        key={slide.src}
                                        className={`h-2 rounded-full transition-all duration-300 ${index === activeIndex ? 'w-6 bg-white' : 'w-2 bg-white/50'}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
