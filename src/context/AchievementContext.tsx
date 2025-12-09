
import React, { createContext, useContext, useEffect, useState } from 'react';

// Define Achievement Types
export type AchievementId =
    | 'visited_portfolio'
    | 'played_game'
    | 'used_fullscreen'
    | 'explorer_3_projects'
    | 'algo_master';

export interface Achievement {
    id: AchievementId;
    title: string;
    description: string;
    icon: string; // Emoji for simplicity or Lucide icon name
}

const ACHIEVEMENTS: Record<AchievementId, Achievement> = {
    visited_portfolio: {
        id: 'visited_portfolio',
        title: 'Hello World!',
        description: 'ポートフォリオに訪問しました。',
        icon: '👋',
    },
    played_game: {
        id: 'played_game',
        title: 'Gamer',
        description: 'ゲームをプレイしました。',
        icon: '🎮',
    },
    used_fullscreen: {
        id: 'used_fullscreen',
        title: 'Immersive',
        description: '全画面モードを使用しました。',
        icon: '⤢',
    },
    explorer_3_projects: {
        id: 'explorer_3_projects',
        title: 'Explorer',
        description: '3つのプロジェクトをチェックしました。',
        icon: '🧭',
    },
    algo_master: {
        id: 'algo_master',
        title: 'Algorithm Master',
        description: 'アルゴリズムビジュアライザーを開きました。',
        icon: '🧠',
    }
};

interface AchievementContextType {
    unlockedIds: AchievementId[];
    recentUnlock: Achievement | null; // For notification
    unlock: (id: AchievementId) => void;
    clearNotification: () => void;
    projectCount: number;
    incrementProjectCount: () => void;
}

const AchievementContext = createContext<AchievementContextType | undefined>(undefined);

export const AchievementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [unlockedIds, setUnlockedIds] = useState<AchievementId[]>(() => {
        // Load from local storage
        const stored = localStorage.getItem('portfolio_achievements');
        return stored ? JSON.parse(stored) : [];
    });

    const [projectCount, setProjectCount] = useState(() => {
        return Number(localStorage.getItem('portfolio_project_count') || 0);
    });

    const [recentUnlock, setRecentUnlock] = useState<Achievement | null>(null);

    useEffect(() => {
        localStorage.setItem('portfolio_achievements', JSON.stringify(unlockedIds));
    }, [unlockedIds]);

    useEffect(() => {
        localStorage.setItem('portfolio_project_count', String(projectCount));
    }, [projectCount]);

    const unlock = (id: AchievementId) => {
        if (!ACHIEVEMENTS[id]) return;

        setUnlockedIds((prev) => {
            if (prev.includes(id)) return prev;

            // New unlock!
            setRecentUnlock(ACHIEVEMENTS[id]);

            // Play sound? (Optional)
            // const audio = new Audio('/sounds/achievement.mp3');
            // audio.volume = 0.5;
            // audio.play().catch(() => {});

            return [...prev, id];
        });
    };

    const incrementProjectCount = () => {
        setProjectCount(prev => {
            const newCount = prev + 1;
            if (newCount === 3) {
                unlock('explorer_3_projects');
            }
            return newCount;
        });
    };

    // Initial visit unlock
    useEffect(() => {
        const timer = setTimeout(() => {
            unlock('visited_portfolio');
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const clearNotification = () => setRecentUnlock(null);

    const value = {
        unlockedIds,
        recentUnlock,
        unlock,
        clearNotification,
        projectCount,
        incrementProjectCount
    };

    return (
        <AchievementContext.Provider value={value}>
            {children}
        </AchievementContext.Provider>
    );
};

export const useAchievements = () => {
    const context = useContext(AchievementContext);
    if (context === undefined) {
        throw new Error('useAchievements must be used within an AchievementProvider');
    }
    return context;
};
