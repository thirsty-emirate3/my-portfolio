import React, { useEffect, useState } from 'react';

const ROWS = 21; // Must be odd for perfect maze
const COLS = 31; // Must be odd

type CellType = 'wall' | 'path' | 'current';

export const MazeVisualizer: React.FC = () => {
    const [grid, setGrid] = useState<CellType[][]>([]);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        resetGrid();
    }, []);

    const resetGrid = () => {
        // Initialize with all walls
        const newGrid = Array.from(Array(ROWS), () => Array(COLS).fill('wall'));
        setGrid(newGrid);
    };

    const generateMaze = async () => {
        if (isRunning) return;
        setIsRunning(true);
        resetGrid(); // Start fresh

        // Maze Gen Logic (Depth-First Search / Recursive Backtracker)
        // 1. Start at a random point (must be odd coordinates)
        // 2. Mark as path
        // 3. While unvisited neighbors:
        //    a. Pick random neighbor
        //    b. Remove wall between
        //    c. Move to neighbor (recursive)

        // Using Iterative approach with Stack to animate easily

        // Initial setup needs to be valid odd coords
        const startRow = 1;
        const startCol = 1;

        const stack: [number, number][] = [[startRow, startCol]];

        // We need a separate visited logic or just check if 'path'
        // To animate, we need to manipulate state step-by-step

        // Lets use a muteable grid for logic tracking, and update state for render
        // NOTE: 'wall' is unvisited. 'path' is visited.

        const maze = Array.from(Array(ROWS), () => Array(COLS).fill('wall'));
        maze[startRow][startCol] = 'path';

        setGrid(prev => {
            const g = [...prev.map(r => [...r])];
            g[startRow][startCol] = 'path';
            return g;
        });

        while (stack.length > 0) {
            const [r, c] = stack[stack.length - 1]; // Peek

            // Highlight current head
            setGrid(prev => {
                const g = [...prev.map(row => [...row])];
                g[r][c] = 'current'; // Flash current
                return g;
            });
            await new Promise(res => setTimeout(res, 20)); // Speed

            // Get unvisited neighbors (distance 2)
            const directions = [
                [0, -2], [0, 2], [-2, 0], [2, 0]
            ];
            const neighbors: [number, number, number, number][] = []; // [nr, nc, midr, midc]

            for (const [dr, dc] of directions) {
                const nr = r + dr;
                const nc = c + dc;
                if (nr > 0 && nr < ROWS - 1 && nc > 0 && nc < COLS - 1 && maze[nr][nc] === 'wall') {
                    neighbors.push([nr, nc, r + dr / 2, c + dc / 2]);
                }
            }

            if (neighbors.length > 0) {
                // Pick random
                const [nextR, nextC, midR, midC] = neighbors[Math.floor(Math.random() * neighbors.length)];

                // Carve
                maze[midR][midC] = 'path';
                maze[nextR][nextC] = 'path';
                stack.push([nextR, nextC]);

                // Update Visual
                setGrid(prev => {
                    const g = [...prev.map(row => [...row])];
                    g[r][c] = 'path'; // Restore previous to path color
                    g[midR][midC] = 'path';
                    g[nextR][nextC] = 'path';
                    return g;
                });
            } else {
                // Backtrack
                stack.pop();
                setGrid(prev => {
                    const g = [...prev.map(row => [...row])];
                    g[r][c] = 'path'; // Restore from current to path
                    return g;
                });
            }
        }

        setIsRunning(false);
    };

    return (
        <div className="flex flex-col items-center h-full p-4 w-full">
            <div className="flex gap-4 mb-4">
                <button
                    onClick={generateMaze}
                    disabled={isRunning}
                    className="px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50"
                >
                    {isRunning ? 'Generating...' : 'Generate Maze'}
                </button>
                <button
                    onClick={resetGrid}
                    disabled={isRunning}
                    className="px-4 py-2 text-sm font-bold text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50"
                >
                    Reset
                </button>
            </div>

            <div
                className="grid gap-0 bg-slate-800 border-4 border-slate-800 rounded-lg shadow-lg"
                style={{
                    gridTemplateColumns: `repeat(${COLS}, 15px)`,
                    gridTemplateRows: `repeat(${ROWS}, 15px)`
                }}
            >
                {grid.map((row, r) =>
                    row.map((cell, c) => (
                        <div
                            key={`${r}-${c}`}
                            style={{ width: 15, height: 15 }}
                            className={`
                        ${cell === 'wall' ? 'bg-slate-800' :
                                    cell === 'current' ? 'bg-red-500' : 'bg-white'}
                    `}
                        />
                    ))
                )}
            </div>
            <p className="mt-4 text-xs text-slate-500">
                Recursive Backtracker Algorithm (Depth-First Search)
            </p>
        </div>
    );
};
