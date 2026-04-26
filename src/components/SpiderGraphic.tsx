"use client";

export function SpiderGraphic({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={`${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Web lines */}
      <g stroke="rgba(255,45,85,0.15)" strokeWidth="0.5" fill="none">
        {/* Radial lines */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 360) / 16;
          const rad = (angle * Math.PI) / 180;
          const x2 = 200 + Math.cos(rad) * 200;
          const y2 = 200 + Math.sin(rad) * 200;
          return <line key={`r-${i}`} x1="200" y1="200" x2={x2} y2={y2} />;
        })}
        {/* Concentric rings */}
        {[40, 80, 120, 160, 200].map((r) => (
          <circle key={`c-${r}`} cx="200" cy="200" r={r} />
        ))}
        {/* Spiral web connections */}
        {[40, 80, 120, 160].map((r, ri) =>
          Array.from({ length: 16 }).map((_, i) => {
            const a1 = (i * 360) / 16;
            const a2 = ((i + 1) * 360) / 16;
            const r1 = (a1 * Math.PI) / 180;
            const r2 = (a2 * Math.PI) / 180;
            const nextR = [80, 120, 160, 200][ri];
            return (
              <line
                key={`s-${ri}-${i}`}
                x1={200 + Math.cos(r1) * r}
                y1={200 + Math.sin(r1) * r}
                x2={200 + Math.cos(r2) * nextR}
                y2={200 + Math.sin(r2) * nextR}
                opacity="0.3"
              />
            );
          })
        )}
      </g>
      {/* Spider body */}
      <g transform="translate(200, 200)">
        {/* Abdomen */}
        <ellipse cx="0" cy="12" rx="14" ry="18" fill="#ff2d55" opacity="0.9" />
        {/* Cephalothorax */}
        <ellipse cx="0" cy="-8" rx="10" ry="10" fill="#ff2d55" opacity="0.9" />
        {/* Eyes */}
        <circle cx="-4" cy="-12" r="2" fill="#fff" />
        <circle cx="4" cy="-12" r="2" fill="#fff" />
        <circle cx="-3" cy="-11" r="1" fill="#09090b" />
        <circle cx="3" cy="-11" r="1" fill="#09090b" />
        {/* Legs */}
        {[
          "M-10,-5 Q-35,-30 -55,-15",
          "M-10,-2 Q-40,-10 -60,5",
          "M-10,5 Q-35,20 -55,35",
          "M-10,12 Q-30,40 -45,55",
          "M10,-5 Q35,-30 55,-15",
          "M10,-2 Q40,-10 60,5",
          "M10,5 Q35,20 55,35",
          "M10,12 Q30,40 45,55",
        ].map((d, i) => (
          <path
            key={`leg-${i}`}
            d={d}
            stroke="#ff2d55"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity="0.85"
          />
        ))}
        {/* Spider symbol/mark on abdomen */}
        <path
          d="M0,4 L-3,8 L0,18 L3,8 Z"
          fill="#09090b"
          opacity="0.5"
        />
      </g>
      {/* Glow effects */}
      <defs>
        <radialGradient id="spiderGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff2d55" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#ff2d55" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="100" fill="url(#spiderGlow)" />
    </svg>
  );
}
