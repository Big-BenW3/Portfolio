"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initExperience } from "./experience";
import { watchScrollPerf } from "./perf";
import { isTouch, svh } from "./viewport";

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Pointer glow, parallax orbs, hero tilt and project-card tilt. Mouse-only: phones skip all of it. */
function useAmbient() {
  useEffect(() => {
    if (isTouch()) return;
    const reduce = reduced();
    const glow = $(".glow");
    const cleanups: (() => void)[] = [];
    const on = (t: EventTarget, type: string, fn: (e: never) => void, opts?: AddEventListenerOptions) => {
      t.addEventListener(type, fn as EventListener, opts);
      cleanups.push(() => t.removeEventListener(type, fn as EventListener));
    };

    // pointer glow: the variables live on the glow layer itself so nothing else has to restyle
    let gq = false;
    on(window, "pointermove", (e: PointerEvent) => {
      if (gq || !glow) return; gq = true;
      requestAnimationFrame(() => { gq = false; glow.style.setProperty("--mx", e.clientX + "px"); glow.style.setProperty("--my", e.clientY + "px"); });
    }, { passive: true });

    if (reduce) return () => cleanups.forEach((f) => f());

    // parallax orbs
    const orbs: [HTMLElement | null, number][] = [[$("#o1"), 0.06], [$("#o2"), -0.04], [$("#o3"), 0.09]];
    let oq = false;
    const depth = () => { oq = false; orbs.forEach(([el, f]) => { if (el) el.style.transform = `translate3d(0,${(-scrollY * f).toFixed(1)}px,0)`; }); };
    on(window, "scroll", () => { if (!oq) { oq = true; requestAnimationFrame(depth); } }, { passive: true });
    depth();

    // hero phone tilt (follows the pointer)
    on(window, "pointermove", (e: PointerEvent) => {
      const dev = $(".device"); const phone = dev && $(".phone", dev);
      if (!dev || !phone) return;
      const r = dev.getBoundingClientRect();
      const x = clamp((e.clientX - (r.left + r.width / 2)) / innerWidth, -0.5, 0.5);
      const y = clamp((e.clientY - (r.top + r.height / 2)) / innerHeight, -0.5, 0.5);
      phone.style.setProperty("--ty", (x * 26).toFixed(1) + "deg");
      phone.style.setProperty("--tx", (-y * 18).toFixed(1) + "deg");
    }, { passive: true });

    // project card tilt + glare
    on(document, "pointermove", (e: PointerEvent) => {
      const ci = (e.target as Element | null)?.closest?.<HTMLElement>(".card-inner");
      if (!ci) return;
      const r = ci.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      ci.style.setProperty("--ry", ((px - 0.5) * 5).toFixed(2) + "deg");
      ci.style.setProperty("--rx", ((0.5 - py) * 4).toFixed(2) + "deg");
      ci.style.setProperty("--gx", (px * 100).toFixed(1) + "%");
      ci.style.setProperty("--gy", (py * 100).toFixed(1) + "%");
    }, { passive: true });
    on(document, "pointerout", (e: PointerEvent) => {
      const ci = (e.target as Element | null)?.closest?.<HTMLElement>(".card-inner");
      if (!ci || ci.contains(e.relatedTarget as Node | null)) return;
      ci.style.setProperty("--ry", "0deg"); ci.style.setProperty("--rx", "0deg");
    }, { passive: true });

    return () => cleanups.forEach((f) => f());
  }, []);
}

type Stage = {
  root: HTMLElement; track: HTMLElement; cards: HTMLElement[]; dims: (HTMLElement | null)[]; bar: HTMLElement; count: HTMLElement;
  dir: string; total: number;
  range: number; top: number; h: number; cx: number[]; cw: number[]; lastP: number; lastBest: number;
};
type AStack = { el: HTMLElement; dim: HTMLElement | null; sticky: boolean; stick: number; h: number; last: number };

