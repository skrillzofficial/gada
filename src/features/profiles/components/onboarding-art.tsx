import type { CSSProperties } from "react";
import { art as s, artCss } from "./onboarding-art-styles";

export type ArtScene = "about" | "skills" | "projects" | "review" | "success";

const Y = "#f5c518"; // bridge yellow
const W = "#ffffff";
const B3 = "#7f9cd3"; // gada-300
const B5 = "#2a4f98"; // gada-500
const B6 = "#1a3b7e"; // gada-600

const delay = (seconds: number): CSSProperties => ({
  animationDelay: `${seconds}s`,
});

/** Animated scenes drawn in SVG, one per onboarding step */
export function OnboardingArt({
  scene,
  className = "",
}: {
  scene: ArtScene;
  className?: string;
}) {
  return (
    <>
      {/* React 19 hoists this into <head> once, however many times the art is shown */}
      <style href="gada-onboarding-art" precedence="default">
        {artCss}
      </style>
      <svg
        key={scene} // restart the animation when the step changes
        viewBox="0 0 400 400"
        className={`${s.art} ${s.enter} ${className}`}
        aria-hidden="true"
      >
        <Glow />
        {scene === "about" && <AboutScene />}
        {scene === "skills" && <SkillsScene />}
        {scene === "projects" && <ProjectsScene />}
        {scene === "review" && <ReviewScene />}
        {scene === "success" && <SuccessScene />}
        <Sparkles />
      </svg>
    </>
  );
}

function Glow() {
  return (
    <>
      <defs>
        <radialGradient id="gada-glow">
          <stop offset="0%" stopColor={Y} stopOpacity="0.35" />
          <stop offset="100%" stopColor={Y} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="170" fill="url(#gada-glow)" />
      <circle
        cx="200"
        cy="200"
        r="120"
        fill="none"
        stroke={B5}
        strokeWidth="1.5"
        className={s.pulse}
      />
      <circle
        cx="200"
        cy="200"
        r="120"
        fill="none"
        stroke={B5}
        strokeWidth="1.5"
        className={s.pulse}
        style={delay(1.6)}
      />
    </>
  );
}

function Sparkles() {
  const stars = [
    [62, 70, 0],
    [338, 96, 0.8],
    [52, 300, 1.4],
    [344, 318, 0.4],
    [300, 40, 1.9],
  ] as const;
  return (
    <>
      {stars.map(([x, y, d]) => (
        <path
          key={`${x}-${y}`}
          d={`M${x} ${y - 7} L${x + 2} ${y - 2} L${x + 7} ${y} L${x + 2} ${y + 2} L${x} ${y + 7} L${x - 2} ${y + 2} L${x - 7} ${y} L${x - 2} ${y - 2} Z`}
          fill={Y}
          className={s.twinkle}
          style={delay(d)}
        />
      ))}
    </>
  );
}

/* 1. About you: a profile card drawing itself */
function AboutScene() {
  return (
    <g className={s.floatSlow}>
      <rect x="70" y="120" width="260" height="170" rx="22" fill={W} />
      {/* avatar with orbiting ring */}
      <circle cx="140" cy="190" r="34" fill={Y} />
      <circle cx="140" cy="181" r="12" fill={B6} />
      <path d="M118 212 a22 18 0 0 1 44 0 Z" fill={B6} />
      <circle
        cx="140"
        cy="190"
        r="48"
        fill="none"
        stroke={B3}
        strokeWidth="2"
        strokeDasharray="3 7"
        className={s.spin}
      />
      <circle
        cx="140"
        cy="142"
        r="5"
        fill={Y}
        className={s.spin}
        style={{ transformOrigin: "140px 190px", transformBox: "view-box" }}
      />
      {/* text lines */}
      <rect
        x="200"
        y="160"
        width="100"
        height="12"
        rx="6"
        fill={B6}
        className={s.growX}
      />
      <rect
        x="200"
        y="184"
        width="76"
        height="10"
        rx="5"
        fill={B3}
        className={s.growX}
        style={delay(0.3)}
      />
      <rect
        x="200"
        y="206"
        width="88"
        height="10"
        rx="5"
        fill={B3}
        className={s.growX}
        style={delay(0.6)}
      />
      <rect
        x="100"
        y="250"
        width="200"
        height="10"
        rx="5"
        fill="#e3e7f0"
        className={s.growX}
        style={delay(0.9)}
      />
      {/* verified badge pops in */}
      <g className={s.pop} style={delay(0.4)}>
        <circle cx="166" cy="164" r="11" fill={B6} stroke={W} strokeWidth="3" />
        <path
          d="M161 164 l4 4 l7 -8"
          fill="none"
          stroke={Y}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </g>
  );
}

