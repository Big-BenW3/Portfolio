let probe: HTMLElement | null = null;

/**
 * Height of the small viewport (100svh), the same unit the pinned sections use in CSS.
 * Unlike innerHeight it stays put while a phone's address bar slides in and out,
 * so measuring with it never shifts the layout in the middle of a scroll.
 */
export function svh(): number {
  if (!probe || !probe.isConnected) {
    probe = document.createElement("div");
    probe.setAttribute("aria-hidden", "true");
    probe.style.cssText = "position:fixed;left:0;top:0;width:0;height:100svh;visibility:hidden;pointer-events:none";
    document.body.appendChild(probe);
  }
  return probe.offsetHeight || innerHeight;
}

/** True on phones and tablets, where hover and fine pointers do not exist. */
export const isTouch = () => matchMedia("(hover: none)").matches;
