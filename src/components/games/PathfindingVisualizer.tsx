import React, { useEffect, useState } from 'react';

type NodeType = 'start' | 'end' | 'wall' | 'empty' | 'visited' | 'path';

interface Node {
    row: number;
    col: number;
    type: NodeType;
    distance: number;
    previousNode: Node | null;
}

const ROWS = 15;
const COLS = 25;

export const PathfindingVisualizer: React.FC = () => {
    const [grid, setGrid] = useState<Node[][]>([]);
    const [isRunning, setIsRunning] = useState(false);
    const [mouseIsPressed, setMouseIsPressed] = useState(false);
    const [status, setStatus] = useState<string>('Select Start/End or Draw Walls, then click Visualise.');
    const [pathLength, setPathLength] = useState<number>(0);

    // Initialize grid
    useEffect(() => {
        resetGrid();
    }, []);

    const resetGrid = () => {
        const newGrid: Node[][] = [];
        for (let row = 0; row < ROWS; row++) {
            const currentRow: Node[] = [];
            for (let col = 0; col < COLS; col++) {
                currentRow.push({
                    row,
                    col,
                    type: row === 7 && col === 4 ? 'start' : row === 7 && col === 20 ? 'end' : 'empty',
                    distance: Infinity,
                    previousNode: null,
                });
            }
            newGrid.push(currentRow);
        }
        setGrid(newGrid);
        setIsRunning(false);
        setStatus('Grid reset. Ready.');
        setPathLength(0);
    };

    const generateRandomMaze = () => {
        if (isRunning) return;
        resetGrid(); // Clear first
        // Specific timeout to allow state update or just modify the raw grid before setting
        setTimeout(() => {
            setGrid((prev) => {
                const newGrid = prev.map(row => row.map(node => {
                    if (node.type === 'start' || node.type === 'end') return node;
                    return {
                        ...node,
                        type: (Math.random() < 0.3 ? 'wall' : 'empty') as NodeType
                    };
                }));
                return newGrid;
            });
            setStatus('Random maze generated.');
        }, 10);
    };

    const handleMouseDown = (row: number, col: number) => {
        if (isRunning) return;
        setMouseIsPressed(true);
        toggleWall(row, col);
    };

    const handleMouseEnter = (row: number, col: number) => {
        if (!mouseIsPressed || isRunning) return;
        toggleWall(row, col);
    };

    const handleMouseUp = () => {
        setMouseIsPressed(false);
    };

    const toggleWall = (row: number, col: number) => {
        setGrid((prevGrid) => {
            const newGrid = [...prevGrid];
            const node = newGrid[row][col];
            if (node.type !== 'start' && node.type !== 'end') {
                newGrid[row][col] = {
                    ...node,
                    type: node.type === 'wall' ? 'empty' : 'wall',
                };
            }
            return newGrid;
        });
    };

    const visualizeBFS = async () => {
        if (isRunning) return;
        setIsRunning(true);
        setStatus('BFS Searching... (Breadth-First Search guarantees shortest path)');
        setPathLength(0);

        // Deep copy for algorithm to avoid React state lag during calculation
        // But we need to animate... so we'll do an async loop with state updates?
        // Actually, pure React state updates for 15x25 grid might be slow if we setState every node.
        // Better to update classNames directly OR use a ref for the grid logic and only sync render?
        // For simplicity/visuals, we'll try standard state with small timeouts or batching.

        // Actually, let's stick to the "React way" but maybe optimized.
        // Or just run the algo, get the visited list, and then animate.

        const startNode = grid.flat().find(n => n.type === 'start')!;
        const endNode = grid.flat().find(n => n.type === 'end')!;

        const visitedNodesInOrder: Node[] = [];

        startNode.distance = 0;

        // RUN ALGO (Instant logic, then animate)
        // IMPORTANT: We need to use a mute-able grid clone for logic
        const logicGrid = grid.map(row => row.map(n => ({ ...n })));
        const logicValues = new Map<string, Node>();
        logicGrid.flat().forEach(n => logicValues.set(`${n.row}-${n.col}`, n));

        const q: Node[] = [logicValues.get(`${startNode.row}-${startNode.col}`)!];
        let reachedEnd = false;
        let finalEndNode: Node | null = null;

        const visited: Set<string> = new Set();
        visited.add(`${startNode.row}-${startNode.col}`);

        while (q.length > 0) {
            const currentNode = q.shift()!;
            visitedNodesInOrder.push(currentNode);

            if (currentNode.row === endNode.row && currentNode.col === endNode.col) {
                reachedEnd = true;
                finalEndNode = currentNode;
                break;
            }

            const neighbors = [
                [0, 1], [0, -1], [1, 0], [-1, 0]
            ];

            for (const [dx, dy] of neighbors) {
                const newRow = currentNode.row + dx;
                const newCol = currentNode.col + dy;
                const key = `${newRow}-${newCol}`;

                if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS) {
                    const neighbor = logicValues.get(key)!;
                    if (!visited.has(key) && neighbor.type !== 'wall') {
                        visited.add(key);
                        neighbor.previousNode = currentNode;
                        q.push(neighbor);
                    }
                }
            }
        }

        // ANIMATE VISITED
        for (let i = 0; i < visitedNodesInOrder.length; i++) {
            const node = visitedNodesInOrder[i];
            if (node.type !== 'start' && node.type !== 'end') {
                await new Promise(r => setTimeout(r, 15)); // Faster animation
                setGrid(prev => {
                    const newG = [...prev];
                    newG[node.row] = [...newG[node.row]];
                    newG[node.row][node.col] = { ...newG[node.row][node.col], type: 'visited' };
                    return newG;
                });
            }
        }

        // ANIMATE PATH
        if (reachedEnd && finalEndNode) {
            let curr = finalEndNode.previousNode;
            let count = 0;
            const pathNodes: Node[] = [];
            while (curr && (curr.row !== startNode.row || curr.col !== startNode.col)) {
                pathNodes.unshift(curr); // Add to front to animate from start
                curr = curr.previousNode;
            }

            for (const p of pathNodes) {
                count++;
                await new Promise(r => setTimeout(r, 40));
                setGrid(prev => {
                    const newG = [...prev];
                    newG[p.row] = [...newG[p.row]];
                    newG[p.row][p.col] = { ...newG[p.row][p.col], type: 'path' };
                    return newG;
                });
            }
            setPathLength(count + 1); // +1 for the last step
            setStatus(`Path Found! Distance: ${count + 1} steps.`);
        } else {
            setStatus('No path found to the destination.');
        }

        setIsRunning(false);
    };

    return (
        <div className="flex flex-col items-center h-full p-4 w-full">
            <div className="w-full max-w-2xl mb-4 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <p className="text-sm font-medium text-slate-700 mb-1">Status: <span className="text-blue-600">{status}</span></p>
                {pathLength > 0 && <p className="text-sm font-medium text-slate-700">Path Length: <span className="text-green-600">{pathLength} steps</span></p>}
                <p className="text-xs text-slate-500 leading-relaxed">
                    BFS (幅優先探索) を使用して、最短経路を探索しています。スライムのように全方向に広がり、ゴールへの最短ルートを保証します。
                </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-4 justify-center">
                <button
                    onClick={visualizeBFS}
                    disabled={isRunning}
                    className="px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded shadow hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Start Search
                </button>
                <button
                    onClick={generateRandomMaze}
                    disabled={isRunning}
                    className="px-4 py-2 text-sm font-bold text-slate-700 bg-white border border-slate-300 rounded shadow-sm hover:bg-indigo-50 transition-colors"
                >
                    Random Maze
                </button>
                <button
                    onClick={resetGrid}
                    disabled={isRunning}
                    className="px-4 py-2 text-sm font-bold text-slate-700 bg-white border border-slate-300 rounded shadow-sm hover:bg-slate-50 transition-colors"
                >
                    Clear
                </button>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-500 mb-2">
                <div className="flex items-center gap-1"><span className="w-3 h-3 bg-green-500 rounded-sm"></span> Start</div>
                <div className="flex items-center gap-1"><span className="w-3 h-3 bg-red-500 rounded-sm"></span> Goal</div>
                <div className="flex items-center gap-1"><span className="w-3 h-3 bg-slate-800 rounded-sm"></span> Wall</div>
                <div className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-300 rounded-sm"></span> Visited</div>
                <div className="flex items-center gap-1"><span className="w-3 h-3 bg-yellow-400 rounded-sm"></span> Path</div>
            </div>

            <div
                className="grid gap-[1px] bg-slate-200 border border-slate-300 shadow-sm overflow-hidden"
                style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
                onMouseLeave={handleMouseUp}
            >
                {grid.map((row, rowIdx) => (
                    row.map((node, colIdx) => (
                        <div
                            key={`${rowIdx}-${colIdx}`}
                            className={`w-[30px] h-[30px] transition-colors duration-200 select-none
                ${node.type === 'start' ? 'bg-green-500' :
                                    node.type === 'end' ? 'bg-red-500' :
                                        node.type === 'wall' ? 'bg-slate-800 animate-pulse' :
                                            node.type === 'path' ? 'bg-yellow-400 scale-110 !duration-500' :
                                                node.type === 'visited' ? 'bg-blue-300 animate-[bounce_0.3s_ease-out_1]' :
                                                    'bg-white hover:bg-slate-100'
                                }
              `}
                            onMouseDown={() => handleMouseDown(rowIdx, colIdx)}
                            onMouseEnter={() => handleMouseEnter(rowIdx, colIdx)}
                            onMouseUp={handleMouseUp}
                        />
                    ))
                ))}
            </div>
        </div>
    );
};
