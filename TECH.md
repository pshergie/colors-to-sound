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
