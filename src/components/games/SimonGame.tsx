import React, { useState, useRef } from 'react';
import { Play, RotateCcw, Info, MousePointer2 } from 'lucide-react';
import { SoundController } from '../../utils/SoundController';
import { GameInstructions } from '../common/GameInstructions';

const COLORS = ['red', 'green', 'blue', 'yellow'];
// Frequencies adjusted to standard Simon tones approx
const SOUND_FREQS = { red: 329.63, green: 392.00, blue: 261.63, yellow: 196.00 };

const SimonGame: React.FC = () => {
    const [sequence, setSequence] = useState<string[]>([]);
    const [playerIndex, setPlayerIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPlayerTurn, setIsPlayerTurn] = useState(false);
    const [activeColor, setActiveColor] = useState<string | null>(null);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [showHelp, setShowHelp] = useState(false);

    const playTone = (color: string) => {
        // Reuse our new standard SoundController for simplicity and consistency
        // But for specific pitches, we might want custom freq
        const freq = SOUND_FREQS[color as keyof typeof SOUND_FREQS];
        SoundController.playTone(freq, 'sine', 0.3, 0.1);
    };

    const activateColor = async (color: string) => {
        setActiveColor(color);
        playTone(color);
        await new Promise(r => setTimeout(r, 300));
        setActiveColor(null);
        await new Promise(r => setTimeout(r, 100));
    };

    const playSequence = async (seq: string[]) => {
        setIsPlayerTurn(false);
        await new Promise(r => setTimeout(r, 800)); // Initial delay

        for (let color of seq) {
            if (!isPlayingRef.current) return; // Use ref check to break loop
            await activateColor(color);
        }
        setIsPlayerTurn(true);
    };

    const isPlayingRef = useRef(false);

    const startGame = () => {
        setSequence([]);
        setScore(0);
        setGameOver(false);
        setIsPlaying(true);
        isPlayingRef.current = true;
        nextRound([]);
        SoundController.playClick();
    };

    const nextRound = (currentSeq: string[]) => {
        const nextColor = COLORS[Math.floor(Math.random() * COLORS.length)];
        const newSeq = [...currentSeq, nextColor];
        setSequence(newSeq);
        setPlayerIndex(0);
        setScore(newSeq.length - 1);
        playSequence(newSeq);
    };

    const handleColorClick = (color: string) => {
        if (!isPlaying || !isPlayerTurn) return;

        activateColor(color);

        if (color === sequence[playerIndex]) {
            if (playerIndex + 1 === sequence.length) {
                // Round Complete
                setIsPlayerTurn(false);
                setTimeout(() => nextRound(sequence), 1000);
            } else {
                setPlayerIndex(prev => prev + 1);
            }
        } else {
            // Wrong
            setGameOver(true);
            setIsPlaying(false);
            isPlayingRef.current = false;
            SoundController.playGameOver();
        }
    };

    return (
        <div className="flex flex-col items-center p-6 bg-slate-900 rounded-xl select-none text-white relative shadow-2xl">
            <div className="flex items-center justify-between w-full max-w-[300px] mb-6">
                <button onClick={() => setShowHelp(true)} className="text-slate-500 hover:text-slate-300"><Info size={20} /></button>
                <h3 className="font-bold text-slate-400 font-mono tracking-widest">SIMON SAYS</h3>
                <div className="text-xl font-bold font-mono">SCORE: {score}</div>
            </div>

            <div className="relative w-64 h-64 rounded-full bg-slate-800 p-3 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                <div className="grid grid-cols-2 grid-rows-2 w-full h-full gap-2 rounded-full overflow-hidden">
                    <button
                        className={`bg-rose-500 rounded-tl-full hover:bg-rose-400 active:scale-95 transition-all ${activeColor === 'red' ? 'bg-rose-300 brightness-150 shadow-[0_0_30px_red] z-10 scale-100' : 'opacity-80'}`}
                        onClick={() => handleColorClick('red')}
                    />
                    <button
                        className={`bg-emerald-500 rounded-tr-full hover:bg-emerald-400 active:scale-95 transition-all ${activeColor === 'green' ? 'bg-emerald-300 brightness-150 shadow-[0_0_30px_green] z-10 scale-100' : 'opacity-80'}`}
                        onClick={() => handleColorClick('green')}
                    />
                    <button
                        className={`bg-amber-500 rounded-bl-full hover:bg-amber-400 active:scale-95 transition-all ${activeColor === 'yellow' ? 'bg-amber-200 brightness-150 shadow-[0_0_30px_orange] z-10 scale-100' : 'opacity-80'}`}
                        onClick={() => handleColorClick('yellow')}
                    />
                    <button
                        className={`bg-blue-500 rounded-br-full hover:bg-blue-400 active:scale-95 transition-all ${activeColor === 'blue' ? 'bg-blue-300 brightness-150 shadow-[0_0_30px_blue] z-10 scale-100' : 'opacity-80'}`}
                        onClick={() => handleColorClick('blue')}
                    />
                </div>

                {/* Center Hub */}
                <div className="absolute inset-0 m-auto w-24 h-24 bg-slate-900 rounded-full flex flex-col items-center justify-center border-4 border-slate-800 z-20 shadow-xl">
                    {!isPlaying && (
                        <button onClick={startGame} className="bg-slate-700 text-white p-4 rounded-full hover:bg-slate-600 active:scale-95 transition-transform flex flex-col items-center justify-center">
                            {gameOver ? <RotateCcw size={24} className="text-red-500" /> : <Play size={24} className="text-green-500" />}
                        </button>
                    )}
                    {isPlaying && <div className="text-xs text-slate-500 font-bold animate-pulse tracking-widest">{isPlayerTurn ? 'YOUR TURN' : 'WATCH'}</div>}
                </div>
            </div>

            {gameOver && <div className="mt-8 text-red-500 font-bold text-xl animate-bounce tracking-widest">GAME OVER</div>}

            <GameInstructions
                isOpen={showHelp}
                onClose={() => setShowHelp(false)}
                title="Simon Says"
                rules={[
                    "Watch and listen to the sequence of lights and sounds.",
                    "Repeat the sequence exactly by clicking the colored pads.",
                    "The sequence gets one step longer each round.",
                    "One mistake and the game is over!"
                ]}
                controls={[
                    { icon: <MousePointer2 size={20} />, instruction: "Click Pads to Repeat" },
                ]}
                mobileControls={[
                    { icon: "👆", instruction: "Tap Pads to Repeat" }
                ]}
            />
        </div>
    );
};

export default SimonGame;
