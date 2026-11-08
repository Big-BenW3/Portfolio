"use client";

import { useEffect, useState } from "react";
import { CONFIG } from "@/data/site";

/** Date and time pill, top right. */
export default function DateTime() {
  const [t, setT] = useState({ date: "", time: "--:--" });
  useEffect(() => {
    const tick = () => {
      try {
        const d = new Date();
        setT({
          time: new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: CONFIG.timeZone }).format(d),
          date: new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: CONFIG.timeZone }).format(d),
        });
      } catch {
        setT({ date: "", time: "" });
      }
    };
    tick();
    const id = setInterval(tick, 20000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="dt" aria-hidden="true"><i /><span className="dd" id="dateText">{t.date}</span><b id="time">{t.time}</b></div>
  );
}
