import { useState, useEffect, useRef } from 'react';

import { Play, RotateCcw, Trophy, Timer, Keyboard, Volume2, VolumeX, Info } from 'lucide-react';
import { SoundController } from '../../utils/SoundController';
import { GameInstructions } from '../common/GameInstructions';

// --- Data ---
const SNIPPETS = [
    { language: 'JavaScript', code: "const sum = (a, b) => a + b;\nconsole.log(sum(5, 3));" },
    { language: 'Python', code: "def fibonacci(n):\n    if n <= 1: return n\n    return fibonacci(n-1) + fibonacci(n-2)" },
    { language: 'TypeScript', code: "interface User {\n  id: number;\n  name: string;\n}\nconst user: User = { id: 1, name: 'Alice' };" },
    { language: 'React', code: "import { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;\n}" },
    { language: 'SQL', code: "SELECT * FROM users\nWHERE created_at > '2023-01-01'\nORDER BY username ASC;" }
];

// --- Component ---
export const CodeTyper = () => {
    const [gameState, setGameState] = useState<'idle' | 'playing' | 'finished'>('idle');
    const [snippetIndex, setSnippetIndex] = useState(0);
    const [input, setInput] = useState('');
    const [startTime, setStartTime] = useState<number | null>(null);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [soundEnabled, setSoundEnabled] = useState(true);

    const inputRef = useRef<HTMLTextAreaElement>(null);
    const snippet = SNIPPETS[snippetIndex];

    useEffect(() => {
        if (gameState === 'playing') {
            const interval = setInterval(() => {
                const now = Date.now();
                const elapsed = (now - (startTime || now)) / 1000;
                setTimeElapsed(elapsed);

                // Calculate WPM
                const words = input.length / 5;
                const minutes = elapsed / 60;
                if (minutes > 0) {
                    setWpm(Math.round(words / minutes));
                }
            }, 100);
            return () => clearInterval(interval);
        }
    }, [gameState, startTime, input]);

    useEffect(() => {
        if (gameState === 'playing' && inputRef.current) {
            inputRef.current.focus();
        }
    }, [gameState]);

    const startGame = () => {
        const randIndex = Math.floor(Math.random() * SNIPPETS.length);
        setSnippetIndex(randIndex);
        setGameState('playing');
        setInput('');
        setStartTime(Date.now());
        setTimeElapsed(0);
        setWpm(0);
        setAccuracy(100);
        if (soundEnabled) SoundController.init();
    };

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (gameState !== 'playing') return;

        const value = e.target.value;
        const targetCode = snippet.code;
        const lastChar = value.slice(-1);
        const expectedChar = targetCode[value.length - 1];

        // Sound Logic
        if (soundEnabled) {
            if (value.length > input.length) { // Typing
                if (lastChar === expectedChar) {
                    SoundController.playClick();
                } else {
                    SoundController.playError();
                }
            }
        }

        setInput(value);

        // Check accuracy
        let correctChars = 0;
        for (let i = 0; i < value.length; i++) {
            if (value[i] === targetCode[i]) correctChars++;
        }
        setAccuracy(Math.round((correctChars / value.length) * 100) || 100);

        // Check completion
        if (value === snippet.code) {
            setGameState('finished');
            if (soundEnabled) SoundController.playSuccess();
        }
    };

    // Render characters with coloring
    const renderCode = () => {
        return snippet.code.split('').map((char, index) => {
            let color = 'text-slate-400';
            let bg = '';
            let isCurrent = index === input.length;

            if (index < input.length) {
                if (input[index] === char) {
                    color = 'text-green-500';
                } else {
                    color = 'text-red-500';
                    bg = 'bg-red-100';
                }
            } else if (isCurrent) {
                bg = 'bg-slate-200 animate-pulse ring-1 ring-slate-400';
            }

            return (
                <span key={index} className={`${color} ${bg} font-mono transition-colors duration-75 rounded-sm`}>
                    {char === '\n' ? '\n' : char}
                </span>
            );
        });
    };

    const [showInstructions, setShowInstructions] = useState(false);

    return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto py-6 text-slate-800 select-none">

            <GameInstructions
                isOpen={showInstructions}
                onClose={() => setShowInstructions(false)}
                title="Code Speed Typer"
                rules={[
                    "Type the displayed code snippet exactly as shown.",
                    "Speed (WPM) and Accuracy (%) are tracked in real-time.",
                    "Mistakes turn red; correct characters turn green.",
                    "Complete the snippet to finish the round."
                ]}
                controls={[
                    { icon: <Keyboard size={20} />, instruction: "Type charaters" },
                    { icon: <RotateCcw size={20} />, instruction: "Restart Game" }
                ]}
            />

            {/* Header */}
            <div className="mb-4 text-center space-y-2 relative w-full">
                <button
                    onClick={() => setShowInstructions(true)}
                    className="absolute left-0 top-0 p-2 text-slate-400 hover:text-blue-500 transition-colors"
                >
                    <Info size={24} />
                </button>
                <div className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-bold tracking-wider text-blue-700 uppercase">
                    Code Speed Typer
                </div>
                <h2 className="text-2xl font-bold">Dev Typing Challenge</h2>
            </div>

            {/* Controls */}
            <div className="w-full max-w-2xl flex justify-end mb-2">
                <button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                    title={soundEnabled ? "Mute" : "Unmute"}
                >
                    {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                </button>
            </div>

            {/* Game Area */}
            <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">

                {/* Stats Bar */}
                <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-100">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-slate-600">
                            <Timer className="w-4 h-4 text-orange-500" />
                            <span className="font-mono font-bold">{timeElapsed.toFixed(1)}s</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                            <Keyboard className="w-4 h-4 text-blue-500" />
                            <span className="font-mono font-bold text-lg">{wpm} WPM</span>
                        </div>
                    </div>
                    <div>
                        <span className={`font-bold ${accuracy === 100 ? 'text-green-600' : accuracy > 90 ? 'text-blue-600' : 'text-red-600'}`}>
                            {accuracy}% Accuracy
                        </span>
                    </div>
                </div>

                {/* Initial Screen */}
                {gameState === 'idle' && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm p-8 text-center">
                        <Keyboard className="w-16 h-16 text-slate-300 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Ready to type?</h3>
                        <p className="text-slate-500 mb-6 text-sm">Real code snippets. Real speed.</p>
                        <button
                            onClick={startGame}
                            className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 active:scale-95 transition-all"
                        >
                            <Play className="w-4 h-4" /> Start
                        </button>
                    </div>
                )}

                {/* Finished Screen */}
                {gameState === 'finished' && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm p-8 text-center animate-in fade-in zoom-in duration-300">
                        <Trophy className="w-16 h-16 text-yellow-500 mb-4 drop-shadow-lg" />
                        <h3 className="text-2xl font-bold mb-1">Excellent!</h3>
                        <div className="flex gap-8 my-6">
                            <div className="text-center">
                                <div className="text-sm text-slate-400 uppercase tracking-wider font-bold">Speed</div>
                                <div className="text-3xl font-black text-slate-800">{wpm} <span className="text-sm font-normal text-slate-500">WPM</span></div>
                            </div>
                            <div className="text-center">
                                <div className="text-sm text-slate-400 uppercase tracking-wider font-bold">Accuracy</div>
                                <div className="text-3xl font-black text-slate-800">{accuracy}%</div>
                            </div>
                        </div>
                        <button
                            onClick={startGame}
                            className="flex items-center gap-2 bg-orange-500 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-orange-500/30 hover:bg-orange-600 hover:scale-105 active:scale-95 transition-all"
                        >
                            <RotateCcw className="w-4 h-4" /> Play Again
                        </button>
                    </div>
                )}

                {/* Code Display & Input */}
                <div className="relative p-8 min-h-[300px] text-lg leading-relaxed cursor-text" onClick={() => inputRef.current?.focus()}>
                    {/* Display Text */}
                    <pre className="whitespace-pre-wrap font-mono break-all relative z-0">
                        {renderCode()}
                    </pre>

                    {/* Hidden Input for Logic */}
                    <textarea
                        ref={inputRef}
                        value={input}
                        onChange={handleInput}
                        disabled={gameState !== 'playing'}
                        className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-text resize-none"
                        autoCapitalize="none"
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck="false"
                        onPaste={(e) => e.preventDefault()}
                    />

                    {/* Language Badge */}
                    <div className="absolute top-2 right-2 px-2 py-1 bg-slate-100 text-slate-500 text-xs font-mono rounded">
                        {snippet.language}
                    </div>
                </div>
            </div>

            {/* Instructions */}
            <div className="mt-6 text-center text-xs font-medium text-slate-500 text-balance">
                <p>Focus the code area and type exactly what you see.</p>
            </div>
        </div>
    );
};
