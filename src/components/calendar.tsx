"use client";


import { useEffect, useState } from "react";

const levels = ["#2d333b", "#0e4429", "#006d32", "#26a641", "#39d353"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function levelFor(index: number) {
  const n = Math.sin(index * 12.9898) * 43758.5453;
  const f = n - Math.floor(n);
  if (f < 0.38) return 0;
  if (f < 0.58) return 1;
  if (f < 0.78) return 2;
  if (f < 0.92) return 3;
  return 4;
}

type Cell = { date: string; count: number; level: number };

function buildYear(today: Date) {
  const end = new Date(today);
  end.setHours(0, 0, 0, 0);
  const start = new Date(end);
  start.setDate(end.getDate() - 52 * 7 - end.getDay());
  const cells: Cell[] = [];
  for (let i = 0; i < 53 * 7; i += 1) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    if (date > end) {
      cells.push({ date: "", count: 0, level: 0 });
      continue;
    }
    const level = levelFor(i + date.getMonth());
    const count = level === 0 ? 0 : level * 2 + ((i * 3) % 3);
    cells.push({
      date: date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }),
      count,
      level,
    });
  }
  const monthMarks: { label: string; col: number }[] = [];
  let last = -1;
  for (let week = 0; week < 53; week += 1) {
    const date = new Date(start);
    date.setDate(start.getDate() + week * 7);
    if (date.getMonth() !== last) {
      monthMarks.push({ label: months[date.getMonth()], col: week });
      last = date.getMonth();
    }
  }
  const total = cells.reduce((sum, cell) => sum + cell.count, 0);
  return { cells, monthMarks, total };
}

export function Calendar() {
  const [data, setData] = useState<ReturnType<typeof buildYear> | null>(null);
  const [tip, setTip] = useState<{ x: number; y: number; text: string } | null>(null);

  useEffect(() => {
    setData(buildYear(new Date()));
  }, []);

  return (
    <div className="calendar-container">
      <div className="cal-head">
        <span>
          {/* REAL: your GitHub login, not the display name. The squares below are still sample data, not your real graph. */}
          <strong>jordanhale</strong> on the contribution graph
        </span>
        <span className="cal-count">{data ? `${data.total} contributions` : "-"}</span>
      </div>
      {data ? (
        <div className="cal-scroll">
          <div className="cal-months" style={{ gridTemplateColumns: `repeat(53, 14px)` }}>
            {Array.from({ length: 53 }, (_, week) => {
              const mark = data.monthMarks.find((item) => item.col === week);
              return <span key={week}>{mark?.label ?? ""}</span>;
            })}
          </div>
          <div className="cal-body">
            <div className="cal-days">
              <span />
              <span>Mon</span>
              <span />
              <span>Wed</span>
              <span />
              <span>Fri</span>
              <span />
            </div>
            <div className="cal-grid">
              {data.cells.map((cell, index) => (
                <button
                  key={index}
                  type="button"
                  className="cal-cell"
                  style={{ background: levels[cell.level] }}
                  aria-label={cell.date ? `${cell.count} contributions on ${cell.date}` : "empty"}
                  onMouseEnter={(event) => {
                    if (!cell.date) return;
                    setTip({
                      x: event.clientX,
                      y: event.clientY,
                      text: `${cell.count} contributions on ${cell.date}`,
                    });
                  }}
                  onMouseLeave={() => setTip(null)}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="skeleton" style={{ height: 120 }} />
      )}
      {tip ? (
        <div className="cal-tip" style={{ left: tip.x, top: tip.y }}>
          {tip.text}
        </div>
      ) : null}
    </div>
  );
}
