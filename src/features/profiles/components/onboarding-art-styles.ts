/* Animation styles for the onboarding art.
   Kept in the component (not a .module.css file) because next.config.ts sends every .css file
   through Tailwind, which breaks CSS modules. Class names are prefixed "ga-" to avoid clashes. */
export const artCss = `
.ga-art * {
  transform-box: fill-box;
  transform-origin: center;
}

.ga-float { animation: ga-float 5s ease-in-out infinite; }
.ga-floatSlow { animation: ga-float 7s ease-in-out infinite; }
.ga-spin { animation: ga-spin 18s linear infinite; }
.ga-spinReverse { animation: ga-spin 26s linear infinite reverse; }
.ga-pulse { animation: ga-pulse 3.2s ease-out infinite; }
.ga-twinkle { animation: ga-twinkle 2.4s ease-in-out infinite; }
.ga-flow { stroke-dasharray: 4 8; animation: ga-flow 1.6s linear infinite; }
.ga-growX { transform-origin: left center; animation: ga-growX 4.5s ease-in-out infinite; }
.ga-growY { transform-origin: center bottom; animation: ga-growY 4s ease-in-out infinite; }
.ga-draw { stroke-dasharray: 1; stroke-dashoffset: 1; animation: ga-draw 5s ease-in-out infinite; }
.ga-drawOnce { stroke-dasharray: 1; stroke-dashoffset: 1; animation: ga-drawOnce 1.6s ease-out forwards; }
.ga-pop { animation: ga-pop 4s ease-in-out infinite; }
.ga-sway { animation: ga-sway 6s ease-in-out infinite; }
.ga-fall { animation: ga-fall 3.6s linear infinite both; }
.ga-enter { animation: ga-enter 0.6s ease-out both; }
.ga-popIn { transform: scale(0); animation: ga-popIn 0.7s cubic-bezier(0.3, 1.6, 0.5, 1) 1.2s forwards; }

@keyframes ga-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
@keyframes ga-spin { to { transform: rotate(360deg); } }
@keyframes ga-pulse {
  0% { transform: scale(0.8); opacity: 0.6; }
  100% { transform: scale(1.5); opacity: 0; }
}
@keyframes ga-twinkle {
  0%, 100% { opacity: 0.2; transform: scale(0.7); }
  50% { opacity: 1; transform: scale(1); }
}
@keyframes ga-flow { to { stroke-dashoffset: -24; } }
@keyframes ga-growX {
  0% { transform: scaleX(0); }
  30%, 85% { transform: scaleX(1); }
  100% { transform: scaleX(0); }
}
@keyframes ga-growY {
  0% { transform: scaleY(0.15); }
  35%, 80% { transform: scaleY(1); }
  100% { transform: scaleY(0.15); }
}
@keyframes ga-draw {
  0% { stroke-dashoffset: 1; }
  25%, 85% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: 1; }
}
@keyframes ga-drawOnce { to { stroke-dashoffset: 0; } }
@keyframes ga-pop {
  0%, 15% { transform: scale(0); }
  25% { transform: scale(1.15); }
  32%, 85% { transform: scale(1); }
  100% { transform: scale(0); }
}
@keyframes ga-sway {
  0%, 100% { transform: rotate(-2deg); }
  50% { transform: rotate(2deg); }
}
@keyframes ga-fall {
  0% { transform: translateY(-40px) rotate(0deg); opacity: 0; }
  10% { opacity: 1; }
  100% { transform: translateY(380px) rotate(540deg); opacity: 0; }
}
@keyframes ga-popIn {
  to { transform: scale(1); }
}
@keyframes ga-enter {
  from { opacity: 0; transform: translateY(12px) scale(0.97); }
  to { opacity: 1; transform: none; }
}

/* Respect people who turn animations off */
@media (prefers-reduced-motion: reduce) {
  .ga-art * {
    animation: none !important;
  }
  .ga-draw, .ga-drawOnce { stroke-dashoffset: 0; }
  .ga-popIn { transform: none; }
}
`;

export const art = {
  art: "ga-art",
  float: "ga-float",
  floatSlow: "ga-floatSlow",
  spin: "ga-spin",
  spinReverse: "ga-spinReverse",
  pulse: "ga-pulse",
  twinkle: "ga-twinkle",
  flow: "ga-flow",
  growX: "ga-growX",
  growY: "ga-growY",
  draw: "ga-draw",
  drawOnce: "ga-drawOnce",
  pop: "ga-pop",
  sway: "ga-sway",
  fall: "ga-fall",
  enter: "ga-enter",
  popIn: "ga-popIn",
} as const;
