"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppLink } from "@/components/app-link";
import { useEffect, useState } from "react";
import { profile } from "@/data/content";
import { IconStar } from "@/components/icons";
import { Tooltip, formatClock, useNow } from "@/components/ui";

const links = [
  { to: "/", label: "Home", exact: true },
  { to: "/projects", label: "Projects", exact: false },
  { to: "/resume", label: "Resume", exact: false },
  { to: "/analytics", label: "Analytics", exact: false },
  { to: "/uses", label: "Tools", exact: false },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [starred, setStarred] = useState(false);

  useEffect(() => {
    setStarred(window.localStorage.getItem("portfolio-star") === "1");
  }, []);

  const toggle = () => {
    const next = !starred;
    setStarred(next);
    window.localStorage.setItem("portfolio-star", next ? "1" : "0");
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <nav className="navbar-links" aria-label="Primary">
          {links.map((link) => {
            const active = link.exact ? pathname === "/" : pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                href={link.to}
                className={active ? "navbar-link navbar-link-active" : "navbar-link"}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <Tooltip text={starred ? "Starred — thank you" : "Give a star"} position="bottom">
          <button
            type="button"
            className={starred ? "navbar-star is-on" : "navbar-star"}
            aria-pressed={starred}
            aria-label="Star this portfolio"
            onClick={toggle}
          >
            <IconStar size={14} />
            <span>{starred ? "Starred" : "Open-source"}</span>
          </button>
        </Tooltip>
      </div>
    </header>
  );
}

export function Footer() {
  const now = useNow();
  return (
    <footer className="footer">
      <p className="footer-quote">“{profile.quote}”</p>
      <p className="footer-by">{profile.quoteBy}</p>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>{formatClock(now)}</span>
      </div>
    </footer>
  );
}

export function PageLinks({
  back = "/",
  backLabel = "Back to Home",
  forward,
  forwardLabel,
}: {
  back?: string;
  backLabel?: string;
  forward?: string;
  forwardLabel?: string;
}) {
  return (
    <div className="view-all-projects">
      <AppLink to={back} className="view-all-btn">
        <span className="arrow-icon" style={{ transform: "scaleX(-1)" }}>
          →
        </span>
        <span>{backLabel}</span>
      </AppLink>
      {forward && forwardLabel ? (
        <AppLink to={forward} className="view-all-btn">
          <span>{forwardLabel}</span>
          <span className="arrow-icon">→</span>
        </AppLink>
      ) : (
        <span />
      )}
    </div>
  );
}
