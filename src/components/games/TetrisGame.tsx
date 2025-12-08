import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Play, RotateCcw, ChevronDown, ChevronLeft, ChevronRight, Pause, Info } from 'lucide-react';
import { SoundController } from '../../utils/SoundController';
import { useSwipe } from '../../hooks/useSwipe';
import { GameInstructions } from '../common/GameInstructions';

// --- Tetris Constants & Types ---
const ROWS = 20;
const COLS = 10;
const BLOCK_SIZE = 25;

type Board = (string | null)[][];
type Position = { x: number; y: number };
type Tetromino = {
    shape: number[][];
    color: string;
};

const TETROMINOS: { [key: string]: Tetromino } = {
    I: { shape: [[1, 1, 1, 1]], color: 'bg-cyan-400 shadow-[inset_0_0_8px_rgba(0,0,0,0.25)]' },
    J: { shape: [[1, 0, 0], [1, 1, 1]], color: 'bg-blue-500 shadow-[inset_0_0_8px_rgba(0,0,0,0.25)]' },
    L: { shape: [[0, 0, 1], [1, 1, 1]], color: 'bg-orange-500 shadow-[inset_0_0_8px_rgba(0,0,0,0.25)]' },
    O: { shape: [[1, 1], [1, 1]], color: 'bg-yellow-400 shadow-[inset_0_0_8px_rgba(0,0,0,0.25)]' },
    S: { shape: [[0, 1, 1], [1, 1, 0]], color: 'bg-green-500 shadow-[inset_0_0_8px_rgba(0,0,0,0.25)]' },
    T: { shape: [[0, 1, 0], [1, 1, 1]], color: 'bg-purple-500 shadow-[inset_0_0_8px_rgba(0,0,0,0.25)]' },
    Z: { shape: [[1, 1, 0], [0, 1, 1]], color: 'bg-red-500 shadow-[inset_0_0_8px_rgba(0,0,0,0.25)]' },
};

const createBoard = (): Board => Array.from({ length: ROWS }, () => Array(COLS).fill(null));

