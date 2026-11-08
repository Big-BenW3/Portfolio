"use client";

import { useState } from "react";
import { vars } from "./css";

const PAGES = ["/resume/page-1.webp"];

/** PDF preview: the pages as images, with zoom. The real PDF is /resume.pdf. */
export default function ResumeViewer() {
  const [z, setZ] = useState(100);
  const step = (d: number) => setZ((v) => Math.min(200, Math.max(60, v + d)));
  return (
    <div className="viewer">
      <div className="vbar">
        <span className="vname">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M8 13h8M8 17h5" />
          </svg>
          <span id="vfile">Big-Ben-Resume.pdf</span>
        </span>
        <span className="sp" />
        <button type="button" id="zOut" aria-label="Zoom out" onClick={() => step(-20)}>−</button>
        <span className="vzoom" id="zVal">{z}%</span>
        <button type="button" id="zIn" aria-label="Zoom in" onClick={() => step(20)}>+</button>
      </div>
      <div className="vscroll" id="vscroll" tabIndex={0} aria-label="Resume preview" style={vars({ "--zw": `${z}%` })}>
        {PAGES.map((src, i) => (
          <img key={src} src={src} alt={`Resume, page ${i + 1} of ${PAGES.length}`} draggable={false} />
        ))}
      </div>
    </div>
  );
}
