// ─── Color Definitions ────────────────────────────────────────────────────

const COLORS = {
  red: {
    name: 'Red',
    hex: '#CC2200',
    glow: '#CC220066',
    mood: 'uptempo · scary · dissonant',
    bpm: 168,
    noteLength: '16n',
    // Phrygian dominant — dark, tense, unsettling
    scale: ['C4', 'Db4', 'E4', 'F4', 'Gb4', 'Ab4', 'Bb4', 'C5', 'Db5', 'E5'],
    createSynth() {
      return new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'sawtooth' },
        envelope: { attack: 0.005, decay: 0.08, sustain: 0.2, release: 0.15 }
      });
    },
    effects: () => {
      const dist = new Tone.Distortion(0.2);
      const reverb = new Tone.Reverb({ decay: 0.8, wet: 0.2 });
      return [dist, reverb];
    },
    generateNotes(scale) {
      const dissonantPairs = [
        [0, 4], [1, 7], [2, 5], [3, 8], [0, 6], [1, 3]
      ];
      return Array.from({ length: 32 }, () => {
        const pair = dissonantPairs[Math.floor(Math.random() * dissonantPairs.length)];
        return scale[pair[Math.floor(Math.random() * 2)] % scale.length];
      });
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
    createDrumSynth() {
      return new Tone.MembraneSynth({
        pitchDecay: 0.06,
        octaves: 5,
        envelope: { attack: 0.001, decay: 0.35, sustain: 0, release: 0.1 }
      });
    },
    // Kick on beats 1 and 3 (every 4 eighth notes)
    drumPattern: ['C1', null, null, null, 'C1', null, null, null, 'C1', null, null, null, 'C1', null, null, null],
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

// ─── State ────────────────────────────────────────────────────────────────

let current = null;
let synth = null;
let synth2 = null;
let sequence = null;
let drumSequence = null;
let effectChain = [];
let analyser = null;
let animFrame = null;

const canvas      = document.getElementById('waveform');
const canvasCtx   = canvas.getContext('2d');
const swatch      = document.getElementById('swatch');
const colorName   = document.getElementById('color-name');
const moodEl      = document.getElementById('mood');
const btnPlay     = document.getElementById('btn-play');
const btnStop     = document.getElementById('btn-stop');
const pickerEl    = document.getElementById('color-picker');

// Build color picker dots
Object.entries(COLORS).forEach(([key, color]) => {
  const dot = document.createElement('div');
  dot.className = 'color-dot';
  dot.dataset.key = key;
  dot.style.background = color.hex;
  dot.title = color.name;
  dot.addEventListener('click', () => selectColor(key));
  pickerEl.appendChild(dot);
});

function selectColor(key) {
  stopPlayback();
  current = COLORS[key];
  swatch.style.background = current.hex;
  swatch.style.setProperty('--glow', current.glow);
  colorName.textContent = current.name;
  moodEl.textContent = current.mood;
  btnPlay.disabled = false;
  btnStop.disabled = true;

  document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('selected'));
  pickerEl.querySelector(`[data-key="${key}"]`).classList.add('selected');
}

// ─── Visualization ────────────────────────────────────────────────────────

function initCanvas() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width  = canvas.offsetWidth  * dpr;
  canvas.height = canvas.offsetHeight * dpr;
  canvasCtx.scale(dpr, dpr);
}

function startVisualization() {
  initCanvas();
  analyser = new Tone.Analyser('waveform', 256);
  Tone.getDestination().connect(analyser);
  canvas.classList.add('active');

  const w = canvas.offsetWidth;
  const h = canvas.offsetHeight;
  const color = current?.hex || '#666';

  function draw() {
    animFrame = requestAnimationFrame(draw);
    const values = analyser.getValue();

    canvasCtx.clearRect(0, 0, w, h);
    canvasCtx.beginPath();
    canvasCtx.strokeStyle = color;
    canvasCtx.lineWidth = 2;
    canvasCtx.shadowColor = color;
    canvasCtx.shadowBlur = 10;

    values.forEach((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = ((v + 1) / 2) * h;
      i === 0 ? canvasCtx.moveTo(x, y) : canvasCtx.lineTo(x, y);
    });

    canvasCtx.stroke();
  }

  draw();
}

function stopVisualization() {
  if (animFrame) { cancelAnimationFrame(animFrame); animFrame = null; }
  if (analyser)  { analyser.dispose(); analyser = null; }
  canvas.classList.remove('active');
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
}

// ─── Playback ─────────────────────────────────────────────────────────────

function stopPlayback() {
  if (sequence)     { sequence.stop(); sequence.dispose(); sequence = null; }
  if (drumSequence) { drumSequence.stop(); drumSequence.dispose(); drumSequence = null; }
  if (synth)        { synth.dispose(); synth = null; }
  if (synth2)       { synth2.dispose(); synth2 = null; }
  effectChain.forEach(e => e.dispose());
  effectChain = [];
  Tone.getTransport().stop();
  Tone.getTransport().cancel();
  stopVisualization();
  swatch.classList.remove('active');
  btnStop.disabled = true;
  if (current) btnPlay.disabled = false;
}

btnPlay.addEventListener('click', async () => {
  if (!current) return;
  await Tone.start();
  stopPlayback();

  Tone.getTransport().bpm.value = current.bpm;

  // Build effect chain
  effectChain = current.effects();
  const chain = [...effectChain, Tone.getDestination()];

  synth = current.createSynth();
  synth.set({ volume: -8 });
  synth.connect(chain[0]);
  chain.forEach((node, i) => { if (i < chain.length - 1) node.connect(chain[i + 1]); });

  // Optional drum synth (Brown)
  if (current.createDrumSynth) {
    synth2 = current.createDrumSynth();
    synth2.set({ volume: -4 });
    synth2.connect(chain[0]);

    drumSequence = new Tone.Sequence((time, note) => {
      if (note !== null) synth2.triggerAttackRelease(note, '8n', time);
    }, current.drumPattern, '8n');
    drumSequence.loop = true;
    drumSequence.start(0);
  }

  const notes = current.generateNotes(current.scale);

  sequence = new Tone.Sequence((time, note) => {
    if (note !== null) synth.triggerAttackRelease(note, current.noteLength, time);
  }, notes, current.noteLength);

  // Beat pulse on swatch
  Tone.getTransport().scheduleRepeat((time) => {
    Tone.getDraw().schedule(() => {
      swatch.classList.remove('beat');
      void swatch.offsetWidth; // force reflow to restart animation
      swatch.classList.add('beat');
    }, time);
  }, '4n');

  sequence.loop = true;
  sequence.start(0);
  Tone.getTransport().start();

  startVisualization();
  swatch.classList.add('active');
  btnPlay.disabled = true;
  btnStop.disabled = false;
});

btnStop.addEventListener('click', stopPlayback);
