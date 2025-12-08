import React, { useState, useEffect, useCallback } from 'react';
import { RotateCcw, Flag, Bomb, Info, MousePointer2 } from 'lucide-react';
import { SoundController } from '../../utils/SoundController';
import { useLongPress } from '../../hooks/useLongPress';
import { GameInstructions } from '../common/GameInstructions';

const ROWS = 10;
const COLS = 10;
const MINES = 15;

type Cell = {
    x: number;
    y: number;
    isMine: boolean;
    isRevealed: boolean;
    isFlagged: boolean;
    neighborCount: number;
};

const MinesweeperGame: React.FC = () => {
    const [grid, setGrid] = useState<Cell[][]>([]);
    const [state, setState] = useState<'playing' | 'won' | 'lost'>('playing');
    const [flagsLeft, setFlagsLeft] = useState(MINES);
    const [showHelp, setShowHelp] = useState(false);

    const initGame = useCallback(() => {
        let newGrid: Cell[][] = Array.from({ length: ROWS }, (_, y) =>
            Array.from({ length: COLS }, (_, x) => ({
                x, y, isMine: false, isRevealed: false, isFlagged: false, neighborCount: 0
            }))
        );

        // Place Mines
        let minesPlaced = 0;
        while (minesPlaced < MINES) {
            const rx = Math.floor(Math.random() * COLS);
            const ry = Math.floor(Math.random() * ROWS);
            if (!newGrid[ry][rx].isMine) {
                newGrid[ry][rx].isMine = true;
                minesPlaced++;
            }
        }

        // Calculate Neighbors
        const getNeighbors = (x: number, y: number) => {
            const n = [];
            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                    if (dx === 0 && dy === 0) continue;
                    if (y + dy >= 0 && y + dy < ROWS && x + dx >= 0 && x + dx < COLS) n.push(newGrid[y + dy][x + dx]);
                }
            }
            return n;
        };

        for (let y = 0; y < ROWS; y++) {
            for (let x = 0; x < COLS; x++) {
                if (!newGrid[y][x].isMine) {
                    const neighbors = getNeighbors(x, y);
                    newGrid[y][x].neighborCount = neighbors.filter(c => c.isMine).length;
                }
            }
        }

        setGrid(newGrid);
        setState('playing');
        setFlagsLeft(MINES);
    }, []);

    const checkWin = (currentGrid: Cell[][]) => {
        const revealedCount = currentGrid.flat().filter(c => c.isRevealed).length;
        const totalSafeCells = ROWS * COLS - MINES;
        if (revealedCount === totalSafeCells) {
            setState('won');
            SoundController.playSuccess();
        }
    };

    useEffect(() => {
        initGame();
    }, [initGame]);

    const revealCell = (x: number, y: number) => {
        if (state !== 'playing' || grid[y][x].isFlagged || grid[y][x].isRevealed) return;

        const newGrid = [...grid.map(row => [...row])];
        const cell = newGrid[y][x];

        if (cell.isMine) {
            cell.isRevealed = true;
            newGrid.forEach(row => row.forEach(c => {
                if (c.isMine) c.isRevealed = true;
            }));
            setGrid(newGrid);
            setState('lost');
            SoundController.playGameOver();
        } else {
            revealRecursive(newGrid, x, y);
            setGrid(newGrid);
            checkWin(newGrid);
            SoundController.playClick();
        }
    };

    const handleCellClick = (x: number, y: number) => {
        revealCell(x, y);
    };

    const revealRecursive = (board: Cell[][], x: number, y: number) => {
        if (x < 0 || x >= COLS || y < 0 || y >= ROWS || board[y][x].isRevealed || board[y][x].isFlagged) return;

        board[y][x].isRevealed = true;

        if (board[y][x].neighborCount === 0) {
            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                    revealRecursive(board, x + dx, y + dy);
                }
            }
        }
    };

    const toggleFlag = (x: number, y: number) => {
        if (state !== 'playing' || grid[y][x].isRevealed) return;

        const newGrid = [...grid.map(row => [...row])];
        const cell = newGrid[y][x];

        if (!cell.isFlagged && flagsLeft > 0) {
            cell.isFlagged = true;
            setFlagsLeft(prev => prev - 1);
            SoundController.playPop();
        } else if (cell.isFlagged) {
            cell.isFlagged = false;
            setFlagsLeft(prev => prev + 1);
            SoundController.playPop();
        }
        setGrid(newGrid);
    };

    const handleRightClick = (e: React.MouseEvent, x: number, y: number) => {
        e.preventDefault();
        toggleFlag(x, y);
    };

    return (
        <div className="flex flex-col items-center p-6 bg-slate-100 rounded-xl select-none relative shadow-xl">
            <div className="flex items-center justify-between w-full max-w-[350px] mb-4">
                <button onClick={() => setShowHelp(p => !p)} className="p-2 text-slate-400 hover:text-slate-600">
                    <Info size={20} />
                </button>
                <div className="flex items-center gap-2 text-rose-600 font-bold bg-white px-3 py-1 rounded-full shadow-sm border border-rose-100">
                    <Flag size={18} /> {flagsLeft}
                </div>
                <button onClick={() => { initGame(); SoundController.playClick(); }} className="p-2 bg-white text-slate-600 rounded-full shadow-sm hover:scale-110 active:scale-95 transition">
                    <RotateCcw size={20} />
                </button>
            </div>

            <div className="relative">
                <div className="grid gap-[2px] bg-slate-300 p-[2px] rounded-lg shadow-inner" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}>
                    {grid.map((row) =>
                        row.map((cell) => (
                            <MinesweeperCell
                                key={`${cell.x}-${cell.y}`}
                                cell={cell}
                                onClick={() => handleCellClick(cell.x, cell.y)}
                                onRightClick={(e) => handleRightClick(e, cell.x, cell.y)}
                                onLongPress={() => toggleFlag(cell.x, cell.y)}
                            />
                        ))
                    )}
                </div>

                {/* Overlays */}
                {(state === 'won' || state === 'lost') && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg animate-in fade-in z-10">
                        <h2 className={`text-3xl font-bold mb-2 ${state === 'won' ? 'text-green-500' : 'text-slate-700'}`}>
                            {state === 'won' ? 'CLEARED!' : 'BOOM!'}
                        </h2>
                        <button onClick={() => { initGame(); SoundController.playClick(); }} className="px-6 py-2 bg-slate-800 text-white rounded-full shadow-lg hover:scale-105 transition-transform">
                            Try Again
                        </button>
                    </div>
                )}
            </div>

            <GameInstructions
                isOpen={showHelp}
                onClose={() => setShowHelp(false)}
                title="Minesweeper"
                rules={[
                    "Reveal all safe cells to win.",
                    "Numbers indicate how many mines are adjacent to that cell.",
                    "Use logic to deduce where mines are located.",
                    "Flag cells you suspect contain a mine."
                ]}
                controls={[
                    { icon: <MousePointer2 size={20} />, instruction: "Click to Reveal" },
                    { icon: <Flag size={20} />, instruction: "Right Click to Flag" },
                ]}
                mobileControls={[
                    { icon: <MousePointer2 size={20} />, instruction: "Tap to Reveal" },
                    { icon: "👇", instruction: "Long Press to Flag" },
                ]}
            />

            <div className="mt-4 text-xs text-slate-500 font-medium bg-slate-200 px-3 py-1 rounded-full">
                Long press to flag on mobile
            </div>
        </div>
    );
};

