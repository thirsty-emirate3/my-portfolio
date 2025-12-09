
import { motion } from 'framer-motion';
import { useAchievements, AchievementId } from '../context/AchievementContext';

const ACHIEVEMENTS_DATA = [
    { id: 'visited_portfolio', icon: '👋', label: 'Hello World' },
    { id: 'played_game', icon: '🎮', label: 'Gamer' },
    { id: 'explorer_3_projects', icon: '🧭', label: 'Explorer' },
    { id: 'algo_master', icon: '🧠', label: 'Algorithm' },
    { id: 'used_fullscreen', icon: '⤢', label: 'Immersive' },
];

export const AchievementDisplay = () => {
    const { unlockedIds } = useAchievements();

    return (
        <div className="relative w-full h-full min-h-[300px] flex items-center justify-center p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 relative z-10">
                {ACHIEVEMENTS_DATA.map((ach, index) => {
                    const isUnlocked = unlockedIds.includes(ach.id as AchievementId);

                    return (
                        <motion.div
                            key={ach.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className={`
                relative flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 backdrop-blur-sm transition-all duration-500
                ${isUnlocked
                                    ? 'bg-white/80 border-orange-200 shadow-lg shadow-orange-100/50 scale-105'
                                    : 'bg-slate-100/50 border-slate-200/50 opacity-60 grayscale'
                                }
              `}
                        >
                            <div className="text-4xl">{ach.icon}</div>
                            <span className={`text-xs font-bold tracking-wider uppercase ${isUnlocked ? 'text-orange-700' : 'text-slate-400'}`}>
                                {ach.label}
                            </span>

                            {!isUnlocked && (
                                <div className="absolute inset-0 bg-slate-100/10 flex items-center justify-center rounded-xl">
                                    <span className="text-lg opacity-40">🔒</span>
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {/* Decorative Background Circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-orange-100/40 via-blue-100/40 to-purple-100/40 blur-3xl rounded-full -z-10" />
        </div>
    );
};
