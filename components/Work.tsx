import type { ReactNode } from "react";
import { ArrowIcon, GithubIcon } from "./Icons";
import { vars } from "./css";
import { SCREENS } from "@/data/screens";
import { WORK_A, WORK_B, type Project } from "@/data/projects";

const pad = (n: number) => String(n).padStart(2, "0");

/** Drawn stand-ins for phone screens until real screenshots are added in data/screens.ts. */
const PLACEHOLDERS: (() => ReactNode)[] = [
  () => (<><span className="hd" /><span className="hc" /><Row /><Row /><Row /></>),
  () => (<><span className="hd" /><span className="g"><b /><b /><b /><b /><b /><b /></span><span className="pl" /></>),
  () => (<><span className="hd" /><Row /><span className="hc" style={{ height: 44 }} /><Row /><Row /></>),
];
function Row() {
  return <span className="rw"><i /><span /></span>;
}

function Phones({ p }: { p: Project }) {
  const imgs = (p.screens && SCREENS[p.screens]) || [];
  const n = imgs.length ? Math.min(3, imgs.length) : 3;
  const order = n === 3 ? [0, 1, 2] : n === 2 ? [0, 2] : [1];
  return (
    <div className="pv phones" aria-hidden={imgs.length ? undefined : true}>
      {order.map((slot, k) =>
        imgs.length ? (
          <div key={slot} className={`ph ph${slot} has-img`}>
            <div className="ph-scr"><img src={imgs[k]} alt={`${p.name} screen ${k + 1}`} decoding="async" /></div>
          </div>
        ) : (
          <div key={slot} className={`ph ph${slot}`}><div className="ph-scr">{PLACEHOLDERS[slot]()}</div></div>
        ),
      )}
    </div>
  );
}

function Preview({ p }: { p: Project }) {
  if (p.screens) return <Phones p={p} />;
  const host = (p.live ?? p.gh).replace(/^https?:\/\//, "").replace(/\/$/, "");
  const img = <img src={`/shots/${p.shot}.webp`} alt={`Preview of ${p.name}`} decoding="async" />;
  return (
    <div className="pv">
      <div className="frame">
        <div className="chrome"><i /><i /><i /><em>{host}</em></div>
        {p.live ? (
          <a className="shot" href={p.live} target="_blank" rel="noopener" aria-label={`Open the ${p.name} live site`}>
            {img}
            <span className="open">Open live site <ArrowIcon /></span>
          </a>
        ) : (
          <div className="shot">{img}</div>
        )}
      </div>
    </div>
  );
}

function Card({ p }: { p: Project }) {
  return (
    <article className="card" style={vars({ "--h": p.h })}>
      <div className="card-inner">
        <Preview p={p} />
        <i className="dim" aria-hidden="true" />
        <div className="card-body">
          <div className="card-top">{p.kind}</div>
          <h3>{p.name}</h3>
          <p>{p.desc}</p>
          <ul className="tags">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
          <div className="actions">
            {p.live && <a className="abtn live" href={p.live} target="_blank" rel="noopener">Live site <ArrowIcon /></a>}
            <a className="abtn" href={p.gh} target="_blank" rel="noopener"><GithubIcon /> GitHub</a>
            {(p.extra ?? []).map(([t, u]) => <a key={u} className="alt" href={u} target="_blank" rel="noopener">{t}</a>)}
          </div>
        </div>
      </div>
    </article>
  );
}

function Stage({ dir, label, title, items, id }: { dir: "ltr" | "rtl"; label: string; title: string; items: Project[]; id: string }) {
  return (
    <section className="stage" data-dir={dir} aria-label={label}>
      <div className="pin">
        <div className="stage-head">
          <h2 className="h2">{title}</h2>
          <div className="progress"><span className="count">01 / {pad(items.length)}</span><span className="bar"><i /></span></div>
        </div>
        <div className="track" id={id}>{items.map((p) => <Card key={p.name} p={p} />)}</div>
      </div>
    </section>
  );
}

export default function Work() {
  return (
    <div id="work">
      <Stage dir="ltr" label="Featured projects" title="Selected work." items={WORK_A} id="trackA" />
      <Stage dir="rtl" label="More projects" title="The rest of the workbench." items={WORK_B} id="trackB" />
    </div>
  );
}
