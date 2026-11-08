"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Pointer glow, parallax orbs, hero tilt and project-card tilt. Runs on every page. */
function useAmbient() {
  useEffect(() => {
    const reduce = reduced();
    const root = document.documentElement;
    const cleanups: (() => void)[] = [];
    const on = <K extends keyof DocumentEventMap>(t: EventTarget, type: string, fn: (e: never) => void, opts?: AddEventListenerOptions) => {
      t.addEventListener(type, fn as EventListener, opts);
      cleanups.push(() => t.removeEventListener(type, fn as EventListener));
    };

    // pointer glow
    let gq = false;
    on(window, "pointermove", (e: PointerEvent) => {
      if (gq) return; gq = true;
      requestAnimationFrame(() => { gq = false; root.style.setProperty("--mx", e.clientX + "px"); root.style.setProperty("--my", e.clientY + "px"); });
    }, { passive: true });

    if (reduce) return () => cleanups.forEach((f) => f());

    // parallax orbs
    const orbs: [HTMLElement | null, number][] = [[$("#o1"), 0.06], [$("#o2"), -0.04], [$("#o3"), 0.09]];
    const depth = () => orbs.forEach(([el, f]) => { if (el) el.style.transform = `translate3d(0,${(-scrollY * f).toFixed(1)}px,0)`; });
    on(window, "scroll", depth, { passive: true });
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

/** Pinned horizontal stages, stacking About cards and the active nav link. Re-binds on route change. */
function useScrollEngine(pathname: string) {
  useEffect(() => {
    const reduce = reduced();
    const navLinks = $$<HTMLAnchorElement>(".nav a[data-s]");
    const setNav = (cur: string | null) => navLinks.forEach((a) => a.classList.toggle("on", a.dataset.s === cur));

    if (pathname !== "/") {
      setNav(pathname === "/resume" ? "resume" : null);
      return;
    }

    type Stage = { root: HTMLElement; track: HTMLElement; cards: HTMLElement[]; dir: string; range: number; top: number; count: HTMLElement; bar: HTMLElement; total: number };
    const stages: Stage[] = $$(".stage").map((root) => {
      const track = $(".track", root)!;
      return { root, track, cards: [...track.children] as HTMLElement[], dir: root.dataset.dir ?? "ltr", range: 0, top: 0, count: $(".count", root)!, bar: $(".bar i", root)!, total: track.children.length };
    });
    const acards = $$(".acard");
    const navSecs = ["stack", "work", "about", "contact"].map((id) => [id, document.getElementById(id)] as const);

    const setPans = () => $$<HTMLImageElement>(".shot img").forEach((img) => {
      const box = img.parentElement!;
      img.style.setProperty("--pan", Math.max(0, img.offsetHeight - box.clientHeight) + "px");
    });

    const measure = () => {
      const vw = innerWidth, vh = innerHeight;
      stages.forEach((s) => {
        s.range = Math.max(0, s.track.offsetWidth - vw);
        s.root.style.height = Math.round(vh + s.range * 1.15) + "px";
      });
      stages.forEach((s) => { s.top = s.root.getBoundingClientRect().top + scrollY; });
      setPans();
    };

    const frame = () => {
      const y = scrollY, vw = innerWidth, vh = innerHeight;
      stages.forEach((s) => {
        const span = Math.max(1, s.root.offsetHeight - vh);
        const p = clamp((y - s.top) / span, 0, 1);
        const tx = s.dir === "ltr" ? -p * s.range : -(1 - p) * s.range;
        s.track.style.transform = `translate3d(${tx}px,0,0)`;
        let best = 0, bd = 9;
        s.cards.forEach((c, i) => {
          const w = c.offsetWidth;
          const d = clamp((c.offsetLeft + w / 2 + tx - vw / 2) / (vw * 0.5 + w * 0.5), -1.5, 1.5);
          const a = Math.abs(d);
          c.style.transform = reduce ? "none" : `translateY(${a * 16}px) rotate(${d * 3.2}deg) scale(${1 - Math.min(a, 1) * 0.09})`;
          c.style.zIndex = String(100 - Math.round(a * 60));
          c.style.setProperty("--dim", (Math.min(a, 1) * 0.5).toFixed(3));
          if (a < bd) { bd = a; best = i; }
        });
        s.cards.forEach((c, i) => c.classList.toggle("focus", i === best));
        s.count.textContent = String(best + 1).padStart(2, "0") + " / " + String(s.total).padStart(2, "0");
        s.bar.style.setProperty("--p", p.toFixed(3));
      });

      acards.forEach((c, i) => {
        const next = acards[i + 1];
        if (!next) return;
        const stick = parseFloat(getComputedStyle(c).top) || 0;
        const t = clamp(1 - (next.getBoundingClientRect().top - stick) / c.offsetHeight, 0, 1);
        c.style.transform = `scale(${1 - 0.05 * t})`;
        c.style.setProperty("--dim", (t * 0.5).toFixed(3));
      });

      const mid = vh * 0.35; let cur: string | null = null;
      navSecs.forEach(([id, el]) => { if (el && el.getBoundingClientRect().top <= mid) cur = id; });
      setNav(cur);
    };

    let queued = false;
    const schedule = () => { if (!queued) { queued = true; requestAnimationFrame(() => { queued = false; frame(); }); } };
    const relayout = () => { measure(); schedule(); };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", relayout);
    window.addEventListener("load", relayout);
    document.fonts?.ready.then(relayout);
    measure(); frame();

    // Stage heights are set here, so anything below them moves after mount: land on the hash again.
    if (location.hash.length > 1) {
      const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (target) scrollTo({ top: target.getBoundingClientRect().top + scrollY, behavior: "instant" as ScrollBehavior });
    }

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", relayout);
      window.removeEventListener("load", relayout);
    };
  }, [pathname]);
}

export default function Engine() {
  const pathname = usePathname();
  useAmbient();
  useScrollEngine(pathname);
  return null;
}
