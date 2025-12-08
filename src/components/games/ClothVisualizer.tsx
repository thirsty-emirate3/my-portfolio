
import React, { useEffect, useRef, useState } from 'react';
import { RotateCcw, Wind } from 'lucide-react';

type Point = {
    x: number;
    y: number;
    oldx: number;
    oldy: number;
    pinned: boolean;
};

type Stick = {
    p0: Point;
    p1: Point;
    length: number;
    isActive: boolean;
};

const ClothVisualizer: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [points, setPoints] = useState<Point[]>([]);
    const [sticks, setSticks] = useState<Stick[]>([]);
    const [mouse, setMouse] = useState({ x: 0, y: 0, isDown: false, btn: 0 }); // btn 0: pull, 2: cut

    // Physics Config
    const friction = 0.99;
    const bounce = 0.9;
    const gravity = 0.5;
    const cols = 20;
    const rows = 15;
    const spacing = 15;

    // Initialization
    useEffect(() => {
        resetCloth();
    }, []);

    const resetCloth = () => {
        const newPoints: Point[] = [];
        const newSticks: Stick[] = [];

        // Create Points
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                newPoints.push({
                    x: 100 + x * spacing,
                    y: 50 + y * spacing,
                    oldx: 100 + x * spacing,
                    oldy: 50 + y * spacing,
                    pinned: y === 0 // Pin top row
                });
            }
        }

        // Create Sticks (Constraints)
        const getIndex = (x: number, y: number) => y * cols + x;

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                if (x < cols - 1) { // Right neighbor
                    const p0 = newPoints[getIndex(x, y)];
                    const p1 = newPoints[getIndex(x + 1, y)];
                    newSticks.push({ p0, p1, length: spacing, isActive: true });
                }
                if (y < rows - 1) { // Bottom neighbor
                    const p0 = newPoints[getIndex(x, y)];
                    const p1 = newPoints[getIndex(x, y + 1)];
                    newSticks.push({ p0, p1, length: spacing, isActive: true });
                }
            }
        }

        setPoints(newPoints);
        setSticks(newSticks);
    };

    // Animation Loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let reqId: number;

        const update = () => {
            if (points.length === 0) return;

            updatePoints();
            for (let i = 0; i < 3; i++) updateSticks(); // Iterate constraint for stability
            render(ctx);
            reqId = requestAnimationFrame(update);
        };

        const updatePoints = () => {
            points.forEach(p => {
                if (p.pinned) return;
                const vx = (p.x - p.oldx) * friction;
                const vy = (p.y - p.oldy) * friction;

                p.oldx = p.x;
                p.oldy = p.y;

                p.x += vx;
                p.y += vy;
                p.y += gravity;

                // Mouse interaction
                if (mouse.isDown && mouse.btn === 0) { // Pull
                    const dx = p.x - mouse.x;
                    const dy = p.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 50) {
                        // Push away a bit less, or pull? Let's make it wind-like push
                        p.x -= dx * 0.1;
                        p.y -= dy * 0.1;
                    }
                }
            });
        };

        const updateSticks = () => {
            sticks.forEach(s => {
                if (!s.isActive) return;
                const dx = s.p1.x - s.p0.x;
                const dy = s.p1.y - s.p0.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const diff = s.length - dist;
                const percent = diff / dist / 2;
                const offsetX = dx * percent;
                const offsetY = dy * percent;

                if (!s.p0.pinned) {
                    s.p0.x -= offsetX;
                    s.p0.y -= offsetY;
                }
                if (!s.p1.pinned) {
                    s.p1.x += offsetX;
                    s.p1.y += offsetY;
                }

                // Cut logic
                if (mouse.isDown && mouse.btn === 2) { // Right click cut
                    const mx = mouse.x;
                    const my = mouse.y;

                    // Check dist to line segment... simplified to midpoint
                    const midX = (s.p0.x + s.p1.x) / 2;
                    const midY = (s.p0.y + s.p1.y) / 2;
                    const d = Math.hypot(midX - mx, midY - my);
                    if (d < 10) s.isActive = false;
                }
            });
        };

        const render = (c: CanvasRenderingContext2D) => {
            c.clearRect(0, 0, canvas.width, canvas.height);

            c.strokeStyle = '#64748b'; // Slate 500
            c.beginPath();
            sticks.forEach(s => {
                if (s.isActive) {
                    c.moveTo(s.p0.x, s.p0.y);
                    c.lineTo(s.p1.x, s.p1.y);
                }
            });
            c.stroke();

            // Draw points
            c.fillStyle = '#64748b';
            points.forEach(p => {
                // c.beginPath();
                // c.arc(p.x, p.y, 2, 0, Math.PI*2);
                // c.fill();
            }); // Skip points for cleaner look, mesh only

            // Mouse indicator
            if (mouse.isDown) {
                c.beginPath();
                c.arc(mouse.x, mouse.y, 20, 0, Math.PI * 2);
                c.fillStyle = mouse.btn === 2 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(59, 130, 246, 0.2)';
                c.fill();
            }
        };

        reqId = requestAnimationFrame(update);
        return () => cancelAnimationFrame(reqId);
    }, [points, sticks, mouse]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        setMouse(prev => ({ ...prev, x: e.clientX - rect.left, y: e.clientY - rect.top }));
    };

    // Prevent context menu
    const preventContext = (e: React.MouseEvent) => {
        e.preventDefault();
        return false;
    };


    return (
        <div className="flex flex-col h-full bg-slate-50 rounded-xl overflow-hidden select-none">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-white border-b border-slate-200">
                <h3 className="font-bold text-slate-700">Verlet Cloth</h3>
                <button onClick={resetCloth} className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
                    <RotateCcw size={18} />
                </button>
            </div>

            <div className="flex-1 relative cursor-crosshair bg-slate-100">
                <canvas
                    ref={canvasRef}
                    width={600}
                    height={400}
                    onMouseDown={(e) => setMouse(p => ({ ...p, isDown: true, btn: e.button }))}
                    onMouseUp={() => setMouse(p => ({ ...p, isDown: false }))}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => setMouse(p => ({ ...p, isDown: false }))}
                    onContextMenu={preventContext}
                    className="w-full h-full object-contain"
                />
                <div className="absolute bottom-2 left-2 text-xs text-slate-400 pointer-events-none">
                    Left click: Push/Wind | Right click: Cut
                </div>
            </div>
        </div>
    );
};

export default ClothVisualizer;
