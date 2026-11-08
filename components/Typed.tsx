"use client";

import { useEffect, useRef } from "react";
import { CONFIG } from "@/data/site";

/** The typing role in the hero. */
export default function Typed() {
  const el = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const roles = CONFIG.roles;
    let ri = 0, ci = roles[0].length, del = false;
    let timer: ReturnType<typeof setTimeout>;
    const set = (t: string) => { if (el.current) el.current.textContent = t; };
    const tick = () => {
      const word = roles[ri];
      if (!del) {
        if (ci < word.length) { ci++; set(word.slice(0, ci)); timer = setTimeout(tick, 65 + Math.random() * 55); return; }
        del = true; timer = setTimeout(tick, 1800); return;
      }
      if (ci > 0) { ci--; set(word.slice(0, ci)); timer = setTimeout(tick, 34); return; }
      del = false; ri = (ri + 1) % roles.length; timer = setTimeout(tick, 280);
    };
    tick();
    return () => clearTimeout(timer);
  }, []);
  return <span className="typed" id="typed" ref={el}>{CONFIG.roles[0]}</span>;
}
