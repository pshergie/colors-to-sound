export const state = {
  current: null,
  synth: null,
  synth2: null,
  sequence: null,
  rhythmSequence: null,
  effectChain: [],
  analyser: null,
  animFrame: null,
};

const canvas = document.getElementById('waveform');

export const dom = {
  canvas,
  canvasCtx: canvas.getContext('2d'),
  swatch:    document.getElementById('swatch'),
  colorName: document.getElementById('color-name'),
  moodEl:    document.getElementById('mood'),
  btnPlay:   document.getElementById('btn-play'),
  btnStop:   document.getElementById('btn-stop'),
  pickerEl:  document.getElementById('color-picker'),
};
