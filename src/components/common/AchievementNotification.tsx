
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useAchievements } from '../../context/AchievementContext';

export const AchievementNotification = () => {
    const { recentUnlock, clearNotification } = useAchievements();

    useEffect(() => {
        if (recentUnlock) {
            const timer = setTimeout(() => {
                clearNotification();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [recentUnlock, clearNotification]);

    return (
        <AnimatePresence>
            {recentUnlock && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    className="fixed bottom-6 right-6 z-[100] max-w-sm w-full bg-white border-l-4 border-yellow-500 rounded-lg shadow-xl p-4 flex items-center gap-4 pointer-events-auto cursor-pointer hover:bg-slate-50 transition-colors"
                    onClick={clearNotification}
                >
                    <div className="flex-shrink-0 bg-yellow-100 p-3 rounded-full text-2xl">
                        {recentUnlock.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-yellow-600 uppercase tracking-wider mb-0.5">
                            実績解除！
                        </p>
                        <h4 className="text-sm font-bold text-slate-800 truncate">
                            {recentUnlock.title}
                        </h4>
                        <p className="text-xs text-slate-600 line-clamp-2">
                            {recentUnlock.description}
                        </p>
                    </div>
                    <button
                        onClick={(e) => { e.stopPropagation(); clearNotification(); }}
                        className="text-slate-400 hover:text-slate-600 p-1"
                    >
                        <X size={16} />
                    </button>

                    {/* Progress bar for auto-dismiss? Optional. */}
                    <motion.div
                        initial={{ width: "100%" }}
                        animate={{ width: "0%" }}
                        transition={{ duration: 5, ease: "linear" }}
                        className="absolute bottom-0 left-0 h-1 bg-yellow-500/20"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};
