// Procedural soft ambient pad using Web Audio API.
// Layered detuned sine/triangle oscillators + slow LFO + reverb-ish delay.
// No external assets. Starts on first user gesture.

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let nodes: { stop: () => void }[] = [];

const NOTES_HZ = [
  // A minor 9 chord, low octaves — soft, contemplative
  110.0, // A2
  164.81, // E3
  220.0, // A3
  277.18, // C#4 (slightly bright)
  329.63, // E4
];

function makeVoice(audioCtx: AudioContext, dest: AudioNode, freq: number, detune = 0) {
  const osc1 = audioCtx.createOscillator();
  const osc2 = audioCtx.createOscillator();
  osc1.type = "sine";
  osc2.type = "triangle";
  osc1.frequency.value = freq;
  osc2.frequency.value = freq;
  osc1.detune.value = detune - 6;
  osc2.detune.value = detune + 6;

  const gain = audioCtx.createGain();
  gain.gain.value = 0;

  // Slow LFO on amplitude for breathing motion
  const lfo = audioCtx.createOscillator();
  const lfoGain = audioCtx.createGain();
  lfo.frequency.value = 0.05 + Math.random() * 0.08; // 0.05-0.13 Hz
  lfoGain.gain.value = 0.06;
  lfo.connect(lfoGain).connect(gain.gain);

  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(dest);

  const now = audioCtx.currentTime;
  osc1.start(now);
  osc2.start(now);
  lfo.start(now);

  // Fade in
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.08, now + 4);

  return {
    stop: () => {
      const t = audioCtx.currentTime;
      gain.gain.cancelScheduledValues(t);
      gain.gain.setValueAtTime(gain.gain.value, t);
      gain.gain.linearRampToValueAtTime(0, t + 1.5);
      osc1.stop(t + 1.6);
      osc2.stop(t + 1.6);
      lfo.stop(t + 1.6);
    },
  };
}

export async function startAmbient() {
  if (ctx) return;
  const AudioCtx =
    (window as unknown as { AudioContext: typeof AudioContext; webkitAudioContext: typeof AudioContext }).AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  ctx = new AudioCtx();
  if (ctx.state === "suspended") await ctx.resume();

  master = ctx.createGain();
  master.gain.value = 0.55;

  // Gentle low-pass to soften upper harmonics
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 1400;
  filter.Q.value = 0.6;

  // Simple feedback delay for a hall-ish sense of space
  const delay = ctx.createDelay(2);
  delay.delayTime.value = 0.55;
  const feedback = ctx.createGain();
  feedback.gain.value = 0.35;
  const wet = ctx.createGain();
  wet.gain.value = 0.4;

  master.connect(filter);
  filter.connect(ctx.destination);
  filter.connect(delay);
  delay.connect(feedback);
  feedback.connect(delay);
  delay.connect(wet);
  wet.connect(ctx.destination);

  nodes = NOTES_HZ.map((f, i) => makeVoice(ctx!, master!, f, (i - 2) * 4));
}

export function stopAmbient() {
  if (!ctx) return;
  nodes.forEach((n) => n.stop());
  nodes = [];
  const c = ctx;
  setTimeout(() => {
    c.close();
  }, 1800);
  ctx = null;
  master = null;
}

export function isAmbientPlaying() {
  return !!ctx;
}