/* 2. Skills: tags floating around a glowing centre */
function SkillsScene() {
  const tags = [
    { x: 40, y: 92, w: 120 },
    { x: 246, y: 76, w: 112 },
    { x: 24, y: 214, w: 104 },
    { x: 276, y: 196, w: 100 },
    { x: 72, y: 314, w: 116 },
    { x: 232, y: 300, w: 124 },
  ];
  return (
    <>
      {tags.map((t, i) => (
        <line
          key={`line-${i}`}
          x1="200"
          y1="200"
          x2={t.x + t.w / 2}
          y2={t.y + 18}
          stroke={B3}
          strokeWidth="2"
          className={s.flow}
          style={delay(i * 0.2)}
        />
      ))}
      <circle cx="200" cy="200" r="40" fill={Y} />
      <circle
        cx="200"
        cy="200"
        r="54"
        fill="none"
        stroke={Y}
        strokeOpacity="0.5"
        strokeWidth="2"
        className={s.pulse}
      />
      <path
        d="M186 200 l9 9 l18 -20"
        fill="none"
        stroke={B6}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {tags.map((t, i) => (
        <g
          key={`tag-${i}`}
          className={i % 2 ? s.floatSlow : s.float}
          style={delay(i * 0.5)}
        >
          <rect
            x={t.x}
            y={t.y}
            width={t.w}
            height="36"
            rx="18"
            fill={i === 1 || i === 4 ? Y : W}
          />
          <circle cx={t.x + 18} cy={t.y + 18} r="6" fill={B6} />
          <rect
            x={t.x + 32}
            y={t.y + 13}
            width={t.w - 50}
            height="10"
            rx="5"
            fill={i === 1 || i === 4 ? B6 : B3}
          />
        </g>
      ))}
    </>
  );
}

/* 3. Past projects: stacked cards with a growing chart */
function ProjectsScene() {
  const bars = [40, 70, 55, 95, 80];
  return (
    <g className={s.sway}>
      <rect
        x="96"
        y="96"
        width="210"
        height="150"
        rx="20"
        fill={B5}
        style={{ transform: "rotate(-10deg)" }}
      />
      <rect
        x="96"
        y="108"
        width="210"
        height="150"
        rx="20"
        fill={B3}
        style={{ transform: "rotate(-4deg)" }}
      />
      <g className={s.floatSlow}>
        <rect x="90" y="130" width="220" height="170" rx="22" fill={W} />
        <rect x="112" y="152" width="90" height="12" rx="6" fill={B6} />
        <rect x="112" y="172" width="60" height="9" rx="4.5" fill={B3} />
        {bars.map((h, i) => (
          <rect
            key={i}
            x={118 + i * 36}
            y={280 - h}
            width="22"
            height={h}
            rx="6"
            fill={i === 3 ? Y : B5}
            className={s.growY}
            style={delay(i * 0.15)}
          />
        ))}
      </g>
      <g className={s.pop} style={delay(1)}>
        <circle cx="300" cy="134" r="22" fill={Y} />
        <path
          d="M300 122 l3.5 7.5 l8 1 l-6 5.5 l1.6 8 l-7.1 -4 l-7.1 4 l1.6 -8 l-6 -5.5 l8 -1 Z"
          fill={B6}
        />
      </g>
    </g>
  );
}

/* 4. Review: a checklist ticking itself off */
function ReviewScene() {
  const rows = [0, 1, 2, 3];
  return (
    <g className={s.floatSlow}>
      <rect x="100" y="80" width="200" height="250" rx="24" fill={W} />
      <rect x="160" y="66" width="80" height="28" rx="10" fill={Y} />
      {rows.map((i) => {
        const y = 128 + i * 48;
        return (
          <g key={i}>
            <circle
              cx="138"
              cy={y}
              r="13"
              fill="none"
              stroke={B3}
              strokeWidth="3"
            />
            <path
              d={`M131 ${y} l5 5 l10 -11`}
              pathLength={1}
              fill="none"
              stroke={B6}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={s.draw}
              style={delay(i * 0.45)}
            />
            <rect
              x="166"
              y={y - 6}
              width={i % 2 ? 84 : 104}
              height="12"
              rx="6"
              fill={i === 3 ? Y : "#e3e7f0"}
            />
          </g>
        );
      })}
    </g>
  );
}

/* 5. Success: the bridge arc draws itself and confetti falls */
function SuccessScene() {
  const confetti = Array.from({ length: 16 }, (_, i) => ({
    x: 30 + ((i * 53) % 340),
    color: [Y, W, B3][i % 3],
    d: (i * 0.37) % 3.6,
    w: i % 2 ? 8 : 12,
  }));
  return (
    <>
      {confetti.map((c, i) => (
        <rect
          key={i}
          x={c.x}
          y="10"
          width={c.w}
          height="5"
          rx="2"
          fill={c.color}
          className={s.fall}
          style={delay(c.d)}
        />
      ))}
      <path
        d="M70 290 A130 130 0 0 1 330 290"
        pathLength={1}
        fill="none"
        stroke={Y}
        strokeWidth="18"
        strokeLinecap="round"
        className={s.drawOnce}
      />
      <rect x="56" y="286" width="288" height="14" rx="7" fill={W} />
      <g className={s.popIn}>
        <circle cx="200" cy="210" r="46" fill={W} />
        <path
          d="M180 210 l14 14 l26 -30"
          fill="none"
          stroke={B6}
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </>
  );
}
