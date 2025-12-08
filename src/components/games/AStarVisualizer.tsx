
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Play, RotateCcw, Pause, MousePointer2 } from 'lucide-react';

// Types
type NodeType = 'start' | 'goal' | 'wall' | 'empty' | 'visited' | 'path' | 'open';
type Node = {
    row: number;
    col: number;
    type: NodeType;
    f: number;
    g: number;
    h: number;
    parent: Node | null;
};

const ROWS = 15;
const COLS = 20; // S slightly larger for responsiveness

const AStarVisualizer: React.FC = () => {
    const [grid, setGrid] = useState<Node[][]>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [mouseIsPressed, setMouseIsPressed] = useState(false);
    const [nodeTypeToPlace, setNodeTypeToPlace] = useState<'wall'>('wall');

    // Stats
    const [nodesVisited, setNodesVisited] = useState(0);
    const [pathLength, setPathLength] = useState(0);
    const [status, setStatus] = useState("Ready. Draw walls and click Start.");

    const stopRef = useRef(false);

    // Init Grid
    useEffect(() => {
        resetGrid();
    }, []);

    const createNode = (row: number, col: number): Node => ({
        row,
        col,
        type: (row === 7 && col === 4) ? 'start' : (row === 7 && col === 15) ? 'goal' : 'empty',
        f: Infinity,
        g: Infinity,
        h: Infinity,
        parent: null,
    });

    const resetGrid = () => {
        stopRef.current = true;
        setIsPlaying(false);
        setIsFinished(false);
        setNodesVisited(0);
        setPathLength(0);
        setStatus("Ready.");

        const newGrid = [];
        for (let r = 0; r < ROWS; r++) {
            const currentRow = [];
            for (let c = 0; c < COLS; c++) {
                currentRow.push(createNode(r, c));
            }
            newGrid.push(currentRow);
        }
        setGrid(newGrid);
        stopRef.current = false;
    };

    // --- Interaction ---
    const handleMouseDown = (row: number, col: number) => {
        if (isPlaying || isFinished) return;
        setMouseIsPressed(true);
        toggleWall(row, col);
    };
    const handleMouseEnter = (row: number, col: number) => {
        if (!mouseIsPressed || isPlaying || isFinished) return;
        toggleWall(row, col);
    };
    const handleMouseUp = () => setMouseIsPressed(false);

    const toggleWall = (row: number, col: number) => {
        setGrid(prev => {
            const newGrid = [...prev]; // Shallow copy of rows
            const node = newGrid[row][col];
            if (node.type === 'start' || node.type === 'goal') return prev;

            // Toggle
            const newType = node.type === 'wall' ? 'empty' : 'wall';
            // Deep copy row
            newGrid[row] = [...newGrid[row]];
            newGrid[row][col] = { ...node, type: newType };
            return newGrid;
        });
    };

    // --- Algorithm ---
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const heuristic = (a: Node, b: Node) => {
        // Manhattan distance for 4-way movement
        return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
    };

    const runAStar = async () => {
        if (isPlaying || isFinished) return;
        setIsPlaying(true);
        stopRef.current = false;
        setStatus("Calculating path...");

        // Deep copy grid structure for logic (React state grid is for rendering)
        // Wait, mutating state directly is bad, but for performance in pathfinding loop
        // we often use a reference grid. Simulating via React state updates needs careful async.

        // Find Start and Goal
        let startNode: Node | null = null;
        let goalNode: Node | null = null;
        const currentGrid = grid.map(row => row.map(node => ({ ...node }))); // Deep copy for sim

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (currentGrid[r][c].type === 'start') startNode = currentGrid[r][c];
                if (currentGrid[r][c].type === 'goal') goalNode = currentGrid[r][c];
            }
        }

        if (!startNode || !goalNode) return;

        let openSet: Node[] = [startNode];
        let closedSet: Node[] = [];

        startNode.g = 0;
        startNode.h = heuristic(startNode, goalNode);
        startNode.f = startNode.h;

        while (openSet.length > 0) {
            if (stopRef.current) break;

            // Get node with lowest F score
            let lowestIndex = 0;
            for (let i = 0; i < openSet.length; i++) {
                if (openSet[i].f < openSet[lowestIndex].f) lowestIndex = i;
            }
            let current = openSet[lowestIndex];

            // Reached Goal?
            if (current.row === goalNode.row && current.col === goalNode.col) {
                await reconstructPath(current);
                setStatus("Goal Reached!");
                setIsPlaying(false);
                setIsFinished(true);
                return;
            }

            // Move current from Open to Closed
            openSet.splice(lowestIndex, 1);
            closedSet.push(current);

            // Visualize Closed (Visited)
            if (current.type !== 'start' && current.type !== 'goal') {
                updateGridNode(current.row, current.col, 'visited');
                setNodesVisited(prev => prev + 1);
                // Speed control
                await delay(20);
            }

            // Neighbors
            const neighbors = getNeighbors(current, currentGrid);
            for (let neighbor of neighbors) {
                if (closedSet.includes(neighbor) || neighbor.type === 'wall') continue;

                // dist between neighbors is 1
                const tempG = current.g + 1;
                let newPath = false;

                if (openSet.includes(neighbor)) {
                    if (tempG < neighbor.g) {
                        neighbor.g = tempG;
                        newPath = true;
                    }
                } else {
                    neighbor.g = tempG;
                    newPath = true;
                    openSet.push(neighbor);
                    // Visualize Open
                    if (neighbor.type !== 'goal') {
                        updateGridNode(neighbor.row, neighbor.col, 'open');
                        await delay(5);
                    }
                }

                if (newPath) {
                    neighbor.h = heuristic(neighbor, goalNode);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.parent = current;
                }
            }
        }

        if (!stopRef.current) {
            setStatus("No path found.");
            setIsPlaying(false);
            setIsFinished(true);
        }
    };

    const getNeighbors = (node: Node, gridRef: Node[][]) => {
        const res = [];
        const { row, col } = node;
        if (row > 0) res.push(gridRef[row - 1][col]);
        if (row < ROWS - 1) res.push(gridRef[row + 1][col]);
        if (col > 0) res.push(gridRef[row][col - 1]);
        if (col < COLS - 1) res.push(gridRef[row][col + 1]);
        return res;
    };

    const updateGridNode = (row: number, col: number, type: NodeType) => {
        setGrid(prev => {
            const next = [...prev];
            next[row] = [...next[row]];
            next[row][col] = { ...next[row][col], type };
            return next;
        });
    };

    const reconstructPath = async (current: Node) => {
        let temp = current;
        const path = [];
        while (temp.parent) {
            path.push(temp);
            temp = temp.parent;
        }
        setPathLength(path.length);

        // Animate path logic (reverse)
        for (let i = path.length - 1; i >= 0; i--) {
            const node = path[i];
            if (node.type !== 'goal') {
                updateGridNode(node.row, node.col, 'path');
                await delay(30);
            }
        }
    };


    return (
        <div className="flex flex-col h-full bg-slate-50 rounded-xl overflow-hidden select-none">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between p-4 bg-white border-b border-slate-200">
                <h3 className="font-bold text-slate-700 flex items-center gap-2">
                    A* Search
                    <span className="text-xs font-normal bg-slate-100 px-2 py-0.5 rounded text-slate-500">Heuristic Pathfinding</span>
                </h3>
                <div className="flex gap-2">
                    <button
                        onClick={runAStar}
                        disabled={isPlaying || isFinished}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        <Play size={16} /> Start
                    </button>
                    <button
                        onClick={resetGrid}
                        className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition"
                    >
                        <RotateCcw size={18} />
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-1 p-2 bg-slate-100 text-xs text-center border-b border-slate-200 font-mono text-slate-600">
                <div>Status: {status}</div>
                <div>Visited: {nodesVisited}</div>
                <div>Path: {pathLength} steps</div>
            </div>

            {/* Grid */}
            <div
                className="flex-1 overflow-hidden p-4 flex items-center justify-center bg-slate-50"
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <div
                    className="grid gap-[2px] bg-slate-200 border border-slate-300 shadow-sm"
                    style={{
                        gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
                        width: 'min(100%, 600px)'
                    }}
                >
                    {grid.map((row, r) => (
                        row.map((node, c) => (
                            <div
                                key={`${r}-${c}`}
                                onMouseDown={() => handleMouseDown(r, c)}
                                onMouseEnter={() => handleMouseEnter(r, c)}
                                className={`
                            aspect-square w-full transition-all duration-300
                            ${node.type === 'start' ? 'bg-blue-600 scale-110 !rounded-full z-10' :
                                        node.type === 'goal' ? 'bg-red-500 scale-110 !rounded-full z-10' :
                                            node.type === 'wall' ? 'bg-slate-800 scale-90 rounded-sm' :
                                                node.type === 'path' ? 'bg-yellow-400 scale-100' :
                                                    node.type === 'visited' ? 'bg-blue-200 rounded-lg' :
                                                        node.type === 'open' ? 'bg-green-100' :
                                                            'bg-white hover:bg-slate-100'}
                        `}
                            />
                        ))
                    ))}
                </div>
            </div>

            <div className="p-3 bg-white text-[10px] text-slate-500 flex justify-center gap-4 border-t border-slate-200">
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-600"></div> Start</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500"></div> Goal</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 bg-slate-800"></div> Wall (Click to draw)</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 bg-yellow-400"></div> Path</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 bg-green-100"></div> Open (Candidate)</span>
            </div>
        </div>
    );
};

export default AStarVisualizer;
