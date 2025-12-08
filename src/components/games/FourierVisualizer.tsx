
import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, Pencil } from 'lucide-react';

type Complex = { re: number; im: number };
type FourierCoef = { freq: number; amp: number; phase: number; re: number; im: number };

const FourierVisualizer: React.FC = () => {
    const [path, setPath] = useState<Complex[]>([]);
    const [fourierX, setFourierX] = useState<FourierCoef[]>([]);
    const [time, setTime] = useState(0);
    const [isDrawing, setIsDrawing] = useState(false);
    const [state, setState] = useState<'draw' | 'computing' | 'playing'>('draw');

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number>();

    // Constants
    const CANVAS_W = 600;
    const CANVAS_H = 400;

    // DFT Implementation
    const dft = (x: Complex[]): FourierCoef[] => {
        const X: FourierCoef[] = [];
        const N = x.length;
        for (let k = 0; k < N; k++) {
            let re = 0;
            let im = 0;
            for (let n = 0; n < N; n++) {
                const phi = (Math.PI * 2 * k * n) / N;
                re += x[n].re * Math.cos(phi) + x[n].im * Math.sin(phi);
                im += x[n].im * Math.cos(phi) - x[n].re * Math.sin(phi);
            }
            re = re / N;
            im = im / N; // Average?
            // Wait, DFT definition usually 1/N. Yes.

            let freq = k;
            let amp = Math.sqrt(re * re + im * im);
            let phase = Math.atan2(im, re);
            X.push({ freq, amp, phase, re, im });
        }
        return X.sort((a, b) => b.amp - a.amp); // Sort by amplitude for better Epicycles
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (state !== 'draw') return;
        setIsDrawing(true);
        setIsDrawing(true);
        setPath([]);
        addPoint(e);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDrawing) return;
        addPoint(e);
    };

    const handleMouseUp = () => {
        if (!isDrawing) return;
        setIsDrawing(false);
        // Compute DFT immediately?
        if (path.length > 5) {
            setState('computing');
            setTimeout(() => {
                const f = dft(path);
                setFourierX(f);
                setTime(0);
                setState('playing');
            }, 100);
        } else {
            // Too short
            setPath([]);
        }
    };

    const addPoint = (e: React.MouseEvent) => {
        if (!canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - CANVAS_W / 2; // Center origin
        const y = e.clientY - rect.top - CANVAS_H / 2;
        setPath(prev => [...prev, { re: x, im: y }]);
    };

    const reset = () => {
        setState('draw');
        setPath([]);
        setPath([]);
        setFourierX([]);
        setTime(0);
    };

    // Animation Loop
    const animate = () => {
        if (state === 'playing') {
            const dt = (Math.PI * 2) / fourierX.length;
            setTime(prev => {
                const next = prev + dt;
                if (next > Math.PI * 2) {
                    return 0;
                }
                return next;
            });
        }
        draw();
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [state, time, path, fourierX]);

    const draw = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
        ctx.save();
        ctx.translate(CANVAS_W / 2, CANVAS_H / 2); // Center

        // Draw User Path (grey)
        if (state === 'draw' && path.length > 0) {
            ctx.strokeStyle = '#cbd5e1';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(path[0].re, path[0].im);
            for (let i = 1; i < path.length; i++) {
                ctx.lineTo(path[i].re, path[i].im);
            }
            ctx.stroke();
        }

        // Epicycles
        if (state === 'playing' && fourierX.length > 0) {
            let x = 0;
            let y = 0;

            for (let i = 0; i < fourierX.length; i++) {
                let prevX = x;
                let prevY = y;
                const { freq, amp, phase } = fourierX[i];

                x += amp * Math.cos(freq * time + phase);
                y += amp * Math.sin(freq * time + phase);

                // Draw Circle
                ctx.strokeStyle = 'rgba(100, 100, 100, 0.1)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(prevX, prevY, amp, 0, Math.PI * 2);
                ctx.stroke();

                // Draw Line
                ctx.strokeStyle = 'rgba(100, 100, 100, 0.2)';
                ctx.beginPath();
                ctx.moveTo(prevX, prevY);
                ctx.lineTo(x, y);
                ctx.stroke();
            }

            // Add trace point strictly logic in animate loop usually, but here React state updates drive it.
            // Wait, react state update for 'trace' array every frame at 60fps is heavy.
            // Better to keep trace in a ref or just rely on 'time' and recompute? No, recomputing trace is heavy.
            // For now, let's just push to a Ref-based trace for rendering.
        }

        // Draw Trace (We need to store it)
        // Since React state update of 'trace' might be laggy, let's optimize.
        // Actually for simplicity, we can just calculate the trace ON THE FLY? No, trace is history.
        // Let's rely on the frame update to update a mutable trace buffer in ref?
        ctx.restore();
    };

    // Correction: React state based animation loop is tricky for 'trace'.
    // Let's add the trace point inside 'animate' just before drawing
    // But 'animate' reads 'fourierX', 'time'.

    // To fix 'trace' not showing:
    // We need to calculate the point at current 'time' and push to trace.
    // Let's use a Mutable Ref for trace to avoid re-renders just for trace array.
    const traceRef = useRef<Complex[]>([]);

    useEffect(() => {
        if (time === 0) traceRef.current = []; // Reset on loop

        if (state === 'playing') {
            // Calculate current point
            let x = 0;
            let y = 0;
            for (let i = 0; i < fourierX.length; i++) {
                const { freq, amp, phase } = fourierX[i];
                x += amp * Math.cos(freq * time + phase);
                y += amp * Math.sin(freq * time + phase);
            }
            traceRef.current.push({ re: x, im: y });

            // Draw visual trace
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext('2d');
            if (ctx) {
                ctx.save();
                ctx.translate(CANVAS_W / 2, CANVAS_H / 2);
                ctx.strokeStyle = '#a855f7'; // Purple
                ctx.lineWidth = 2;
                ctx.beginPath();
                if (traceRef.current.length > 0) {
                    ctx.moveTo(traceRef.current[0].re, traceRef.current[0].im);
                    for (let p of traceRef.current) ctx.lineTo(p.re, p.im);
                }
                ctx.stroke();

                // Draw pen tip
                ctx.fillStyle = '#a855f7';
                ctx.beginPath();
                ctx.arc(x, y, 3, 0, Math.PI * 2);
                ctx.fill();

                ctx.restore();
            }
        }
    }, [time, state, fourierX]);


    return (
        <div className="flex flex-col h-full bg-slate-50 rounded-xl overflow-hidden select-none">
            <div className="flex items-center justify-between p-4 bg-white border-b border-slate-200">
                <h3 className="font-bold text-slate-700 font-mono">DFT Epicycles</h3>
                <button onClick={reset} className="flex items-center gap-2 px-3 py-1.5 bg-slate-200 text-slate-600 rounded-lg hover:bg-slate-300 text-sm">
                    <RotateCcw size={14} /> Clear
                </button>
            </div>

            <div className="relative flex-1 bg-white cursor-crosshair">
                {state === 'draw' && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-xs font-bold pointer-events-none flex items-center gap-2">
                        <Pencil size={12} /> Draw one continuous line!
                    </div>
                )}

                <canvas
                    ref={canvasRef}
                    width={CANVAS_W}
                    height={CANVAS_H}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    className="w-full h-full object-contain"
                />
            </div>
        </div>
    );
};

export default FourierVisualizer;
