import type { Metadata } from "next";
import { SupportView } from "@/components/support-view";

// REAL: tab title. Use your name from profile.name.
export const metadata: Metadata = { title: "Support | Jordan Hale" };

/** `/support` — server shell; the interactive body lives in `SupportView`. */
export default function SupportPage() {
  return <SupportView />;
}
