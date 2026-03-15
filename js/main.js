import { dom } from './state.js';
import { startPlayback, stopPlayback } from './player.js';
import { buildColorPicker } from './ui.js';

buildColorPicker();

dom.btnPlay.addEventListener('click', startPlayback);
dom.btnStop.addEventListener('click', stopPlayback);
