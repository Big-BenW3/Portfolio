export type Role = {
  /** Date range shown on the card; the first four characters are painted on the road. */
  when: string;
  /** Card hue (HSL degrees). */
  h: number;
  role: string;
  org: string;
  summary: string;
  points: string[];
};

export const EXP: Role[] = [
  {
    when: "2024 — 2025", h: 200, role: "Getting started", org: "Independent",
    summary: "Teaching myself to build for mobile and the web, one small project at a time.",
    points: ["Picked up Flutter, React Native and TypeScript", "Built the first projects that now sit in the Work section"],
  },
  {
    when: "2025 — 2026", h: 150, role: "Freelance developer", org: "Independent clients",
    summary: "Client work across mobile, web and onchain, from first call to store release.",
    points: [
      "Built and shipped cross-platform mobile apps in Flutter and React Native",
      "Added payments and wallet flows, onchain and off",
      "Handled handoff, backend and release alone, so clients had one person to talk to",
    ],
  },
  {
    when: "2026 — Present", h: 18, role: "Mobile developer", org: "Sammyjay Software Solutions Limited",
    summary: "Part of the team building mobile products for the company’s clients.",
    points: [
      "Build and maintain cross-platform mobile apps",
      "Work with backend and design to take features from ticket to release",
      "Keep the codebase structured so new screens never mean a rewrite",
    ],
  },
];
