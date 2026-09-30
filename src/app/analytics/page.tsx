import type { Metadata } from "next";
import { AnalyticsPanel } from "@/components/analytics-panel";
import { PageLinks } from "@/components/chrome";
import { SectionTitle } from "@/components/ui";

// REAL: tab title. Use your name from profile.name.
export const metadata: Metadata = { title: "Analytics | Big Ben" };

/** `/analytics` — ported from `src/routes/analytics.tsx`. */
export default function AnalyticsPage() {
  return (
    <main className="analytics-layout page-intro">
      <SectionTitle>Analytics</SectionTitle>
      <p className="page-kicker">
        Sample traffic. Refresh redraws the same shape. Wire a real source when you want
        live numbers.
      </p>
      <AnalyticsPanel />
      <PageLinks />
    </main>
  );
}
