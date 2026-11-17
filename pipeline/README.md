# How every Short is made (locked format, 17 Nov 2026)

Template: Short #36 (dam walls), published at https://www.youtube.com/watch?v=OTMNDe4BoPg. Every Short copies its voice, look and steps.

- Voice: ElevenLabs Pranav (JIvJh3EXj64IfmuvX7gI), eleven_v4, language ml, stability 0.45. Flowing sentences joined with commas, `[warmly]` at the start, `[curious]` for the final question. Terms, values and equations in English; IQRA written ഇക്റ.
- Video: 1080×1920, 30 fps, flat 2D (`scene2d.html` engine + one `<lesson>.js`), H.264 crf 18. Sequence: hook question, the idea, the maths, real life, "your turn" question, app end card. The ending asks; it never shows answers.
- Sound: synthesized effects (`sfx36c.py`) ducked under the voice, loudnorm −14 LUFS.
- Sync: transcribe the voice for word times, write `warp<id>.json` (animation time → voice time), render with `render36c.mjs`.
- Upload: MP4 into `fm/`, `sa1/`, `sg/`…; vidIQ import from the raw link; public, Education. The description says what the video explains plus what the app does, with no values. The owner adds the playlists.
