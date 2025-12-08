import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, RefreshCw, Settings2 } from 'lucide-react';

// --- Types ---
type AlgorithmType = 'Bubble Sort' | 'Quick Sort' | 'Merge Sort';

// --- Algorithms ---
// Note: These yield steps for visualization instead of returning result immediately

// --- Component ---
export const SortingVisualizer = () => {
    const [array, setArray] = useState<number[]>([]);
    const [algorithm, setAlgorithm] = useState<AlgorithmType>('Bubble Sort');

    const [isSorting, setIsSorting] = useState(false);
    const [isSorted, setIsSorted] = useState(false);
    const [comparisons, setComparisons] = useState(0);
    const [swaps, setSwaps] = useState(0);
    const [activeIndices, setActiveIndices] = useState<number[]>([]); // Indices currently being compared
    const [speed] = useState(50); // ms delay

    const containerRef = useRef<HTMLDivElement>(null);

    // Initialize random array
    const resetArray = () => {
        const newArr = [];
        const len = 30; // Number of bars
        for (let i = 0; i < len; i++) {
            newArr.push(Math.floor(Math.random() * 90) + 10); // 10-100
        }
        setArray(newArr);
        setIsSorted(false);
        setIsSorting(false);
        setComparisons(0);
        setSwaps(0);
        setActiveIndices([]);
    };

    useEffect(() => {
        resetArray();
    }, []);

    // Delay helper
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    // --- Sort Implementations ---

    const runBubbleSort = async () => {
        setIsSorting(true);
        const arr = [...array];
        let countComp = 0;
        let countSwap = 0;
        let sorted = false;

        for (let i = 0; i < arr.length; i++) {
            sorted = true;
            for (let j = 0; j < arr.length - i - 1; j++) {
                setActiveIndices([j, j + 1]);
                countComp++;
                setComparisons(countComp);
                await sleep(speed);

                if (arr[j] > arr[j + 1]) {
                    // Swap
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    setArray([...arr]);
                    countSwap++;
                    setSwaps(countSwap);
                    sorted = false;
                }
            }
            if (sorted) break;
        }

        setActiveIndices([]);
        setIsSorting(false);
        setIsSorted(true);
    };

    const runQuickSort = async () => {
        setIsSorting(true);
        let arr = [...array];
        let countComp = 0;
        let countSwap = 0;

        const partition = async (low: number, high: number) => {
            let pivot = arr[high];
            let i = low - 1;

            for (let j = low; j < high; j++) {
                setActiveIndices([j, high]); // Compare with pivot
                countComp++;
                setComparisons(countComp);
                await sleep(speed);

                if (arr[j] < pivot) {
                    i++;
                    // Swap
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                    setArray([...arr]);
                    countSwap++;
                    setSwaps(countSwap);
                }
            }
            [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
            setArray([...arr]);
            countSwap++;
            setSwaps(countSwap);
            return i + 1;
        };

        const quickSort = async (low: number, high: number) => {
            if (low < high) {
                const pi = await partition(low, high);
                await quickSort(low, pi - 1);
                await quickSort(pi + 1, high);
            }
        };

        await quickSort(0, arr.length - 1);
        setActiveIndices([]);
        setIsSorting(false);
        setIsSorted(true);
    };

    const startSort = () => {
        if (isSorting || isSorted) return;
        if (algorithm === 'Bubble Sort') runBubbleSort();
        if (algorithm === 'Quick Sort') runQuickSort();
        // Add others if needed
    };

    return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto py-6 text-slate-800">
            {/* Header */}
            <div className="mb-8 text-center space-y-2">
                <div className="inline-block rounded-full bg-purple-100 px-3 py-1 text-xs font-bold tracking-wider text-purple-700 uppercase">
                    VisuaLife
                </div>
                <h2 className="text-2xl font-bold">アルゴリズム・ビジュアライザー</h2>
                <div className="text-sm text-slate-500">ソートアルゴリズムの動きを目で見て理解しよう</div>
            </div>

            {/* Controls */}
            <div className="w-full max-w-2xl mb-6 p-4 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-wrap gap-4 items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <select
                            value={algorithm}
                            onChange={(e) => setAlgorithm(e.target.value as AlgorithmType)}
                            disabled={isSorting}
                            className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-2 px-4 pr-8 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer disabled:opacity-50"
                        >
                            <option>Bubble Sort</option>
                            <option>Quick Sort</option>
                        </select>
                        <Settings2 className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                    <button
                        onClick={resetArray}
                        disabled={isSorting}
                        className="p-2 text-slate-500 hover:text-slate-700 rounded-lg hover:bg-slate-100 disabled:opacity-50"
                        title="新しい配列"
                    >
                        <RefreshCw className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex items-center gap-6 text-sm tabular-nums">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Comparisons</span>
                        <span className="font-bold text-slate-700">{comparisons}</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Swaps</span>
                        <span className="font-bold text-slate-700">{swaps}</span>
                    </div>
                </div>

                <button
                    onClick={startSort}
                    disabled={isSorting || isSorted}
                    className="flex items-center gap-2 bg-purple-600 text-white px-6 py-2 rounded-lg font-bold shadow-md shadow-purple-200 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    <Play className="w-4 h-4" /> Start
                </button>
            </div>

            {/* Visualizer Frame */}
            <div className="w-full max-w-2xl h-80 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 p-8 flex items-end justify-center gap-[2px] sm:gap-1 overflow-hidden" ref={containerRef}>
                {array.map((value, idx) => {
                    const isActive = activeIndices.includes(idx);
                    const isCompleted = isSorted; // Simple 'all green' when done

                    let bg = 'bg-purple-300';
                    if (isActive) bg = 'bg-orange-500';
                    if (isCompleted) bg = 'bg-green-400';

                    return (
                        <motion.div
                            key={idx}
                            layoutId={`bar-${idx}`} // Use layout animation? No, just height
                            className={`w-full rounded-t-sm ${bg} transition-colors duration-100`}
                            style={{
                                height: `${value}%`,
                            }}
                            initial={false}
                            animate={{ height: `${value}%` }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        />
                    );
                })}
            </div>

            <div className="mt-4 flex gap-4 text-xs font-medium text-slate-500">
                <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-purple-300"></span> Value</div>
                <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-orange-500"></span> Compare</div>
                <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-green-400"></span> Sorted</div>
            </div>
        </div>
    );
};
