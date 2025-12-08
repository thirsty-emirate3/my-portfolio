import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Info, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { SoundController } from '../../utils/SoundController';
import { useSwipe } from '../../hooks/useSwipe';
import { GameInstructions } from '../common/GameInstructions';

const SIZE = 20;
const SPEED = 100;

const SnakeGame: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [snake, setSnake] = useState<{ x: number, y: number }[]>([{ x: 5, y: 5 }, { x: 4, y: 5 }, { x: 3, y: 5 }]);
    const [food, setFood] = useState<{ x: number, y: number }>({ x: 10, y: 10 });
    const [dir, setDir] = useState<{ x: number, y: number }>({ x: 1, y: 0 });
    const [playing, setPlaying] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [showHelp, setShowHelp] = useState(false);

    const dirRef = useRef(dir); // For immediate update in loop

    const resetGame = () => {
        setSnake([{ x: 5, y: 5 }, { x: 4, y: 5 }, { x: 3, y: 5 }]);
        setDir({ x: 1, y: 0 });
        dirRef.current = { x: 1, y: 0 };
        setScore(0);
        setGameOver(false);
        spawnFood();
        setPlaying(true);
        SoundController.playClick();
    };

    const spawnFood = () => {
        setFood({
            x: Math.floor(Math.random() * SIZE),
            y: Math.floor(Math.random() * SIZE)
        });
    };

    useEffect(() => {
        if (!playing || gameOver) return;

        const interval = setInterval(() => {
            setSnake(prev => {
                const head = { ...prev[0] };
                head.x += dirRef.current.x;
                head.y += dirRef.current.y;

                // Wall collision
                if (head.x < 0 || head.x >= SIZE || head.y < 0 || head.y >= SIZE) {
                    setGameOver(true);
                    SoundController.playGameOver();
                    return prev;
                }

                // Self collision
                if (prev.some(s => s.x === head.x && s.y === head.y)) {
                    setGameOver(true);
                    SoundController.playGameOver();
                    return prev;
                }

                const newSnake = [head, ...prev];

                // Eat food
                if (head.x === food.x && head.y === food.y) {
                    setScore(s => s + 10);
                    spawnFood();
                    SoundController.playPop(); // Eat sound
                    // Don't pop tail
                } else {
                    newSnake.pop();
                }

                return newSnake;
            });
        }, SPEED);

        return () => clearInterval(interval);
    }, [playing, gameOver, food]);

    // Keyboard
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (!playing) return;
            // Prevent scrolling
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.key) > -1) {
                e.preventDefault();
            }
            handleDirection(e.key.replace('Arrow', '').toLowerCase());
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [playing]);

    const handleDirection = (d: string) => {
        if (d === 'up' && dirRef.current.y === 0) dirRef.current = { x: 0, y: -1 };
        if (d === 'down' && dirRef.current.y === 0) dirRef.current = { x: 0, y: 1 };
        if (d === 'left' && dirRef.current.x === 0) dirRef.current = { x: -1, y: 0 };
        if (d === 'right' && dirRef.current.x === 0) dirRef.current = { x: 1, y: 0 };
    };

    // Draw
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const cellSize = 300 / SIZE; // 300px width

        // Clear
        ctx.fillStyle = '#1e293b'; // Slate 800
        ctx.fillRect(0, 0, 300, 300);

        // Food
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(food.x * cellSize + cellSize / 2, food.y * cellSize + cellSize / 2, cellSize * 0.4, 0, Math.PI * 2);
        ctx.fill();

        // Snake
        ctx.fillStyle = '#22c55e';
        snake.forEach(s => {
            ctx.fillRect(s.x * cellSize + 1, s.y * cellSize + 1, cellSize - 2, cellSize - 2);
        });

    }, [snake, food]);

    const swipeHandlers = useSwipe({
        onSwipeUp: () => handleDirection('up'),
        onSwipeDown: () => handleDirection('down'),
        onSwipeLeft: () => handleDirection('left'),
        onSwipeRight: () => handleDirection('right'),
    });

    return (
        <div
            className="flex flex-col items-center p-6 bg-slate-900 rounded-xl select-none text-white relative shadow-xl touch-none"
            {...swipeHandlers}
        >
            <div className="flex items-center justify-between w-full max-w-[300px] mb-4">
                <button onClick={() => setShowHelp(true)} className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 text-slate-400">
                    <Info size={20} />
                </button>
                <h3 className="font-bold text-xl text-green-400 font-mono tracking-widest">SNAKE</h3>
                <div className="text-xl font-bold font-mono">{score}</div>
            </div>

            <div className="relative border-4 border-slate-700 bg-black rounded-lg overflow-hidden shadow-2xl">
                <canvas ref={canvasRef} width={300} height={300} className="block" />

                {(!playing || gameOver) && (
                    <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center animate-in fade-in">
                        {gameOver && <div className="text-red-500 font-bold text-3xl mb-4 tracking-widest drop-shadow-[0_0_10px_red]">GAME OVER</div>}
                        <button onClick={resetGame} className="flex items-center gap-2 px-8 py-3 bg-green-500 text-black font-bold rounded-full hover:bg-green-400 hover:scale-105 transition-all shadow-lg shadow-green-500/50">
                            {gameOver ? <RotateCcw size={20} /> : <Play size={20} />}
                            {gameOver ? 'Try Again' : 'Start Game'}
                        </button>
                    </div>
                )}

                {/* Help Overlay */}
                <GameInstructions
                    isOpen={showHelp}
                    onClose={() => setShowHelp(false)}
                    title="Snake"
                    rules={[
                        "Eat the red apples to grow and earn points.",
                        "Avoid running into the walls or your own tail.",
                        "The snake gets longer with each apple eaten."
                    ]}
                    controls={[
                        { icon: <ChevronUp size={20} />, instruction: "Move Up" },
                        { icon: <ChevronLeft size={20} />, instruction: "Move Left" },
                        { icon: <ChevronRight size={20} />, instruction: "Move Right" },
                        { icon: <ChevronDown size={20} />, instruction: "Move Down" },
                    ]}
                    mobileControls={[
                        { icon: "👆", instruction: "Swipe to Change Direction" }
                    ]}
                />
            </div>

            {/* Mobile Controls */}
            <div className="mt-6 grid grid-cols-3 gap-2 sm:hidden w-full max-w-[200px] opacity-60">
                <div></div>
                <button className="p-4 bg-slate-800 rounded-xl active:bg-green-600 active:scale-95 transition-all flex items-center justify-center shadow-lg" onClick={() => handleDirection('up')}><ChevronUp /></button>
                <div></div>
                <button className="p-4 bg-slate-800 rounded-xl active:bg-green-600 active:scale-95 transition-all flex items-center justify-center shadow-lg" onClick={() => handleDirection('left')}><ChevronLeft /></button>
                <button className="p-4 bg-slate-800 rounded-xl active:bg-green-600 active:scale-95 transition-all flex items-center justify-center shadow-lg" onClick={() => handleDirection('down')}><ChevronDown /></button>
                <button className="p-4 bg-slate-800 rounded-xl active:bg-green-600 active:scale-95 transition-all flex items-center justify-center shadow-lg" onClick={() => handleDirection('right')}><ChevronRight /></button>
            </div>
        </div>
    );
};

export default SnakeGame;
