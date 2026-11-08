/** Geometry of the road the Experience camera rides. Pure maths, so server and client agree. */
export type Pt = [number, number];

const OX = 2000;
const POINTS: Pt[] = ([[0, 2140], [-80, 1880], [-180, 1640], [20, 1380], [200, 1160], [40, 900], [-170, 680], [-40, 420], [100, 200], [20, 40]] as Pt[])
  .map(([x, y]) => [OX + x, y] as Pt);
/** Indices into POINTS where the three stops sit. */
const STOPS = [2, 4, 6];

function build() {
  const P = POINTS;
  let d = `M${P[0][0]} ${P[0][1]}`;
  const samples: [number, number, number][] = [[0, P[0][0], P[0][1]]];
  const segEnd = [0];
  let acc = 0, lx = P[0][0], ly = P[0][1];
  for (let i = 0; i < P.length - 1; i++) {
    const p0 = P[i - 1] || P[i], p1 = P[i], p2 = P[i + 1], p3 = P[i + 2] || p2;
    // Catmull-Rom to cubic Bezier
    const c1: Pt = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Pt = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${p2[0]} ${p2[1]}`;
    for (let k = 1; k <= 40; k++) {
      const t = k / 40, u = 1 - t;
      const x = u * u * u * p1[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * p2[0];
      const y = u * u * u * p1[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * p2[1];
      acc += Math.hypot(x - lx, y - ly); lx = x; ly = y;
      samples.push([acc, x, y]);
    }
    segEnd.push(acc);
  }
  /** Point on the road after travelling `len` along it. */
  const at = (len: number): Pt => {
    let lo = 0, hi = samples.length - 1;
    while (hi - lo > 1) { const m = (lo + hi) >> 1; if (samples[m][0] <= len) lo = m; else hi = m; }
    const a = samples[lo], b = samples[hi], t = b[0] === a[0] ? 0 : (len - a[0]) / (b[0] - a[0]);
    return [a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
  };
  return { d, total: acc, at, wp: STOPS.map((i) => P[i]), wpLen: STOPS.map((i) => segEnd[i]) };
}

export const ROAD = build();
