import { state, dom } from './state.js';
import { startVisualization, stopVisualization } from './visualizer.js';

export function stopPlayback() {
  if (state.sequence)     { state.sequence.stop(); state.sequence.dispose(); state.sequence = null; }
  if (state.rhythmSequence) { state.rhythmSequence.stop(); state.rhythmSequence.dispose(); state.rhythmSequence = null; }
  if (state.synth)        { state.synth.dispose(); state.synth = null; }
  if (state.synth2)       { state.synth2.dispose(); state.synth2 = null; }
  state.effectChain.forEach(e => e.dispose());
  state.effectChain = [];
  Tone.getTransport().stop();
  Tone.getTransport().cancel();
  stopVisualization();
  dom.swatch.classList.remove('active');
  dom.btnStop.disabled = true;
  if (state.current) dom.btnPlay.disabled = false;
}

export async function startPlayback() {
  if (!state.current) return;
  await Tone.start();
  stopPlayback();

  Tone.getTransport().bpm.value = state.current.bpm;

  state.effectChain = state.current.effects();
  const chain = [...state.effectChain, Tone.getDestination()];

  state.synth = state.current.createSynth();
  state.synth.set({ volume: -8 });
  state.synth.connect(chain[0]);
  chain.forEach((node, i) => { if (i < chain.length - 1) node.connect(chain[i + 1]); });

  if (state.current.createRhythmSynth) {
    state.synth2 = state.current.createRhythmSynth();
    state.synth2.set({ volume: state.current.rhythmVolume ?? -4 });
    state.synth2.connect(chain[0]);

    state.rhythmSequence = new Tone.Sequence((time, note) => {
      if (note !== null) state.synth2.triggerAttackRelease(note, state.current.rhythmNoteLength ?? '8n', time);
    }, state.current.rhythmPattern, '8n');
    state.rhythmSequence.loop = true;
    state.rhythmSequence.start(0);
  }

  const notes = state.current.generateNotes(state.current.scale);

  state.sequence = new Tone.Sequence((time, note) => {
    if (note !== null) state.synth.triggerAttackRelease(note, state.current.noteLength, time);
  }, notes, state.current.noteLength);

  // Beat pulse on swatch
  Tone.getTransport().scheduleRepeat((time) => {
    Tone.getDraw().schedule(() => {
      dom.swatch.classList.remove('beat');
      void dom.swatch.offsetWidth; // force reflow to restart animation
      dom.swatch.classList.add('beat');
    }, time);
  }, '4n');

  state.sequence.loop = true;
  state.sequence.start(0);
  Tone.getTransport().start();

  startVisualization();
  dom.swatch.classList.add('active');
  dom.btnPlay.disabled = true;
  dom.btnStop.disabled = false;
}
