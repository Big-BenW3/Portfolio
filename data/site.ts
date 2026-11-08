export type LinkId = "x" | "github" | "mail" | "whatsapp" | "telegram";

export interface SiteLink {
  id: LinkId;
  label: string;
  handle: string;
  href: string;
}

export const CONFIG = {
  timeZone: "Africa/Lagos",
  roles: ["mobile developer", "blockchain developer", "fullstack builder"],
  links: [
    { id: "x", label: "X / Twitter", handle: "@banditdotsol", href: "https://x.com/banditdotsol" },
    { id: "github", label: "GitHub", handle: "github.com/Big-BenW3", href: "https://github.com/Big-BenW3" },
    { id: "mail", label: "Email", handle: "hello@yourdomain.com", href: "mailto:hello@yourdomain.com" },
    { id: "whatsapp", label: "WhatsApp", handle: "+234 000 000 0000", href: "https://wa.me/2340000000000" },
    { id: "telegram", label: "Telegram", handle: "@JustthatBen", href: "https://t.me/JustthatBen" },
  ] satisfies SiteLink[],
};

export const GH = "https://github.com/Big-BenW3/";
