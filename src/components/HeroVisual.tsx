import { motion } from 'framer-motion';
import { Github, BrainCircuit } from 'lucide-react';

export const HeroVisual = () => {
    const floatingIcons = [
        {
            id: 1,
            // YouTube (Stylish Brand Red)
            icon: (
                <svg viewBox="0 0 24 24" className="w-12 h-12 drop-shadow-2xl" fill="none" stroke="none">
                    <rect width="24" height="24" rx="6" fill="url(#grad-youtube)" />
                    <path d="M10 9l5 3-5 3V9z" fill="white" />
                </svg>
            ),
            delay: 0,
            x: -80,
            y: -60,
            scale: 1.1
        },
        {
            id: 2,
            // GitHub (Premium Midnight)
            icon: (
                <svg viewBox="0 0 24 24" className="w-12 h-12 drop-shadow-2xl" fill="none" stroke="none">
                    <rect width="24" height="24" rx="6" fill="url(#grad-github)" />
                    <Github className="text-white w-full h-full p-2" strokeWidth={2} />
                </svg>
            ),
            delay: 0.5,
            x: 80,
            y: -50,
            scale: 1.0
        },
        {
            id: 3,
            // Apple (Platinum/Silver)
            icon: (
                <svg viewBox="0 0 24 24" className="w-12 h-12 drop-shadow-2xl" fill="none" stroke="none">
                    <rect width="24" height="24" rx="6" fill="url(#grad-apple)" />
                    {/* Simplified Apple Shape */}
                    <path
                        d="M17.1,12.6c0.1-1.6,1.4-2.4,1.5-2.4c-0.1,0-1-1.1-1.9-2.4c-0.8-1.1-2-1.2-2.3-1.2c-1,0-1.9,0.6-2.4,0.6c-0.6,0-1.5-0.6-2.5-0.6c-1.3,0-2.5,0.8-3.1,1.9c-1.4,2.3-0.3,5.8,1,7.8c0.7,0.9,1.4,1.9,2.4,1.9c0.9,0,1.3-0.6,2.4-0.6c1.1,0,1.4,0.6,2.4,0.6c1,0,1.7-0.9,2.3-1.9c0.7-1,1-1.4,1-1.4C18.4,14.2,17.1,13.7,17.1,12.6z M14.3,5.3c0.6-0.7,0.9-1.6,0.8-2.5c-0.8,0-1.7,0.5-2.3,1.2c-0.5,0.6-1,1.5-0.9,2.4C12.8,6.5,13.8,6,14.3,5.3z"
                        fill="white"
                        transform="scale(0.8) translate(3,3)"
                    />
                </svg>
            ),
            delay: 1.0,
            x: -60,
            y: 60,
            scale: 1.2
        },
        {
            id: 4,
            // Algorithm (Royal Purple / Deep Amethyst) - BrainCircuit
            icon: (
                <svg viewBox="0 0 24 24" className="w-12 h-12 drop-shadow-2xl" fill="none" stroke="none">
                    <rect width="24" height="24" rx="6" fill="url(#grad-algo)" />
                    <BrainCircuit className="text-white w-full h-full p-2" strokeWidth={2} />
                </svg>
            ),
            delay: 1.5,
            x: 70,
            y: 50,
            scale: 0.9
        }
    ];


    return (
        <div className="relative w-full h-full min-h-[200px] sm:min-h-[400px] lg:min-h-[500px] flex items-center justify-center perspective-1000">


            {/* Background/Base Area */}
            <div className="absolute inset-0 flex items-center justify-center z-0">
                <svg viewBox="0 0 400 300" className="w-full max-w-[450px] lg:max-w-[800px] h-auto overflow-visible transition-all duration-500">
                    <defs>
                        <linearGradient id="grid-fade" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.1" />
                            <stop offset="100%" stopColor="#94a3b8" stopOpacity="0" />
                        </linearGradient>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="2" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>

                        {/*
                           Icon Gradients
                        */}

                        {/* YouTube: Rich Gradient (Red to Deep Crimson) */}
                        <linearGradient id="grad-youtube" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#ef4444" />
                            <stop offset="100%" stopColor="#7f1d1d" />
                        </linearGradient>

                        {/* GitHub: Midnight Gradient (Slate to Black) */}
                        <linearGradient id="grad-github" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#334155" />
                            <stop offset="100%" stopColor="#020617" />
                        </linearGradient>

                        {/* Apple: Platinum Silver (Stylish & Premium) */}
                        <linearGradient id="grad-apple" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#94a3b8" />
                            <stop offset="100%" stopColor="#475569" />
                        </linearGradient>

                        {/* Algo: Royal Purple (Deep Amethyst) - Intelligence/Complex Logic */}
                        <linearGradient id="grad-algo" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#a855f7" />   {/* Purple 500 */}
                            <stop offset="100%" stopColor="#581c87" /> {/* Purple 900 */}
                        </linearGradient>
                    </defs>

                    {/* Isometric Grid Base */}
                    <motion.path
                        d="M 200 150 L 350 200 L 200 250 L 50 200 Z"
                        fill="url(#grid-fade)"
                        stroke="#cbd5e1"
                        strokeWidth="1"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    />

                    {/* Isometric Laptop Base */}
                    <motion.g
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        {/* Bottom Case */}
                        <path d="M 120 180 L 280 180 L 300 190 L 100 190 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
                        <path d="M 100 190 L 300 190 L 300 200 L 100 200 Z" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />

                        {/* Keyboard Area */}
                        <path d="M 130 184 L 270 184 L 275 188 L 125 188 Z" fill="#f1f5f9" />
                    </motion.g>

                    {/* Isometric Screen */}
                    <motion.g
                        initial={{ rotateX: 90, opacity: 0 }}
                        animate={{ rotateX: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1, type: "spring" }}
                        style={{ transformOrigin: "200px 180px" }}
                    >
                        {/* Screen Frame */}
                        <path d="M 120 180 L 280 180 L 280 80 L 120 80 Z" fill="#fff" stroke="#64748b" strokeWidth="2" />
                        {/* Screen Display - Dynamic Color Animation from Darkest Depths to Cyber Blue */}
                        <motion.rect
                            x="130" y="90" width="140" height="80"
                            stroke="#334155"
                            animate={{
                                fill: ["#020617", "#1e1b4b", "#0f172a", "#111827", "#172554", "#020617"]
                            }}
                            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Code Lines on Screen */}
                        <motion.g>
                            <motion.rect x="140" y="100" width="60" height="4" rx="2" fill="#38bdf8"
                                animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
                            <motion.rect x="140" y="110" width="100" height="2" fill="#475569" />
                            <motion.rect x="140" y="116" width="80" height="2" fill="#475569" />
                            <motion.rect x="140" y="122" width="90" height="2" fill="#475569" />
                            <motion.rect x="140" y="135" width="40" height="4" rx="2" fill="#c084fc"
                                animate={{ width: [40, 60, 40] }} transition={{ duration: 3, repeat: Infinity }} />
                        </motion.g>
                    </motion.g>

                    {/* Holographic Projection Lines - Adjusted visibility */}
                    <motion.g
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.4, 0] }}
                        transition={{ delay: 1.5, duration: 4, repeat: Infinity }}
                    >
                        <line x1="200" y1="180" x2="200" y2="50" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 4" />
                        <circle cx="200" cy="50" r="40" stroke="#38bdf8" strokeWidth="1" fill="none" opacity="0.3" />
                    </motion.g>
                </svg>
            </div>

            {/* Floating Icons - Adjusted Positions for Visibility */}
            {floatingIcons.map((item) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: 1,
                        scale: item.scale,
                        x: item.x * 0.8, // Compress range slightly
                        y: item.y * 0.8,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 100,
                        delay: item.delay,
                    }}
                    className="absolute z-20 drop-shadow-2xl"
                >
                    <motion.div
                        animate={{
                            y: [0, -6, 0],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: item.delay
                        }}
                    >
                        {/* Render raw icon with gradient fill */}
                        <div className="transform scale-[0.8] sm:scale-100">
                            {item.icon}
                        </div>
                    </motion.div>
                </motion.div>
            ))}

            {/* Animated Particles - Cool Blue/White for style */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={`particle-${i}`}
                    className="absolute w-2 h-2 rounded-full bg-slate-300/40"
                    initial={{ opacity: 0, x: 0, y: 0 }}
                    animate={{
                        opacity: [0, 1, 0],
                        x: [0, (Math.random() - 0.5) * 150],
                        y: [0, (Math.random() - 0.5) * 150],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "easeOut"
                    }}
                />
            ))}
        </div>
    );
};
