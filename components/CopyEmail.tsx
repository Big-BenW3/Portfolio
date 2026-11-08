"use client";

import { useRef, useState } from "react";

/** Email address with a copy button that confirms what happened. */
export default function CopyEmail({ address }: { address: string }) {
  const [state, setState] = useState<"idle" | "ok" | "fail">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setState("ok");
    } catch {
      setState("fail");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2000);
  };
  return (
    <div className="mail-line">
      <code id="mailText">{address}</code>
      <button className={`btn${state === "ok" ? " ok" : ""}`} id="copyMail" type="button" onClick={copy}>
        {state === "ok" ? "Copied" : state === "fail" ? "Select the address and copy" : "Copy email"}
      </button>
    </div>
  );
}
