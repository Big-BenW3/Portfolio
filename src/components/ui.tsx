"use client";


import { useEffect, useState, type ReactNode } from "react";

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="card-title">
      <i className="corner top left" />
      <i className="corner top right" />
      <i className="corner bottom left" />
      <i className="corner bottom right" />
      {children}
    </h2>
  );
}

export function Tooltip({
  text,
  position = "top",
  children,
}: {
  text: string;
  position?: "top" | "bottom" | "right";
  children: ReactNode;
}) {
  return (
    <span className="tooltip-wrapper">
      {children}
      <span className={`tooltip-bubble tooltip-${position}`} role="tooltip">
        {text}
      </span>
    </span>
  );
}

type Burst = { id: number; x: number; y: number };

export function ClickSpark({ children }: { children: ReactNode }) {
  const [bursts, setBursts] = useState<Burst[]>([]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const id = performance.now() + Math.random();
      setBursts((current) => [...current, { id, x: event.clientX, y: event.clientY }]);
      window.setTimeout(() => {
        setBursts((current) => current.filter((burst) => burst.id !== id));
      }, 460);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      {children}
      {bursts.map((burst) => (
        <span key={burst.id} className="spark-burst" style={{ left: burst.x, top: burst.y }}>
          {Array.from({ length: 8 }, (_, index) => (
            <i key={index} style={{ transform: `rotate(${index * 45}deg)` }}>
              <b />
            </i>
          ))}
        </span>
      ))}
    </>
  );
}

export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, index) =>
        part.startsWith("**") ? (
          <span key={index} className="bio-highlight">
            {part.slice(2, -2)}
          </span>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </>
  );
}

export function useNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

export function formatClock(date: Date | null) {
  if (!date) return "--:--:--";
  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}
