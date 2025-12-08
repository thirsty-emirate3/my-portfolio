import React, { useState, useEffect, useCallback } from 'react';
import { RotateCcw, Info, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { SoundController } from '../../utils/SoundController';
import { useSwipe } from '../../hooks/useSwipe';
import { GameInstructions } from '../common/GameInstructions';

const SIZE = 4;

const Game2048: React.FC = () => {
    const [board, setBoard] = useState<number[][]>([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [showHelp, setShowHelp] = useState(false);

    // Color logic
    const getColors = (val: number) => {
        const colors: { [key: number]: string } = {
            2: 'bg-orange-100 text-orange-800',
            4: 'bg-orange-200 text-orange-800',
            8: 'bg-orange-300 text-white',
            16: 'bg-orange-400 text-white',
            32: 'bg-orange-500 text-white',
            64: 'bg-orange-600 text-white',
            128: 'bg-yellow-400 text-white shadow-[0_0_10px_orange]',
            256: 'bg-yellow-500 text-white shadow-[0_0_10px_orange]',
            512: 'bg-yellow-600 text-white shadow-[0_0_15px_orange]',
            1024: 'bg-yellow-700 text-white shadow-[0_0_15px_orange]',
            2048: 'bg-yellow-800 text-white shadow-[0_0_20px_gold]',
        };
        return colors[val] || 'bg-slate-800 text-white';
    };

    const initGame = () => {
        const newBoard = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
        addRandomTile(newBoard);
        addRandomTile(newBoard);
        setBoard(newBoard);
        setScore(0);
        setGameOver(false);
        SoundController.playClick();
    };

    const addRandomTile = (currentBoard: number[][]) => {
        const emptyCells: { r: number, c: number }[] = [];
        currentBoard.forEach((row, r) => row.forEach((val, c) => {
            if (val === 0) emptyCells.push({ r, c });
        }));

        if (emptyCells.length > 0) {
            const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            currentBoard[r][c] = Math.random() < 0.9 ? 2 : 4;
        }
    };

    useEffect(() => {
        initGame();
    }, []);

    // Movement Logic
    const move = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
        if (gameOver) return;

        let moved = false;
        const newBoard = board.map(row => [...row]);
        let addedScore = 0;
        let merged = false;

        const processLine = (line: number[]) => {
            let newLine = line.filter(v => v !== 0); // Remove zeros
            for (let i = 0; i < newLine.length - 1; i++) {
                if (newLine[i] === newLine[i + 1]) {
                    newLine[i] *= 2;
                    addedScore += newLine[i];
                    newLine[i + 1] = 0;
                    merged = true;
                }
            }
            newLine = newLine.filter(v => v !== 0);
            while (newLine.length < SIZE) newLine.push(0);
            return newLine;
        };

        if (direction === 'left' || direction === 'right') {
            for (let r = 0; r < SIZE; r++) {
                let row = newBoard[r];
                if (direction === 'right') row.reverse();
                const newRow = processLine(row);
                if (direction === 'right') newRow.reverse();
                if (JSON.stringify(newBoard[r]) !== JSON.stringify(newRow)) moved = true;
                newBoard[r] = newRow;
            }
        } else {
            for (let c = 0; c < SIZE; c++) {
                let col = newBoard.map(row => row[c]);
                if (direction === 'down') col.reverse();
                const newCol = processLine(col);
                if (direction === 'down') newCol.reverse();

                for (let r = 0; r < SIZE; r++) {
                    if (newBoard[r][c] !== newCol[r]) moved = true;
                    newBoard[r][c] = newCol[r];
                }
            }
        }

        if (moved) {
            addRandomTile(newBoard);
            setBoard(newBoard);
            setScore(prev => prev + addedScore);

            if (merged) SoundController.playPop(); // Merge sound
            SoundController.playMove();

            // Check Game Over basic
            const isFull = newBoard.every(row => row.every(val => val !== 0));
            if (isFull) {
                // Check if merges possible
                let canMerge = false;
                for (let r = 0; r < SIZE; r++) {
                    for (let c = 0; c < SIZE; c++) {
                        if (c + 1 < SIZE && newBoard[r][c] === newBoard[r][c + 1]) canMerge = true;
                        if (r + 1 < SIZE && newBoard[r][c] === newBoard[r + 1][c]) canMerge = true;
                    }
                }
                if (!canMerge) {
                    setGameOver(true);
                    setTimeout(() => SoundController.playGameOver(), 500);
                }
            }
        }

    }, [board, gameOver]);

    // Keyboard controls
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
            }
            if (e.key === 'ArrowUp') move('up');
            if (e.key === 'ArrowDown') move('down');
            if (e.key === 'ArrowLeft') move('left');
            if (e.key === 'ArrowRight') move('right');
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [move]);

    // Swipe Controls
    const swipeHandlers = useSwipe({
        onSwipeUp: () => move('up'),
        onSwipeDown: () => move('down'),
        onSwipeLeft: () => move('left'),
        onSwipeRight: () => move('right'),
    });

    return (
        <div
            className="flex flex-col items-center p-6 bg-orange-50 rounded-xl select-none relative shadow-xl touch-none"
            {...swipeHandlers}
        >
            <div className="flex items-center justify-between w-full max-w-[300px] mb-6">

                <button onClick={() => setShowHelp(true)} className="p-2 text-orange-400 hover:bg-orange-100 rounded-full">
                    <Info size={20} />
                </button>

                <div className="bg-slate-800 text-white px-4 py-2 rounded-lg text-center shadow-md">
                    <div className="text-xs font-bold opacity-70 tracking-widest">SCORE</div>
                    <div className="text-xl font-bold">{score}</div>
                </div>

                <button onClick={initGame} className="p-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 shadow-md active:scale-95 transition-transform">
                    <RotateCcw size={20} />
                </button>
            </div>

            <div className="bg-slate-300 p-2 rounded-xl relative">
                <div className="grid grid-cols-4 gap-2">
                    {board.map((row, r) =>
                        row.map((val, c) => (
                            <div key={`${r}-${c}`} className="w-14 h-14 sm:w-16 sm:h-16 bg-slate-200/50 rounded-lg flex items-center justify-center font-bold text-xl sm:text-2xl relative">
                                {val > 0 && (
                                    <motion.div
                                        key={`${r}-${c}-${val}`} // New key on value change triggers animation
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        className={`absolute inset-0 flex items-center justify-center rounded-lg ${getColors(val)} shadow-sm`}
                                    >
                                        {val}
                                    </motion.div>
                                )}
                            </div>
                        ))
                    )}
                </div>
                {gameOver && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center rounded-xl z-10 animate-in fade-in">
                        <h2 className="text-3xl font-bold text-slate-800 drop-shadow-md">Game Over</h2>
                    </div>
                )}
            </div>

            {/* Help Overlay - Replaced with GameInstructions */}
            <GameInstructions
                isOpen={showHelp}
                onClose={() => setShowHelp(false)}
                title="2048"
                rules={[
                    "Swipe or use arrow keys to move tiles.",
                    "Tiles with the same number merge into one when they touch.",
                    "Create a tile with the number 2048 to win!",
                    "Game over when the board is full and no moves are possible."
                ]}
                controls={[
                    { icon: <ChevronUp size={20} />, instruction: "Move Up" },
                    { icon: <ChevronDown size={20} />, instruction: "Move Down" },
                    { icon: <ChevronLeft size={20} />, instruction: "Move Left" },
                    { icon: <ChevronRight size={20} />, instruction: "Move Right" },
                ]}
                mobileControls={[
                    { icon: "👆", instruction: "Swipe to Move" }
                ]}
            />

            {/* Mobile Controls (keeping for accessibility/fallback) */}
            <div className="mt-6 grid grid-cols-3 gap-3 md:hidden opacity-50 hover:opacity-100 transition-opacity">
                {/* Optional: Add a note or keep buttons small */}
                <div />
                <button className="p-3 bg-orange-200/50 rounded-lg text-orange-800" onClick={() => move('up')}><ChevronUp /></button>
                <div />
                <button className="p-3 bg-orange-200/50 rounded-lg text-orange-800" onClick={() => move('left')}><ChevronLeft /></button>
                <button className="p-3 bg-orange-200/50 rounded-lg text-orange-800" onClick={() => move('down')}><ChevronDown /></button>
                <button className="p-3 bg-orange-200/50 rounded-lg text-orange-800" onClick={() => move('right')}><ChevronRight /></button>
            </div>

            <p className="mt-4 text-xs font-medium text-slate-400 hidden md:block">Arrow Keys or Swipe to Play</p>
        </div>
    );
};

export default Game2048;
