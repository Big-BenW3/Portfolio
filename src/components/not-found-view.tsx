"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconArrow, IconArrowLeft } from "@/components/icons";

/** Ported from `src/routes/$.tsx` — the styled 404 body. */
export function NotFoundView() {
  const router = useRouter();
  return (
    <main className="page-not-found">
      <i className="float-dot" style={{ top: "20%", left: "12%" }} />
      <i className="float-dot" style={{ top: "62%", right: "18%", animationDelay: "2s" }} />
      <i className="float-dot" style={{ bottom: "24%", left: "30%", animationDelay: "4s" }} />
      <div className="error-container">
        <p className="error-code">404</p>
        <h1>Page not found</h1>
        <p>This route is not on the map.</p>
        <p>No stress. Head home, or step back.</p>
        <div className="error-actions">
          <Link href="/" className="action-btn primary">
            <IconArrowLeft size={16} /> Go home
          </Link>
          <button type="button" className="action-btn secondary" onClick={() => router.back()}>
            Go back <IconArrow size={16} />
          </button>
        </div>
      </div>
    </main>
  );
}
