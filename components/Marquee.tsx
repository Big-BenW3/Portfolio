"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Logo } from "@/data/logos";
import { vars } from "./css";

function Tile({ it }: { it: Logo }) {
  return (
    <div
      className={`lg${it.m ? " mono" : ""}`}
      style={vars({ "--c": it.c })}
      role="listitem"
      aria-label={it.n}
      dangerouslySetInnerHTML={{ __html: `${it.svg}<span>${it.n}</span>` }}
    />
  );
}

/**
 * One looping row of logos. The set is repeated until it is at least 1.15x the viewport wide,
 * then duplicated so the track can translate by -50% forever.
 */
export default function Marquee({ items, reverse, label }: { items: Logo[]; reverse: boolean; label: string }) {
  const first = useRef<HTMLDivElement>(null);
  const [reps, setReps] = useState(1);
  const [dur, setDur] = useState(40);

  const fit = useCallback(() => {
    const el = first.current;
    if (!el) return;
    const w = el.getBoundingClientRect().width;
    if (!w) return;
    const one = w / reps; // set width is linear in the repeat count
    const next = Math.max(1, Math.ceil((innerWidth * 1.15) / one));
    setReps(next);
    setDur(Number(((one * next) / 55).toFixed(1)));
  }, [reps]);

  useLayoutEffect(() => { fit(); }, [fit]);
  useEffect(() => {
    const on = () => fit();
    addEventListener("resize", on);
    document.fonts?.ready.then(on);
    return () => removeEventListener("resize", on);
  }, [fit]);

  const set = Array.from({ length: reps }, (_, r) => items.map((it) => <Tile key={`${r}-${it.n}`} it={it} />));
  return (
    <div className={`marquee${reverse ? " rev" : ""}`} role="group" aria-label={label}>
      <div className="mtrack" style={vars({ "--dur": `${dur}s` })}>
        <div className="mset" role="list" ref={first}>{set}</div>
        <div className="mset" aria-hidden="true">{set}</div>
      </div>
    </div>
  );
}
