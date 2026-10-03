// Generates the site's sound effects via the ElevenLabs Sound Effects API.
// Usage: node --env-file=.env.local scripts/generate-sfx.mjs [name ...]
import { writeFile, mkdir } from "node:fs/promises";

const KEY = process.env.ELEVENLABS_API_KEY;
if (!KEY) throw new Error("ELEVENLABS_API_KEY missing");

const OUT = new URL("../public/sfx/", import.meta.url);

const SOUNDS = {
  click: { text: "clear crisp mouse click tick, close-miked, short modern UI button tap", duration_seconds: 0.5 },
  toggle: { text: "soft rising two-note digital chime, gentle UI confirmation, clean sine tones", duration_seconds: 0.8 },
  open: { text: "smooth airy whoosh swipe, soft, modern interface panel sliding open, short", duration_seconds: 0.8 },
  close: { text: "short soft reverse airy whoosh, interface panel closing, subtle", duration_seconds: 0.6 },
  boot: { text: "futuristic soft digital power-up swell with subtle data chatter blips, clean cinematic UI startup, short", duration_seconds: 2.0 },
  "flow-1": { text: "soft whoosh of energy flowing past, smooth airy sweep, gentle and warm, no crackle, no static", duration_seconds: 0.6 },
  "flow-2": { text: "short soft synth swish gliding left to right, smooth motion, warm, no static", duration_seconds: 0.6 },
  "flow-3": { text: "gentle rising energy swoosh, a soft pulse travelling past, smooth, no crackle", duration_seconds: 0.6 },
  "laser-1": { text: "high-pitched clean sci-fi laser pew, bright and short, pure synth tone, not robotic, no voice", duration_seconds: 0.5 },
  "laser-2": { text: "thocky rounded laser blip, punchy low pew with a soft thock attack, short, pure synth, not robotic, no voice", duration_seconds: 0.5 },
  "laser-3": { text: "high crystal laser ping with a quick pitch drop, sparkly and clean, pure synth, not robotic, no voice", duration_seconds: 0.6 },
  palette: { text: "soft digital pop, UI menu opening, subtle bubbly click", duration_seconds: 0.5 },
  ambient: {
    text: "smooth slowly moving synth drone with gentle pulsing motion and soft shimmering sweeps, warm and flowing, no static, no crackle, no melody, seamless loop",
    duration_seconds: 22,
    loop: true,
    model_id: "eleven_text_to_sound_v2",
  },
};

await mkdir(OUT, { recursive: true });
const only = process.argv.slice(2);

for (const [name, body] of Object.entries(SOUNDS)) {
  if (only.length && !only.includes(name)) continue;
  const res = await fetch("https://api.elevenlabs.io/v1/sound-generation?output_format=mp3_44100_128", {
    method: "POST",
    headers: { "xi-api-key": KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ prompt_influence: 0.6, ...body }),
  });
  if (!res.ok) {
    console.error(`${name}: ${res.status} ${await res.text()}`);
    continue;
  }
  await writeFile(new URL(`${name}.mp3`, OUT), Buffer.from(await res.arrayBuffer()));
  console.log(`${name}: ok`);
}
