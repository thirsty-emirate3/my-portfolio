import React, { useCallback, useRef, useState } from 'react';

const numRows = 30;
const numCols = 30;
const operations = [
    [0, 1], [0, -1], [1, -1], [-1, 1],
    [1, 1], [-1, -1], [1, 0], [-1, 0]
];

export const GameOfLife: React.FC = () => {
    const [grid, setGrid] = useState<number[][]>(() => {
        const rows = [];
        for (let i = 0; i < numRows; i++) {
            rows.push(Array.from(Array(numCols), () => 0));
        }
        return rows;
    });

    const [running, setRunning] = useState(false);
    const runningRef = useRef(running);
    runningRef.current = running;

    const runSimulation = useCallback(() => {
        if (!runningRef.current) {
            return;
        }

        setGrid((g) => {
            const newGrid = g.map((arr) => [...arr]); // Deep copy
            let hasChanges = false;

            for (let i = 0; i < numRows; i++) {
                for (let j = 0; j < numCols; j++) {
                    let neighbors = 0;
                    operations.forEach(([x, y]) => {
                        const newI = i + x;
                        const newJ = j + y;
                        if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
                            neighbors += g[newI][newJ];
                        }
                    });

                    if (neighbors < 2 || neighbors > 3) {
                        if (g[i][j] === 1) {
                            newGrid[i][j] = 0;
                            hasChanges = true;
                        }
                    } else if (g[i][j] === 0 && neighbors === 3) {
                        newGrid[i][j] = 1;
                        hasChanges = true;
                    }
                }
            }

            // Stop if stable (optional, but good for saving standard CPU)
            if (!hasChanges) {
                // runningRef.current = false;
                // setRunning(false);
            }
            return newGrid;
        });

        setTimeout(runSimulation, 100);
    }, []);

    const toggleRunning = () => {
        setRunning(!running);
        if (!running) {
            runningRef.current = true;
            runSimulation();
        }
    };

    const randomize = () => {
        const rows = [];
        for (let i = 0; i < numRows; i++) {
            rows.push(Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0)));
        }
        setGrid(rows);
    };

    const clear = () => {
        setGrid(Array.from(Array(numRows), () => Array(numCols).fill(0)));
        setRunning(false);
    };

    const loadPreset = (type: 'glider' | 'pulsar') => {
        const newGrid = Array.from(Array(numRows), () => Array(numCols).fill(0));
        setRunning(false);

        if (type === 'glider') {
            const offset = 2;
            newGrid[0 + offset][1 + offset] = 1;
            newGrid[1 + offset][2 + offset] = 1;
            newGrid[2 + offset][0 + offset] = 1;
            newGrid[2 + offset][1 + offset] = 1;
            newGrid[2 + offset][2 + offset] = 1;
        } else if (type === 'pulsar') {
            const cx = 15;
            const cy = 15;
            // Simple Pulsar-like oscillator or just a cross
            for (let i = 0; i < 3; i++) {
                newGrid[cx - 1][cy - 2 - i] = 1;
                newGrid[cx + 1][cy - 2 - i] = 1;
                newGrid[cx - 1][cy + 2 + i] = 1;
                newGrid[cx + 1][cy + 2 + i] = 1;

                newGrid[cx - 2 - i][cy - 1] = 1;
                newGrid[cx - 2 - i][cy + 1] = 1;
                newGrid[cx + 2 + i][cy - 1] = 1;
                newGrid[cx + 2 + i][cy + 1] = 1;
            }
        }

        setGrid(newGrid);
    };

    return (
        <div className="flex flex-col items-center h-full p-4 overflow-hidden w-full">
            <div className="flex flex-wrap gap-2 mb-4 justify-center">
                <button
                    onClick={toggleRunning}
                    className={`px-4 py-2 text-sm font-bold text-white rounded shadow-sm transition-colors ${running ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                >
                    {running ? 'Stop' : 'Start'}
                </button>
                <button
                    onClick={randomize}
                    className="px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded shadow-sm hover:bg-slate-50"
                >
                    Random
                </button>
                <button
                    onClick={() => loadPreset('glider')}
                    className="px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded shadow-sm hover:bg-slate-50"
                >
                    Glider
                </button>
                <button
                    onClick={() => loadPreset('pulsar')}
                    className="px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded shadow-sm hover:bg-slate-50"
                >
                    Pulsar
                </button>
                <button
                    onClick={clear}
                    className="px-3 py-2 text-xs font-medium text-red-600 bg-white border border-red-200 rounded shadow-sm hover:bg-red-50"
                >
                    Clear
                </button>
            </div>

            <div className="relative border-4 border-slate-300 bg-slate-50 rounded-lg shadow-inner overflow-hidden">
                <div
                    className="grid"
                    style={{
                        gridTemplateColumns: `repeat(${numCols}, 20px)`,
                    }}
                >
                    {grid.map((rows, i) =>
                        rows.map((_, k) => (
                            <div
                                key={`${i}-${k}`}
                                onClick={() => {
                                    const newGrid = grid.map((arr) => [...arr]);
                                    newGrid[i][k] = grid[i][k] ? 0 : 1;
                                    setGrid(newGrid);
                                }}
                                style={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor: grid[i][k] ? '#3b82f6' : 'transparent',
                                }}
                                className={`transition-colors duration-100 cursor-pointer border-[0.5px] border-slate-200/50 hover:bg-blue-100 ${grid[i][k] ? 'shadow-sm' : ''}`}
                            />
                        ))
                    )}
                </div>
            </div>

            <div className="mt-6 max-w-lg text-slate-600 bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-xs leading-relaxed">
                <h4 className="font-bold text-slate-800 mb-2">コンウェイのライフゲーム (Game of Life)</h4>
                <p className="mb-2">
                    生物の誕生と死滅をシミュレートする「セル・オートマトン」。
                    単純な4つのルールだけで、複雑で有機的な動きが生まれます。
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-500 ml-1">
                    <li><strong className="text-slate-700">恐慌 (Underpopulation)</strong>: 生きているセルが隣接2個未満なら死滅。</li>
                    <li><strong className="text-slate-700">生存 (Survival)</strong>: 生きているセルが隣接2〜3個なら生存。</li>
                    <li><strong className="text-slate-700">過密 (Overpopulation)</strong>: 生きているセルが隣接4個以上なら死滅。</li>
                    <li><strong className="text-slate-700">誕生 (Reproduction)</strong>: 死んでいるセルに隣接3個があれば誕生。</li>
                </ul>
            </div>
        </div>
    );
};
