import type { ReactNode, SVGProps } from "react";

type Props = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 16, children, ...rest }: Props & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

export function IconX(props: Props) {
  return (
    <Base {...props}>
      <path
        fill="currentColor"
        d="M14.7 10.35 21.4 3h-1.6l-5.8 6.4L9 3H3.2l7 9.55L3.2 21h1.6l6.1-6.75L15 21h5.8l-6.1-10.65Zm-2.16 2.4-.7-1-5.7-7.85h2.4l4.55 6.3.7 1 6 8.25h-2.4l-4.85-6.7Z"
      />
    </Base>
  );
}

export function IconGithub(props: Props) {
  return (
    <Base {...props}>
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 6.84c.85 0 1.7.12 2.5.34 1.9-1.32 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.04 10.04 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"
      />
    </Base>
  );
}

export function IconLinkedin(props: Props) {
  return (
    <Base {...props}>
      <path
        fill="currentColor"
        d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V24h-4V8.5zM8.5 8.5h3.8v2.1h.05c.53-1 1.84-2.1 3.79-2.1 4.05 0 4.8 2.67 4.8 6.14V24h-4v-7.7c0-1.84-.03-4.2-2.56-4.2-2.56 0-2.95 2-2.95 4.06V24h-4V8.5z"
        transform="translate(1.2 0) scale(0.9)"
      />
    </Base>
  );
}

export function IconInstagram(props: Props) {
  return (
    <Base {...props}>
      <path
        fill="currentColor"
        d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm10 2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm-5 3.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2Zm0 2A1.8 1.8 0 1 0 13.8 12 1.8 1.8 0 0 0 12 10.2ZM17.4 7.1a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z"
      />
    </Base>
  );
}

export function IconMail(props: Props) {
  return (
    <Base {...props}>
      <path
        fill="currentColor"
        d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm0 2.2V18h18V7.2l-9 5.4L3 7.2Zm1.2-1.2 7.8 4.7 7.8-4.7H4.2Z"
      />
    </Base>
  );
}

export function IconDoc(props: Props) {
  return (
    <Base {...props}>
      <path
        fill="currentColor"
        d="M6 2h8l6 6v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Zm7 1.5V9h5.5L13 3.5ZM8 12h8v1.5H8V12Zm0 3.5h8V17H8v-1.5Z"
      />
    </Base>
  );
}

export function IconPen(props: Props) {
  return (
    <Base {...props}>
      <path
        fill="currentColor"
        d="M3 17.25V21h3.75L19.8 7.94l-3.75-3.75L3 17.25ZM21.4 6.34a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83Z"
      />
    </Base>
  );
}

export function IconPin(props: Props) {
  return (
    <Base {...props}>
      <path
        fill="currentColor"
        d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 14.5 9 2.5 2.5 0 0 1 12 11.5Z"
      />
    </Base>
  );
}

export function IconClock(props: Props) {
  return (
    <Base {...props}>
      <path
        fill="currentColor"
        d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 11h-5V11h4V6h1Z"
      />
    </Base>
  );
}

export function IconDiscord(props: Props) {
  return (
    <Base {...props}>
      <path
        fill="currentColor"
        d="M19.3 5.2A17 17 0 0 0 15.1 4l-.4.8a15.2 15.2 0 0 1 3.7 1.4 16 16 0 0 0-13.8 0A12 12 0 0 1 8.3 4.8L8 4a17 17 0 0 0-4.3 1.2C1.2 8.9.5 12.5.8 16.1A17.4 17.4 0 0 0 6 18.6l.8-1.3a11.3 11.3 0 0 1-1.8-.9l.4-.3c3.6 1.7 7.5 1.7 11.1 0l.4.3c-.6.4-1.2.7-1.8.9l.8 1.3a17.4 17.4 0 0 0 5.2-2.5c.5-4.2-.6-7.8-2.8-10.9ZM8.7 14.6c-1.1 0-2-.9-2-2.1s.9-2.1 2-2.1 2 .9 2 2.1-.9 2.1-2 2.1Zm6.6 0c-1.1 0-2-.9-2-2.1s.9-2.1 2-2.1 2 .9 2 2.1-.9 2.1-2 2.1Z"
      />
    </Base>
  );
}

export function IconStar(props: Props) {
  return (
    <Base {...props}>
      <path
        fill="currentColor"
        d="m12 3 2.4 5.7 6.2.6-4.7 4.1 1.4 6.1L12 16.8 6.7 19.5 8.1 13.4 3.4 9.3l6.2-.6L12 3Z"
      />
    </Base>
  );
}

export function IconArrow(props: Props) {
  return (
    <Base {...props}>
      <path
        fill="currentColor"
        d="M13.2 5.2 19 12l-5.8 6.8-1.3-1.1 4.1-4.7H5v-2h10.9l-4-4.7 1.3-1.1Z"
      />
    </Base>
  );
}

export function IconArrowLeft(props: Props) {
  return (
    <Base {...props}>
      <path
        fill="currentColor"
        d="M10.8 5.2 5 12l5.8 6.8 1.3-1.1L8 13h11v-2H8l4.1-4.7-1.3-1.1Z"
      />
    </Base>
  );
}

