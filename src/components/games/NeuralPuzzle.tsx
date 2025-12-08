import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, Info } from 'lucide-react';

// --- Types ---

interface Level {
    id: number;
    description: string;
    inputs: number[];
    targetOutput: number;
    hiddenCount: number;
}

const LEVELS: Level[] = [
    {
        id: 1,
        description: "正の信号を伝えよう！ (1 を送る)",
        inputs: [1],
        targetOutput: 1,
        hiddenCount: 1,
    },
    {
        id: 2,
        description: "信号を反転させよう (正を負に)",
        inputs: [1],
        targetOutput: -1,
        hiddenCount: 1,
    },
    {
        id: 3,
        description: "力を合わせよう (1+1=2)",
        inputs: [1, 1],
        targetOutput: 2,
        hiddenCount: 1,
    },
    {
        id: 4,
        description: "ノイズを打ち消そう (ゼロにする)",
        inputs: [1, 1],
        targetOutput: 0,
        hiddenCount: 2,
    },
    {
        id: 5,
        description: "複雑なネットワーク (混合)",
        inputs: [1, -1],
        targetOutput: 2,
        hiddenCount: 2,
    },
];

type Weight = -1 | 0 | 1;

export const NeuralPuzzle = () => {
    const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
    const [weights, setWeights] = useState<Record<string, Weight>>({});
    const [isWon, setIsWon] = useState(false);

    const level = LEVELS[currentLevelIndex] || LEVELS[0];

    useEffect(() => {
        const initialWeights: Record<string, Weight> = {};
        const inputCount = level.inputs.length;

        // Input -> Hidden
        for (let i = 0; i < inputCount; i++) {
            for (let h = 0; h < level.hiddenCount; h++) {
                initialWeights[`i${i}-h${h}`] = 0;
            }
        }
        // Hidden -> Output (Fixed 1 output)
        for (let h = 0; h < level.hiddenCount; h++) {
            initialWeights[`h${h}-o0`] = 0;
        }
        setWeights(initialWeights);
        setIsWon(false);
    }, [level]);

    const calculation = useMemo(() => {
        if (Object.keys(weights).length === 0) return { hiddenValues: [], finalOutput: 0 };

        // Input -> Hidden
        const hiddenValues: number[] = [];
        for (let h = 0; h < level.hiddenCount; h++) {
            let sum = 0;
            for (let i = 0; i < level.inputs.length; i++) {
                sum += level.inputs[i] * (weights[`i${i}-h${h}`] || 0);
            }
            hiddenValues.push(sum);
        }

        // Hidden -> Output
        let finalOutput = 0;
        for (let h = 0; h < level.hiddenCount; h++) {
            finalOutput += hiddenValues[h] * (weights[`h${h}-o0`] || 0);
        }

        return { hiddenValues, finalOutput };
    }, [weights, level]);

    useEffect(() => {
        if (calculation.finalOutput === level.targetOutput) {
            setIsWon(true);
        } else {
            setIsWon(false);
        }
    }, [calculation, level]);

    const toggleWeight = (id: string) => {
        if (isWon) return;
        setWeights(prev => {
            const current = prev[id];
            // Cycle: 0 -> 1 -> -1 -> 0
            const next = current === 0 ? 1 : current === 1 ? -1 : 0;
            return { ...prev, [id]: next };
        });
    };

    const nextLevel = () => {
        if (currentLevelIndex < LEVELS.length - 1) {
            setCurrentLevelIndex(prev => prev + 1);
        } else {
            setCurrentLevelIndex(0);
        }
    };

    return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto py-8 text-slate-900">

            {/* Header */}
            <div className="mb-8 text-center space-y-2">
                <div className="inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-bold tracking-wider text-orange-700 uppercase">
                    Level {level.id}
                </div>
                <h2 className="text-2xl font-bold">{level.description}</h2>
                <div className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm border border-slate-200">
                    Target Output: <span className="font-mono text-lg font-bold text-slate-900">{level.targetOutput}</span>
                </div>

                {/* Legend - Moved to top for visibility */}
                <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-600">
                    <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
                        <span className="block h-2 w-6 rounded-full bg-slate-200"></span>
                        <span>0 (OFF)</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100 shadow-sm text-blue-700">
                        <span className="block h-2 w-6 rounded-full bg-blue-500"></span>
                        <span>+1 (On)</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-red-50 px-3 py-1.5 rounded-full border border-red-100 shadow-sm text-red-700">
                        <span className="block h-2 w-6 rounded-full bg-red-500"></span>
                        <span>-1 (Invert)</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-500 font-bold animate-pulse">
                        <Info className="h-4 w-4" />
                        <span>Click lines to play!</span>
                    </div>
                </div>
            </div>

            {/* Game Board Container */}
            <div className="relative w-full rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 p-4 md:p-10 overflow-hidden min-h-[400px]">

                {/* Layer Labels */}
                <div className="absolute top-4 left-0 w-full flex justify-between px-6 md:px-24 text-[10px] font-bold text-slate-400 uppercase tracking-widest pointer-events-none z-0">
                    <span>Input</span>
                    <span>Hidden</span>
                    <span>Output</span>
                </div>

                {/* Flex Layout for Columns */}
                <div className="flex justify-between items-center relative z-10 h-full gap-2 md:gap-8">

                    {/* Input Column */}
                    <div className="flex flex-col gap-8 items-center justify-center min-w-[50px] md:min-w-[60px]">
                        {level.inputs.map((val, i) => (
                            <Node key={`in-${i}`} value={val} type="input" />
                        ))}
                    </div>

                    {/* Input -> Hidden Connections (SVG Layer 1) */}
                    <div className="flex-1 relative h-[300px] md:h-[350px]">
                        <SvgConnections
                            level={level}
                            weights={weights}
                            onToggle={toggleWeight}
                            side="left"
                        />
                    </div>

                    {/* Hidden Column */}
                    <div className="flex flex-col gap-12 items-center justify-center min-w-[50px] md:min-w-[60px]">
                        {Array.from({ length: level.hiddenCount }).map((_, h) => (
                            <Node key={`hid-${h}`} value={calculation.hiddenValues[h]} type="hidden" />
                        ))}
                    </div>

                    {/* Hidden -> Output Connections (SVG Layer 2) */}
                    <div className="flex-1 relative h-[300px] md:h-[350px]">
                        <SvgConnections
                            level={level}
                            weights={weights}
                            onToggle={toggleWeight}
                            side="right"
                        />
                    </div>

                    {/* Output Column */}
                    <div className="flex flex-col gap-8 items-center justify-center min-w-[50px] md:min-w-[60px]">
                        <Node
                            value={calculation.finalOutput}
                            type="output"
                            matched={isWon}
                        />
                    </div>
                </div>

                {/* Win Overlay */}
                <AnimatePresence>
                    {isWon && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm"
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 10 }}
                                animate={{ scale: 1, y: 0 }}
                                className="flex flex-col items-center gap-4 text-center p-6"
                            >
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 shadow-sm mb-2">
                                    <Check className="h-8 w-8" />
                                </div>
                                <div className="mb-6 space-y-2">
                                    <h3 className="text-xl font-bold text-slate-800">
                                        Level {level.id}: {level.description}
                                    </h3>
                                    <p className="text-sm text-slate-600">Neural pathway established.</p>

                                </div>
                                <button
                                    onClick={nextLevel}
                                    className="mt-4 flex items-center gap-2 rounded-full bg-slate-900 px-8 py-3 font-bold text-white shadow-lg shadow-slate-900/20 transition hover:scale-105 active:scale-95"
                                >
                                    {currentLevelIndex < LEVELS.length - 1 ? "Next Level" : "Reset Game"} <ChevronRight className="h-4 w-4" />
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>

        </div>
    );
};

