import { COLORS } from './colors.js';
import { state, dom } from './state.js';
import { stopPlayback } from './player.js';

export function selectColor(key) {
  stopPlayback();
  state.current = COLORS[key];
  dom.swatch.style.background = state.current.hex;
  dom.swatch.style.setProperty('--glow', state.current.glow);
  dom.colorName.textContent = state.current.name;
  dom.moodEl.textContent = state.current.mood;
  dom.btnPlay.disabled = false;
  dom.btnStop.disabled = true;

  document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('selected'));
  dom.pickerEl.querySelector(`[data-key="${key}"]`).classList.add('selected');
}

export function buildColorPicker() {
  Object.entries(COLORS).forEach(([key, color]) => {
    const dot = document.createElement('div');
    dot.className = 'color-dot';
    dot.dataset.key = key;
    dot.style.background = color.hex;
    dot.title = color.name;
    dot.addEventListener('click', () => selectColor(key));
    dom.pickerEl.appendChild(dot);
  });
}
