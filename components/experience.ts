import { ROAD } from "./experienceRoad";
import { svh } from "./viewport";

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const ease = (t: number) => t * t * (3 - 2 * t);
const back = (t: number) => { const c = 1.70158, u = t - 1; return t <= 0 ? 0 : t >= 1 ? 1 : 1 + (c + 1) * u * u * u + c * u * u; };

/** Scroll progress (0 to 1 through the pinned section) at which the marker reaches and leaves each stop. */
const ARRIVE = [0.2, 0.46, 0.72];
const LEAVE = [0.31, 0.57, 0.83];
const TILT = 58;
const DIST = 1000;
const LIFT = 30;

const KEYS: [number, number][] = [
  [0, 0], [ARRIVE[0], ROAD.wpLen[0]], [LEAVE[0], ROAD.wpLen[0]], [ARRIVE[1], ROAD.wpLen[1]],
  [LEAVE[1], ROAD.wpLen[1]], [ARRIVE[2], ROAD.wpLen[2]], [LEAVE[2], ROAD.wpLen[2]],
];
function lenAt(p: number) {
  for (let i = 1; i < KEYS.length; i++) {
    if (p <= KEYS[i][0]) { const [p0, l0] = KEYS[i - 1], [p1, l1] = KEYS[i]; return l0 + (l1 - l0) * ease((p - p0) / (p1 - p0)); }
  }
  return ROAD.wpLen[2];
}

type Slot = { x: number; y: number; h: number };

/**
 * Drives the Experience section: tilts the plane, moves the camera along the road,
 * pops each card as the marker arrives, then flattens everything into a row (or a compact stack on small screens).
 */