// Extracted Component to use Hook correctly inside loop
const MinesweeperCell: React.FC<{
    cell: Cell;
    onClick: () => void;
    onRightClick: (e: React.MouseEvent) => void;
    onLongPress: () => void;
}> = ({ cell, onClick, onRightClick, onLongPress }) => {

    const longPressHandlers = useLongPress(
        () => {
            // Long Press Detected
            onLongPress();
        },
        () => {
            // Normal Click Detected (only acts if long press didn't happen)
            onClick();
        },
        { shouldPreventDefault: true, delay: 500 }
    );

    return (
        <div
            className={`
                w-8 h-8 flex items-center justify-center font-bold text-sm cursor-pointer transition-all duration-100 select-none
                ${!cell.isRevealed
                    ? 'bg-slate-200 hover:bg-slate-300 shadow-[inset_2px_2px_0_white,inset_-2px_-2px_0_rgba(0,0,0,0.1)] active:shadow-none'
                    : 'bg-slate-50 shadow-none'
                }
                ${cell.isRevealed && cell.isMine ? 'bg-red-200 animate-pulse' : ''}
            `}
            onContextMenu={onRightClick}
            {...longPressHandlers}
        // Overriding onClick from longPressHandlers to prevent double firing if we used both?
        // Actually useLongPress provides onMouseUp/onTouchEnd which handles the 'click' too.
        // So we don't pass raw onClick here.
        >
            {cell.isFlagged ? <Flag size={16} className="text-rose-500 drop-shadow-sm" />
                : cell.isRevealed && cell.isMine ? <Bomb size={16} className="text-slate-800" />
                    : cell.isRevealed && cell.neighborCount > 0 ? (
                        <span style={{ color: ['transparent', '#2563eb', '#16a34a', '#dc2626', '#9333ea', '#ea580c', '#0891b2', '#000'][cell.neighborCount] }}>
                            {cell.neighborCount}
                        </span>
                    )
                        : ''}
        </div>
    );
};

export default MinesweeperGame;