const TetrisGame: React.FC = () => {
    const [board, setBoard] = useState<Board>(createBoard());
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [currentPiece, setCurrentPiece] = useState<{ type: string, pos: Position, shape: number[][] } | null>(null);

    // Game Loop Ref
    const requestRef = useRef<number>();
    const lastTimeRef = useRef<number>(0);
    const dropCounterRef = useRef<number>(0);
    const dropInterval = 1000; // ms

    // Spawn Piece
    const spawnPiece = useCallback(() => {
        const types = Object.keys(TETROMINOS);
        const type = types[Math.floor(Math.random() * types.length)];
        const shape = TETROMINOS[type].shape;
        const startX = Math.floor(COLS / 2) - Math.floor(shape[0].length / 2);

        setCurrentPiece({
            type,
            pos: { x: startX, y: 0 },
            shape
        });

        if (checkCollision({ x: startX, y: 0 }, shape, board)) {
            setIsGameOver(true);
            setCurrentPiece(null);
            SoundController.playGameOver();
        }
    }, [board]);

    const checkCollision = (pos: Position, shape: number[][], currentBoard: Board) => {
        for (let y = 0; y < shape.length; y++) {
            for (let x = 0; x < shape[y].length; x++) {
                if (shape[y][x] !== 0) {
                    const newX = pos.x + x;
                    const newY = pos.y + y;

                    if (
                        newX < 0 ||
                        newX >= COLS ||
                        newY >= ROWS ||
                        (newY >= 0 && currentBoard[newY][newX])
                    ) {
                        return true;
                    }
                }
            }
        }
        return false;
    };

    const merge = (piece: NonNullable<typeof currentPiece>) => {
        const newBoard = board.map(row => [...row]);
        piece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    if (piece.pos.y + y >= 0) {
                        newBoard[piece.pos.y + y][piece.pos.x + x] = TETROMINOS[piece.type].color;
                    }
                }
            });
        });

        // Check lines
        let linesCleared = 0;
        for (let y = ROWS - 1; y >= 0; y--) {
            if (newBoard[y].every(cell => cell !== null)) {
                newBoard.splice(y, 1);
                newBoard.unshift(Array(COLS).fill(null));
                linesCleared++;
                y++;
            }
        }

        if (linesCleared > 0) {
            setScore(prev => prev + linesCleared * 100 * linesCleared); // Bonus for multi-line
            SoundController.playClear();
        } else {
            SoundController.playPop(); // Lock sound
        }

        setBoard(newBoard);
        spawnPiece();
    };

    const move = (dir: 'left' | 'right' | 'down') => {
        if (!currentPiece || isGameOver || isPaused) return;

        let offset = { x: 0, y: 0 };
        if (dir === 'left') offset.x = -1;
        if (dir === 'right') offset.x = 1;
        if (dir === 'down') offset.y = 1;

        const newPos = { x: currentPiece.pos.x + offset.x, y: currentPiece.pos.y + offset.y };

        if (!checkCollision(newPos, currentPiece.shape, board)) {
            setCurrentPiece(prev => prev ? { ...prev, pos: newPos } : null);
            if (dir !== 'down') SoundController.playMove(); // Don't play on auto-drop
        } else if (dir === 'down') {
            merge(currentPiece);
        }
    };

    const rotate = () => {
        if (!currentPiece || isGameOver || isPaused) return;

        const oldShape = currentPiece.shape;
        const newShape = oldShape[0].map((_, index) =>
            oldShape.map(row => row[index]).reverse()
        );

        if (!checkCollision(currentPiece.pos, newShape, board)) {
            setCurrentPiece(prev => prev ? { ...prev, shape: newShape } : null);
            SoundController.playRotate();
        }
    };

    const resetGame = () => {
        setBoard(createBoard());
        setScore(0);
        setIsGameOver(false);
        setIsPaused(false);
        spawnPiece();
        SoundController.playClick();
    };

    useEffect(() => {
        const update = (time: number) => {
            if (isGameOver || isPaused) {
                lastTimeRef.current = time;
                requestRef.current = requestAnimationFrame(update);
                return;
            }

            const deltaTime = time - lastTimeRef.current;
            lastTimeRef.current = time;
            dropCounterRef.current += deltaTime;

            if (dropCounterRef.current > dropInterval) {
                move('down');
                dropCounterRef.current = 0;
            }

            requestRef.current = requestAnimationFrame(update);
        };

        if (currentPiece) {
            requestRef.current = requestAnimationFrame(update);
        }

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [currentPiece, isGameOver, isPaused]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isGameOver) return;
            // Prevent default scrolling
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
                e.preventDefault();
            }

            if (e.key === 'ArrowLeft') move('left');
            if (e.key === 'ArrowRight') move('right');
            if (e.key === 'ArrowDown') move('down');
            if (e.key === 'ArrowUp') rotate();
            if (e.key === 'p') setIsPaused(prev => !prev);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentPiece, isGameOver, isPaused]);

    useEffect(() => {
        resetGame();
    }, []);

    const swipeHandlers = useSwipe({
        onSwipeLeft: () => move('left'),
        onSwipeRight: () => move('right'),
        onSwipeDown: () => move('down'),
        onSwipeUp: rotate // Swipe up to rotate is also intuitive
    });

    return (
        <div
            className="flex flex-col items-center justify-center p-6 bg-slate-900 rounded-xl text-white select-none shadow-2xl touch-none"
            {...swipeHandlers}
            onClick={() => {
                // Simple tap detection fallback if not swiping
                // NOTE: This might trigger on swipe end depending on how useSwipe handles propagation.
                // Ideally useSwipe would stop propagation if swiped.
                // For now, let's rely on swipe up for rotate or explicit button.
            }}
        >

            {/* Header */}
            <div className="flex justify-between w-full max-w-[300px] mb-4 items-center">
                <h3 className="font-bold text-xl tracking-widest text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">TETRIS</h3>
                <div className="flex gap-2">
                    <button onClick={() => setShowHelp(true)} className="p-2 bg-slate-800 rounded-md hover:bg-slate-700 text-slate-300">
                        <Info size={16} />
                    </button>
                    <button onClick={() => setIsPaused(p => !p)} className="p-2 bg-slate-800 rounded-md hover:bg-slate-700 text-slate-300">
                        {isPaused ? <Play size={16} /> : <Pause size={16} />}
                    </button>
                    <button onClick={resetGame} className="p-2 bg-slate-800 rounded-md hover:bg-slate-700 text-slate-300">
                        <RotateCcw size={16} />
                    </button>
                </div>
            </div>

            {/* Game Board */}
            <div className="relative border-[3px] border-slate-700 bg-slate-800/50 rounded-lg overflow-hidden backdrop-blur-sm shadow-xl"
                style={{ width: COLS * BLOCK_SIZE, height: ROWS * BLOCK_SIZE }}>

                {/* Grid Lines (Subtle) */}
                <div className="absolute inset-0 grid grid-cols-10 grid-rows-20 pointer-events-none opacity-10">
                    {Array.from({ length: 200 }).map((_, i) => (
                        <div key={i} className="border border-slate-500" />
                    ))}
                </div>

                {/* Static Board */}
                {board.map((row, y) =>
                    row.map((color, x) => (
                        color && (
                            <div key={`${x}-${y}`}
                                className={`absolute border border-black/20 ${color} rounded-[2px] box-border`}
                                style={{
                                    width: BLOCK_SIZE,
                                    height: BLOCK_SIZE,
                                    left: x * BLOCK_SIZE,
                                    top: y * BLOCK_SIZE
                                }}
                            />
                        )
                    ))
                )}

                {/* Current Piece */}
                {currentPiece && currentPiece.shape.map((row, y) =>
                    row.map((val, x) => (
                        val !== 0 && (
                            <div key={`p-${x}-${y}`}
                                className={`absolute border border-black/20 ${TETROMINOS[currentPiece.type].color} rounded-[2px] box-border`}
                                style={{
                                    width: BLOCK_SIZE,
                                    height: BLOCK_SIZE,
                                    left: (currentPiece.pos.x + x) * BLOCK_SIZE,
                                    top: (currentPiece.pos.y + y) * BLOCK_SIZE
                                }}
                            />
                        )
                    ))
                )}

                {/* Overlays */}
                {isGameOver && (
                    <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center z-20 animate-in fade-in">
                        <h2 className="text-3xl font-bold text-red-500 mb-2 drop-shadow-[0_0_10px_red]">GAME OVER</h2>
                        <p className="text-xl mb-4 font-mono">Score: {score}</p>
                        <button onClick={resetGame} className="px-6 py-2 bg-cyan-600 text-white font-bold rounded-full hover:bg-cyan-500 shadow-lg">
                            Play Again
                        </button>
                    </div>
                )}
                {isPaused && !isGameOver && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20 backdrop-blur-sm">
                        <h2 className="text-2xl font-bold text-white tracking-widest">PAUSED</h2>
                    </div>
                )}
            </div>

            <GameInstructions
                isOpen={showHelp}
                onClose={() => setShowHelp(false)}
                title="Tetris"
                rules={[
                    "Move and rotate falling blocks to create full horizontal lines.",
                    "Full lines disappear and grant points.",
                    "Multiple lines cleared at once grant bonus points.",
                    "Game over if blocks stack up to the top."
                ]}
                controls={[
                    { icon: <ChevronLeft size={20} />, instruction: "Move Left" },
                    { icon: <ChevronRight size={20} />, instruction: "Move Right" },
                    { icon: <ChevronDown size={20} />, instruction: "Drop Faster" },
                    { icon: <ChevronDown className="rotate-180" size={20} />, instruction: "Rotate" }, // Arrow Up
                    { icon: <Pause size={20} />, instruction: "Pause Game" },
                ]}
                mobileControls={[
                    { icon: "👆", instruction: "Swipe Up to Rotate" },
                    { icon: "👈", instruction: "Swipe Left/Right to Move" },
                    { icon: "👇", instruction: "Swipe Down to Drop" }
                ]}
            />

            {/* Mobile Controls */}
            <div className="mt-6 w-full max-w-[300px] grid grid-cols-3 gap-3 md:hidden opacity-60">
                <div></div>
                <button className="h-14 w-14 bg-slate-700/80 rounded-full flex items-center justify-center active:bg-cyan-600 active:scale-95 transition-all shadow-lg" onClick={rotate}><ChevronDown className="rotate-180" /></button>
                <div></div>
                <button className="h-14 w-14 bg-slate-700/80 rounded-full flex items-center justify-center active:bg-cyan-600 active:scale-95 transition-all shadow-lg" onClick={() => move('left')}><ChevronLeft /></button>
                <button className="h-14 w-14 bg-slate-700/80 rounded-full flex items-center justify-center active:bg-cyan-600 active:scale-95 transition-all shadow-lg" onClick={() => move('down')}><ChevronDown /></button>
                <button className="h-14 w-14 bg-slate-700/80 rounded-full flex items-center justify-center active:bg-cyan-600 active:scale-95 transition-all shadow-lg" onClick={() => move('right')}><ChevronRight /></button>
            </div>

            <div className="mt-4 text-center">
                <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Score</div>
                <div className="font-mono text-2xl text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.2)]">{score}</div>
            </div>
        </div>
    );
};

export default TetrisGame;
