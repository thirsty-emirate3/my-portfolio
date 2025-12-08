import React, { useEffect, useRef, useState } from 'react';
import { Play, RotateCcw, Info, MousePointer2 } from 'lucide-react';
import { SoundController } from '../../utils/SoundController';
import { GameInstructions } from '../common/GameInstructions';

const WIDTH = 400;
const HEIGHT = 300;
const PADDLE_W = 80;
const BALL_R = 6;

const BlockBreakerGame: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [playing, setPlaying] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [showHelp, setShowHelp] = useState(false);

    // Game State Refs (Performance)
    const state = useRef({
        paddleX: WIDTH / 2 - PADDLE_W / 2,
        ball: { x: WIDTH / 2, y: HEIGHT - 30, dx: 4, dy: -4 },
        blocks: [] as { x: number, y: number, w: number, h: number, active: boolean }[]
    });

    const initBlocks = () => {
        const rows = 5;
        const cols = 8;
        const padding = 5;
        const w = (WIDTH - padding * (cols + 1)) / cols;
        const h = 15;
        const newBlocks = [];
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                newBlocks.push({
                    x: padding + c * (w + padding),
                    y: padding + r * (h + padding) + 20,
                    w, h, active: true
                });
            }
        }
        state.current.blocks = newBlocks;
        state.current.ball = { x: WIDTH / 2, y: HEIGHT - 30, dx: 3 + Math.random(), dy: -3 - Math.random() };
        state.current.paddleX = WIDTH / 2 - PADDLE_W / 2;
    };

    const startGame = () => {
        initBlocks();
        setScore(0);
        setGameOver(false);
        setPlaying(true);
        SoundController.playClick();
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let reqId: number;

        const loop = () => {
            if (!playing || gameOver) return;

            update();
            draw(ctx);
            reqId = requestAnimationFrame(loop);
        };

        const update = () => {
            const { ball, paddleX, blocks } = state.current;

            // Move Ball
            ball.x += ball.dx;
            ball.y += ball.dy;

            // Walls
            if (ball.x + ball.dx > WIDTH - BALL_R || ball.x + ball.dx < BALL_R) {
                ball.dx = -ball.dx;
                SoundController.playMove(); // Bounce sound
            }
            if (ball.y < BALL_R) {
                ball.dy = -ball.dy;
                SoundController.playMove();
            }

            // Paddle
            if (ball.y > HEIGHT - 30 - BALL_R && ball.y < HEIGHT - 20) {
                if (ball.x > paddleX && ball.x < paddleX + PADDLE_W) {
                    ball.dy = -Math.abs(ball.dy); // Bounce up
                    // Add spin based on hit position
                    const hitPoint = ball.x - (paddleX + PADDLE_W / 2);
                    ball.dx = hitPoint * 0.15;
                    SoundController.playPop(); // Paddle hit sound
                }
            }

            // Floor (Game Over)
            if (ball.y > HEIGHT) {
                setGameOver(true);
                setPlaying(false);
                SoundController.playGameOver();
            }

            // Blocks
            let activeCount = 0;
            blocks.forEach(b => {
                if (!b.active) return;
                activeCount++;
                if (
                    ball.x > b.x &&
                    ball.x < b.x + b.w &&
                    ball.y > b.y &&
                    ball.y < b.y + b.h
                ) {
                    ball.dy = -ball.dy;
                    b.active = false;
                    setScore(prev => prev + 10);
                    SoundController.playClick(); // Block hit sound
                }
            });

            if (activeCount === 0) {
                // Win logic? Just respawn
                initBlocks();
                ball.dy *= 1.1; // Speed up
                SoundController.playSuccess();
            }
        };

        const draw = (c: CanvasRenderingContext2D) => {
            const { ball, paddleX, blocks } = state.current;
            c.clearRect(0, 0, WIDTH, HEIGHT);

            // Ball
            c.fillStyle = '#facc15'; // Yellow
            c.beginPath();
            c.arc(ball.x, ball.y, BALL_R, 0, Math.PI * 2);
            c.fill();

            // Paddle
            c.fillStyle = '#3b82f6'; // Blue
            c.fillRect(paddleX, HEIGHT - 20, PADDLE_W, 10);

            // Blocks
            blocks.forEach(b => {
                if (b.active) {
                    c.fillStyle = `hsl(${b.y}, 70%, 60%)`;
                    c.fillRect(b.x, b.y, b.w, b.h);
                }
            });
        };

        // Initial Draw
        if (!playing) {
            draw(ctx);
        } else {
            loop();
        }

        return () => cancelAnimationFrame(reqId);
    }, [playing, gameOver]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!canvasRef.current || !playing) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        state.current.paddleX = Math.max(0, Math.min(WIDTH - PADDLE_W, x - PADDLE_W / 2));
    };

    // Touch support for mobile
    const handleTouchMove = (e: React.TouchEvent) => {
        if (!canvasRef.current || !playing) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        state.current.paddleX = Math.max(0, Math.min(WIDTH - PADDLE_W, x - PADDLE_W / 2));
    };


    return (
        <div className="flex flex-col items-center p-6 bg-slate-100 rounded-xl select-none shadow-xl">
            <div className="flex items-center justify-between w-full max-w-[400px] mb-4">
                <button onClick={() => setShowHelp(true)} className="p-2 text-slate-400 hover:text-slate-600">
                    <Info size={20} />
                </button>
                <h3 className="font-bold text-xl text-slate-700">Block Breaker</h3>
                <div className="text-xl font-bold bg-white px-3 py-1 rounded shadow-sm">{score}</div>
            </div>

            <div className="relative bg-black rounded-lg shadow-2xl overflow-hidden cursor-none touch-none">
                <canvas
                    ref={canvasRef}
                    width={WIDTH}
                    height={HEIGHT}
                    onMouseMove={handleMouseMove}
                    onTouchMove={handleTouchMove}
                    className="block touch-none"
                    style={{ touchAction: 'none' }}
                />

                {!playing && (
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center backdrop-blur-sm animate-in fade-in">
                        {gameOver && <h2 className="text-3xl font-bold text-red-500 mb-2 drop-shadow-md">GAME OVER</h2>}
                        <button onClick={startGame} className="bg-blue-500 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-600 flex items-center gap-2 shadow-lg transition-transform hover:scale-105 active:scale-95">
                            {gameOver ? <RotateCcw /> : <Play />}
                            {gameOver ? 'Retry' : 'Start'}
                        </button>
                    </div>
                )}
                <GameInstructions
                    isOpen={showHelp}
                    onClose={() => setShowHelp(false)}
                    title="Block Breaker"
                    rules={[
                        "Bounce the ball off the paddle to break all blocks.",
                        "Don't let the ball fall off the bottom of the screen.",
                        "Hit the ball with different parts of the paddle to control the angle."
                    ]}
                    controls={[
                        { icon: <MousePointer2 size={20} />, instruction: "Move Mouse to Control Paddle" },
                    ]}
                    mobileControls={[
                        { icon: "👆", instruction: "Drag Finger to Move Paddle" }
                    ]}
                />
            </div>
            <p className="mt-2 text-xs text-slate-500">Mouse or Touch to control paddle.</p>
        </div>
    );
};

export default BlockBreakerGame;
