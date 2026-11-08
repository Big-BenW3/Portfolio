import Marquee from "./Marquee";
import { LOGOS } from "@/data/logos";

export default function Stack() {
  return (
    <section className="section" id="stack">
      <h2 className="h2">The tools I reach for.</h2>
      <div className="groups" id="groups">
        {LOGOS.map((g, gi) => (
          <div className="grp" key={g.group}>
            <div className="glabel">{g.group}</div>
            <Marquee items={g.items} reverse={gi % 2 === 1} label={g.group} />
          </div>
        ))}
      </div>
    </section>
  );
}