export function IconExternal(props: Props) {
  return (
    <Base {...props}>
      <path
        fill="currentColor"
        d="M14 4h6v6h-2V7.4l-7.3 7.3-1.4-1.4L16.6 6H14V4ZM5 6h6v2H7v9h9v-4h2v6H5V6Z"
      />
    </Base>
  );
}

export function IconCheck(props: Props) {
  return (
    <Base {...props}>
      <path fill="currentColor" d="m9.2 16.2-3.7-3.7 1.4-1.4 2.3 2.3 6-6.1 1.4 1.4-7.4 7.5Z" />
    </Base>
  );
}

export function IconCopy(props: Props) {
  return (
    <Base {...props}>
      <path
        fill="currentColor"
        d="M8 3h10a1 1 0 0 1 1 1v12h-2V5H8V3ZM5 7h10a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Z"
      />
    </Base>
  );
}

export function IconBadge(props: Props) {
  return (
    <Base {...props}>
      <path
        fill="currentColor"
        d="M12 2 9.6 4.2 6.4 4l-.6 3.2L3.2 9.2 4.6 12 3.2 14.8l2.6 2 .6 3.2 3.2-.2L12 22l2.4-2.2 3.2.2.6-3.2 2.6-2L19.4 12l1.4-2.8-2.6-2-.6-3.2-3.2.2L12 2Zm-1.1 13.2-3-3 1.3-1.3 1.7 1.7 3.9-3.9 1.3 1.3-5.2 5.2Z"
      />
    </Base>
  );
}

export function IconHeart(props: Props) {
  return (
    <Base {...props}>
      <path
        fill="currentColor"
        d="M12 20s-7-4.4-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.6-7 9-7 9Z"
      />
    </Base>
  );
}

export function IconUser(props: Props) {
  return (
    <Base {...props}>
      <path
        fill="currentColor"
        d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4 0-8 2-8 4.5V21h16v-2.5C20 16 16 14 12 14Z"
      />
    </Base>
  );
}

export function IconQr(props: Props) {
  return (
    <Base {...props}>
      <path
        fill="currentColor"
        d="M3 3h8v8H3V3Zm2 2v4h4V5H5Zm8-2h8v8h-8V3Zm2 2v4h4V5h-4ZM3 13h8v8H3v-8Zm2 2v4h4v-4H5Zm10 0h2v2h-2v-2Zm4 0h2v4h-4v-2h2v-2Zm-4 4h2v2h-2v-2Zm4 2h2v2h-2v-2Z"
      />
    </Base>
  );
}

export function IconDownload(props: Props) {
  return (
    <Base {...props}>
      <path
        fill="currentColor"
        d="M12 3v10.2l3.3-3.3 1.4 1.4L12 16.9 7.3 11.3l1.4-1.4 3.3 3.3V3h2ZM5 19h14v2H5v-2Z"
      />
    </Base>
  );
}

export function IconAlert(props: Props) {
  return (
    <Base {...props}>
      <path fill="currentColor" d="M12 3 2 20h20L12 3Zm1 13h-2v-2h2v2Zm0-4h-2V9h2v3Z" />
    </Base>
  );
}

export function IconTerminal(props: Props) {
  return (
    <Base {...props}>
      <path
        fill="currentColor"
        d="M4 4h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm1 2v12h14V6H5Zm2.2 2.2 3.3 3.3-3.3 3.3 1.4 1.4 4.7-4.7-4.7-4.7-1.4 1.4ZM12 15h5v2h-5v-2Z"
      />
    </Base>
  );
}

export function IconChevron(props: Props) {
  return (
    <Base {...props}>
      <path fill="currentColor" d="m6.7 9.2 5.3 5.3 5.3-5.3 1.4 1.4L12 17.3 5.3 10.6l1.4-1.4Z" />
    </Base>
  );
}

const socialIcons: Record<string, (props: Props) => ReactNode> = {
  X: IconX,
  GitHub: IconGithub,
  LinkedIn: IconLinkedin,
  Instagram: IconInstagram,
  Email: IconMail,
  Resume: IconDoc,
  Writing: IconPen,
  Discord: IconDiscord,
};

export function SocialIcon({ name, size = 14 }: { name: string; size?: number }) {
  const Cmp = socialIcons[name] ?? IconExternal;
  return <Cmp size={size} />;
}

export function MarkIcon({ label, color }: { label: string; color: string }) {
  const letters = label.replace(/[^A-Za-z0-9+.]/g, "").slice(0, 2).toUpperCase();
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="1" y="1" width="22" height="22" rx="6" fill={color} opacity="0.16" />
      <rect x="1.5" y="1.5" width="21" height="21" rx="5.5" stroke={color} strokeOpacity="0.7" />
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fontFamily="Figtree, sans-serif"
        fontSize="9"
        fontWeight="700"
        fill={color}
      >
        {letters}
      </text>
    </svg>
  );
}
