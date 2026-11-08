import { Fragment } from "react";
import { EXP } from "@/data/experience";
import { vars } from "./css";
import { ROAD } from "./experienceRoad";

/** Pinned section: a tilted 3D road with a marker that stops at three years, then flattens into a row. */
export default function Experience() {
  return (
    <section className="exp" id="experience" aria-label="Experience">
      <div className="xpin">
        <div className="stage-head xhead">
          <h2 className="h2">Where I&apos;ve been building.</h2>
          <div className="progress"><span className="count" id="xCount">01 / 03</span><span className="bar"><i id="xBar" /></span></div>
        </div>
        <div className="xworld" id="xWorld" aria-hidden="true">
          <div className="xplane" id="xPlane">
            <svg className="xroad" viewBox="1400 0 1200 2200" aria-hidden="true">
              <path className="edge" d={ROAD.d} />
              <path className="bed" d={ROAD.d} />
              <path className="dash" d={ROAD.d} />
              <path className="glow" id="xGlow" d={ROAD.d} strokeDasharray={ROAD.total} strokeDashoffset={ROAD.total} />
              <path className="trail" id="xTrail" d={ROAD.d} strokeDasharray={ROAD.total} strokeDashoffset={ROAD.total} />
            </svg>
            {ROAD.wp.map(([x, y], i) => (
              <Fragment key={i}>
                <i className="xring" style={{ left: x, top: y }} />
                <span className="xyear" style={{ left: x + (i % 2 ? 560 : -560), top: y }}>{EXP[i].when.slice(0, 4)}</span>
              </Fragment>
            ))}
          </div>
        </div>
        <i className="xmark" id="xMark" aria-hidden="true" />
        <div className="xrail" id="xRail" aria-hidden="true"><i style={{ left: 0 }} /><i style={{ left: "50%" }} /><i style={{ left: "100%" }} /></div>
        <ol className="xcards" id="xCards">
          {EXP.map((e, i) => (
            <li key={e.when} className="xc" style={vars({ "--h": e.h })}>
              <div className="top"><b>{e.when}</b><span>0{i + 1}</span></div>
              <h3>{e.role}</h3>
              <div className="org">{e.org}</div>
              <p>{e.summary}</p>
              <ul>{e.points.map((t) => <li key={t}>{t}</li>)}</ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
