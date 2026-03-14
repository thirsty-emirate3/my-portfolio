import { motion } from 'framer-motion';
import {
    Terminal,
    Cpu,
    Code2,
    Globe,
    Gamepad
} from 'lucide-react';

const SKILLS = [
    // Highlighted Skills (Large Cards)
    { name: 'Python', category: 'Language', icon: <Terminal />, level: 'Advanced', description: '研究・開発のメイン言語', span: 'col-span-2 row-span-2', color: 'text-blue-500', bg: 'bg-blue-50/50' },
    { name: 'React', category: 'Frontend', icon: <Globe />, level: 'Advanced', description: 'モダンWeb開発', span: 'col-span-2 row-span-2', color: 'text-cyan-500', bg: 'bg-cyan-50/50' },
    { name: 'C / C#', category: 'Language', icon: <Code2 />, level: 'Advanced', description: '大学講義・基礎', span: 'col-span-1 row-span-2', color: 'text-purple-500', bg: 'bg-purple-50/50' },

    // Standard Skills
    { name: 'TypeScript', category: 'Language', icon: <Terminal />, level: 'Intermediate', span: 'col-span-1 row-span-1', color: 'text-blue-400', bg: 'bg-blue-50/30' },
    { name: 'Unity', category: 'Right', icon: <Gamepad />, level: 'Intermediate', span: 'col-span-1 row-span-1', color: 'text-slate-800', bg: 'bg-slate-50/50' },
    { name: 'Mojo / SIMD', category: 'System', icon: <Cpu />, level: 'Advanced', span: 'col-span-2 row-span-1', color: 'text-orange-500', bg: 'bg-orange-50/50' },

    // Others
    { name: 'HTML / CSS', category: 'Frontend', level: 'Intermediate', span: 'col-span-1', color: 'text-pink-500', bg: 'bg-pink-50/30' },
    { name: 'AWS', category: 'Infra', level: 'Intermediate', span: 'col-span-1', color: 'text-yellow-600', bg: 'bg-yellow-50/30' },
    { name: 'Linux', category: 'System', level: 'Intermediate', span: 'col-span-1', color: 'text-slate-700', bg: 'bg-slate-100/30' },
    { name: 'Arduino', category: 'Hardware', level: 'Intermediate', span: 'col-span-1', color: 'text-teal-600', bg: 'bg-teal-50/30' },
    { name: 'FPGA', category: 'Hardware', level: 'Intermediate', span: 'col-span-1', color: 'text-indigo-600', bg: 'bg-indigo-50/30' },
    { name: 'Fusion360', category: 'Hardware', level: 'Intermediate', span: 'col-span-1', color: 'text-orange-600', bg: 'bg-orange-100/30' },
];

export const TechStackBento = () => {
    return (
        <section id="skills" className="py-12 space-y-8">
            <div className="flex items-baseline gap-3 px-2">
                <p className="text-xs uppercase tracking-[0.25em] text-blue-600/80 font-bold">Skills</p>
                <h2 className="text-3xl font-bold text-slate-900 font-['Space_Grotesk']">Expertise</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[100px] md:auto-rows-[120px]">
                {SKILLS.map((skill, index) => (
                    <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.05, type: 'spring', bounce: 0.3 }}
                        whileHover={{ scale: 1.02, transition: { type: 'spring', stiffness: 400, damping: 10 } }}
                        className={`${skill.span} relative overflow-hidden rounded-3xl backdrop-blur-xl border border-white/60 shadow-sm hover:shadow-lg transition-shadow p-5 flex flex-col justify-between group ${skill.bg}`}
                    >
                        {/* Background Decoration */}
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/40 rounded-full blur-2xl group-hover:bg-white/60 transition-colors" />

                        {/* Content */}
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div className="flex justify-between items-start">
                                <div className={`p-2 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm ${skill.color}`}>
                                    {skill.icon || <Terminal className="w-5 h-5 opacity-50" />}
                                </div>
                                {skill.level === 'Advanced' && (
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/50 text-slate-500 backdrop-blur-md">
                                        Top Skill
                                    </span>
                                )}
                            </div>

                            <div>
                                <h3 className={`text-lg md:text-xl font-bold text-slate-900 font-['Space_Grotesk'] tracking-tight ${skill.span.includes('col-span-2') ? 'text-2xl' : ''}`}>
                                    {skill.name}
                                </h3>
                                {skill.description && (
                                    <p className="text-sm text-slate-600 mt-1 font-medium line-clamp-2">
                                        {skill.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
