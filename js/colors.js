export const COLORS = {
  red: {
    name: 'Red',
    hex: '#CC2200',
    glow: '#CC220066',
    mood: 'ambient · scary · dissonant · dread',
    bpm: 50,
    noteLength: '2n',
    // Phrygian dominant in low octave — dark, heavy, suffocating
    scale: ['C3', 'Db3', 'E3', 'F3', 'Gb3', 'Ab3', 'Bb3', 'C4', 'Db4', 'E4'],
    // Slow pad — sine with long attack and release for dread build-up
    createSynth() {
      return new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'sine' },
        envelope: { attack: 1.0, decay: 1.5, sustain: 0.6, release: 5.0 }
      });
    },
    effects: () => {
      // Slow tremolo adds subtle unease, cathedral reverb creates vast dread
      const tremolo = new Tone.Tremolo({ frequency: 0.25, depth: 0.5 }).start();
      const reverb = new Tone.Reverb({ decay: 10.0, wet: 0.75 });
      return [tremolo, reverb];
    },
    generateNotes(scale) {
      // No rests — slow chromatic drift around C3, circling dissonant intervals
      // Notes blur into each other via long attack + reverb tail
      const templates = [
        [0, 1, 0, 4, 3, 1, 0, 5, 4, 1, 0, 6, 0, 3, 1, 0],
        [0, 4, 1, 0, 6, 1, 3, 0, 1, 5, 0, 1, 4, 0, 8, 1],
      ];
      const tpl = templates[Math.floor(Math.random() * templates.length)];
      return tpl.map(i => scale[i % scale.length]);
    }
  },

  orange: {
    name: 'Orange',
    hex: '#FF7700',
    glow: '#FF770055',
    mood: 'inspiring · major · uplifting',
    bpm: 110,
    noteLength: '8n',
    scale: ['C4', 'E4', 'G4', 'A4', 'B4', 'C5', 'E5', 'G5'],
    // DuoSynth — two slightly detuned voices for a warm, thick tone
    createSynth() {
      return new Tone.PolySynth(Tone.DuoSynth, {
        vibratoAmount: 0.2,
        vibratoRate: 4,
        harmonicity: 1.5,
        voice0: {
          oscillator: { type: 'triangle' },
          envelope: { attack: 0.02, decay: 0.3, sustain: 0.5, release: 0.6 },
          filterEnvelope: { attack: 0.02, decay: 0.3, sustain: 0.5, release: 0.6, baseFrequency: 500, octaves: 2 }
        },
        voice1: {
          oscillator: { type: 'triangle' },
          envelope: { attack: 0.02, decay: 0.3, sustain: 0.5, release: 0.6 },
          filterEnvelope: { attack: 0.02, decay: 0.3, sustain: 0.5, release: 0.6, baseFrequency: 500, octaves: 2 }
        }
      });
    },
    // PolySynth full-bar chords — warm pad, held for the whole bar
    createRhythmSynth() {
      return new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'triangle' },
        envelope: { attack: 0.05, decay: 0.4, sustain: 0.75, release: 1.5 }
      });
    },
    rhythmVolume: -14,
    rhythmNoteLength: '1m',
    // I–vi–iii–V, one chord per bar — all compatible with the C·E·G·B melody
    rhythmPattern: [
      ['C4','E4','G4'], null, null, null, null, null, null, null,  // C major
      ['A3','C4','E4'], null, null, null, null, null, null, null,  // A minor
      ['E4','G4','B4'], null, null, null, null, null, null, null,  // E minor
      ['G3','B3','D4'], null, null, null, null, null, null, null,  // G major
    ],
    effects: () => {
      const chorus = new Tone.Chorus(3, 1.5, 0.4).start();
      const reverb = new Tone.Reverb({ decay: 2.0, wet: 0.35 });
      return [chorus, reverb];
    },
    generateNotes(scale) {
      const templates = [
        [0, 2, 4, 5, 4, 2, 0, 1, 2, 4, 5, 7, 5, 4, 2, 0],
        [0, 1, 2, 4, 2, 4, 5, 4, 2, 0, 2, 4, 5, 7, 5, 2],
      ];
      const tpl = templates[Math.floor(Math.random() * templates.length)];
      return tpl.map(i => scale[i % scale.length]);
    }
  },

  yellow: {
    name: 'Yellow',
    hex: '#FFD700',
    glow: '#FFD70044',
    mood: 'pure joy · relaxing · chill',
    bpm: 80,
    noteLength: '4n',
    scale: ['C4', 'D4', 'E4', 'G4', 'A4', 'C5', 'D5', 'E5'],
    createSynth() {
      return new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'sine' },
        envelope: { attack: 0.08, decay: 0.5, sustain: 0.5, release: 1.2 }
      });
    },
    effects: () => {
      const reverb = new Tone.Reverb({ decay: 4.0, wet: 0.55 });
      return [reverb];
    },
    generateNotes(scale) {
      const templates = [
        [0, null, 1, 2, null, 4, 2, null, 1, 0, null, 2, 4, null, 5, null],
        [2, null, 4, 5, null, 4, 2, null, 0, 1, null, 2, null, 4, 2, null],
      ];
      const tpl = templates[Math.floor(Math.random() * templates.length)];
      return tpl.map(i => (i === null ? null : scale[i % scale.length]));
    }
  },

  green: {
    name: 'Green',
    hex: '#2E7D32',
    glow: '#2E7D3255',
    mood: 'nature · chill · elven · surface water',
    bpm: 72,
    noteLength: '4n',
    // Lydian mode — dreamy, floating, elven
    scale: ['C4', 'D4', 'E4', 'F#4', 'G4', 'A4', 'B4', 'C5', 'D5'],
    // PluckSynth — Karplus-Strong physical string model
    createSynth() {
      return new Tone.PluckSynth({
        attackNoise: 1.2,
        dampening: 3800,
        resonance: 0.92
      });
    },
    effects: () => {
      const phaser = new Tone.Phaser({ frequency: 0.4, octaves: 3, wet: 0.4 });
      const reverb = new Tone.Reverb({ decay: 3.5, wet: 0.5 });
      return [phaser, reverb];
    },
    generateNotes(scale) {
      const templates = [
        [0, 1, 2, null, 3, 4, 3, null, 2, 1, 0, null, 4, 5, 4, null],
        [2, null, 3, 4, null, 6, 4, null, 3, 2, null, 0, 1, null, 2, null],
      ];
      const tpl = templates[Math.floor(Math.random() * templates.length)];
      return tpl.map(i => (i === null ? null : scale[i % scale.length]));
    }
  },

  blue: {
    name: 'Blue',
    hex: '#1565C0',
    glow: '#1565C066',
    mood: 'deep water · minor · sad · choir',
    bpm: 58,
    noteLength: '2n',
    // Dorian minor — melancholic but with a hint of warmth
    scale: ['C3', 'D3', 'Eb3', 'F3', 'G3', 'A3', 'Bb3', 'C4', 'Eb4', 'G4'],
    createSynth() {
      return new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'sine' },
        envelope: { attack: 0.3, decay: 0.8, sustain: 0.7, release: 2.0 }
      });
    },
    // Low-pass filter added for muffled underwater depth
    effects: () => {
      const filter = new Tone.Filter({ frequency: 700, type: 'lowpass', rolloff: -24 });
      const chorus = new Tone.Chorus(1.5, 3.5, 0.6).start();
      const reverb = new Tone.Reverb({ decay: 6.0, wet: 0.6 });
      return [filter, chorus, reverb];
    },
    generateNotes(scale) {
      const templates = [
        [0, null, 2, null, 4, null, 7, null, 4, null, 2, null, 0, null, null, null],
        [0, null, null, 3, null, 4, null, 7, null, null, 4, null, 2, null, 0, null],
      ];
      const tpl = templates[Math.floor(Math.random() * templates.length)];
      return tpl.map(i => (i === null ? null : scale[i % scale.length]));
    }
  },

  purple: {
    name: 'Purple',
    hex: '#6A0DAD',
    glow: '#6A0DAD66',
    mood: 'mysterious · spiritual · maj7',
    bpm: 82,
    noteLength: '4n',
    // Cmaj7 chord tones + extensions — floating, spiritual
    scale: ['C4', 'E4', 'G4', 'B4', 'D5', 'F#5', 'A5', 'C5'],
    // FMSynth — frequency modulation gives bell-like shimmer
    createSynth() {
      return new Tone.PolySynth(Tone.FMSynth, {
        harmonicity: 3,
        modulationIndex: 8,
        oscillator: { type: 'sine' },
        envelope: { attack: 0.15, decay: 0.7, sustain: 0.6, release: 1.8 },
        modulation: { type: 'triangle' },
        modulationEnvelope: { attack: 0.4, decay: 0.2, sustain: 0.3, release: 1.0 }
      });
    },
    effects: () => {
      const delay = new Tone.FeedbackDelay({ delayTime: '8n', feedback: 0.35, wet: 0.3 });
      const reverb = new Tone.Reverb({ decay: 4.5, wet: 0.5 });
      return [delay, reverb];
    },
    generateNotes(scale) {
      const templates = [
        [0, null, 2, 3, null, 5, 3, null, 2, null, 0, 3, null, 2, null, null],
        [0, 2, null, 3, 5, null, 6, null, 5, 3, null, 2, 0, null, null, null],
      ];
      const tpl = templates[Math.floor(Math.random() * templates.length)];
      return tpl.map(i => (i === null ? null : scale[i % scale.length]));
    }
  },

  brown: {
    name: 'Brown',
    hex: '#6D4C41',
    glow: '#6D4C4166',
    mood: 'fantasy dwarfs · drums · horns · low-pitch',
    bpm: 118,
    noteLength: '8n',
    // Low Dorian minor — heavy, earthy, march-like
    scale: ['C2', 'D2', 'Eb2', 'F2', 'G2', 'Bb2', 'C3', 'G3'],
    // AMSynth — amplitude modulation gives a warm organ/horn character
    createSynth() {
      return new Tone.PolySynth(Tone.AMSynth, {
        harmonicity: 2,
        oscillator: { type: 'square' },
        envelope: { attack: 0.02, decay: 0.2, sustain: 0.5, release: 0.4 },
        modulation: { type: 'square' },
        modulationEnvelope: { attack: 0.5, decay: 0.1, sustain: 1, release: 0.5 }
      });
    },
    // MembraneSynth — physical drum model for the kick hits
    createRhythmSynth() {
      return new Tone.MembraneSynth({
        pitchDecay: 0.06,
        octaves: 5,
        envelope: { attack: 0.001, decay: 0.35, sustain: 0, release: 0.1 }
      });
    },
    // Kick on beats 1 and 3 (every 4 eighth notes)
    rhythmPattern: ['C1', null, null, null, 'C1', null, null, null, 'C1', null, null, null, 'C1', null, null, null],
    effects: () => {
      const dist = new Tone.Distortion(0.12);
      const reverb = new Tone.Reverb({ decay: 1.2, wet: 0.25 });
      return [dist, reverb];
    },
    generateNotes(scale) {
      const templates = [
        [0, 0, 2, null, 4, null, 2, 0, 0, null, 4, 4, 2, null, 0, null],
        [0, 2, null, 4, 2, 0, null, 0, 4, null, 2, 4, null, 6, 4, null],
      ];
      const tpl = templates[Math.floor(Math.random() * templates.length)];
      return tpl.map(i => (i === null ? null : scale[i % scale.length]));
    }
  },

  black: {
    name: 'Black',
    hex: '#212121',
    glow: '#9E9E9E44',
    mood: 'noir · space · alien · synthetic',
    bpm: 88,
    noteLength: '8n',
    // Whole tone scale — completely symmetrical, no tonal center, alien
    scale: ['C4', 'D4', 'E4', 'F#4', 'Ab4', 'Bb4', 'C5', 'D5', 'E5'],
    // FMSynth with extreme settings — metallic, synthetic, otherworldly
    createSynth() {
      return new Tone.PolySynth(Tone.FMSynth, {
        harmonicity: 5.1,
        modulationIndex: 28,
        oscillator: { type: 'sawtooth' },
        envelope: { attack: 0.02, decay: 0.5, sustain: 0.2, release: 1.0 },
        modulation: { type: 'sawtooth' },
        modulationEnvelope: { attack: 0.1, decay: 0.3, sustain: 0.1, release: 0.5 }
      });
    },
    effects: () => {
      const crusher = new Tone.BitCrusher(6);
      const delay = new Tone.FeedbackDelay({ delayTime: '4n', feedback: 0.45, wet: 0.4 });
      const reverb = new Tone.Reverb({ decay: 3.0, wet: 0.45 });
      return [crusher, delay, reverb];
    },
    generateNotes(scale) {
      return Array.from({ length: 16 }, () => {
        if (Math.random() < 0.35) return null;
        return scale[Math.floor(Math.random() * scale.length)];
      });
    }
  },

  white: {
    name: 'White',
    hex: '#EEEEEE',
    glow: '#FFFFFF55',
    mood: 'calm · celestial · snow · choir · reverb',
    bpm: 52,
    noteLength: '1n',
    scale: ['C5', 'E5', 'G5', 'B5', 'C6'],
    createSynth() {
      return new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'sine' },
        envelope: { attack: 0.5, decay: 1.0, sustain: 0.8, release: 3.0 }
      });
    },
    effects: () => {
      const chorus = new Tone.Chorus(0.8, 2.5, 0.5).start();
      const reverb = new Tone.Reverb({ decay: 8.0, wet: 0.75 });
      return [chorus, reverb];
    },
    generateNotes(scale) {
      const templates = [
        [0, null, null, null, 2, null, null, null, 1, null, null, null, 3, null, null, null],
        [2, null, null, null, 0, null, null, null, 3, null, null, null, 1, null, null, null],
      ];
      const tpl = templates[Math.floor(Math.random() * templates.length)];
      return tpl.map(i => (i === null ? null : scale[i % scale.length]));
    }
  }
};