/** Pinned horizontal stages, stacking About cards and the active nav link. Re-binds on route change. */
function useScrollEngine(pathname: string) {
  useEffect(() => {
    const reduce = reduced();
    const navLinks = $$<HTMLAnchorElement>(".nav a[data-s]");
    let navCur: string | null | undefined;
    const setNav = (cur: string | null) => {
      if (cur === navCur) return;
      navCur = cur;
      navLinks.forEach((a) => a.classList.toggle("on", a.dataset.s === cur));
    };

    if (pathname !== "/") {
      setNav(pathname === "/resume" ? "resume" : null);
      return;
    }

    const root = document.documentElement;
    let slow = root.classList.contains("slow");

    const stages: Stage[] = $$(".stage").map((el) => {
      const track = $(".track", el)!;
      const cards = [...track.children] as HTMLElement[];
      return {
        root: el, track, cards, dims: cards.map((c) => $(".dim", c)), bar: $(".bar i", el)!, count: $(".count", el)!,
        dir: el.dataset.dir ?? "ltr", total: cards.length,
        range: 0, top: 0, h: 0, cx: [], cw: [], lastP: -1, lastBest: -1,
      };
    });
    const acards: AStack[] = $$(".acard").map((el) => ({ el, dim: $(".dim", el), sticky: false, stick: 0, h: 0, last: -1 }));
    const xp = initExperience(reduce);
    const navSecs = ["stack", "work", "experience", "about", "contact"].map((id) => ({ id, el: document.getElementById(id), top: 0 }));
    let vw = innerWidth, vh = 0;

    const setPans = () => $$<HTMLImageElement>(".shot img").forEach((img) => {
      const box = img.parentElement!;
      img.style.setProperty("--pan", Math.max(0, img.offsetHeight - box.clientHeight) + "px");
    });

    /** All layout reads and writes happen here, so frame() never has to touch layout. */
    const measure = () => {
      vw = innerWidth; vh = svh();
      stages.forEach((s) => {
        s.range = Math.max(0, s.track.offsetWidth - vw);
        s.root.style.height = Math.round(vh + s.range * 1.15) + "px";
      });
      stages.forEach((s) => {
        s.top = s.root.getBoundingClientRect().top + scrollY;
        s.h = s.root.offsetHeight;
        s.cx = s.cards.map((c) => c.offsetLeft + c.offsetWidth / 2);
        s.cw = s.cards.map((c) => c.offsetWidth);
        s.lastP = -1;
      });
      acards.forEach((a) => {
        const cs = getComputedStyle(a.el);
        a.sticky = cs.position === "sticky";
        a.stick = parseFloat(cs.top) || 0;
        a.h = a.el.offsetHeight;
        a.last = -1;
      });
      navSecs.forEach((n) => { if (n.el) n.top = n.el.getBoundingClientRect().top + scrollY; });
      setPans();
      xp.measure();
    };

    const frame = () => {
      const y = scrollY;
      const flat = reduce || slow;

      // read phase
      const nextTops = acards.map((a, i) => (a.sticky && acards[i + 1] ? acards[i + 1].el.getBoundingClientRect().top : 0));

      // write phase
      stages.forEach((s) => {
        const span = Math.max(1, s.h - vh);
        const p = clamp((y - s.top) / span, 0, 1);
        if (p === s.lastP) return;
        s.lastP = p;
        const tx = s.dir === "ltr" ? -p * s.range : -(1 - p) * s.range;
        s.track.style.transform = `translate3d(${tx.toFixed(1)}px,0,0)`;
        let best = 0, bd = 9;
        s.cards.forEach((c, i) => {
          const d = clamp((s.cx[i] + tx - vw / 2) / (vw * 0.5 + s.cw[i] * 0.5), -1.5, 1.5);
          const a = Math.abs(d);
          if (flat) {
            c.style.transform = "none";
          } else {
            c.style.transform = `translate3d(0,${(a * 16).toFixed(1)}px,0) rotate(${(d * 3.2).toFixed(2)}deg) scale(${(1 - Math.min(a, 1) * 0.09).toFixed(3)})`;
            const dim = s.dims[i];
            if (dim) dim.style.opacity = (Math.min(a, 1) * 0.5).toFixed(2);
          }
          c.style.zIndex = String(100 - Math.round(a * 60));
          if (a < bd) { bd = a; best = i; }
        });
        if (best !== s.lastBest) {
          s.cards.forEach((c, i) => c.classList.toggle("focus", i === best));
          s.count.textContent = String(best + 1).padStart(2, "0") + " / " + String(s.total).padStart(2, "0");
          s.lastBest = best;
        }
        s.bar.style.transform = `scaleX(${p.toFixed(3)})`;
      });

      xp.frame();

      acards.forEach((a, i) => {
        if (!a.sticky || !acards[i + 1]) return;
        const t = clamp(1 - (nextTops[i] - a.stick) / a.h, 0, 1);
        const q = Math.round(t * 200) / 200;
        if (q === a.last) return;
        a.last = q;
        a.el.style.transform = flat ? "none" : `scale(${(1 - 0.05 * q).toFixed(4)})`;
        if (a.dim && !flat) a.dim.style.opacity = (q * 0.5).toFixed(3);
      });

      const mid = y + vh * 0.35; let cur: string | null = null;
      navSecs.forEach((n) => { if (n.el && n.top <= mid) cur = n.id; });
      setNav(cur);
    };

    let queued = false;
    const schedule = () => { if (!queued) { queued = true; requestAnimationFrame(() => { queued = false; frame(); }); } };
    const relayout = () => { measure(); schedule(); };

    // Phones fire resize whenever the address bar slides away. Only a change of width needs a re-measure there.
    const touch = isTouch();
    let lastW = innerWidth;
    const onResize = () => {
      if (touch && innerWidth === lastW) return;
      lastW = innerWidth;
      relayout();
    };
    const onLoad = () => relayout();

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onLoad);
    document.fonts?.ready.then(relayout);
    $$<HTMLImageElement>(".shot img").forEach((img) => { if (!img.complete) img.addEventListener("load", setPans, { once: true }); });
    measure(); frame();

    // If the device cannot hold a steady frame rate, drop the costly effects for good.
    const stopWatch = reduce ? () => {} : watchScrollPerf(() => {
      slow = true;
      root.classList.add("slow");
      try { sessionStorage.setItem("slow", "1"); } catch { /* private mode */ }
      xp.degrade();
      stages.forEach((s) => { s.lastP = -1; s.dims.forEach((d) => { if (d) d.style.opacity = "0"; }); });
      acards.forEach((a) => { a.last = -1; if (a.dim) a.dim.style.opacity = "0"; });
      relayout();
    });

    // Stage heights are set here, so anything below them moves after mount: land on the hash again.
    if (location.hash.length > 1) {
      const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (target) scrollTo({ top: target.getBoundingClientRect().top + scrollY, behavior: "instant" as ScrollBehavior });
    }

    return () => {
      stopWatch();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onLoad);
      xp.destroy();
    };
  }, [pathname]);
}

export default function Engine() {
  const pathname = usePathname();
  useAmbient();
  useScrollEngine(pathname);
  return null;
}
