import Typed from "./Typed";
import { ArrowIcon, LinkIcon } from "./Icons";
import { vars } from "./css";
import { CONFIG } from "@/data/site";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <h1 data-in="" style={vars({ "--d": 0 })} aria-label="Hey, I'm Big Ben. I'm a mobile developer, blockchain developer and fullstack builder.">
          <span className="l1" aria-hidden="true">Hey, I&apos;m Big&nbsp;Ben.</span>
          <span className="role" aria-hidden="true">I&apos;m a <Typed /><span className="caret" /></span>
        </h1>
        <p className="lede" data-in="" style={vars({ "--d": 1 })}>
          I turn ideas into products people can actually use: mobile apps, onchain systems and the backends that hold them together.
        </p>
        <div className="cta" data-in="" style={vars({ "--d": 2 })}>
          <a className="btn primary" href="#work">
            <span>See my work</span>
            <span className="chip"><ArrowIcon strokeWidth={2.2} /></span>
          </a>
          <a className="btn ghost" href="#contact">Get in touch</a>
        </div>
        <div className="socials" id="socials" data-in="" style={vars({ "--d": 3 })}>
          {CONFIG.links.map((l) => (
            <a key={l.id} href={l.href} target="_blank" rel="noopener" aria-label={l.label} title={l.label}><LinkIcon id={l.id} /></a>
          ))}
        </div>
      </div>

      <div className="device" aria-hidden="true" data-in="" style={vars({ "--d": 2 })}>
        <div className="laptop">
          <div className="lid">
            <div className="lscreen">
              <div className="site">
                <div className="w-nav" style={vars({ "--b": 0 })}><i /><b /><b /><b /><span /></div>
                <div className="w-hero" style={vars({ "--b": 1 })}>
                  <div className="t"><u /><u /><s /><s /><em /></div>
                  <div className="img" />
                </div>
                <div className="w-cards" style={vars({ "--b": 2 })}>
                  <span style={vars({ "--c": "#2dd4bf" })} /><span style={vars({ "--c": "#fbbf24" })} /><span style={vars({ "--c": "#fb7185" })} />
                </div>
                <div className="w-band" style={vars({ "--b": 3 })} />
                <div className="w-cards two" style={vars({ "--b": 4 })}>
                  <span style={vars({ "--c": "#818cf8" })} /><span style={vars({ "--c": "#4ade80" })} /><span style={vars({ "--c": "#f472b6" })} />
                </div>
              </div>
              <div className="guides" />
              <div className="cursor">
                <svg viewBox="0 0 16 16"><path d="M2 1l11 5.2-4.6 1.4L6.6 12z" fill="#fff" stroke="#0b0d12" strokeWidth={1.1} strokeLinejoin="round" /></svg>
              </div>
            </div>
          </div>
          <div className="lbase" />
        </div>
        <div className="phone">
          <div className="screen">
            <div className="s-top"><b /><i /></div>
            <div className="s-card"><i style={{ width: "44%" }} /><i style={{ width: "70%" }} /></div>
            <div className="s-row" style={vars({ "--c": "#2dd4bf" })}><i /><span /></div>
            <div className="s-row" style={vars({ "--c": "#fbbf24" })}><i /><span /></div>
            <div className="s-row" style={vars({ "--c": "#fb7185" })}><i /><span /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
