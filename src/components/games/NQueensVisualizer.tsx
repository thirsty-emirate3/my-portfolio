
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, Crown } from 'lucide-react';

const NQueensVisualizer: React.FC = () => {
    const [n, setN] = useState(8);
    // Board state: -1 = empty, 0-N = row of queen in that col (or easier: just row index)
    // Actually standard represention: array of size N, index=col, value=row.
    const [queens, setQueens] = useState<number[]>([]); // queens[col] = row
    const [currentCol, setCurrentCol] = useState(-1);
    const [currentRow, setCurrentRow] = useState(-1);

    const [isPlaying, setIsPlaying] = useState(false);
    const [speed] = useState(100);
    const [status, setStatus] = useState("Ready");

    const stopRef = useRef(false);

    useEffect(() => {
        resetBoard();
    }, [n]);

    const resetBoard = () => {
        stopRef.current = true;
        setIsPlaying(false);
        setQueens(Array(n).fill(-1));
        setCurrentCol(-1);
        setCurrentRow(-1);

        setStatus("Ready");
        stopRef.current = false;
    };

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));





    // Correct logic with local state tracking
    const runSolver = async () => {
        if (isPlaying) return;
        setIsPlaying(true);
        setStatus("Solving...");
        stopRef.current = false;

        const board = Array(n).fill(-1);
        await solve(board, 0);

        if (!stopRef.current) {
            setStatus("Finished!");
            setIsPlaying(false);
        }
    };

    const solve = async (board: number[], col: number): Promise<boolean> => {
        if (stopRef.current) return false;

        if (col >= n) {
            return true; // Found a solution
        }

        for (let row = 0; row < n; row++) {
            if (stopRef.current) return false;

            // Update UI
            setCurrentCol(col);
            setCurrentRow(row);
            board[col] = row;
            setQueens([...board]); // Visualization update

            await delay(speed);

            if (checkSafe(board, row, col)) {
                if (await solve(board, col + 1)) return true;

                // Backtrack
                if (stopRef.current) return false;
                board[col] = -1; // Remove
                setQueens([...board]); // UI remove
                await delay(speed);
            } else {
                // Conflict visualization?
            }
        }
        // Backtrack from this col
        board[col] = -1;
        setQueens([...board]);
        return false;
    };

    const checkSafe = (board: number[], row: number, col: number) => {
        for (let c = 0; c < col; c++) {
            const r = board[c];
            if (r === -1) continue;
            if (r === row) return false;
            if (Math.abs(r - row) === Math.abs(c - col)) return false;
        }
        return true;
    };


    return (
        <div className="flex flex-col h-full bg-slate-50 rounded-xl overflow-hidden text-slate-700">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between p-4 bg-white border-b border-slate-200">
                <div className="flex items-center gap-4">
                    <h3 className="font-bold flex items-center gap-2">
                        <Crown size={18} className="text-amber-500" />
                        N-Queens
                    </h3>
                    <select
                        value={n}
                        onChange={(e) => setN(Number(e.target.value))}
                        className="bg-slate-100 border border-slate-300 rounded px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isPlaying}
                    >
                        {[4, 5, 6, 7, 8].map(num => <option key={num} value={num}>{num} Queens</option>)}
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={runSolver}
                        disabled={isPlaying}
                        className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg font-bold hover:bg-amber-600 disabled:opacity-50 transition"
                    >
                        <Play size={16} /> Solve
                    </button>
                    <button onClick={resetBoard} className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
                        <RotateCcw size={18} />
                    </button>
                </div>
            </div>

            {/* Status */}
            <div className="text-center py-2 text-xs font-mono text-slate-500 bg-slate-100 border-b border-slate-200">
                {status} {currentRow !== -1 ? `(Checking row ${currentRow}, col ${currentCol})` : ''}
            </div>

            {/* Board */}
            <div className="flex-1 flex items-center justify-center p-4 bg-slate-200">
                <div
                    className="grid gap-1 bg-white p-2 shadow-xl rounded-lg border border-slate-300"
                    style={{
                        gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`,
                        width: 'min(100%, 400px)',
                        aspectRatio: '1/1'
                    }}
                >
                    {Array.from({ length: n * n }).map((_, i) => {
                        const row = Math.floor(i / n);
                        const col = i % n;
                        const isBlack = (row + col) % 2 === 1;

                        const hasQueen = queens[col] === row;
                        const isChecking = currentRow === row && currentCol === col;

                        return (
                            <div
                                key={i}
                                className={`
                            relative flex items-center justify-center text-2xl
                            ${isBlack ? 'bg-slate-400' : 'bg-slate-100'}
                            ${isChecking ? '!bg-blue-200 ring-2 ring-blue-500 z-10' : ''}
                            transition-all duration-200
                        `}
                            >
                                {hasQueen && (
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="text-amber-600 drop-shadow-sm"
                                    >
                                        <Crown size={'60%'} fill="currentColor" />
                                    </motion.div>
                                )}
                                {/* Dot for empty checking? No, highlight bg is enough */}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default NQueensVisualizer;
