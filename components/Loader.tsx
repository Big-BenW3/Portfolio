"use client";

import { useEffect, useRef, useState } from "react";
import { BBMark } from "./Icons";

/** Loading screen. Progress reflects real work: fonts, preview images, the page itself. */
export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const pct = useRef<HTMLElement>(null);
  const bar = useRef<HTMLElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const ready = () => {
      document.documentElement.classList.add("ready");
      document.body.classList.remove("loading");
    };
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || /[?&]nl\b/.test(location.search)) {
      ready();
      setGone(true);
      return;
    }
    const steps: [string, Promise<unknown>][] = [
      ["Loading type", document.fonts?.ready ?? Promise.resolve()],
      ["Decoding previews", Promise.all([...document.images].map((i) => (i.decode ? i.decode().catch(() => {}) : null)))],
      ["Setting the stage", document.readyState === "complete" ? Promise.resolve() : new Promise((r) => addEventListener("load", r, { once: true }))],
    ];
    const MIN = 1400, MAX = 4200;
    const t0 = performance.now();
    let done = 0, shown = 0, finished = false, raf = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    steps.forEach(([, pr]) => Promise.resolve(pr).then(() => { done++; }, () => { done++; }));

    const finish = () => {
      if (finished) return;
      finished = true;
      if (label.current) label.current.textContent = "Ready";
      if (pct.current) pct.current.textContent = "100";
      bar.current?.style.setProperty("--ld", "1");
      timers.push(setTimeout(() => { root.current?.classList.add("done"); ready(); }, 280));
      timers.push(setTimeout(() => setGone(true), 1300));
    };
    const tick = (now: number) => {
      const el = now - t0;
      const target = done >= steps.length ? 100 : (done / steps.length) * 88;
      const cap = Math.min(100, (el / MIN) * 100);
      shown += (Math.min(target, cap) - shown) * 0.14;
      if (pct.current) pct.current.textContent = String(Math.min(100, Math.round(shown)));
      bar.current?.style.setProperty("--ld", (shown / 100).toFixed(3));
      const pending = steps.find((_, i) => i >= done);
      if (pending && !finished && label.current) label.current.textContent = pending[0];
      if ((done >= steps.length && shown > 99.2) || el > MAX) return finish();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); timers.forEach(clearTimeout); };
  }, []);

  if (gone) return null;
  return (
    <div id="loader" role="status" aria-live="polite" ref={root}>
      <div className="ld">
        <div className="ld-mark"><BBMark gradientId="ldg" /></div>
        <div>
          <div className="ld-meta"><span id="ldLabel" ref={label}>Loading type</span><b id="ldPct" ref={pct}>0</b></div>
          <div className="ld-bar"><i id="ldBar" ref={bar} /></div>
        </div>
      </div>
    </div>
  );
}
