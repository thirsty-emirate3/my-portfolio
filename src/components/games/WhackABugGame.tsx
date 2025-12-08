import React, { useState, useEffect, useRef } from 'react';
import { Bug, Play, RotateCcw, Info, MousePointer2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SoundController } from '../../utils/SoundController';
import { GameInstructions } from '../common/GameInstructions';

const GRID_SIZE = 9; // 3x3
const GAME_DURATION = 30;

const WhackABugGame: React.FC = () => {
    const [bugs, setBugs] = useState<number[]>([]); // Indices of active bugs
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
    const [gameState, setGameState] = useState<'idle' | 'playing' | 'finished'>('idle');
    const [showHelp, setShowHelp] = useState(false);

    // Config
    const spawnIntervalRef = useRef<number>();
    const timerRef = useRef<number>();

    const startGame = () => {
        setScore(0);
        setTimeLeft(GAME_DURATION);
        setGameState('playing');
        setBugs([]);
        SoundController.playClick();

        timerRef.current = window.setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    endGame();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        spawnLoop();
    };

    const endGame = () => {
        setGameState('finished');
        if (timerRef.current) clearInterval(timerRef.current);
        if (spawnIntervalRef.current) clearTimeout(spawnIntervalRef.current);
        setBugs([]);
        SoundController.playGameOver();
    };

    const spawnLoop = () => {
        if (gameState === 'finished') return;

        // Random spawn
        const spawnTime = Math.random() * 800 + 400; // 400-1200ms
        spawnIntervalRef.current = window.setTimeout(() => {
            setBugs(prev => {
                if (prev.length > 2) return prev; // Max 3 bugs
                const newBug = Math.floor(Math.random() * GRID_SIZE);
                if (!prev.includes(newBug)) return [...prev, newBug];
                return prev;
            });
            spawnLoop();
        }, spawnTime);
    };

    // Auto-remove bugs after some time (fleeting bugs)
    useEffect(() => {
        if (gameState !== 'playing') return;
        const interval = setInterval(() => {
            setBugs(prev => {
                if (prev.length === 0) return prev;
                // Randomly remove one to simulate running away
                if (Math.random() > 0.7) return prev.slice(1);
                return prev;
            });
        }, 2000);
        return () => clearInterval(interval);
    }, [gameState]);

    const whack = (index: number) => {
        if (bugs.includes(index)) {
            setScore(s => s + 1);
            setBugs(prev => prev.filter(i => i !== index));
            SoundController.playPop(); // Splat sound
        } else {
            setScore(s => Math.max(0, s - 1)); // Penalty
            SoundController.playError(); // Miss sound
        }
    };

    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
            if (spawnIntervalRef.current) clearTimeout(spawnIntervalRef.current);
        };
    }, []);

    return (
        <div className="flex flex-col items-center p-6 bg-rose-50 rounded-xl select-none relative shadow-xl">
            <div className="flex justify-between w-full max-w-[300px] mb-6 relative z-10">
                <button onClick={() => setShowHelp(true)} className="text-rose-300 hover:text-rose-500"><Info size={24} /></button>
                <div className="text-3xl font-bold font-mono text-rose-600">{timeLeft}s</div>
                <div className="text-3xl font-bold font-mono text-slate-700">{score}</div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6 relative z-0">
                {Array.from({ length: GRID_SIZE }).map((_, i) => (
                    <div
                        key={i}
                        className="w-20 h-20 bg-slate-200 rounded-full shadow-inner flex items-center justify-center relative overflow-hidden cursor-crosshair active:scale-95 transition-transform"
                        onClick={() => gameState === 'playing' && whack(i)}
                    >
                        <AnimatePresence>
                            {bugs.includes(i) && (
                                <motion.div
                                    initial={{ scale: 0, y: 20 }}
                                    animate={{ scale: 1, y: 0 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    className="text-slate-800"
                                >
                                    <Bug size={40} className="fill-red-400 text-red-600 filter drop-shadow-md" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>

            {gameState !== 'playing' && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded-xl animate-in fade-in">
                    {gameState === 'finished' && (
                        <div className="mb-4 text-center">
                            <div className="text-slate-500 font-bold uppercase tracking-wider text-sm mb-1">Final Score</div>
                            <div className="text-5xl font-black text-rose-600">{score}</div>
                        </div>
                    )}
                    <button onClick={startGame} className="bg-rose-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2 mx-auto">
                        {gameState === 'idle' ? <Play /> : <RotateCcw />}
                        {gameState === 'idle' ? 'Start Debugging' : 'Debug Again'}
                    </button>
                    {gameState === 'idle' && <p className="text-xs text-slate-500 mt-4 opacity-70">Tap bugs to squash them!</p>}
                </div>
            )}

            <GameInstructions
                isOpen={showHelp}
                onClose={() => setShowHelp(false)}
                title="Whack-a-Bug"
                rules={[
                    "Click on the red bugs as they appear to squash them.",
                    "Bugs disappear quickly, so be fast!",
                    "Don't click on empty holes, or you'll lose points.",
                    "Get the highest score before time runs out."
                ]}
                controls={[
                    { icon: <MousePointer2 size={20} />, instruction: "Click Bug to Squash" },
                ]}
                mobileControls={[
                    { icon: "👆", instruction: "Tap Bug to Squash" }
                ]}
            />
        </div>
    );
};

export default WhackABugGame;
