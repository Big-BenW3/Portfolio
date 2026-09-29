"use client";


import { useState } from "react";
import type { Block } from "@/data/content";
import { profile } from "@/data/content";
import { IconCheck, IconCopy, IconTerminal } from "@/components/icons";
import { Portrait } from "@/components/portrait";
import { Rich } from "@/components/ui";

async function writeClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function CopyButton({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="copy-btn"
      onClick={async () => {
        const ok = await writeClipboard(text);
        if (!ok) return;
        setDone(true);
        window.setTimeout(() => setDone(false), 1200);
      }}
    >
      {done ? <IconCheck size={12} /> : <IconCopy size={12} />}
      {done ? "Copied" : "Copy"}
    </button>
  );
}

export function Article({ blocks }: { blocks: Block[] }) {
  return (
    <article className="article">
      {blocks.map((block, index) => {
        if (block.type === "p") {
          return (
            <p key={index}>
              <Rich text={block.text} />
            </p>
          );
        }
        if (block.type === "h") return <h2 key={index} className="article-h">{block.text}</h2>;
        if (block.type === "tip" || block.type === "warn" || block.type === "dont") {
          return (
            <div key={index} className={block.type === "tip" ? "callout" : `callout ${block.type}`}>
              <strong>{block.title}</strong>
              {block.text}
            </div>
          );
        }
        if (block.type === "ul" || block.type === "ol") {
          const Tag = block.type === "ul" ? "ul" : "ol";
          return (
            <Tag key={index}>
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </Tag>
          );
        }
        if (block.type === "code") {
          return (
            <div key={index} className="codeblock">
              <header>
                <span>
                  {block.filename} · {block.language}
                </span>
                <CopyButton text={block.code} />
              </header>
              <pre>
                <code>{block.code}</code>
              </pre>
            </div>
          );
        }
        if (block.type === "term") {
          return (
            <div key={index} className="terminal">
              <header>
                <span>
                  <span className="dots">
                    <i />
                    <i />
                    <i />
                  </span>
                  <IconTerminal size={12} /> {block.title}
                </span>
                <CopyButton text={block.commands.join("\n")} />
              </header>
              <pre>{block.commands.map((command) => `$ ${command}`).join("\n")}</pre>
            </div>
          );
        }
        return null;
      })}
      <div className="author-card">
        <div className="author-ava">
          <Portrait />
        </div>
        <div>
          <div className="author-name">{profile.name}</div>
          <p>Sample reply: swap this note when the writing is yours.</p>
        </div>
      </div>
    </article>
  );
}
