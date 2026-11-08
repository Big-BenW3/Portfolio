/**
 * Watches real frame times while the visitor scrolls and calls onSlow once if the device
 * clearly cannot keep up. Phones differ a lot, so rather than guess from the user agent
 * the page measures itself and drops the expensive effects when it has to.
 */
export function watchScrollPerf(onSlow: () => void) {
  const WINDOW = 50, WARMUP = 8;
  let raf = 0, last = 0, seen = 0, running = false, done = false, slowWindows = 0;
  let idle: ReturnType<typeof setTimeout> | undefined;
  let samples: number[] = [];

  const stop = () => { running = false; cancelAnimationFrame(raf); last = 0; samples = []; seen = 0; };
  const judge = () => {
    const s = samples.slice().sort((a, b) => a - b);
    samples = [];
    const median = s[s.length >> 1], p90 = s[Math.floor(s.length * 0.9)];
    if (median > 27 || p90 > 60) slowWindows++; else slowWindows = 0;
    if (slowWindows >= 2) { done = true; stop(); onSlow(); }
  };
  const tick = (t: number) => {
    if (!running) return;
    if (last && !document.hidden) {
      const dt = t - last;
      if (dt < 500 && ++seen > WARMUP) samples.push(dt);
      if (samples.length >= WINDOW) judge();
    }
    last = t;
    raf = requestAnimationFrame(tick);
  };
  const onScroll = () => {
    if (done) return;
    if (!running) { running = true; raf = requestAnimationFrame(tick); }
    clearTimeout(idle);
    idle = setTimeout(stop, 160);
  };
  addEventListener("scroll", onScroll, { passive: true });
  return () => { done = true; stop(); clearTimeout(idle); removeEventListener("scroll", onScroll); };
}
