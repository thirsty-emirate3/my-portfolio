
import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, LayoutTemplate } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Disc = {
    id: number;
    width: number; // percentage
    color: string;
};

// Map peg index to discs
type Towers = {
    [key: number]: Disc[];
};

const HanoiVisualizer: React.FC = () => {
    const [numDiscs, setNumDiscs] = useState(4);
    const [towers, setTowers] = useState<Towers>({ 0: [], 1: [], 2: [] });
    const [isPlaying, setIsPlaying] = useState(false);
    const [moves, setMoves] = useState(0);
    const [status, setStatus] = useState("Ready");

    const stopRef = useRef(false);
    const speed = 400; // ms

    useEffect(() => {
        resetTowers();
    }, [numDiscs]);

    const resetTowers = () => {
        stopRef.current = true;
        setIsPlaying(false);
        setMoves(0);
        setStatus("Ready");

        const initialDiscs: Disc[] = Array.from({ length: numDiscs }, (_, i) => ({
            id: i,
            width: 100 - (i * (80 / numDiscs)),
            color: `hsl(${200 + i * 20}, 70%, 60%)`
        }));

        setTowers({
            0: initialDiscs, // Stacked largest (index 0) to smallest? usually base is largest.
            // Actually, Hanoi discs are usually ID 0 = Smallest, ID N = Largest.
            // But visual stack: Bottom is Largest.
            // Let's say array[0] is BOTTOM (Largest). array[last] is TOP (Smallest).
            1: [],
            2: []
        });

        // Let's correct disc logic:
        // Disc 1 (Smallest) -> width 30%
        // Disc N (Largest) -> width 100%
        // Initial state: Tower 0 has [Disc N, ..., Disc 1]
    };

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const moveDisc = async (from: number, to: number) => {
        if (stopRef.current) return;

        setTowers(prev => {
            const next = { ...prev };
            const fromStack = [...next[from]];
            const toStack = [...next[to]];

            if (fromStack.length === 0) return prev;

            const disc = fromStack.pop()!;
            toStack.push(disc);

            next[from] = fromStack;
            next[to] = toStack;
            return next;
        });

        setMoves(m => m + 1);
        await delay(speed);
    };

    const solveHanoi = async (n: number, from: number, aux: number, to: number) => {
        if (n === 0 || stopRef.current) return;

        await solveHanoi(n - 1, from, to, aux);
        await moveDisc(from, to);
        await solveHanoi(n - 1, aux, from, to);
    };

    const handleStart = async () => {
        if (isPlaying) return;

        // If solved, reset first
        if (towers[2].length === numDiscs) {
            // Reset logic needs to be synchronous here or wait
            // For simplicity, user must click reset manually or we force reset
            resetTowers();
            await delay(100);
        }

        setIsPlaying(true);
        stopRef.current = false;
        setStatus("Solving...");

        await solveHanoi(numDiscs, 0, 1, 2);

        if (!stopRef.current) {
            setStatus("Complete!");
            setIsPlaying(false);
        }
    };


    return (
        <div className="flex flex-col h-full bg-slate-50 rounded-xl overflow-hidden select-none">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between p-4 bg-white border-b border-slate-200">
                <h3 className="font-bold text-slate-700 flex items-center gap-2">
                    <LayoutTemplate size={18} className="text-purple-500" />
                    Towers of Hanoi
                </h3>
                <div className="flex items-center gap-4">
                    <select
                        value={numDiscs}
                        onChange={(e) => setNumDiscs(Number(e.target.value))}
                        className="bg-slate-100 border border-slate-300 rounded px-2 py-1 text-sm"
                        disabled={isPlaying}
                    >
                        {[3, 4, 5, 6, 7].map(n => <option key={n} value={n}>{n} Discs</option>)}
                    </select>

                    <div className="flex gap-2">
                        <button
                            onClick={handleStart}
                            disabled={isPlaying}
                            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 disabled:opacity-50 transition"
                        >
                            <Play size={16} /> Solve
                        </button>
                        <button onClick={resetTowers} className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
                            <RotateCcw size={18} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="text-center py-2 text-xs font-mono text-slate-500 bg-slate-100 border-b border-slate-200">
                Moves: {moves} | Status: {status}
            </div>

            {/* Towers Area */}
            <div className="flex-1 flex items-end justify-center gap-4 md:gap-12 px-8 pb-12 pt-12 bg-slate-200 relative">

                {/* Base */}
                <div className="absolute bottom-10 left-8 right-8 h-4 bg-slate-400 rounded-full" />

                {[0, 1, 2].map(pegIndex => (
                    <div key={pegIndex} className="relative flex flex-col items-center justify-end w-32 h-64 group">
                        {/* Peg Pole */}
                        <div className="absolute bottom-0 w-3 h-64 bg-slate-400 rounded-t-lg z-0" />

                        {/* Discs */}
                        <div className="z-10 flex flex-col-reverse w-full items-center gap-1 mb-2">
                            <AnimatePresence>
                                {towers[pegIndex].map((disc) => (
                                    <motion.div
                                        layoutId={`disc-${disc.id}`}
                                        key={disc.id}
                                        initial={{ y: -100, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -20, opacity: 0 }}
                                        className="h-6 rounded-md shadow-sm border border-black/10"
                                        style={{
                                            width: `${disc.width}%`,
                                            backgroundColor: disc.color
                                        }}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Label */}
                        <div className="absolute -bottom-8 font-bold text-slate-500">
                            {pegIndex === 0 ? 'Start' : pegIndex === 1 ? 'Aux' : 'Dest'}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HanoiVisualizer;
