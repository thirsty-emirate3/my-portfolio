import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useVelocity } from 'framer-motion';
import { Terminal, Cpu, Globe } from 'lucide-react';

const SKILLS = [
    {
        id: 'languages',
        title: '開発言語',
        description: '研究・開発の基盤となる言語能力。低レイヤーから高レイヤーまで幅広く対応します。',
        icon: <Terminal className="w-6 h-6" />,
        color: 'text-blue-500',
        items: [
            { name: 'C / C#', duration: '4年', context: '大学', detail: 'Advanced' },
            { name: 'Python', duration: '3年', context: '研究・長期インターン', detail: 'Advanced' },
            { name: 'TypeScript', duration: '2年', context: '趣味・長期インターン', detail: 'Advanced' },
            { name: 'Mojo / SIMD / AVX-512', duration: '半年', context: '長期インターン', detail: 'Advanced' },
            { name: 'Swift / JavaScript', duration: '', context: '趣味', detail: 'Intermediate' }
        ]
    },
    {
        id: 'frontend',
        title: 'フロントエンド & ゲーム',
        description: 'ユーザー体験を最大化するインターフェース構築。デザインから実装まで一貫して行います。',
        icon: <Globe className="w-6 h-6" />,
        color: 'text-pink-500',
        items: [
            { name: 'React', duration: '2年', context: '趣味・長期インターン', detail: 'Intermediate' },
            { name: 'Unity', duration: '半年', context: '趣味', detail: 'Intermediate' },
            { name: 'OpenCV', duration: '半年', context: '趣味', detail: 'Intermediate' },
            { name: 'HTML / CSS', duration: '2年', context: '趣味・長期インターン', detail: 'Intermediate' }
        ]
    },
    {
        id: 'hardware',
        title: 'ハードウェア & ツール',
        description: '物理デバイスからクラウドインフラまで。システム全体を俯瞰して設計します。',
        icon: <Cpu className="w-6 h-6" />,
        color: 'text-orange-500',
        items: [
            { name: 'Arduino', duration: '1年', context: '研究', detail: 'Intermediate' },
            { name: 'FPGA / Vivado', duration: '半年', context: '長期インターン', detail: 'Intermediate' },
            { name: 'Linux', duration: '1年', context: 'OS / Server', detail: 'Intermediate' },
            { name: 'AWS', duration: '半年', context: '趣味', detail: 'Intermediate' },
            { name: 'Fusion360 / 3D Print', duration: '1年', context: '研究', detail: 'Intermediate' }
        ]
    }
];

