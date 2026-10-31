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
