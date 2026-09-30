import type { Metadata, Viewport } from "next";
import { Figtree, JetBrains_Mono } from "next/font/google";
import { Footer, Navbar } from "@/components/chrome";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { ClickSpark } from "@/components/ui";
import "./globals.css";

/**
 * Ported from `src/routes/__root.tsx`.
 *
 * - `<AuthProvider>` was dropped: it was a passthrough (`<>{children}</>`) and
 *   the portfolio never reads a session.
 * - `<HeadContent>` / `<Scripts>` have no equivalent — Next emits the document
 *   head and hydration scripts itself.
 * - The Google Fonts `<link>` is now `next/font`, which self-hosts the same
 *   Figtree / JetBrains Mono weights (no render-blocking third-party request).
 *   `globals.css` maps `--font-ui`/`--font-mono` onto the generated families.
 */
const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-figtree",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  // REAL: browser tab title and the description search engines read. Use your
  // name and a one-line bio. Other routes hardcode "Big Ben" in their own
  // `metadata` — match `profile.name` in src/data/content.ts.
  title: "Big Ben | Blockchain Developer",
  description: "Portfolio for Big Ben, a Blockchain and Mobile developer. Projects, notes, and a way to get in touch.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/__grok/icon-180.png" }],
  },
  manifest: "/__grok/manifest.webmanifest",
  // Share card. In the TanStack build these tags were injected into <head> by
  // the Vite plugin's `grokOgHeadTags`; Next has no such hook, so they are
  // declared here. Without this block `public/og.jpg` is never referenced and
  // pasting the link anywhere yields a bare preview.
  openGraph: {
    type: "website",
    siteName: "Big Ben",
    title: "Big Ben | Blockchain Developer",
    description: "Portfolio for Big Ben, a Blockchain and Mobile developer. Projects, notes, and a way to get in touch.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Big Ben" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Big Ben | Blockchain Developer",
    description: "Portfolio for Big Ben, a Blockchain and Mobile developer. Projects, notes, and a way to get in touch.",
    images: ["/og.jpg"],
  },
};

/** `themeColor` and the viewport tags moved out of `metadata` in Next 14+. */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0d0e",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <PreviewHostBridge />
        {/*
          Platform chrome. The TanStack build got these three tags injected by
          `scripts/grok-pwa-plugin.mjs` (dev) and `server/middleware/grok-pwa.ts`
          (deploy). Next has no equivalent plugin hook, so they are declared
          once, here, rather than silently disappearing with the old build.
        */}
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <script src="https://grok.com/grok-app-builder/extensions.js" defer />
        <ClickSpark>
          <Navbar />
          {children}
          <Footer />
        </ClickSpark>
      </body>
    </html>
  );
}