// Scene 1: Terminal Typing Effect
const TerminalScene = () => {
    const [text, setText] = useState('');
    const fullText = `> python3 research_model.py\nLoading datasets...\nTraining Epoch 1/50: [====>....] 24%\n> gcc -O3 optimized_kernel.c\n> ./a.out\nVector size: 4096\nSIMD Speedup: 8.4x`;

    useEffect(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex <= fullText.length) {
                setText(fullText.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, 30);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-full bg-[#1e1e1e] rounded-lg p-4 font-mono text-sm text-green-400 overflow-hidden shadow-inner border border-slate-700">
            <div className="flex gap-1.5 mb-4 border-b border-slate-700 pb-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <pre className="whitespace-pre-wrap leading-relaxed opacity-90">
                {text}
                <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-2.5 h-4 bg-green-400 align-middle ml-1"
                />
            </pre>
        </div>
    );
};

// Scene 2: Browser/UI Preview
const BrowserScene = () => {
    return (
        <div className="w-full h-full bg-slate-50 rounded-lg p-2 border border-slate-200 overflow-hidden flex flex-col">
            <div className="h-8 bg-white border-b border-slate-200 flex items-center px-3 gap-2 rounded-t-lg mb-2 shadow-sm">
                <Globe className="w-4 h-4 text-slate-400" />
                <div className="h-4 w-40 bg-slate-100 rounded-full text-[10px] flex items-center px-2 text-slate-400">localhost:3000</div>
            </div>
            <div className="flex-1 p-4 grid gap-4 content-start">
                {/* Mock UI Elements */}
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="h-12 w-3/4 bg-blue-500 rounded-lg shadow-md mx-auto"
                />
                <div className="grid grid-cols-2 gap-3">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="h-24 bg-white rounded-lg border border-slate-100 shadow-sm"
                    />
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="h-24 bg-white rounded-lg border border-slate-100 shadow-sm"
                    />
                </div>
                <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="h-2 bg-slate-200 rounded-full mt-4"
                />
            </div>
        </div>
    );
};

// Scene 3: Hardware Schematic
const HardwareScene = () => {
    return (
        <div className="w-full h-full bg-[#0f172a] rounded-lg p-6 flex items-center justify-center relative overflow-hidden border border-slate-800">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />

            {/* CPU */}
            <motion.div
                animate={{ boxShadow: ["0 0 0px #3b82f6", "0 0 20px #3b82f6", "0 0 0px #3b82f6"] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-24 h-24 border-2 border-blue-500/50 bg-blue-900/20 rounded-md relative z-10 flex items-center justify-center backdrop-blur-sm"
            >
                <Cpu className="w-10 h-10 text-blue-400" />
            </motion.div>

            {/* Data Paths */}
            {[0, 90, 180, 270].map((deg, i) => (
                <motion.div
                    key={i}
                    style={{ rotate: deg }}
                    className="absolute w-32 h-[2px] bg-slate-700 left-1/2 top-1/2 -translate-y-1/2 origin-left -z-0"
                >
                    <motion.div
                        animate={{ x: [0, 128], opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                        className="w-8 h-full bg-blue-400 blur-[2px]"
                    />
                </motion.div>
            ))}
        </div>
    );
};

// Floating Particles Component
const FloatingParticles = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-slate-300/30 rounded-full"
                    style={{
                        width: Math.random() * 100 + 50,
                        height: Math.random() * 100 + 50,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -100, 0],
                        x: [0, 50, 0],
                        opacity: [0.1, 0.3, 0.1],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
};

export const TechStackScroll = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeSection, setActiveSection] = useState(0);

    // Scroll Progress for Section Switching & Background
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Physics constants (Velocity based on global scroll)
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });

    // 3D Tilt calculation
    // Scrolling DOWN (positive velocity) -> Tilt Top AWAY (positive rotateX in some coords, negative in others)
    // Let's test standard feel: Dragging down, top follows?
    const rotateX = useTransform(smoothVelocity, [-2000, 2000], [15, -15]);
    const rotateY = useTransform(smoothVelocity, [-2000, 2000], [-5, 5]);
    const scale = useTransform(smoothVelocity, [-3000, 0, 3000], [0.9, 1, 0.9]);

    // Background Color Transition
    // Blue (Lang) -> Pink (Front) -> Orange (HW)
    const backgroundColor = useTransform(
        scrollYProgress,
        [0, 0.2, 0.5, 0.8],
        ["#f8fafc", "#eff6ff", "#fdf2f8", "#fff7ed"]
    );

    // Determine active section based on scroll progress
    useTransform(scrollYProgress, (value) => {
        // Adjust thresholds manually based on feel
        if (value < 0.3) {
            if (activeSection !== 0) setActiveSection(0);
        } else if (value < 0.65) {
            if (activeSection !== 1) setActiveSection(1);
        } else {
            if (activeSection !== 2) setActiveSection(2);
        }
        return value;
    });

    return (
        <motion.section
            ref={containerRef}
            className="relative bg-slate-50 overflow-hidden"
            style={{ backgroundColor }}
        >
            <FloatingParticles />

            <div className="max-w-6xl w-full mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 relative z-10">

                {/* Left Column: Visuals (Sticky) */}
                <div className="relative md:h-full pointer-events-none">
                    <div className="sticky top-0 h-[40vh] md:h-screen flex items-center justify-center py-4 md:py-0">
                        {/* Monitor (Visuals) */}
                        <div className="relative w-full max-w-lg aspect-video md:aspect-auto md:h-[500px] perspective-1000">
                            <motion.div
                                className="w-full h-full bg-slate-900 rounded-xl border-[8px] md:border-[12px] border-slate-800 shadow-2xl relative overflow-hidden"
                                style={{ rotateX, rotateY, scale }}
                            >
                                <AnimatePresence mode="wait">
                                    {activeSection === 0 && (
                                        <motion.div
                                            key="terminal"
                                            initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                            transition={{ duration: 0.4 }}
                                            className="h-full w-full"
                                        >
                                            <TerminalScene />
                                        </motion.div>
                                    )}
                                    {activeSection === 1 && (
                                        <motion.div
                                            key="browser"
                                            initial={{ opacity: 0, x: 100 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            className="h-full w-full"
                                        >
                                            <BrowserScene />
                                        </motion.div>
                                    )}
                                    {activeSection === 2 && (
                                        <motion.div
                                            key="hardware"
                                            initial={{ opacity: 0, rotate: 5 }}
                                            animate={{ opacity: 1, rotate: 0 }}
                                            exit={{ opacity: 0, rotate: -5 }}
                                            transition={{ duration: 0.5 }}
                                            className="h-full w-full"
                                        >
                                            <HardwareScene />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Reflection overlay */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                            </motion.div>
                            {/* Monitor Stand */}
                            <div className="w-16 md:w-24 h-8 md:h-12 bg-slate-800 mx-auto -mt-1 rounded-b-lg shadow-lg relative -z-10" />
                            <div className="w-32 md:w-40 h-2 md:h-3 bg-slate-700 mx-auto -mt-1 rounded-full shadow-md" />
                        </div>
                    </div>
                </div>

                {/* Right Column: Text (Scrolls) */}
                <div className="pb-20 md:py-32 space-y-24 md:space-y-48">
                    {SKILLS.map((skill) => (
                        <motion.div
                            key={skill.id}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            viewport={{ margin: "-20% 0px -20% 0px", once: false }}
                            className="bg-white/80 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-xl border border-white/50 ring-1 ring-white/50 relative overflow-hidden group"
                        >
                            {/* Subtle gradient shimmer on hover */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />

                            <div className={`inline-flex p-3 rounded-xl bg-slate-50 mb-4 ${skill.color}`}>
                                {skill.icon}
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 font-['Space_Grotesk']">{skill.title}</h3>
                            <p className="text-slate-600 leading-relaxed mb-6 text-sm md:text-base">
                                {skill.description}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 relative z-10">
                                {skill.items.map((item) => (
                                    <div key={item.name} className="flex flex-col border-b border-slate-100/50 pb-2">
                                        <div className="flex items-center justify-between mb-1">
                                            <div className="font-bold text-slate-800 flex items-center gap-2 text-sm md:text-base">
                                                {item.name}
                                                {item.duration && (
                                                    <span className="text-[10px] md:text-xs font-bold text-slate-500 font-['Space_Grotesk'] bg-slate-100 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                                                        {item.duration}
                                                    </span>
                                                )}
                                            </div>
                                            <span className="text-[10px] md:text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded-full whitespace-nowrap ml-2">
                                                {item.context}
                                            </span>
                                        </div>
                                        <div className="text-[10px] md:text-xs text-slate-400">{item.detail}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};
