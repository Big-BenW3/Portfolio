"use client";

import { useState, type ReactNode } from "react";
import { LINKS, mailto } from "@/data/links";
import { PageLinks } from "@/components/chrome";
import { IconCheck, IconCopy, IconMail } from "@/components/icons";
import { SectionTitle } from "@/components/ui";
import { profile } from "@/data/content";

// The support destinations live in src/data/links.ts (`sponsor`, `coffee`), so
// the pre-filled cards stay in step with the rest of the site.
// - Email is LINKS.email, the same address the contact row uses.
// - GitHub Sponsors: github.com → Settings → Sponsors (or github.com/sponsors/<you> once it is on).
// - Coffee: sign up at ko-fi.com or buymeacoffee.com, open your public page, copy the address bar.
// - Wallets: in the wallet app (MetaMask, Phantom, …) use Receive and copy the FULL address.
//   The shortened text here is not a real address.
const wallets = [
  { id: "ETH", address: "0x0000…SAMPLE…HALE" },
  { id: "SOL", address: "So1a…SampleHale…1111" },
];

/** Strip the scheme so a URL reads as a short card label. */
const asLabel = (url: string) => url.replace(/^https?:\/\//, "");

/**
 * Client half of `/support`, split out of `src/routes/support.tsx` so the page
 * can stay a server component and export `metadata`.
 */
export function SupportView() {
  const [copied, setCopied] = useState<string | null>(null);
  const [wallet, setWallet] = useState(wallets[0].id);
  const current = wallets.find((item) => item.id === wallet) ?? wallets[0];

  const copy = async (value: string, key: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      window.setTimeout(() => setCopied(null), 1200);
    } catch {
      setCopied(null);
    }
  };

  return (
    <main className="support-layout page-intro">
      <SectionTitle>Support</SectionTitle>
      <p className="page-kicker">
        Placeholder ways to say thanks. Nothing here charges a card.
      </p>
      <div className="support-quick-grid">
        <Quick
          label="Email"
          sub={profile.email}
          icon={<IconMail size={22} />}
          href={mailto()}
          copied={copied === "email"}
          onCopy={() => copy(profile.email, "email")}
        />
        <Quick
          label="Sponsors"
          sub={asLabel(LINKS.sponsor)}
          icon={<span style={{ fontWeight: 700 }}>GH</span>}
          href={LINKS.sponsor}
          copied={copied === "gh"}
          onCopy={() => copy(LINKS.sponsor, "gh")}
        />
        <Quick
          label="Coffee"
          sub={asLabel(LINKS.coffee)}
          icon={<span style={{ fontWeight: 700 }}>KO</span>}
          href={LINKS.coffee}
          copied={copied === "ko"}
          onCopy={() => copy(LINKS.coffee, "ko")}
        />
      </div>
      <section className="support-section">
        <h2 className="support-section-title">Wallet</h2>
        <p className="support-section-desc">
          Sample addresses only. Replace them before sharing this page.
        </p>
        <label
          className="support-select-label"
          htmlFor="wallet"
          style={{ display: "block", marginBottom: 6, color: "#b3b3b3", fontSize: "0.8rem" }}
        >
          Network
        </label>
        <select
          id="wallet"
          className="support-select"
          value={wallet}
          onChange={(event) => setWallet(event.target.value)}
        >
          {wallets.map((item) => (
            <option key={item.id} value={item.id}>
              {item.id}
            </option>
          ))}
        </select>
        <div className="wallet-row">
          <code>{current.address}</code>
          <button
            type="button"
            className={copied === "wallet" ? "support-copy on" : "support-copy"}
            aria-label="Copy address"
            onClick={() => copy(current.address, "wallet")}
          >
            {copied === "wallet" ? <IconCheck size={16} /> : <IconCopy size={16} />}
          </button>
        </div>
      </section>
      <PageLinks />
    </main>
  );
}

function Quick({
  label,
  sub,
  icon,
  href,
  copied,
  onCopy,
}: {
  label: string;
  sub: string;
  icon: ReactNode;
  href: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div className="support-quick-wrap">
      <button
        type="button"
        className={copied ? "support-copy on" : "support-copy"}
        aria-label={`Copy ${label}`}
        onClick={onCopy}
      >
        {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
      </button>
      <a
        className="support-quick-card"
        href={href}
        target={href.startsWith("mailto:") ? undefined : "_blank"}
        rel="noreferrer"
      >
        {icon}
        <span className="support-quick-label">{label}</span>
        <span className="support-quick-sub">{sub}</span>
      </a>
    </div>
  );
}
