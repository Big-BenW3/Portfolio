"use client";


import { useEffect, useMemo, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const periods = ["24h", "7d", "30d"] as const;
type Period = (typeof periods)[number];

// Sample chart only. These numbers are invented. To record real opens, follow "Track when someone opens the site" in edit.md,
// then replace series() with a fetch of that provider's stats.
function series(period: Period) {
  const count = period === "24h" ? 24 : period === "7d" ? 7 : 30;
  return Array.from({ length: count }, (_, index) => {
    const wave = Math.sin(index / 2.4) * 18 + Math.cos(index / 5) * 8;
    const visitors = Math.round(40 + wave + (index % 5) * 3);
    const pageviews = Math.round(visitors * 1.7 + (index % 4) * 6);
    const label =
      period === "24h" ? `${index}:00` : period === "7d" ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index] : `${index + 1}`;
    return { label, visitors, pageviews };
  });
}

export function AnalyticsPanel() {
  const [period, setPeriod] = useState<Period>("7d");
  const [ready, setReady] = useState(false);
  const [nonce, setNonce] = useState(0);
  const data = useMemo(() => series(period), [period, nonce]);

  useEffect(() => {
    setReady(false);
    const id = window.setTimeout(() => setReady(true), 420);
    return () => window.clearTimeout(id);
  }, [period, nonce]);

  const visitors = data.reduce((sum, row) => sum + row.visitors, 0);
  const views = data.reduce((sum, row) => sum + row.pageviews, 0);
  const bounce = 38 + (period === "24h" ? 4 : 0);
  const duration = period === "30d" ? "2m 14s" : "1m 48s";

  return (
    <div>
      <div className="analytics-stats">
        <Stat label="Visitors" value={ready ? visitors.toLocaleString() : "-"} change="+12.4%" />
        <Stat label="Pageviews" value={ready ? views.toLocaleString() : "-"} change="+8.1%" />
        <Stat label="Bounce" value={ready ? `${bounce}%` : "-"} change="-2.0%" down />
        <Stat label="Avg. time" value={ready ? duration : "-"} change="+0.3%" />
      </div>
      <div className="analytics-chart-card">
        <div className="analytics-chart-topbar">
          <span className="analytics-code">visitors.ts</span>
          <div className="analytics-period-tabs">
            {periods.map((item) => (
              <button
                key={item}
                type="button"
                className={item === period ? "analytics-period-tab is-on" : "analytics-period-tab"}
                onClick={() => setPeriod(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="analytics-legend">
          <span>
            <i className="legend-dot" style={{ background: "#14b8a6" }} /> Visitors
          </span>
          <span>
            <i className="legend-dot" style={{ background: "#f43f5e" }} /> Pageviews
          </span>
        </div>
        {ready ? (
          <div className="analytics-chart">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <XAxis dataKey="label" stroke="#555" fontSize={11} tickLine={false} axisLine={false} interval="preserveStartEnd" />
                <YAxis stroke="#555" fontSize={11} tickLine={false} axisLine={false} width={32} />
                <Tooltip
                  contentStyle={{ background: "#1a1b1c", border: "1px solid #444", borderRadius: 6, fontSize: 12 }}
                  labelStyle={{ color: "#fff" }}
                />
                <Area type="monotone" dataKey="visitors" stroke="#14b8a6" fill="#14b8a633" strokeWidth={2} />
                <Area type="monotone" dataKey="pageviews" stroke="#f43f5e" fill="#f43f5e22" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="skeleton" style={{ height: 220, marginTop: 12 }} />
        )}
        <button type="button" className="ghost-btn" onClick={() => setNonce((value) => value + 1)}>
          Refresh sample
        </button>
      </div>
    </div>
  );
}

function Stat({ label, value, change, down }: { label: string; value: string; change: string; down?: boolean }) {
  return (
    <div className="analytics-stat-card">
      <div className="analytics-stat-label">{label}</div>
      <div className="analytics-stat-value">{value}</div>
      <div className={down ? "analytics-stat-change down" : "analytics-stat-change up"}>{change}</div>
    </div>
  );
}
