import CopyEmail from "./CopyEmail";
import { ArrowIcon, LinkIcon } from "./Icons";
import { CONFIG } from "@/data/site";

export default function Contact() {
  const mail = CONFIG.links.find((l) => l.id === "mail")!;
  return (
    <section className="section contact" id="contact">
      <h2 className="h2">Let&apos;s build something people want to use.</h2>
      <CopyEmail address={mail.handle} />
      <div className="rows" id="rows">
        {CONFIG.links.map((l) => (
          <a key={l.id} className="row" href={l.href} target="_blank" rel="noopener">
            <span className="ic"><LinkIcon id={l.id} /></span>
            <span className="t"><b>{l.label}</b><small>{l.handle}</small></span>
            <span className="go"><ArrowIcon /></span>
          </a>
        ))}
      </div>
    </section>
  );
}
