"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { BBMark } from "./Icons";

const SECTIONS = [
  ["stack", "Stack"],
  ["work", "Work"],
  ["about", "About"],
] as const;

export default function Nav() {
  const pathname = usePathname();

  // On the home page, section links scroll smoothly instead of navigating.
  const go = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") return;
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    history.pushState(null, "", id === "top" ? "/" : `/#${id}`);
  };

  return (
    <>
      <nav className="nav" aria-label="Sections">
        <Link className="logo" href="/" aria-label="Back to top" onClick={go("top")}><BBMark gradientId="bbg" /></Link>
        {SECTIONS.map(([id, label]) => (
          <Link key={id} className="lnk" data-s={id} href={`/#${id}`} onClick={go(id)}>{label}</Link>
        ))}
        <Link className="lnk" data-s="resume" href="/resume">Resume</Link>
        <Link className="lnk" data-s="contact" href="/#contact" onClick={go("contact")}>Contact</Link>
      </nav>
    </>
  );
}
