import { vars } from "./css";

const CARDS = [
  { h: 18, tag: "Mobile", title: "Mobile apps people enjoy opening",
    body: "I build cross-platform apps in Flutter and React Native that feel native on every screen. The small things get the care: smooth gestures, honest loading and empty states, and wallet flows nobody has to think twice about.",
    caps: ["One Flutter codebase for Android, iOS and web", "React Native and Expo, with native modules when it counts", "Solana Mobile Wallet Adapter and embedded wallets, so onboarding takes seconds", "Structured state and data layers that stay easy to change as the app grows"] },
  { h: 200, tag: "Onchain", title: "Onchain, without the friction",
    body: "I write the smart contracts and build the product around them, so someone who has never heard the word blockchain can still use it. Payments settle quickly, wallets connect in a tap, and the chain stays out of the way.",
    caps: ["Solana programs in Rust with Anchor", "Solidity contracts for EVM chains", "Onchain payments and wallet checks that feel instant, including Sui and Walrus storage", "dApp frontends in React, Next.js and Flutter"] },
  { h: 150, tag: "Full-stack", title: "Scalable systems, production-grade from day one",
    body: "Frontend, API and data in one pair of hands, so nothing gets lost in a hand-off. I build systems that hold up under real traffic and keep the backend simple enough to trust, with payments that move smoothly, onchain or off.",
    caps: ["Next.js and React frontends in TypeScript", "Fast APIs with Hono, Express and Bun, plus FastAPI in Python", "PostgreSQL for data you can rely on, Redis for speed at scale", "Smooth payments, including onchain: verified webhooks and a ledger that always adds up"] },
];

export default function About() {
  return (
    <section className="section" id="about">
      <h2 className="h2">What I can do for your product.</h2>
      <div className="acards">
        {CARDS.map((c, i) => (
          <article key={c.tag} className="acard" style={vars({ "--i": i, "--h": c.h })}>
            <div className="top"><b>{c.tag}</b></div>
            <h3>{c.title}</h3>
            <p>{c.body}</p>
            <ul className="caps">{c.caps.map((t) => <li key={t}>{t}</li>)}</ul>
          </article>
        ))}
      </div>
    </section>
  );
}
