import { state, dom } from './state.js';

function initCanvas() {
  const dpr = window.devicePixelRatio || 1;
  dom.canvas.width  = dom.canvas.offsetWidth  * dpr;
  dom.canvas.height = dom.canvas.offsetHeight * dpr;
  dom.canvasCtx.scale(dpr, dpr);
}

export function startVisualization() {
  initCanvas();
  state.analyser = new Tone.Analyser('waveform', 256);
  Tone.getDestination().connect(state.analyser);
  dom.canvas.classList.add('active');

  const w = dom.canvas.offsetWidth;
  const h = dom.canvas.offsetHeight;
  const color = state.current?.hex || '#666';

  function draw() {
    state.animFrame = requestAnimationFrame(draw);
    const values = state.analyser.getValue();

    dom.canvasCtx.clearRect(0, 0, w, h);
    dom.canvasCtx.beginPath();
    dom.canvasCtx.strokeStyle = color;
    dom.canvasCtx.lineWidth = 2;
    dom.canvasCtx.shadowColor = color;
    dom.canvasCtx.shadowBlur = 10;

    values.forEach((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = ((v + 1) / 2) * h;
      i === 0 ? dom.canvasCtx.moveTo(x, y) : dom.canvasCtx.lineTo(x, y);
    });

    dom.canvasCtx.stroke();
  }

  draw();
}

export function stopVisualization() {
  if (state.animFrame) { cancelAnimationFrame(state.animFrame); state.animFrame = null; }
  if (state.analyser)  { state.analyser.dispose(); state.analyser = null; }
  dom.canvas.classList.remove('active');
  dom.canvasCtx.clearRect(0, 0, dom.canvas.width, dom.canvas.height);
}
