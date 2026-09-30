import type { Metadata } from "next";
import { ResumeView } from "@/components/resume-view";

// REAL: tab title. Use your name from profile.name.
export const metadata: Metadata = { title: "Resume | Big Ben" };

/** `/resume` — server shell; the interactive body lives in `ResumeView`. */
export default function ResumePage() {
  return <ResumeView />;
}
