import { useState } from 'react';
import { Terminal, Palette, Cpu, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SKILLS = [
    {
        id: 'languages',
        title: '開発言語',
        icon: <Terminal className="w-5 h-5 text-slate-700" />,
        items: [
            { name: 'C / C#', duration: '4年', context: '大学' },
            { name: 'Python', duration: '3年', context: '研究・長期インターン' },
            { name: 'TypeScript', duration: '2年', context: '趣味・長期インターン' },
            { name: 'Mojo / SIMD / AVX-512', duration: '半年', context: '長期インターン' },
            { name: 'Swift / JavaScript', duration: '', context: '趣味' }
        ]
    },
    {
        id: 'frontend',
        title: 'フロントエンド & ゲーム',
        icon: <Palette className="w-5 h-5 text-pink-500" />,
        items: [
            { name: 'React', duration: '2年', context: '趣味・長期インターン' },
            { name: 'Unity', duration: '半年', context: '趣味' },
            { name: 'OpenCV', duration: '半年', context: '趣味' },
            { name: 'HTML / CSS', duration: '2年', context: '趣味・長期インターン' }
        ]
    },
    {
        id: 'hardware',
        title: 'ハードウェア & ツール',
        icon: <Cpu className="w-5 h-5 text-blue-500" />,
        items: [
            { name: 'Arduino', duration: '1年', context: '研究' },
            { name: 'FPGA / Vivado', duration: '半年', context: '長期インターン' },
            { name: 'Linux', duration: '1年', context: '長期インターン' },
            { name: 'AWS', duration: '半年', context: '趣味' },
            { name: 'Fusion360 / 3D Print', duration: '1年', context: '研究' }
        ]
    }
];

const Tag = ({ text }: { text: string }) => {
    let colorClass = 'bg-slate-50 text-slate-600 border-slate-200';
    if (text.includes('研究・長期インターン')) {
        colorClass = 'bg-blue-50 text-blue-600 border-blue-100';
    } else if (text.includes('研究')) {
        colorClass = 'bg-blue-50 text-blue-600 border-blue-100';
    } else if (text.includes('趣味・長期インターン')) {
        colorClass = 'bg-purple-50 text-purple-600 border-purple-100';
    } else if (text.includes('長期インターン')) {
        colorClass = 'bg-purple-50 text-purple-600 border-purple-100';
    } else if (text.includes('趣味')) {
        colorClass = 'bg-emerald-50 text-emerald-600 border-emerald-100';
    }

    return (
        <span className={`px-2.5 py-1 text-[10px] sm:text-xs font-bold rounded-full border ${colorClass} inline-block whitespace-nowrap`}>
            {text}
        </span>
    );
};

export const TechStack = () => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <section id="skills" className="w-full">
            <div className="mb-4">
                <p className="text-xs uppercase tracking-[0.25em] text-blue-600/80 font-bold mb-2">Skills</p>
                <h2 className="text-3xl font-semibold text-slate-900">開発スキル</h2>
            </div>

            <div className="border border-slate-200/80 rounded-2xl bg-white shadow-sm overflow-hidden">
                <button
                    onClick={() => setOpen((v) => !v)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 bg-white hover:bg-slate-50 transition-colors"
                    aria-expanded={open}
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                            <Terminal className="w-5 h-5 text-slate-700" />
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-800 font-['Space_Grotesk'] tracking-wide">
                            全ての開発スキルを表示
                        </h3>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence initial={false}>
                    {open && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="border-t border-slate-100"
                        >
                            <div className="p-4 sm:p-5 space-y-6">
                                {SKILLS.map((skillGroup) => (
                                    <div key={skillGroup.id} className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                                                {skillGroup.icon}
                                            </div>
                                            <h4 className="text-base sm:text-lg font-bold text-slate-800 font-['Space_Grotesk'] tracking-wide">
                                                {skillGroup.title}
                                            </h4>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                                            {skillGroup.items.map((item) => (
                                                <div
                                                    key={item.name}
                                                    className="flex flex-col p-4 rounded-xl border border-slate-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:border-slate-200 transition-all duration-300"
                                                >
                                                    <div className="flex flex-col mb-3 space-y-1">
                                                        <span className="font-bold text-slate-900 text-sm sm:text-base font-['Space_Grotesk']">
                                                            {item.name}
                                                        </span>
                                                        {item.duration ? (
                                                            <span className="text-[11px] sm:text-xs text-slate-400 font-medium flex items-center gap-1.5">
                                                                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                                                {item.duration}
                                                            </span>
                                                        ) : (
                                                            <span className="h-[18px]"></span>
                                                        )}
                                                    </div>
                                                    <div className="mt-auto pt-1">
                                                        <Tag text={item.context} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};
