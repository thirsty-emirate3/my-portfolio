
import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, MapPin } from 'lucide-react';

type Point = { x: number; y: number };

const TSPVisualizer: React.FC = () => {
    const [cities, setCities] = useState<Point[]>([]);
    const [bestPath, setBestPath] = useState<number[]>([]);
    const [points, setPoints] = useState<number>(20);
    const [isPlaying, setIsPlaying] = useState(false);

    const [bestDistance, setBestDistance] = useState(Infinity);
    const [currentPath, setCurrentPath] = useState<number[]>([]); // For visualization of 'trying'

    const stopRef = useRef(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Init
    useEffect(() => {
        resetCities();
    }, [points]);

    const resetCities = () => {
        stopRef.current = true;
        setIsPlaying(false);
        const newCities = [];
        for (let i = 0; i < points; i++) {
            newCities.push({
                x: Math.random() * 80 + 10, // 10-90%
                y: Math.random() * 80 + 10
            });
        }
        setCities(newCities);

        // Initial random path
        const initialPath = newCities.map((_, i) => i);
        setBestPath(initialPath);
        setCurrentPath(initialPath);
        const d = calcDistance(newCities, initialPath);

        setBestDistance(d);
        stopRef.current = false;
    };

    const calcDistance = (cityList: Point[], path: number[]) => {
        let sum = 0;
        for (let i = 0; i < path.length - 1; i++) {
            const a = cityList[path[i]];
            const b = cityList[path[i + 1]];
            sum += Math.hypot(a.x - b.x, a.y - b.y);
        }
        // Return to start
        const last = cityList[path[path.length - 1]];
        const first = cityList[path[0]];
        sum += Math.hypot(last.x - first.x, last.y - first.y);
        return sum;
    };

    // Draw
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);

        // Draw paths
        const drawPath = (pathIndices: number[], color: string, width: number) => {
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.lineWidth = width;
            if (pathIndices.length > 0) {
                const first = cities[pathIndices[0]];
                ctx.moveTo(first.x / 100 * w, first.y / 100 * h);

                for (let i = 1; i < pathIndices.length; i++) {
                    const p = cities[pathIndices[i]];
                    ctx.lineTo(p.x / 100 * w, p.y / 100 * h);
                }
                ctx.closePath(); // loop back
                ctx.stroke();
            }
        };

        // Draw current trying path (faint)
        if (isPlaying) {
            drawPath(currentPath, 'rgba(200, 200, 200, 0.5)', 2);
        }

        // Draw best path (strong)
        drawPath(bestPath, '#10b981', 3);

        // Draw cities
        cities.forEach(city => {
            ctx.beginPath();
            ctx.fillStyle = '#3b82f6';
            ctx.arc(city.x / 100 * w, city.y / 100 * h, 6, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = 'white'; // dot
            ctx.beginPath();
            ctx.arc(city.x / 100 * w, city.y / 100 * h, 2, 0, Math.PI * 2);
            ctx.fill();
        });

    }, [cities, bestPath, currentPath, isPlaying]);


    const solveTSP = async () => {
        if (isPlaying) return;
        setIsPlaying(true);
        stopRef.current = false;

        let current = [...bestPath];
        let currentDist = bestDistance;

        // Simple Random Swap / Simulated Annealing - ish (Just random swaps for visualization)
        // Or 2-opt for better results? Let's do 2-opt, it looks cooler "unwinding".

        // Actually, pure random swap is slow. Let's do a simple optimization loop.
        // Try swapping every pair, if better keep it. (2-opt)

        for (let loop = 0; loop < 50; loop++) { // Max loops to prevent infinite
            let improved = false;

            for (let i = 0; i < current.length - 1; i++) {
                for (let j = i + 1; j < current.length; j++) {
                    if (stopRef.current) return;

                    // 2-opt swap
                    const newPath = twoOptSwap(current, i, j);
                    const newDist = calcDistance(cities, newPath);

                    setCurrentPath(newPath); // visualize attempt

                    if (newDist < currentDist) {
                        current = newPath;
                        currentDist = newDist;
                        setBestPath(current);
                        setBestDistance(currentDist);
                        improved = true;
                        await new Promise(r => setTimeout(r, 20)); // delay for view
                    }

                    // Speed limiter for visualization
                    if (Math.random() > 0.9) await new Promise(r => setTimeout(r, 5));
                }
            }
            if (!improved) break; // Local optimum reached
        }

        setIsPlaying(false);
    };

    const twoOptSwap = (path: number[], i: number, j: number) => {
        const newPath = [...path];
        // Reverse segment between i and j
        // Actually 2-opt is: take path[0..i-1], then path[i..k] reversed, then path[k+1..end]
        // Here we just reverse the sub-segment
        // Indices are tricky. Simplest is reversing newPath.slice(i, j+1)

        let left = i;
        let right = j;
        while (left < right) {
            const temp = newPath[left];
            newPath[left] = newPath[right];
            newPath[right] = temp;
            left++;
            right--;
        }
        return newPath;
    };

    return (
        <div className="flex flex-col h-full bg-slate-50 rounded-xl overflow-hidden select-none">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between p-4 bg-white border-b border-slate-200">
                <h3 className="font-bold text-slate-700 flex items-center gap-2">
                    <MapPin size={18} className="text-emerald-500" />
                    Traveling Salesman
                </h3>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <span>Points:</span>
                        <input
                            type="range" min="5" max="50"
                            value={points}
                            onChange={(e) => setPoints(Number(e.target.value))}
                            className="w-24 accent-emerald-500"
                            disabled={isPlaying}
                        />
                        <span className="w-6">{points}</span>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={solveTSP}
                            disabled={isPlaying}
                            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 disabled:opacity-50 transition"
                        >
                            <Play size={16} /> Optimize
                        </button>
                        <button onClick={resetCities} className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
                            <RotateCcw size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="text-center py-2 text-xs font-mono text-slate-500 bg-slate-100 border-b border-slate-200">
                Best Distance: {bestDistance.toFixed(1)} (Lower is better)
            </div>

            {/* Canvas */}
            <div className="flex-1 relative flex items-center justify-center bg-slate-200">
                <canvas
                    ref={canvasRef}
                    width={600}
                    height={400}
                    className="w-full h-full max-w-[800px] max-h-[500px] object-contain bg-white shadow-sm"
                />
            </div>
        </div>
    );
};

export default TSPVisualizer;
