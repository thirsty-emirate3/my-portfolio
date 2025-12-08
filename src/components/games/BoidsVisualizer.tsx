
import React, { useEffect, useRef, useState } from 'react';
import { RotateCcw } from 'lucide-react';

type Boid = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    id: number;
};

const BoidsVisualizer: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [boids, setBoids] = useState<Boid[]>([]);
    const [separation, setSeparation] = useState(4);
    const [alignment, setAlignment] = useState(4);
    const [cohesion, setCohesion] = useState(4);
    const [visualRange] = useState(60);

    const COUNT = 100;

    useEffect(() => {
        resetBoids();
    }, []);

    const resetBoids = () => {
        const arr = [];
        for (let i = 0; i < COUNT; i++) {
            arr.push({
                x: Math.random() * 600,
                y: Math.random() * 400,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                id: i
            });
        }
        setBoids(arr);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let reqId: number;

        // Simulation Parameters
        const PROTECTED_RANGE = 20; // Collision avoidance dist
        const SPEED_LIMIT = 4;
        const MARGIN = 50;

        const update = () => {
            const width = canvas.width;
            const height = canvas.height;

            // Clear
            ctx.fillStyle = '#f8fafc'; // Slate 50
            ctx.fillRect(0, 0, width, height);

            // Update Logic (Simplified N^2 for 100 boids is fine)
            boids.forEach(boid => {
                let closeDx = 0;
                let closeDy = 0;
                let velAvgX = 0;
                let velAvgY = 0;
                let posAvgX = 0;
                let posAvgY = 0;
                let neighbors = 0;

                boids.forEach(other => {
                    if (boid.id === other.id) return;

                    const dx = other.x - boid.x;
                    const dy = other.y - boid.y;
                    const distSq = dx * dx + dy * dy;

                    // Separation (Protected Range)
                    if (distSq < PROTECTED_RANGE * PROTECTED_RANGE) {
                        closeDx += boid.x - other.x;
                        closeDy += boid.y - other.y;
                    }

                    // Alignment & Cohesion (Visual Range)
                    if (distSq < visualRange * visualRange) {
                        velAvgX += other.vx;
                        velAvgY += other.vy;
                        posAvgX += other.x;
                        posAvgY += other.y;
                        neighbors++;
                    }
                });

                // Apply Rules
                // 1. Separation
                boid.vx += closeDx * (separation * 0.05);
                boid.vy += closeDy * (separation * 0.05);

                if (neighbors > 0) {
                    // 2. Alignment
                    velAvgX /= neighbors;
                    velAvgY /= neighbors;
                    boid.vx += (velAvgX - boid.vx) * (alignment * 0.02);
                    boid.vy += (velAvgY - boid.vy) * (alignment * 0.02);

                    // 3. Cohesion
                    posAvgX /= neighbors;
                    posAvgY /= neighbors;
                    boid.vx += (posAvgX - boid.x) * (cohesion * 0.005);
                    boid.vy += (posAvgY - boid.y) * (cohesion * 0.005);
                }

                // Screen Edges (Wrap? Turn?) Let's Turn.
                if (boid.x < MARGIN) boid.vx += 1;
                if (boid.x > width - MARGIN) boid.vx -= 1;
                if (boid.y < MARGIN) boid.vy += 1;
                if (boid.y > height - MARGIN) boid.vy -= 1;

                // Limit Speed
                const speed = Math.sqrt(boid.vx * boid.vx + boid.vy * boid.vy);
                if (speed > SPEED_LIMIT) {
                    boid.vx = (boid.vx / speed) * SPEED_LIMIT;
                    boid.vy = (boid.vy / speed) * SPEED_LIMIT;
                }

                // Apply
                boid.x += boid.vx;
                boid.y += boid.vy;

                // Draw Boid
                ctx.save();
                ctx.translate(boid.x, boid.y);
                ctx.rotate(Math.atan2(boid.vy, boid.vx));
                ctx.beginPath();
                ctx.moveTo(6, 0); // Nose
                ctx.lineTo(-4, 3);
                ctx.lineTo(-4, -3);
                ctx.fillStyle = `hsl(${200 + boid.id % 40}, 80%, 60%)`;
                ctx.fill();
                ctx.restore();
            });

            reqId = requestAnimationFrame(update);
        };

        reqId = requestAnimationFrame(update);
        return () => cancelAnimationFrame(reqId);
    }, [boids, separation, alignment, cohesion, visualRange]);


    return (
        <div className="flex flex-col h-full bg-slate-50 rounded-xl overflow-hidden select-none">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-white border-b border-slate-200">
                <h3 className="font-bold text-slate-700">Flocking Boids</h3>
                <button onClick={resetBoids} className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
                    <RotateCcw size={18} />
                </button>
            </div>

            {/* Controls */}
            <div className="bg-slate-50 p-3 border-b border-slate-200 flex flex-wrap gap-4 text-xs text-slate-600">
                <label className="flex items-center gap-2">
                    Sep <input type="range" min="0" max="10" value={separation} onChange={e => setSeparation(Number(e.target.value))} className="w-16" />
                </label>
                <label className="flex items-center gap-2">
                    Align <input type="range" min="0" max="10" value={alignment} onChange={e => setAlignment(Number(e.target.value))} className="w-16" />
                </label>
                <label className="flex items-center gap-2">
                    Cohes <input type="range" min="0" max="10" value={cohesion} onChange={e => setCohesion(Number(e.target.value))} className="w-16" />
                </label>
            </div>

            <div className="flex-1 bg-white">
                <canvas
                    ref={canvasRef}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
};

export default BoidsVisualizer;
