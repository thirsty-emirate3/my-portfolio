import { useState, useEffect, useRef } from 'react';
import {
    Palette,
    Terminal,
    Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SKILLS = [
    {
        category: '開発言語',
        icon: <Terminal className="text-slate-600" />,
        items: [
            { name: 'C / C#', duration: '4年', context: '大学', level: 'Advanced' },
            { name: 'Python', duration: '3年', context: '研究・長期インターン', level: 'Advanced' },
            { name: 'TypeScript', duration: '2年', context: '趣味・長期インターン', level: 'Advanced' },
            { name: 'Mojo / SIMD / AVX-512', duration: '半年', context: '長期インターン', level: 'Advanced' },
            { name: 'Swift / JavaScript', duration: '', context: '趣味', level: 'Intermediate' },
        ]
    },
    {
        category: 'フロントエンド & ゲーム',
        icon: <Palette className="text-pink-500" />,
        items: [
            { name: 'React', duration: '2年', context: '趣味・長期インターン', level: 'Intermediate' },
            { name: 'Unity', duration: '半年', context: '趣味', level: 'Intermediate' },
            { name: 'OpenCV', duration: '半年', context: '趣味', level: 'Intermediate' },
            { name: 'HTML / CSS', duration: '2年', context: '趣味・長期インターン', level: 'Intermediate' },
        ]
    },
    {
        category: 'ハードウェア & ツール',
        icon: <Cpu className="text-blue-500" />,
        items: [
            { name: 'Arduino', duration: '1年', context: '研究', level: 'Intermediate' },
            { name: 'FPGA / Vivado', duration: '半年', context: '長期インターン', level: 'Intermediate' },
            { name: 'Linux', duration: '1年', context: '長期インターン', level: 'Intermediate' },
            { name: 'AWS', duration: '半年', context: '趣味', level: 'Intermediate' },
            { name: 'Fusion360 / 3D Print', duration: '1年', context: '研究', level: 'Intermediate' },
        ]
    }
];



const getContextColor = (context: string) => {
    if (context.includes('研究')) return 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-700/10';
    if (context.includes('インターン')) return 'bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-700/10';
    if (context.includes('趣味')) return 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-700/10';
    return 'bg-slate-50 text-slate-700 ring-1 ring-inset ring-slate-700/10';
};

export const TechStack = () => {
    const [activeCategory, setActiveCategory] = useState(SKILLS[0].category);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.getAttribute('data-index'));
                        setActiveCategory(SKILLS[index].category);
                    }
                });
            },
            {
                root: scrollContainerRef.current,
                threshold: 0.6
            }
        );

        cardRefs.current.forEach((card) => {
            if (card) observer.observe(card);
        });

        return () => observer.disconnect();
    }, []);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <section id="skills" className="space-y-6 py-12">
            <div className="flex items-center justify-between px-2">
                <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-blue-600/80 font-bold">Skills</p>
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                        <h2 className="text-3xl font-semibold text-slate-900">開発スキル</h2>
                        <div className="md:hidden h-8 overflow-hidden relative min-w-[200px]">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={activeCategory}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className="absolute left-0 top-1 text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 whitespace-nowrap"
                                >
                                    {activeCategory}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

            <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto gap-4 pb-4 snap-x no-scrollbar md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0 -mx-4 px-4 md:mx-0 md:px-0"
            >
                {SKILLS.map((skillGroup, index) => (
                    <motion.div
                        key={skillGroup.category}
                        ref={(el) => (cardRefs.current[index] = el)}
                        data-index={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="min-w-[85vw] sm:min-w-[350px] md:min-w-0 snap-center bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-200/60 group"
                    >
                        <div className="hidden md:flex items-center gap-4 mb-6">
                            <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                {skillGroup.icon}
                            </div>
                            <h3 className="font-bold text-lg text-slate-800">{skillGroup.category}</h3>
                        </div>

                        <motion.div
                            variants={container}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="grid grid-cols-2 gap-2 sm:gap-4"
                        >
                            {skillGroup.items.map((skillItem) => (
                                <motion.div
                                    key={skillItem.name}
                                    variants={item}
                                    className="flex flex-col justify-between p-3 rounded-xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] ring-1 ring-slate-100 hover:ring-blue-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 h-full group/item"
                                >
                                    <div className="space-y-1.5 mb-2">
                                        <div className="flex justify-between items-start gap-1">
                                            <span className="font-bold text-slate-700 block text-sm sm:text-base leading-snug group-hover/item:text-blue-600 transition-colors">
                                                {skillItem.name}
                                            </span>
                                        </div>
                                        {skillItem.duration && (
                                            <span className="text-xs text-slate-500 font-medium block flex items-center gap-1">
                                                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                                {skillItem.duration}
                                            </span>
                                        )}
                                    </div>
                                    <div className="self-start">
                                        <span className={`text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full ${getContextColor(skillItem.context)} whitespace-nowrap inline-block opacity-90`}>
                                            {skillItem.context}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
