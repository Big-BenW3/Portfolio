import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Loader from "@/components/Loader";
import Nav from "@/components/Nav";
import DateTime from "@/components/DateTime";
import Engine from "@/components/Engine";

export const metadata: Metadata = {
  title: "BIG BEN — Software Engineer",
  description: "Big Ben: mobile developer, blockchain developer and fullstack builder.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* marks the document as JS-enabled before first paint so entrance animations can start hidden */}
        <script dangerouslySetInnerHTML={{ __html: 'document.documentElement.classList.add("js")' }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&family=Hanken+Grotesk:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="loading" suppressHydrationWarning>
        <div className="glow" aria-hidden="true" />
        <Loader />
        <div className="orb o1" id="o1" aria-hidden="true" />
        <div className="orb o2" id="o2" aria-hidden="true" />
        <div className="orb o3" id="o3" aria-hidden="true" />
        <Nav />
        <DateTime />
        {children}
        <Engine />
      </body>
    </html>
  );
}