// --- Sub Components ---

const Node = ({ value, type, matched }: { value: number, type: 'input' | 'hidden' | 'output', matched?: boolean }) => {
    let bg = 'bg-white';
    let border = 'border-slate-200';
    let text = 'text-slate-700';

    if (type === 'input') {
        bg = 'bg-slate-50';
    } else if (type === 'hidden') {
        bg = 'bg-slate-50';
    } else if (type === 'output') {
        bg = matched ? 'bg-green-500' : 'bg-slate-100';
        border = matched ? 'border-green-600' : 'border-slate-300';
        text = matched ? 'text-white' : 'text-slate-700';
    }

    return (
        <div className={`flex h-14 w-14 items-center justify-center rounded-full border-2 ${bg} ${border} ${text} shadow-sm z-20 transition-all duration-300`}>
            <span className="font-mono font-bold text-lg">{value}</span>
        </div>
    );
}

const SvgConnections = ({ level, weights, onToggle, side }: { level: Level, weights: Record<string, Weight>, onToggle: (id: string) => void, side: 'left' | 'right' }) => {
    // Refined Y distribution for small counts
    const getSafeY = (index: number, count: number) => {
        // If we are using flex-col gap-8 or gap-12, the items are stacked in the CENTER.
        // So 0% and 100% is not where the nodes are.
        // The nodes are centered.
        // This is tricky without knowing container height.
        // WORKAROUND: Assume the SVG container is exactly covering the area between the centers of columns?
        // No, the SVG container is `h-[300px]`.
        // Let's rely on `justify-content` in the Node columns.
        // I updated Node columns to `justify-center`. So they are in the middle.
        //
        // If I change Node columns to `justify-between`, the `getY` logic (0% to 100%) works perfectly.
        // Let's assume the component update implies changing CSS to `justify-between` for nodes logic.
        // Or I can calculate "spread" from center.
        //
        // Let's switch Node columns to `justify-between` via inline style or class in main render?
        // Actually, let's use a simpler heuristic for visualization:
        // Just draw lines from "spread" positions.
        //
        // BETTER: Just use standard spacing.
        // 1 node: 50%
        // 2 nodes: 25%, 75%
        // 3 nodes: 16%, 50%, 84%
        // etc.
        const step = 100 / count;
        return (step * index) + (step / 2);
    };

    if (side === 'left') {
        const inCount = level.inputs.length;
        const hidCount = level.hiddenCount;
        return (
            <svg className="absolute inset-0 h-full w-full overflow-visible pointer-events-none">
                {level.inputs.map((_, i) => {
                    const y1 = getSafeY(i, inCount);
                    return Array.from({ length: hidCount }).map((_, h) => {
                        const y2 = getSafeY(h, hidCount);
                        const id = `i${i}-h${h}`;
                        const w = weights[id] || 0;
                        return (
                            <ConnectionLine
                                key={id}
                                x1="0%" y1={`${y1}%`}
                                x2="100%" y2={`${y2}%`}
                                weight={w}
                                onClick={() => onToggle(id)}
                            />
                        );
                    })
                })}
            </svg>
        );
    }

    if (side === 'right') {
        const hidCount = level.hiddenCount;
        return (
            <svg className="absolute inset-0 h-full w-full overflow-visible pointer-events-none">
                {Array.from({ length: hidCount }).map((_, h) => {
                    const y1 = getSafeY(h, hidCount);
                    return (
                        <ConnectionLine
                            key={`h${h}-o0`}
                            x1="0%" y1={`${y1}%`}
                            x2="100%" y2="50%"
                            weight={weights[`h${h}-o0`] || 0}
                            onClick={() => onToggle(`h${h}-o0`)}
                        />
                    );
                })}
            </svg>
        );
    }
    return null;
}

const ConnectionLine = ({ x1, y1, x2, y2, weight, onClick }: { x1: string, y1: string, x2: string, y2: string, weight: Weight, onClick: () => void }) => {
    let strokeColor = 'stroke-slate-200';
    let strokeWidth = 2;
    let opacity = 0.5;

    if (weight === 1) {
        strokeColor = 'stroke-blue-500';
        strokeWidth = 4;
        opacity = 1;
    }
    if (weight === -1) {
        strokeColor = 'stroke-red-500';
        strokeWidth = 4;
        opacity = 1;
    }

    return (
        <g onClick={onClick} className="cursor-pointer group pointer-events-auto">
            {/* Click target (invisible thick line) */}
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="transparent" strokeWidth="60" />

            {/* Visible line */}
            <line
                x1={x1} y1={y1} x2={x2} y2={y2}
                className={`${strokeColor} transition-all duration-300 ease-out`}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                opacity={opacity}
            />

            {/* Hover effect (optional) */}
            <line
                x1={x1} y1={y1} x2={x2} y2={y2}
                className="stroke-orange-400 opacity-0 transition-opacity duration-200 group-hover:opacity-40"
                strokeWidth="6"
                strokeLinecap="round"
            />
        </g>
    );
}
