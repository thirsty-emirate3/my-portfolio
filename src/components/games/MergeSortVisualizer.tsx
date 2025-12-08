
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Pause, Sliders, Info, Check } from 'lucide-react';

// Types
type ArrayBar = {
    value: number;
    id: number;
    state: 'default' | 'compare' | 'swap' | 'sorted' | 'subgroup';
    color?: string;
};

const MergeSortVisualizer: React.FC = () => {
    const [array, setArray] = useState<ArrayBar[]>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(50); // ms delay
    const [arraySize, setArraySize] = useState(32);
    const [isSorted, setIsSorted] = useState(false);
    const [status, setStatus] = useState("Ready to sort");

    // Use refs for mutable state during async sorting
    const stopRef = useRef(false);
    const speedRef = useRef(50);
    speedRef.current = speed;

    // Initialize Array
    const resetArray = useCallback(() => {
        stopRef.current = true; // Stop any ongoing sort
        setIsPlaying(false);
        setIsSorted(false);
        setStatus("Ready to sort");

        // Slight delay to allow sort loop to exit
        setTimeout(() => {
            const newArray: ArrayBar[] = Array.from({ length: arraySize }, (_, i) => ({
                value: Math.floor(Math.random() * 90) + 10,
                id: i,
                state: 'default'
            }));
            setArray(newArray);
            stopRef.current = false;
        }, 100);
    }, [arraySize]);

    useEffect(() => {
        resetArray();
    }, [resetArray]);

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const mergeSort = async (arr: ArrayBar[], start: number, end: number, copyArr: ArrayBar[]) => {
        if (start >= end) return;
        if (stopRef.current) return;

        const mid = Math.floor((start + end) / 2);

        // Visualize Division
        setStatus(`Dividing [${start}-${end}]`);

        await mergeSort(arr, start, mid, copyArr);
        await mergeSort(arr, mid + 1, end, copyArr);

        if (stopRef.current) return;
        await merge(arr, start, mid, end, copyArr);
    };

    const merge = async (arr: ArrayBar[], start: number, mid: number, end: number, copyArr: ArrayBar[]) => {
        if (stopRef.current) return;
        setStatus(`Merging [${start}-${mid}] and [${mid + 1}-${end}]`);

        // Highlight subgroup being merged
        const subgroupColor = `hsl(${Math.random() * 360}, 70%, 80%)`;
        for (let i = start; i <= end; i++) {
            // Update main state for visualization
            setArray(prev => {
                const next = [...prev];
                next[i] = { ...next[i], state: 'subgroup', color: subgroupColor };
                return next;
            });
        }
        await delay(Math.max(10, 200 - speedRef.current * 1.8));

        let left = start;
        let right = mid + 1;
        const sortedSub: ArrayBar[] = [];

        // Helper to find original value in copyArr (using ID if possible would be better, but index is okay for simple merge)
        // Actually we need to work on the copyArr directly for values

        // Perform standard merge on temp array values
        const tempValues: ArrayBar[] = [];
        let l = left;
        let r = right;

        // We need to read from the CURRENT state of the array in the visualizer? 
        // No, standard merge uses a snapshot or auxiliary array.
        // Let's use the passed 'copyArr' which tracks values correctly throughout recursion.

        // Wait, standard merge needs an aux array.
        // Let's implement in-place visual logic carefully.

        const tempArr: ArrayBar[] = [];
        let i = start;
        let j = mid + 1;

        while (i <= mid && j <= end) {
            // Visual comparison
            if (stopRef.current) return;

            //  setArray(prev => {
            //     const next = [...prev];
            //     next[i].state = 'compare';
            //     next[j].state = 'compare';
            //     return next;
            //  });
            //  await delay(20);

            if (copyArr[i].value <= copyArr[j].value) {
                tempArr.push(copyArr[i++]);
            } else {
                tempArr.push(copyArr[j++]);
            }
        }
        while (i <= mid) tempArr.push(copyArr[i++]);
        while (j <= end) tempArr.push(copyArr[j++]);

        // Copy back to original array and update UI step-by-step
        for (let k = 0; k < tempArr.length; k++) {
            if (stopRef.current) return;

            const index = start + k;
            copyArr[index] = tempArr[k]; // Update internal tracker

            setArray(prev => {
                const next = [...prev];
                next[index] = { ...tempArr[k], state: 'sorted' }; // Mark as locally sorted
                return next;
            });
            await delay(Math.max(5, 100 - speedRef.current));

            // Play sound? (Skipped for simplicity)
        }
    };


    const handleStart = async () => {
        if (isPlaying) {
            stopRef.current = true;
            setIsPlaying(false);
            return;
        }

        setIsPlaying(true);
        stopRef.current = false;

        // Deep copy for algorithm logic
        const auxArray = [...array];

        await mergeSort(array, 0, array.length - 1, auxArray);

        if (!stopRef.current) {
            setStatus("Sorting Complete!");
            setIsSorted(true);
            setIsPlaying(false);
            setArray(prev => prev.map(item => ({ ...item, state: 'sorted', color: undefined })));
        }
    };

    return (
        <div className="flex flex-col h-full bg-slate-50 rounded-xl overflow-hidden">
            {/* Controls Header */}
            <div className="flex flex-wrap items-center justify-between p-4 bg-white border-b border-slate-200 gap-4">
                <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-700 mr-4">Merge Sort</h3>
                    <button
                        onClick={handleStart}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all shadow-sm ${isPlaying
                                ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                                : isSorted
                                    ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                    >
                        {isPlaying ? <><Pause size={18} /> Stop</> : isSorted ? <><RotateCcw size={18} /> Restart</> : <><Play size={18} /> Sort</>}
                    </button>
                    {isSorted && (
                        <button onClick={resetArray} className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition">
                            <RotateCcw size={18} />
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-6 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                        <Sliders size={16} />
                        <span>Speed</span>
                        <input
                            type="range"
                            min="1"
                            max="100"
                            value={speed}
                            onChange={(e) => setSpeed(Number(e.target.value))}
                            className="w-24 accent-blue-600"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <span>Items</span>
                        <input
                            type="range"
                            min="10"
                            max="100"
                            value={arraySize}
                            onChange={(e) => setArraySize(Number(e.target.value))}
                            disabled={isPlaying}
                            className="w-24 accent-blue-600 disabled:opacity-50"
                        />
                    </div>
                </div>
            </div>

            {/* Status Bar */}
            <div className="px-4 py-2 bg-slate-100 text-xs font-mono text-slate-500 flex justify-between">
                <span>{status}</span>
            </div>

            {/* Visualization Area */}
            <div className="flex-1 relative flex items-end justify-center px-4 pb-4 gap-[1px] md:gap-1 pt-8 min-h-[300px]">
                <AnimatePresence>
                    {array.map((bar) => (
                        <motion.div
                            layout
                            key={bar.id} // Use stable ID for FLIP animation if possible
                            className={`w-full rounded-t-md relative group`}
                            style={{
                                height: `${bar.value}%`,
                                backgroundColor: bar.color ? bar.color :
                                    bar.state === 'sorted' ? '#10b981' :
                                        bar.state === 'compare' ? '#f59e0b' :
                                            bar.state === 'subgroup' ? '#93c5fd' : '#3b82f6',
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        >
                            {/* Tooltip or Value (only if few items) */}
                            {arraySize < 40 && (
                                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-slate-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                    {bar.value}
                                </span>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Legend */}
            <div className="p-4 bg-white border-t border-slate-200 flex justify-center gap-6 text-xs text-slate-500">
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded-sm"></div>Unsorted</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-300 rounded-sm"></div>Current Group</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-500 rounded-sm"></div>Sorted</div>
            </div>
        </div>
    );
};

export default MergeSortVisualizer;
