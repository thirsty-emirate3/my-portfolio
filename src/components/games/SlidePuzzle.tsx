import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Trophy } from 'lucide-react';

export const SlidePuzzle = () => {
    const [tiles, setTiles] = useState<number[]>([]);
    const [isComplete, setIsComplete] = useState(false);
    const [moves, setMoves] = useState(0);

    const initializeGame = () => {
        // Create solvable puzzle
        let newTiles = Array.from({ length: 15 }, (_, i) => i + 1);
        newTiles.push(0); // 0 represents the empty space

        // Shuffle (Fisher-Yates) ensuring solvability
        // Simplified shuffle for now: simple random swaps that preserve parity if needed,
        // but for a robust 15-puzzle, we need to check inversion count.
        // Let's do a valid shuffle by simulating moves from the solved state.

        let currentTiles = [...newTiles];
        let emptyIdx = 15;
        let previousMove = -1;

        for (let i = 0; i < 150; i++) {
            const neighbors = [];
            const row = Math.floor(emptyIdx / 4);
            const col = emptyIdx % 4;

            if (row > 0) neighbors.push(emptyIdx - 4);
            if (row < 3) neighbors.push(emptyIdx + 4);
            if (col > 0) neighbors.push(emptyIdx - 1);
            if (col < 3) neighbors.push(emptyIdx + 1);

            // Don't undo immediate previous move
            const validNeighbors = neighbors.filter(n => n !== previousMove);
            const randomNeighbor = validNeighbors[Math.floor(Math.random() * validNeighbors.length)];

            // Swap
            [currentTiles[emptyIdx], currentTiles[randomNeighbor]] = [currentTiles[randomNeighbor], currentTiles[emptyIdx]];
            previousMove = emptyIdx;
            emptyIdx = randomNeighbor;
        }

        setTiles(currentTiles);
        setIsComplete(false);
        setMoves(0);
    };

    useEffect(() => {
        initializeGame();
    }, []);

    const handleTileClick = (index: number) => {
        if (isComplete) return;

        const emptyIndex = tiles.indexOf(0);
        const row = Math.floor(index / 4);
        const col = index % 4;
        const emptyRow = Math.floor(emptyIndex / 4);
        const emptyCol = emptyIndex % 4;

        // Check adjacency
        const isAdjacent =
            (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
            (Math.abs(col - emptyCol) === 1 && row === emptyRow);

        if (isAdjacent) {
            const newTiles = [...tiles];
            [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
            setTiles(newTiles);
            setMoves(m => m + 1);
            checkCompletion(newTiles);
        }
    };

    const checkCompletion = (currentTiles: number[]) => {
        // Check if 1-15 are in order and 0 is last
        for (let i = 0; i < 15; i++) {
            if (currentTiles[i] !== i + 1) return;
        }
        setIsComplete(true);
    };

    return (
        <div className="flex flex-col items-center justify-center p-6 bg-slate-50 min-h-[400px]">
            <div className="mb-6 flex items-center gap-8">
                <div className="text-slate-600 font-medium">Moves: {moves}</div>
                <button
                    onClick={initializeGame}
                    className="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 rounded-full shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                    <RefreshCw className="w-4 h-4" /> Reset
                </button>
            </div>

            <div className="relative bg-white p-4 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100">
                <div className="grid grid-cols-4 gap-2 w-64 h-64 sm:w-80 sm:h-80">
                    <AnimatePresence>
                        {tiles.map((tile, index) => (
                            <motion.button
                                key={`${tile}-${index}`} // Key using index to prevent remounting issues, actually tile ID is better but position changes.
                                // Actually layout animation is best with tile ID as key.
                                layoutId={tile !== 0 ? `tile-${tile}` : undefined}
                                onClick={() => tile !== 0 && handleTileClick(index)}
                                className={`
                                    relative flex items-center justify-center rounded-lg font-bold text-xl sm:text-2xl transition-colors
                                    ${tile === 0
                                        ? 'invisible'
                                        : 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md hover:shadow-lg active:scale-95 cursor-pointer'
                                    }
                                    ${isComplete && tile !== 0 ? '!bg-emerald-500 !from-emerald-500 !to-emerald-600' : ''}
                                `}
                                initial={false}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            >
                                {tile !== 0 && tile}
                            </motion.button>
                        ))}
                    </AnimatePresence>
                </div>

                {isComplete && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-xl"
                    >
                        <Trophy className="w-16 h-16 text-yellow-500 mb-2 drop-shadow-sm" />
                        <h3 className="text-2xl font-bold text-slate-800">Complete!</h3>
                        <p className="text-slate-600 font-medium mt-1">{moves} Moves</p>
                    </motion.div>
                )}
            </div>

            <p className="mt-6 text-sm text-slate-400 text-center max-w-xs">
                Click tiles next to the empty space to move them. order 1-15 to win!
            </p>
        </div>
    );
};
