import React, { useEffect, useRef, useState } from 'react';

export const RecursiveTree: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [angle, setAngle] = useState(30);
    const [length, setLength] = useState(100);
    const [depth, setDepth] = useState(10);

    const drawTree = (
        ctx: CanvasRenderingContext2D,
        startX: number,
        startY: number,
        len: number,
        ang: number,
        branchWidth: number,
        currentDepth: number
    ) => {
        ctx.beginPath();
        ctx.save();
        ctx.translate(startX, startY);
        ctx.rotate((ang * Math.PI) / 180);
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -len);
        ctx.strokeStyle = `hsl(${currentDepth * 10}, 70%, 50%)`; // Color based on depth
        ctx.lineWidth = branchWidth;
        ctx.stroke();

        if (len < 10 || currentDepth <= 0) {
            ctx.restore();
            return;
        }

        drawTree(ctx, 0, -len, len * 0.75, angle, branchWidth * 0.7, currentDepth - 1);
        drawTree(ctx, 0, -len, len * 0.75, -angle, branchWidth * 0.7, currentDepth - 1);

        ctx.restore();
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set high resolution
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        ctx.clearRect(0, 0, rect.width, rect.height);

        // Start drawing from bottom center
        drawTree(ctx, rect.width / 2, rect.height - 20, length, 0, 10, depth);

    }, [angle, length, depth]);

    return (
        <div className="flex flex-col items-center justify-center h-full w-full p-4">
            <div className="flex flex-wrap gap-4 mb-4 bg-white/50 p-3 rounded-xl border border-slate-200">
                <label className="flex flex-col text-xs font-semibold text-slate-600">
                    Branch Angle: {angle}°
                    <input
                        type="range"
                        min="0"
                        max="120"
                        value={angle}
                        onChange={(e) => setAngle(Number(e.target.value))}
                        className="mt-1"
                    />
                </label>
                <label className="flex flex-col text-xs font-semibold text-slate-600">
                    Trunk Length: {length}
                    <input
                        type="range"
                        min="50"
                        max="150"
                        value={length}
                        onChange={(e) => setLength(Number(e.target.value))}
                        className="mt-1"
                    />
                </label>
                <label className="flex flex-col text-xs font-semibold text-slate-600">
                    Recursion Depth: {depth}
                    <input
                        type="range"
                        min="1"
                        max="12"
                        value={depth}
                        onChange={(e) => setDepth(Number(e.target.value))}
                        className="mt-1"
                    />
                </label>
            </div>
            <div className="relative w-full max-w-lg aspect-square border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden">
                <canvas ref={canvasRef} className="w-full h-full" />
            </div>
        </div>
    );
};
