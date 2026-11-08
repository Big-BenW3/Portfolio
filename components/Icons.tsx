import type { SVGProps } from "react";
import type { LinkId } from "@/data/site";

type P = SVGProps<SVGSVGElement>;
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function ArrowIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

export function XIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function GithubIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} {...p}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function MailIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} {...p}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export function WhatsappIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} {...p}>
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

export function TelegramIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} {...p}>
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

const MAP = { x: XIcon, github: GithubIcon, mail: MailIcon, whatsapp: WhatsappIcon, telegram: TelegramIcon };

export function LinkIcon({ id }: { id: LinkId }) {
  const C = MAP[id];
  return <C />;
}

/** The BB mark: two overlapping B's on an orange disc. */
export function BBMark({ gradientId }: { gradientId: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff9a5c" />
          <stop offset="1" stopColor="#ff4a1c" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="24" fill={`url(#${gradientId})`} />
      <g transform="translate(-2 0)" fill="none" stroke="#1d0a04" strokeWidth={4.4} strokeLinecap="round" strokeLinejoin="round">
        <path pathLength={gradientId === "ldg" ? 1 : undefined} opacity={0.36} d="M25 13v22M25 13h5.5a5 5 0 0 1 0 10H25M25 23h6.5a6 6 0 0 1 0 12H25" />
        <path pathLength={gradientId === "ldg" ? 1 : undefined} d="M15 13v22M15 13h5.5a5 5 0 0 1 0 10H15M15 23h6.5a6 6 0 0 1 0 12H15" />
      </g>
    </svg>
  );
}
