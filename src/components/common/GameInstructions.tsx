import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gamepad2 } from 'lucide-react';

interface InstructionItem {
    icon: React.ReactNode;
    instruction: string;
}

interface GameInstructionsProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    rules: string[];
    controls: InstructionItem[];
    mobileControls?: InstructionItem[];
}

export const GameInstructions: React.FC<GameInstructionsProps> = ({
    isOpen,
    onClose,
    title,
    rules,
    controls,
    mobileControls
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-[2px] p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose} // Close on backdrop click
                >
                    <motion.div
                        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/20 bg-slate-900/90 p-6 text-white shadow-2xl backdrop-blur-xl"
                        initial={{ scale: 0.9, y: 20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.9, y: 20, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking modal content
                    >
                        {/* Header */}
                        <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg">
                                    <Gamepad2 className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold tracking-tight text-white">{title}</h2>
                                    <p className="text-xs font-medium text-slate-400">How to Play</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="group rounded-full p-2 transition-colors hover:bg-white/10"
                            >
                                <X className="h-5 w-5 text-slate-400 transition-transform group-hover:rotate-90 group-hover:text-white" />
                            </button>
                        </div>

                        {/* Content Scroll Area */}
                        <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar space-y-6">

                            {/* Rules Section */}
                            <section>
                                <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-indigo-400">Rules</h3>
                                <ul className="space-y-2 text-sm leading-relaxed text-slate-300">
                                    {rules.map((rule, idx) => (
                                        <li key={idx} className="flex gap-2">
                                            <span className="mt-1.5 h-1.5 w-1.5 min-w-[6px] rounded-full bg-indigo-500" />
                                            <span>{rule}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            {/* Controls Section */}
                            <section>
                                <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-indigo-400">Controls</h3>
                                <div className="grid gap-3">
                                    {controls.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-3 rounded-lg bg-white/5 p-3 transition-colors hover:bg-white/10">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white/10 text-white shadow-inner">
                                                {item.icon}
                                            </div>
                                            <span className="text-sm font-medium text-slate-200">{item.instruction}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Mobile Controls Section (Only if provided) */}
                            {mobileControls && mobileControls.length > 0 && (
                                <section className="md:hidden">
                                    <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-green-400">Mobile</h3>
                                    <div className="grid gap-3">
                                        {mobileControls.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-3 rounded-lg bg-white/5 p-3 transition-colors hover:bg-white/10">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white/10 text-white shadow-inner">
                                                    {item.icon}
                                                </div>
                                                <span className="text-sm font-medium text-slate-200">{item.instruction}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>

                        {/* Footer Action */}
                        <div className="mt-6">
                            <button
                                onClick={onClose}
                                className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 py-3 text-sm font-bold text-white shadow-lg transition-transform active:scale-[0.98] hover:shadow-indigo-500/25"
                            >
                                Start Playing
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