export function initExperience(reduce: boolean) {
  const sec = document.getElementById("experience");
  const noop = { measure() {}, frame() {}, degrade() {}, destroy() {} };
  if (!sec) return noop;
  // Phones get a plain timeline: a tilted 3D road is the heaviest thing on the page and barely readable at that size.
  const phone = matchMedia("(max-width: 700px)").matches;
  let lowPower = false;
  try { lowPower = sessionStorage.getItem("slow") === "1"; } catch { /* private mode */ }
  if (reduce || phone || lowPower) { sec.classList.add("xstatic"); return { ...noop, destroy: () => sec.classList.remove("xstatic") }; }

  const q = <T extends Element>(s: string) => sec.querySelector<T>(s)!;
  const head = q<HTMLElement>(".xhead"), world = q<HTMLElement>("#xWorld"), plane = q<HTMLElement>("#xPlane");
  const mark = q<HTMLElement>("#xMark"), rail = q<HTMLElement>("#xRail"), list = q<HTMLElement>("#xCards");
  const count = q<HTMLElement>("#xCount"), bar = q<HTMLElement>("#xBar"), trail = q<SVGPathElement>("#xTrail"), glow = q<SVGPathElement>("#xGlow");
  const rings = [...sec.querySelectorAll<HTMLElement>(".xring")];
  const cards = [...list.children] as HTMLElement[];

  let lastLabel = "", disabled = false;
  let grid = true, xw = 360, fy = 0, hMax = 0;
  let hFull: number[] = [], hComp: number[] = [], slots: Slot[] = [];
  let comp: boolean[] = [], ch: number[] = [];

  function measure() {
    if (disabled) return;
    const vw = innerWidth, vh = svh(), g = clamp(vw * 0.05, 16, 64);
    grid = vw >= 980;
    xw = grid ? Math.min(400, (Math.min(vw, 1240) - 2 * g - 40) / 3) : Math.min(440, vw - 2 * g);
    list.style.setProperty("--xw", xw + "px");
    cards.forEach((c) => { c.classList.remove("compact"); c.style.height = ""; });
    hFull = cards.map((c) => c.offsetHeight); hMax = Math.max(...hFull);
    cards.forEach((c) => c.classList.add("compact")); hComp = cards.map((c) => c.offsetHeight);
    cards.forEach((c) => c.classList.remove("compact"));
    if (grid) cards.forEach((c) => { c.style.height = hMax + "px"; });
    const headB = head.offsetTop + head.offsetHeight;
    fy = clamp(headB + hMax + 52, vh * 0.58, vh * 0.88);
    world.style.perspectiveOrigin = `50% ${fy}px`; plane.style.top = fy + "px"; mark.style.top = fy + "px";
    sec!.style.height = Math.round(vh * 4.7) + "px";
    const cx = vw / 2;
    if (grid) {
      const t0 = headB + 40, b0 = vh - 40, yb = Math.max(t0 + hMax, Math.min(b0, t0 + (b0 - t0 + hMax) / 2));
      slots = cards.map((_, i) => ({ x: cx + (i - 1) * (xw + 20), y: yb, h: hMax }));
      rail.style.display = "block"; rail.style.left = slots[0].x + "px"; rail.style.width = slots[2].x - slots[0].x + "px"; rail.style.top = yb - hMax - 26 + "px";
    } else {
      const hc = Math.max(...hComp), gap = 12;
      let y = Math.max(headB + 18, headB + (vh - headB - (3 * hc + 2 * gap)) / 2 - 16);
      slots = cards.map(() => { y += hc; const o = { x: cx, y, h: hc }; y += gap; return o; });
      rail.style.display = "none";
    }
    comp = cards.map(() => false); ch = cards.map((_, i) => (grid ? hMax : hFull[i]));
  }

  function frame() {
    if (disabled) return;
    const vw = innerWidth, vh = svh(), r = sec!.getBoundingClientRect();
    if (r.bottom < -60 || r.top > vh + 60 || !slots.length) return;
    const tin = ease(clamp((vh - r.top) / (vh * 0.9), 0, 1));
    const p = clamp(-r.top / Math.max(1, r.height - vh), 0, 1);
    const fLin = clamp((p - 0.84) / 0.13, 0, 1), f = ease(fLin);
    const th = TILT * tin * (1 - f), rad = (th * Math.PI) / 180, cs = Math.cos(rad), sn = Math.sin(rad);
    const len = lenAt(p), [mx, my] = ROAD.at(len);
    plane.style.transform = `rotateX(${th.toFixed(2)}deg) translate3d(${(-mx).toFixed(1)}px,${(-my).toFixed(1)}px,0)`;
    plane.style.opacity = (tin * (1 - 0.7 * f)).toFixed(3);
    mark.style.opacity = (tin * (1 - f)).toFixed(3);
    rail.style.opacity = f.toFixed(3);
    const off = (ROAD.total - len).toFixed(1);
    trail.style.strokeDashoffset = off; glow.style.strokeDashoffset = off;
    rings.forEach((el, i) => {
      const near = p >= ARRIVE[i] - 0.03, gone = p >= LEAVE[i] + 0.02;
      el.classList.toggle("on", near && !gone); el.classList.toggle("done", near && gone);
    });
    const cx = vw / 2;
    cards.forEach((c, i) => {
      const X = ROAD.wp[i][0] - mx, Y = ROAD.wp[i][1] - my, z = Y * sn, s = Math.min(1.7, DIST / Math.max(80, DIST - z));
      const pop = back(clamp((p - (ARRIVE[i] - 0.065)) / 0.065, 0, 1));
      const past = i < 2 ? 1 - ease(clamp((p - LEAVE[i]) / 0.05, 0, 1)) : 1;
      const a3 = { x: cx + X * s, y: fy + Y * cs * s - LIFT * s, S: s * pop, o: clamp(pop * 1.5, 0, 1) * past };
      const fi = ease(clamp(fLin * 1.25 - (2 - i) * 0.12, 0, 1)), sl = slots[i];
      const from = i < 2 && fi > 0 ? { x: sl.x, y: vh + sl.h + 50, S: 0.92, o: 0 } : a3;
      const wantCompact = !grid && (fi > 0.5 || (i < 2 && fi > 0));
      if (wantCompact !== comp[i]) { comp[i] = wantCompact; c.classList.toggle("compact", wantCompact); ch[i] = wantCompact ? hComp[i] : hFull[i]; }
      const x = from.x + (sl.x - from.x) * fi, y = from.y + (sl.y - from.y) * fi;
      const S = from.S + (1 - from.S) * fi, o = from.o + (1 - from.o) * fi;
      c.style.opacity = o.toFixed(3);
      c.style.transform = `translate3d(${(x - (xw * S) / 2).toFixed(1)}px,${(y - ch[i] * S).toFixed(1)}px,0) scale(${S.toFixed(4)})`;
      c.style.zIndex = pop > 0.5 && past > 0 ? "5" : "1";
      c.style.pointerEvents = o > 0.7 ? "auto" : "none";
      c.style.setProperty("--stem", (1 - fi).toFixed(2));
    });
    const idx = Math.max(1, ARRIVE.filter((a) => p >= a - 0.04).length);
    const label = "0" + idx + " / 03";
    if (label !== lastLabel) { lastLabel = label; count.textContent = label; }
    bar.style.transform = `scaleX(${clamp(len / ROAD.wpLen[2], 0, 1).toFixed(3)})`;
  }

  /** Switch to the flat timeline when the device cannot keep up with the 3D road. */
  function degrade() {
    if (disabled) return;
    disabled = true;
    sec!.classList.add("xstatic");
    sec!.style.height = "";
    cards.forEach((c) => {
      c.classList.remove("compact");
      ["opacity", "transform", "height", "z-index", "pointer-events", "--stem"].forEach((k) => c.style.removeProperty(k));
    });
    world.style.perspectiveOrigin = ""; plane.removeAttribute("style"); mark.removeAttribute("style"); rail.removeAttribute("style");
  }

  return { measure, frame, degrade, destroy() {} };
}
