/**
 * Romantic Web Audio API synthesizer for background music and cute sound effects.
 * 100% self-contained: no external MP3 dependencies, never fails or blocks on CORS.
 */

class RomanticAudioManager {
  private ctx: AudioContext | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private isPlaying = false;
  private isMuted = false;
  private loopTimer: number | null = null;
  private currentNoteIndex = 0;

  // Romantic music box / piano melody progression (frequencies in Hz)
  // Peaceful, romantic, sentimental progression in C/G major
  private melody: { note: number; duration: number; rest: number }[] = [
    // Phrase 1 - Soft longing
    { note: 523.25, duration: 0.6, rest: 0.7 }, // C5
    { note: 659.25, duration: 0.6, rest: 0.7 }, // E5
    { note: 783.99, duration: 0.8, rest: 0.9 }, // G5
    { note: 659.25, duration: 0.5, rest: 0.6 }, // E5
    { note: 587.33, duration: 0.7, rest: 0.8 }, // D5
    { note: 493.88, duration: 0.6, rest: 0.7 }, // B4
    { note: 523.25, duration: 1.1, rest: 1.3 }, // C5

    // Phrase 2 - Warm embrace
    { note: 440.00, duration: 0.6, rest: 0.7 }, // A4
    { note: 523.25, duration: 0.6, rest: 0.7 }, // C5
    { note: 659.25, duration: 0.8, rest: 0.9 }, // E5
    { note: 587.33, duration: 0.5, rest: 0.6 }, // D5
    { note: 523.25, duration: 0.6, rest: 0.7 }, // C5
    { note: 493.88, duration: 0.6, rest: 0.7 }, // B4
    { note: 440.00, duration: 1.0, rest: 1.2 }, // A4

    // Phrase 3 - Tender buildup
    { note: 392.00, duration: 0.5, rest: 0.6 }, // G4
    { note: 440.00, duration: 0.5, rest: 0.6 }, // A4
    { note: 493.88, duration: 0.6, rest: 0.7 }, // B4
    { note: 523.25, duration: 0.6, rest: 0.7 }, // C5
    { note: 587.33, duration: 0.7, rest: 0.8 }, // D5
    { note: 659.25, duration: 0.8, rest: 0.9 }, // E5
    { note: 783.99, duration: 1.2, rest: 1.4 }, // G5

    // Phrase 4 - Sweet resolution
    { note: 698.46, duration: 0.6, rest: 0.7 }, // F5
    { note: 659.25, duration: 0.6, rest: 0.7 }, // E5
    { note: 587.33, duration: 0.7, rest: 0.8 }, // D5
    { note: 523.25, duration: 1.4, rest: 1.8 }, // C5
  ];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(this.isMuted ? 0 : 0.18, this.ctx.currentTime);
      this.musicGain.connect(this.ctx.destination);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(this.isMuted ? 0 : 0.28, this.ctx.currentTime);
      this.sfxGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public startMusic() {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.scheduleNextNote();
  }

  public pauseMusic() {
    this.isPlaying = false;
    if (this.loopTimer) {
      clearTimeout(this.loopTimer);
      this.loopTimer = null;
    }
  }

  public toggleMusic(): boolean {
    if (this.isPlaying) {
      this.pauseMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.musicGain && this.ctx) {
      this.musicGain.gain.setValueAtTime(this.isMuted ? 0 : 0.18, this.ctx.currentTime);
    }
    if (this.sfxGain && this.ctx) {
      this.sfxGain.gain.setValueAtTime(this.isMuted ? 0 : 0.28, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  private scheduleNextNote() {
    if (!this.isPlaying || !this.ctx || !this.musicGain) return;

    const item = this.melody[this.currentNoteIndex];
    this.playChime(item.note, item.duration);

    this.currentNoteIndex = (this.currentNoteIndex + 1) % this.melody.length;

    this.loopTimer = window.setTimeout(() => {
      this.scheduleNextNote();
    }, item.rest * 1000);
  }

  // Play a soft, dreamy music-box / kalimba bell tone
  private playChime(freq: number, duration: number) {
    if (!this.ctx || !this.musicGain || this.isMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const oscHarmonic = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    // Warm pure tone with gentle sparkle harmonic
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    oscHarmonic.type = 'triangle';
    oscHarmonic.frequency.setValueAtTime(freq * 2, now);

    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.exponentialRampToValueAtTime(0.35, now + 0.03);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(noteGain);
    oscHarmonic.connect(noteGain);
    noteGain.connect(this.musicGain);

    osc.start(now);
    oscHarmonic.start(now);
    osc.stop(now + duration + 0.05);
    oscHarmonic.stop(now + duration + 0.05);
  }

  // Play specialized sound effects
  public playSound(type: 'pop' | 'paper' | 'dodge' | 'celebration') {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;

    switch (type) {
      case 'pop': {
        // Cute heart bubble pop
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(450, now);
        osc.frequency.exponentialRampToValueAtTime(900, now + 0.08);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(now);
        osc.stop(now + 0.1);
        break;
      }

      case 'paper': {
        // Soft paper unfold shimmer
        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((freq, idx) => {
          if (!this.ctx || !this.sfxGain) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const t = now + idx * 0.05;

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t);

          gain.gain.setValueAtTime(0.12, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

          osc.connect(gain);
          gain.connect(this.sfxGain);
          osc.start(t);
          osc.stop(t + 0.26);
        });
        break;
      }

      case 'dodge': {
        // Cheeky cute spring cartoon sound
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(680, now + 0.12);
        osc.frequency.exponentialRampToValueAtTime(420, now + 0.22);

        gain.gain.setValueAtTime(0.22, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(now);
        osc.stop(now + 0.25);
        break;
      }

      case 'celebration': {
        // Glorious romantic harp celebration arpeggio
        const arpeggio = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98];
        arpeggio.forEach((f, i) => {
          if (!this.ctx || !this.sfxGain) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const t = now + i * 0.08;

          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, t);

          gain.gain.setValueAtTime(0.25, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);

          osc.connect(gain);
          gain.connect(this.sfxGain);
          osc.start(t);
          osc.stop(t + 0.52);
        });
        break;
      }
    }
  }
}

export const romanticAudio = new RomanticAudioManager();
