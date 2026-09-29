import type { ReactNode } from "react";

export function Banner({ slug }: { slug: string }) {
  if (slug === "pulsekit") return <Pulse />;
  if (slug === "harbor") return <Harbor />;
  if (slug === "fieldnotes") return <Notes />;
  if (slug === "ledgerlite") return <Ledger />;
  if (slug === "orbit") return <Orbit />;
  if (slug === "plan" || slug === "essay") return <Essay slug={slug} />;
  return <Board />;
}

function Frame({ children, tint }: { children: ReactNode; tint: string }) {
  return (
    <svg viewBox="0 0 640 380" role="img" aria-hidden="true">
      <rect width="640" height="380" fill="#101214" />
      <rect x="18" y="18" width="604" height="344" rx="10" fill="#18181b" stroke="#2a2a2e" />
      <circle cx="40" cy="40" r="5" fill="#ef4444" />
      <circle cx="58" cy="40" r="5" fill="#fbbf24" />
      <circle cx="76" cy="40" r="5" fill="#22c55e" />
      <rect x="96" y="32" width="180" height="16" rx="4" fill="#232326" />
      <rect x="18" y="64" width="604" height="1" fill={tint} opacity="0.45" />
      {children}
    </svg>
  );
}

function Board() {
  return (
    <Frame tint="#60a5fa">
      {[0, 1, 2].map((col) => (
        <g key={col}>
          <rect x={40 + col * 190} y="86" width="170" height="250" rx="8" fill="#121416" />
          <rect x={52 + col * 190} y="98" width="70" height="8" rx="3" fill="#3a3a40" />
          {[0, 1, 2].map((row) => (
            <rect
              key={row}
              x={52 + col * 190}
              y={122 + row * 64}
              width="146"
              height="52"
              rx="6"
              fill={col === 1 && row === 0 ? "#1d2a3a" : "#1c1c20"}
              stroke="#2e2e34"
            />
          ))}
        </g>
      ))}
    </Frame>
  );
}

function Pulse() {
  return (
    <Frame tint="#14b8a6">
      <polyline
        fill="none"
        stroke="#14b8a6"
        strokeWidth="3"
        points="50,280 120,240 180,250 240,180 310,200 380,120 460,150 560,90"
      />
      <polyline
        fill="none"
        stroke="#f43f5e"
        strokeWidth="3"
        points="50,300 120,290 180,260 240,270 310,220 380,230 460,190 560,160"
      />
      {[0, 1, 2, 3].map((index) => (
        <rect key={index} x={50 + index * 140} y="300" width="90" height="36" rx="6" fill="#121416" />
      ))}
    </Frame>
  );
}

function Harbor() {
  return (
    <Frame tint="#f59e0b">
      <rect x="48" y="100" width="360" height="48" rx="8" fill="#101214" stroke="#333" />
      <text x="64" y="130" fill="#b3b3b3" fontFamily="ui-monospace, monospace" fontSize="16">
        sample.app/north
      </text>
      <rect x="430" y="100" width="140" height="48" rx="8" fill="#f59e0b" />
      <text x="468" y="130" fill="#111" fontFamily="Figtree, sans-serif" fontSize="16" fontWeight="700">
        Shorten
      </text>
      <rect x="48" y="180" width="522" height="120" rx="8" fill="#121416" stroke="#2a2a2e" />
      <rect x="68" y="200" width="160" height="80" rx="6" fill="#23262b" />
      <rect x="248" y="208" width="280" height="12" rx="3" fill="#3a3a40" />
      <rect x="248" y="232" width="200" height="10" rx="3" fill="#2a2a30" />
    </Frame>
  );
}

function Notes() {
  return (
    <Frame tint="#a78bfa">
      <rect x="40" y="86" width="160" height="250" rx="8" fill="#121416" />
      {[0, 1, 2, 3, 4].map((index) => (
        <rect
          key={index}
          x="56"
          y={106 + index * 36}
          width="128"
          height="22"
          rx="4"
          fill={index === 1 ? "#2a2438" : "#1c1c20"}
        />
      ))}
      <rect x="220" y="100" width="360" height="16" rx="3" fill="#3a3a40" />
      <rect x="220" y="132" width="300" height="10" rx="3" fill="#2a2a30" />
      <rect x="220" y="154" width="330" height="10" rx="3" fill="#2a2a30" />
      <rect x="220" y="176" width="260" height="10" rx="3" fill="#2a2a30" />
    </Frame>
  );
}

function Ledger() {
  return (
    <Frame tint="#22c55e">
      {[0, 1, 2].map((index) => (
        <g key={index}>
          <rect x="40" y={90 + index * 70} width="560" height="58" rx="8" fill="#121416" />
          <circle cx="72" cy={119 + index * 70} r="12" fill={index === 1 ? "#14532d" : "#1e293b"} />
          <rect x="100" y={108 + index * 70} width="180" height="10" rx="3" fill="#3a3a40" />
          <rect x="460" y={108 + index * 70} width="100" height="12" rx="3" fill={index === 2 ? "#7f1d1d" : "#14532d"} />
        </g>
      ))}
    </Frame>
  );
}

function Orbit() {
  return (
    <Frame tint="#5865f2">
      <rect x="40" y="86" width="170" height="250" rx="8" fill="#121416" />
      <rect x="230" y="86" width="370" height="250" rx="8" fill="#121416" />
      {[0, 1, 2].map((index) => (
        <rect
          key={index}
          x={250}
          y={110 + index * 64}
          width={index === 1 ? 220 : 280}
          height="40"
          rx="16"
          fill={index === 1 ? "#312e81" : "#1e293b"}
        />
      ))}
    </Frame>
  );
}

function Essay({ slug }: { slug: string }) {
  return (
    <Frame tint={slug === "plan" ? "#f59e0b" : "#60a5fa"}>
      <rect x="70" y="100" width="280" height="18" rx="3" fill="#e5e5e5" />
      <rect x="70" y="136" width="480" height="10" rx="3" fill="#3a3a40" />
      <rect x="70" y="158" width="440" height="10" rx="3" fill="#2e2e34" />
      <rect x="70" y="180" width="460" height="10" rx="3" fill="#2e2e34" />
      <rect x="70" y="214" width="200" height="90" rx="8" fill="#1c1917" stroke="#444" />
    </Frame>
  );
}
