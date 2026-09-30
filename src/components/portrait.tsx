import { profileImage } from "@/data/links";

const days = [
  { name: "Sunday ring", hue: "#f59e0b" },
  { name: "Monday slash", hue: "#60a5fa" },
  { name: "Tuesday flame", hue: "#fbbf24" },
  { name: "Wednesday spark", hue: "#22c55e" },
  { name: "Thursday moon", hue: "#c4b5fd" },
  { name: "Friday bloom", hue: "#fb7185" },
  { name: "Saturday shy", hue: "#e5e5e5" },
];

// The real profile photo. `public/portrait.png` is a square 512×512 source, kept
// from being cropped by the two slots that render it: the 132px hero avatar and
// the 42px article author card (see `.hero-section-avatar`, `.author-ava` in
// globals.css). Swap the file for any 1:1 image, or point `LINKS.portrait`
// somewhere else in src/data/links.ts.
//
// `alt=""` is deliberate: the name is already in the <h1> next to this image, so
// a description here would make screen readers announce it twice.
export function Portrait() {
  return (
    <img
      src={profileImage.path}
      alt=""
      className="portrait"
      width={profileImage.width}
      height={profileImage.height}
    />
  );
}

export function Decoration({ day }: { day: number }) {
  const item = days[day] ?? days[0];
  return (
    <svg className="decoration" viewBox="0 0 200 200" aria-hidden="true">
      <title>{item.name}</title>
      {day === 0 && (
        <g stroke={item.hue} fill="none" strokeWidth="2">
          <circle cx="100" cy="100" r="92" strokeDasharray="4 8" />
          <circle cx="168" cy="40" r="6" fill={item.hue} stroke="none" />
        </g>
      )}
      {day === 1 && <path d="M30 30 L170 150" stroke={item.hue} strokeWidth="3" />}
      {day === 2 && <path d="M150 28c8 18-6 22-2 36 8-6 16 2 10 16" stroke={item.hue} strokeWidth="3" fill="none" />}
      {day === 3 && (
        <g fill={item.hue}>
          <circle cx="28" cy="46" r="3" />
          <circle cx="170" cy="36" r="2.5" />
          <circle cx="160" cy="170" r="3" />
        </g>
      )}
      {day === 4 && <path d="M150 34a16 16 0 1 0 14 24 12 12 0 1 1-14-24Z" fill={item.hue} />}
      {day === 5 && <path d="M156 48c10 8 8 22-2 24-8 10-22 6-24-4 8-2 12-10 10-18 6 2 12 0 16-2Z" fill={item.hue} />}
      {day === 6 && (
        <g fill="none" stroke={item.hue} strokeWidth="2">
          <path d="M24 70c18-8 20 10 8 14" />
          <path d="M176 120c-16 6-8 18 6 16" />
        </g>
      )}
    </svg>
  );
}

// REAL QR: renders https://github.com/Big-BenW3 via a remote QR image (no new
// dependency, no build-time download). Swap QR_URL for your site/X/vCard.
const QR_URL = "https://github.com/Big-BenW3";
const QR_SRC = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=4&color=111111&bgcolor=f5f5f4&data=${encodeURIComponent(QR_URL)}`;
export function QrFace() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={QR_SRC}
      alt={`QR code linking to ${QR_URL}`}
      className="qr-face"
      width={220}
      height={220}
      loading="lazy"
    />
  );
}
