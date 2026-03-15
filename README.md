Goal: to create a system that defines music according to colors

## How it works

Each color maps to a complete musical profile: scale, tempo, synth type, effects chain, and a note generation algorithm. Selecting a color plays a looping melody that expresses its mood through sound.

### Color → music mapping concept

| Color Property | Musical Property |
|---|---|
| Hue (0–360°) | Pitch / scale degree |
| Brightness | Velocity (volume) |
| Saturation | Note duration or density |
| Dominant palette | Key / mode (major vs minor) |

Warm hues (reds, oranges) → higher notes, faster tempo. Cool hues (blues) → lower notes, slower tempo. Low saturation → sparse, slow melody. High saturation → dense, faster rhythm.

### Colors

| Color | Scale | Synth | BPM | Mood |
|---|---|---|---|---|
| Red | Phrygian dominant | Sawtooth + distortion | 168 | uptempo · scary · dissonant |
| Orange | C major | DuoSynth + chorus | 110 | inspiring · major · uplifting |
| Yellow | Pentatonic major | Sine + heavy reverb | 80 | pure joy · relaxing · chill |
| Green | Lydian mode | PluckSynth (Karplus-Strong) | 72 | nature · chill · elven |
| Blue | Dorian minor | Sine + low-pass filter | 58 | deep water · minor · sad |
| Purple | Cmaj7 extensions | FMSynth + delay | 82 | mysterious · spiritual |
| Brown | Low Dorian minor | AMSynth + kick drum | 118 | fantasy dwarfs · drums · horns |
| Black | Whole tone scale | FMSynth + bit crusher | 88 | noir · space · alien |
| White | Major 7 high register | Sine + long reverb | 52 | calm · celestial · snow |

## Stack

- **Tone.js** — synthesis, scheduling, effects, waveform analyser
- **Web Audio API** — canvas waveform visualization
- No build step, no dependencies beyond Tone.js

## File structure

```
js/
  colors.js      — all color definitions (scales, synths, effects, note generators)
  state.js       — shared mutable state + DOM refs
  visualizer.js  — waveform canvas drawing
  player.js      — startPlayback / stopPlayback
  ui.js          — color picker UI + selectColor
  main.js        — entry point
```
