import React, { useState, useEffect } from 'react';
import { RotateCcw, Database, Code, Cpu, Globe, Server, Smartphone, Wifi, Terminal, Info, MousePointer2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { SoundController } from '../../utils/SoundController';
import { GameInstructions } from '../common/GameInstructions';

const ICONS = [Database, Code, Cpu, Globe, Server, Smartphone, Wifi, Terminal];

type Card = {
    id: number;
    iconIndex: number;
    isFlipped: boolean;
    isMatched: boolean;
};

const MemoryGame: React.FC = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
    const [matches, setMatches] = useState(0);
    const [moves, setMoves] = useState(0);
    const [showHelp, setShowHelp] = useState(false);

    useEffect(() => {
        initGame();
    }, []);

    const initGame = () => {
        const pairIcons = [...ICONS, ...ICONS]; // Pairs
        const shuffled = pairIcons
            .map((icon, i) => ({ icon, index: i % ICONS.length, sort: Math.random() })) // track original icon index
            .sort((a, b) => a.sort - b.sort)
            .map((item, id) => ({
                id,
                iconIndex: item.index,
                isFlipped: false,
                isMatched: false
            }));

        setCards(shuffled);
        setFlippedIndices([]);
        setMatches(0);
        setMoves(0);
        SoundController.playClick();
    };

    const handleCardClick = (index: number) => {
        if (
            flippedIndices.length >= 2 ||
            cards[index].isFlipped ||
            cards[index].isMatched
        ) return;

        SoundController.playMove(); // Flip sound

        const newCards = [...cards];
        newCards[index].isFlipped = true;
        setCards(newCards);

        const newFlipped = [...flippedIndices, index];
        setFlippedIndices(newFlipped);
    };

    useEffect(() => {
        if (flippedIndices.length === 2) {
            const [idx1, idx2] = flippedIndices;
            if (cards[idx1].iconIndex === cards[idx2].iconIndex) {
                // Match
                const timer = setTimeout(() => {
                    setCards(prev => prev.map((c, i) =>
                        (i === idx1 || i === idx2) ? { ...c, isMatched: true, isFlipped: true } : c
                    ));
                    setMatches(m => m + 1);
                    setFlippedIndices([]);
                    SoundController.playSuccess(); // Match sound
                }, 500);
                return () => clearTimeout(timer);
            } else {
                // Mismatch
                const timer = setTimeout(() => {
                    setCards(prev => prev.map((c, i) =>
                        (i === idx1 || i === idx2) ? { ...c, isFlipped: false } : c
                    ));
                    setFlippedIndices([]);
                    SoundController.playPop(); // Mismatch sound (subtle)
                }, 1000);
                return () => clearTimeout(timer);
            }
        }
    }, [flippedIndices, cards]);

    useEffect(() => {
        if (matches > 0) setMoves(prev => prev + 1); // Increment moves on attempt completion? Or on click?
        // Actually moves usually counts attempts. 
    }, [matches]);
    // Correction: Moves should count attempts (i.e. whenever 2 cards are flipped).

    useEffect(() => {
        if (flippedIndices.length === 2) {
            setMoves(prev => prev + 1);
        }
    }, [flippedIndices]);


    return (
        <div className="flex flex-col items-center p-6 bg-slate-50 rounded-xl select-none relative shadow-xl">
            <div className="flex justify-between w-full max-w-[400px] mb-6 relative z-10">
                <button onClick={() => setShowHelp(true)} className="text-slate-400 hover:text-slate-600"><Info size={20} /></button>
                <div className="flex gap-4 text-slate-600 font-mono text-sm items-center">
                    <span className="bg-white px-2 py-1 rounded shadow-sm">Moves: {moves}</span>
                    <span className="bg-white px-2 py-1 rounded shadow-sm">Pairs: {matches}/{ICONS.length}</span>
                </div>
                <button onClick={initGame} className="text-slate-500 hover:text-blue-500 active:scale-95 transition-transform"><RotateCcw size={20} /></button>
            </div>

            <div className="grid grid-cols-4 gap-3 relative z-0">
                {cards.map((card, i) => {
                    const Icon = ICONS[card.iconIndex];
                    return (
                        <div
                            key={card.id}
                            onClick={() => handleCardClick(i)}
                            className="w-16 h-16 sm:w-20 sm:h-20 perspective-1000 cursor-pointer group"
                        >
                            <motion.div
                                className="w-full h-full relative preserve-3d transition-transform duration-500"
                                animate={{ rotateY: card.isFlipped ? 180 : 0 }}
                            >
                                {/* Back */}
                                <div className="absolute inset-0 backface-hidden bg-slate-800 rounded-lg flex items-center justify-center border-2 border-slate-700 shadow-md group-hover:bg-slate-700 transition-colors">
                                    <Code className="text-slate-600 opacity-20" />
                                </div>
                                {/* Front */}
                                <div className="absolute inset-0 backface-hidden bg-white rounded-lg flex items-center justify-center border-2 border-blue-100 shadow-md" style={{ transform: 'rotateY(180deg)' }}>
                                    <Icon className={card.isMatched ? 'text-green-500 drop-shadow-sm' : 'text-blue-500'} size={32} />
                                </div>
                            </motion.div>
                        </div>
                    );
                })}
            </div>

            {matches === ICONS.length && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-20 rounded-xl"
                >
                    <h3 className="text-3xl font-bold text-slate-800 mb-2">Complete!</h3>
                    <p className="text-slate-600 mb-4">You finished in {moves} moves.</p>
                    <button onClick={initGame} className="px-6 py-2 bg-blue-500 text-white rounded-full font-bold shadow-lg hover:bg-blue-600 transition-colors">
                        Play Again
                    </button>
                </motion.div>
            )}

            <GameInstructions
                isOpen={showHelp}
                onClose={() => setShowHelp(false)}
                title="Memory Match"
                rules={[
                    "Flip cards to find matching pairs of icons.",
                    "If cards don't match, they will flip back over.",
                    "Remember card locations to clear the board with fewer moves.",
                    "Match all pairs to win!"
                ]}
                controls={[
                    { icon: <MousePointer2 size={20} />, instruction: "Click to Flip Card" },
                ]}
                mobileControls={[
                    { icon: "👆", instruction: "Tap to Flip Card" }
                ]}
            />
        </div>
    );
};

export default MemoryGame;
