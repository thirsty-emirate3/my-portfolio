import React, { useState, useRef, useEffect } from 'react';

type TreeNode = {
    value: number;
    left: TreeNode | null;
    right: TreeNode | null;
    x: number;
    y: number;
    id: string; // unique ID for animations
};

const TREE_START_X = 250;
const TREE_START_Y = 40;
const LEVEL_HEIGHT = 50;

export const BSTVisualizer: React.FC = () => {
    const [root, setRoot] = useState<TreeNode | null>(null);
    const [inputValue, setInputValue] = useState<string>('');
    const [highlightedNodeId, setHighlightedNodeId] = useState<string | null>(null);
    const [message, setMessage] = useState<string>('Enter a number to insert.');
    const [isProcessing, setIsProcessing] = useState(false);

    // Helper to generate IDs
    const generateId = () => Math.random().toString(36).substr(2, 9);

    const insert = async () => {
        const val = parseInt(inputValue);
        if (isNaN(val)) return;
        if (isProcessing) return;

        setIsProcessing(true);
        setMessage(`Inserting ${val}...`);
        setInputValue('');

        if (!root) {
            setRoot({ value: val, left: null, right: null, x: TREE_START_X, y: TREE_START_Y, id: generateId() });
            setMessage(`Inserted ${val} as root.`);
            setIsProcessing(false);
            return;
        }

        let current = root;
        let depth = 0;

        // We need to reconstruct the tree state for React, usually by cloning
        // For visualization, we keep the structure stable but traverse it for animation

        // Traverse Logic with Animation
        while (true) {
            setHighlightedNodeId(current.id);
            await new Promise(r => setTimeout(r, 500));

            if (val === current.value) {
                setMessage(`${val} already exists!`);
                setHighlightedNodeId(null);
                setIsProcessing(false);
                return;
            }

            if (val < current.value) {
                if (current.left === null) {
                    // Insert Left
                    // Calculate new X based on depth. Simple logic: offset = width / (2^(depth+2))? 
                    // A naive approach: fixed offset / depth. 
                    const offset = 120 / Math.pow(1.5, depth);
                    current.left = {
                        value: val,
                        left: null,
                        right: null,
                        x: current.x - offset,
                        y: current.y + LEVEL_HEIGHT,
                        id: generateId()
                    };
                    updateTreeState(root); // Force update
                    setHighlightedNodeId(current.left.id);
                    setMessage(`Inserted ${val} to left of ${current.value}.`);
                    break;
                }
                current = current.left;
            } else {
                if (current.right === null) {
                    // Insert Right
                    const offset = 120 / Math.pow(1.5, depth);
                    current.right = {
                        value: val,
                        left: null,
                        right: null,
                        x: current.x + offset,
                        y: current.y + LEVEL_HEIGHT,
                        id: generateId()
                    };
                    updateTreeState(root); // Force update
                    setHighlightedNodeId(current.right.id);
                    setMessage(`Inserted ${val} to right of ${current.value}.`);
                    break;
                }
                current = current.right;
            }
            depth++;
        }

        await new Promise(r => setTimeout(r, 500));
        setHighlightedNodeId(null);
        setIsProcessing(false);
    };

    const updateTreeState = (node: TreeNode) => {
        // React state update helper - create a shallow copy of root to trigger re-render
        // Since we mutated the object graph directly (which is bad practice normally but easier for tree algos),
        // we just spread the root to satisfy setRoot.
        // Ideally we should use immutable patterns, but for this quick viz:
        setRoot({ ...node });
    };

    const traverseAndDraw = (node: TreeNode | null, lines: JSX.Element[], nodes: JSX.Element[]) => {
        if (!node) return;

        if (node.left) {
            lines.push(
                <line
                    key={`line-${node.id}-${node.left.id}`}
                    x1={node.x}
                    y1={node.y}
                    x2={node.left.x}
                    y2={node.left.y}
                    stroke="#cbd5e1"
                    strokeWidth="2"
                />
            );
            traverseAndDraw(node.left, lines, nodes);
        }

        if (node.right) {
            lines.push(
                <line
                    key={`line-${node.id}-${node.right.id}`}
                    x1={node.x}
                    y1={node.y}
                    x2={node.right.x}
                    y2={node.right.y}
                    stroke="#cbd5e1"
                    strokeWidth="2"
                />
            );
            traverseAndDraw(node.right, lines, nodes);
        }

        nodes.push(
            <g key={node.id} className="transition-all duration-300">
                <circle
                    cx={node.x}
                    cy={node.y}
                    r="18"
                    fill={highlightedNodeId === node.id ? '#fcd34d' : 'white'}
                    stroke={highlightedNodeId === node.id ? '#d97706' : '#64748b'}
                    strokeWidth={highlightedNodeId === node.id ? '3' : '2'}
                    className="transition-colors duration-300"
                />
                <text
                    x={node.x}
                    y={node.y}
                    dy="5"
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="bold"
                    fill="#334155"
                >
                    {node.value}
                </text>
            </g>
        );
    };

    const renderTree = () => {
        if (!root) return null;
        const lines: JSX.Element[] = [];
        const nodes: JSX.Element[] = [];
        traverseAndDraw(root, lines, nodes);
        return (
            <svg width="500" height="350" viewBox="0 0 500 350" className="overflow-visible">
                {lines}
                {nodes}
            </svg>
        );
    };

    const reset = () => {
        setRoot(null);
        setHighlightedNodeId(null);
        setMessage('Tree cleared.');
    }

    return (
        <div className="flex flex-col items-center h-full p-4 w-full">
            <div className="flex gap-2 mb-4 w-full max-w-md justify-center">
                <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Number"
                    className="px-3 py-2 border border-slate-300 rounded text-slate-700 w-24"
                    onKeyDown={(e) => e.key === 'Enter' && insert()}
                />
                <button
                    onClick={insert}
                    disabled={isProcessing}
                    className="px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50"
                >
                    Insert
                </button>
                <button
                    onClick={reset}
                    disabled={isProcessing}
                    className="px-4 py-2 text-sm font-bold text-red-600 bg-white border border-red-200 rounded hover:bg-red-50 disabled:opacity-50"
                >
                    Clear
                </button>
            </div>

            <div className="mb-2 h-6 text-sm font-semibold text-slate-600">
                {message}
            </div>

            <div className="flex-1 w-full flex items-center justify-center bg-slate-50 border border-slate-200 rounded-xl shadow-inner overflow-auto">
                {renderTree()}
            </div>

            <p className="mt-2 text-xs text-slate-400">
                Binary Search Tree: Left child smaller, Right child larger.
            </p>
        </div>
    );
};
