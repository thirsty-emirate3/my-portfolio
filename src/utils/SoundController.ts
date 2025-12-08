
// Simple audio synthesizer using Web Audio API
export const SoundController = {
    ctx: null as AudioContext | null,

    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
    },

    playTone(freq: number, type: OscillatorType = 'sine', duration: number = 0.1, vol: number = 0.1) {
        if (!this.ctx) this.init();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        gain.gain.setValueAtTime(vol, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    },

    // Presets
    playClick() { this.playTone(800, 'sine', 0.05, 0.05); },
    playPop() { this.playTone(600, 'triangle', 0.05, 0.1); },
    playError() { this.playTone(150, 'sawtooth', 0.2, 0.1); },
    playSuccess() {
        if (!this.ctx) this.init();
        if (!this.ctx) return;
        this.playTone(600, 'sine', 0.1, 0.1);
        setTimeout(() => this.playTone(800, 'sine', 0.1, 0.1), 100);
    },
    playGameOver() {
        if (!this.ctx) this.init();
        if (!this.ctx) return;
        this.playTone(300, 'sawtooth', 0.3, 0.1);
        setTimeout(() => this.playTone(250, 'sawtooth', 0.3, 0.1), 200);
        setTimeout(() => this.playTone(200, 'sawtooth', 0.5, 0.1), 400);
    },
    playMove() { this.playTone(300, 'sine', 0.05, 0.05); },
    playRotate() { this.playTone(400, 'square', 0.05, 0.05); },
    playClear() {
        this.playTone(600, 'sine', 0.1, 0.1);
        setTimeout(() => this.playTone(900, 'sine', 0.2, 0.1), 50);
    }
};
