  ┌──────────────────┬───────────────────────────────────┐
  │       Role       │              Library              │
  ├──────────────────┼───────────────────────────────────┤
  │ MIDI generation  │ @tonejs/midi or jsmidgen          │
  ├──────────────────┼───────────────────────────────────┤
  │ MIDI playback    │ Tone.js                           │
  ├──────────────────┼───────────────────────────────────┤
  │ Color extraction │ color-thief-browser or quantize   │
  ├──────────────────┼───────────────────────────────────┤
  │ Image processing │ Native Canvas API (no lib needed) │
  └──────────────────┴───────────────────────────────────┘

  Tone.js is especially powerful — it handles both synthesis and scheduling, so you can play notes directly in the browser without even needing to export a
  .mid file first.

# Libraries Worth Using

  Tone.js — the foundation for almost everything
  - Handles scheduling, timing, transport
  - Built-in synths, effects, samplers
  - Jazz timing (swing, humanization) is doable

  Soundfont-player — loads real instrument samples
  - Free soundfonts include decent piano, bass, drums
  - Good enough for a demo, not studio quality

  @tonejs/midi — if you want to generate MIDI then render it

  WebAudioFont — preloaded GM soundfonts, easy to use
