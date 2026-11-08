import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import ResumeViewer from "@/components/ResumeViewer";

export const metadata: Metadata = { title: "Resume · Big Ben" };

export default function ResumePage() {
  return (
    <div id="resumePage">
      <section className="section rpage-in">
        <div className="resume-head">
          <div>
            <Link className="back" href="/">← Back to portfolio</Link>
            <h2 className="h2" style={{ marginTop: "var(--s4)" }}>The short version.</h2>
          </div>
          <div className="resume-actions">
            <a className="btn primary" id="dlResume" href="/resume.pdf" download="Big-Ben-Resume.pdf">Download PDF</a>
          </div>
        </div>
        <ResumeViewer />
      </section>
      <Footer />
    </div>
  );
}
