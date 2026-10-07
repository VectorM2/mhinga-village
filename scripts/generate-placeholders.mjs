// Generates the illustrated SVG placeholders in /public/images.
// These stand in for real Mhinga photography until it is supplied.
// Run: node scripts/generate-placeholders.mjs
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const out = join(process.cwd(), "public", "images");
mkdirSync(out, { recursive: true });

function rng(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function hill(w, h, base, amp, seed, waves = 3) {
  const r = rng(seed);
  const phase = r() * Math.PI * 2;
  const pts = [];
  const steps = 48;
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * w;
    let y = base;
    for (let k = 1; k <= waves; k++) {
      y -= (amp / k) * Math.sin((x / w) * Math.PI * (k + r() * 0.15) + phase * k);
    }
    pts.push([x, y]);
  }
  let d = `M0 ${h} L0 ${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const cx = (x0 + x1) / 2;
    d += ` Q${x0.toFixed(1)} ${y0.toFixed(1)} ${cx.toFixed(1)} ${((y0 + y1) / 2).toFixed(1)}`;
  }
  d += ` L${w} ${pts[pts.length - 1][1].toFixed(1)} L${w} ${h} Z`;
  return d;
}

// Umbrella-canopy tree (marula / acacia-like silhouette)
function tree(x, y, s, fill) {
  return `<g fill="${fill}" transform="translate(${x} ${y}) scale(${s})">
    <path d="M-3 0 C-2 -30 -4 -48 -14 -62 L-10 -63 C-2 -52 0 -44 1 -38 C4 -50 10 -58 20 -64 L23 -61 C12 -54 6 -42 4 -30 C4 -18 4 -8 3 0 Z"/>
    <ellipse cx="-16" cy="-70" rx="34" ry="11"/>
    <ellipse cx="18" cy="-72" rx="30" ry="10"/>
    <ellipse cx="0" cy="-80" rx="26" ry="9"/>
  </g>`;
}

// Baobab silhouette
function baobab(x, y, s, fill) {
  return `<g fill="${fill}" transform="translate(${x} ${y}) scale(${s})">
    <path d="M-22 0 C-20 -30 -18 -60 -14 -88 L-30 -108 L-26 -112 L-12 -98 L-10 -116 L-4 -116 L-4 -100 L4 -122 L9 -120 L4 -98 L18 -112 L22 -108 L12 -90 C16 -60 20 -30 24 0 Z"/>
    <circle cx="-30" cy="-112" r="9"/><circle cx="-10" cy="-120" r="8"/>
    <circle cx="8" cy="-126" r="9"/><circle cx="22" cy="-112" r="8"/>
  </g>`;
}

function scene({ name, w = 1600, h = 1000, sky, sun, layers, trees = [], extras = "" }) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" width="${w}" height="${h}">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      ${sky.map((c, i) => `<stop offset="${(i / (sky.length - 1)).toFixed(2)}" stop-color="${c}"/>`).join("")}
    </linearGradient>
    <radialGradient id="glow" cx="${sun.x / w}" cy="${sun.y / h}" r="0.45">
      <stop offset="0" stop-color="${sun.glow}" stop-opacity="0.75"/>
      <stop offset="1" stop-color="${sun.glow}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#sky)"/>
  <rect width="${w}" height="${h}" fill="url(#glow)"/>
  <circle cx="${sun.x}" cy="${sun.y}" r="${sun.r}" fill="${sun.color}"/>
  ${layers.map((l, i) => `<path d="${hill(w, h, l.base, l.amp, l.seed ?? i * 97 + 13, l.waves ?? 3)}" fill="${l.fill}"/>`).join("\n  ")}
  ${trees.join("\n  ")}
  ${extras}
</svg>`;
  writeFileSync(join(out, `${name}.svg`), svg);
}

// Hero — late afternoon over the hills
scene({
  name: "hero-landscape",
  w: 2400,
  h: 1400,
  sky: ["#2a3a3a", "#5f6b55", "#c98a4a", "#e9b46a"],
  sun: { x: 1700, y: 760, r: 70, color: "#f6d690", glow: "#f2b45e" },
  layers: [
    { base: 820, amp: 70, fill: "#7e6a52", seed: 11 },
    { base: 900, amp: 90, fill: "#5a5240", seed: 29 },
    { base: 1010, amp: 60, fill: "#3b3a2c", seed: 47 },
    { base: 1150, amp: 50, fill: "#24261d", seed: 71 },
  ],
  trees: [
    baobab(520, 1150, 2.1, "#1c1e17"),
    tree(980, 1120, 1.4, "#1f2119"),
    tree(1240, 1140, 0.9, "#22241b"),
    tree(2050, 1110, 1.6, "#1c1e17"),
  ],
});

scene({
  name: "hills-morning",
  sky: ["#cfe0d6", "#eef0e2", "#f6ead2"],
  sun: { x: 380, y: 300, r: 46, color: "#fff4d6", glow: "#ffe9b8" },
  layers: [
    { base: 560, amp: 60, fill: "#9db8a2", seed: 5 },
    { base: 650, amp: 70, fill: "#6f9a7b", seed: 17 },
    { base: 760, amp: 50, fill: "#3f7a55", seed: 33 },
    { base: 880, amp: 40, fill: "#244f36", seed: 59 },
  ],
  trees: [tree(1150, 860, 1.3, "#1c3d2a"), tree(1320, 880, 0.8, "#1c3d2a")],
});

scene({
  name: "village-dusk",
  sky: ["#3a2f3c", "#9b5a4a", "#e39a5c"],
  sun: { x: 800, y: 640, r: 60, color: "#f8c77a", glow: "#f0965a" },
  layers: [
    { base: 640, amp: 40, fill: "#6e4a3c", seed: 3 },
    { base: 760, amp: 30, fill: "#4a342b", seed: 8 },
  ],
  extras: (() => {
    // Rondavel and house silhouettes
    let s = "";
    const r = rng(42);
    for (let i = 0; i < 9; i++) {
      const x = 120 + i * 170 + r() * 40;
      const y = 820 + r() * 30;
      if (i % 2 === 0) {
        s += `<g fill="#2a1f1a"><rect x="${x - 40}" y="${y - 50}" width="80" height="50"/><path d="M${x - 52} ${y - 48} L${x} ${y - 98} L${x + 52} ${y - 48} Z"/></g>`;
      } else {
        s += `<g fill="#2a1f1a"><rect x="${x - 55}" y="${y - 55}" width="110" height="55"/><path d="M${x - 62} ${y - 52} L${x + 62} ${y - 52} L${x + 50} ${y - 74} L${x - 50} ${y - 74} Z"/></g>`;
      }
    }
    s += `<rect x="0" y="840" width="1600" height="160" fill="#2a1f1a"/>`;
    return s;
  })(),
});

scene({
  name: "fields",
  sky: ["#bcd4dc", "#e6eee6", "#f3ecd8"],
  sun: { x: 1300, y: 220, r: 50, color: "#fff5d9", glow: "#ffeebe" },
  layers: [
    { base: 520, amp: 30, fill: "#8fae8a", seed: 21 },
    { base: 600, amp: 20, fill: "#c7a86b", seed: 23, waves: 2 },
  ],
  extras: (() => {
    let s = `<rect x="0" y="620" width="1600" height="380" fill="#6b8f4e"/>`;
    for (let i = 0; i < 14; i++) {
      const y = 640 + i * i * 2.2 + i * 6;
      s += `<path d="M0 ${y} Q800 ${y - 12} 1600 ${y}" stroke="#4f7a3a" stroke-width="${2 + i * 0.9}" fill="none" opacity="0.8"/>`;
    }
    s += tree(260, 610, 0.9, "#2f4a2a") + tree(1420, 600, 0.7, "#2f4a2a");
    return s;
  })(),
});

scene({
  name: "river-valley",
  sky: ["#9fc2c9", "#d9e7e0", "#efe8d4"],
  sun: { x: 300, y: 260, r: 40, color: "#fffbe8", glow: "#fff1c7" },
  layers: [
    { base: 520, amp: 80, fill: "#88a79a", seed: 61 },
    { base: 640, amp: 60, fill: "#5f8a70", seed: 67 },
  ],
  extras: `<path d="M0 760 C300 700 520 820 800 760 S1300 700 1600 760 L1600 1000 L0 1000 Z" fill="#3d6a4d"/>
  <path d="M-20 900 C300 820 600 940 900 860 S1400 820 1620 880 L1620 930 C1400 880 1200 900 900 920 S300 900 -20 960 Z" fill="#8fbfca" opacity="0.9"/>
  ${tree(1200, 780, 1.1, "#244f36")}${baobab(260, 800, 1.2, "#1c3d2a")}`,
});

scene({
  name: "market",
  sky: ["#f1e2c4", "#f6ead2"],
  sun: { x: 1400, y: 120, r: 40, color: "#fff4d6", glow: "#ffe3a6" },
  layers: [{ base: 520, amp: 30, fill: "#d9c39a", seed: 9 }],
  extras: (() => {
    const colors = ["#b9572e", "#d4952a", "#3f7a55", "#7f361c", "#2f6444"];
    let s = `<rect x="0" y="560" width="1600" height="440" fill="#c9ad7c"/>`;
    for (let i = 0; i < 6; i++) {
      const x = 60 + i * 260;
      const c = colors[i % colors.length];
      s += `<g><rect x="${x}" y="470" width="220" height="230" fill="#efe2c6"/>`;
      for (let j = 0; j < 5; j++) {
        s += `<path d="M${x + j * 44} 430 L${x + j * 44 + 44} 430 L${x + j * 44 + 44} 490 Q${x + j * 44 + 22} 515 ${x + j * 44} 490 Z" fill="${j % 2 ? c : "#f7efe0"}"/>`;
      }
      s += `<rect x="${x + 10}" y="600" width="200" height="16" fill="#6b4a2f"/>`;
      for (let k = 0; k < 6; k++) s += `<circle cx="${x + 30 + k * 32}" cy="590" r="12" fill="${colors[(i + k) % colors.length]}"/>`;
      s += `</g>`;
    }
    return s;
  })(),
});

scene({
  name: "school-grounds",
  sky: ["#c9dbe6", "#eef2ea"],
  sun: { x: 1350, y: 200, r: 48, color: "#fffbe6", glow: "#fff2c4" },
  layers: [{ base: 560, amp: 40, fill: "#9eb79f", seed: 77 }],
  extras: `<rect x="0" y="640" width="1600" height="360" fill="#b99a6a"/>
  <g fill="#f3ead8" stroke="#7f6a4a" stroke-width="4">
    <rect x="300" y="430" width="1000" height="220"/>
  </g>
  <path d="M270 440 L800 330 L1330 440 Z" fill="#9d4524"/>
  ${Array.from({ length: 8 }, (_, i) => `<rect x="${350 + i * 120}" y="480" width="70" height="70" fill="#8fbfca" stroke="#7f6a4a" stroke-width="4"/>`).join("")}
  <rect x="760" y="560" width="80" height="90" fill="#244f36"/>
  <line x1="1450" y1="650" x2="1450" y2="380" stroke="#3b3833" stroke-width="8"/>
  <rect x="1454" y="384" width="90" height="56" fill="#d4952a"/>
  ${tree(160, 660, 1.2, "#2f6444")}`,
});

scene({
  name: "gathering",
  sky: ["#ead9bf", "#f5ebd9"],
  sun: { x: 800, y: 300, r: 0, color: "transparent", glow: "#f2c27a" },
  layers: [{ base: 600, amp: 20, fill: "#d8bf94", seed: 4 }],
  extras: (() => {
    // Abstract circle of figures under a large tree
    let s = tree(800, 640, 3.6, "#2f4a2a");
    s += `<rect x="0" y="640" width="1600" height="360" fill="#c4a476"/>`;
    const colors = ["#b9572e", "#d4952a", "#244f36", "#7f361c", "#3f7a55", "#282622"];
    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * Math.PI * 2;
      const x = 800 + Math.cos(a) * 420;
      const y = 800 + Math.sin(a) * 110;
      const c = colors[i % colors.length];
      s += `<g fill="${c}"><circle cx="${x.toFixed(0)}" cy="${(y - 70).toFixed(0)}" r="18"/><path d="M${(x - 26).toFixed(0)} ${y.toFixed(0)} Q${x.toFixed(0)} ${(y - 70).toFixed(0)} ${(x + 26).toFixed(0)} ${y.toFixed(0)} Z"/></g>`;
    }
    return s;
  })(),
});

scene({
  name: "sports-field",
  sky: ["#bcd6e4", "#eaf1ea"],
  sun: { x: 260, y: 200, r: 44, color: "#fffbe6", glow: "#fff1c7" },
  layers: [{ base: 560, amp: 30, fill: "#99b59a", seed: 88 }],
  extras: `<rect x="0" y="600" width="1600" height="400" fill="#5f8f4e"/>
  <g stroke="#e9f0e2" stroke-width="6" fill="none" opacity="0.9">
    <rect x="200" y="660" width="1200" height="300"/>
    <line x1="800" y1="660" x2="800" y2="960"/>
    <ellipse cx="800" cy="810" rx="110" ry="60"/>
  </g>
  <g stroke="#f6f6f0" stroke-width="8" fill="none"><path d="M200 760 L150 760 L150 860 L200 860"/><path d="M1400 760 L1450 760 L1450 860 L1400 860"/></g>
  <circle cx="860" cy="830" r="14" fill="#f6f6f0"/>`,
});

// Open Graph image
writeFileSync(
  join(out, "og-default.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <rect width="1200" height="630" fill="#1c3d2a"/>
  <path d="${hill(1200, 630, 470, 50, 7)}" fill="#244f36"/>
  <path d="${hill(1200, 630, 540, 40, 19)}" fill="#142c1f"/>
  <circle cx="960" cy="200" r="70" fill="#e5ad3c"/>
  <text x="80" y="260" font-family="Georgia, serif" font-size="110" fill="#fbf8f2" font-weight="600">Mhinga</text>
  <text x="84" y="330" font-family="Arial, sans-serif" font-size="34" fill="#ebe1cd">Our Home. Our Community. Our Future.</text>
</svg>`,
);

// Contour pattern
{
  let paths = "";
  for (let i = 0; i < 14; i++) {
    paths += `<path d="${hill(900, 900, 60 + i * 64, 22 + (i % 4) * 6, 100 + i * 7, 2)
      .replace(/^M0 900 L0 /, "M0 ")
      .replace(/ L900 [\d.]+ L900 900 Z$/, "")}" fill="none" stroke="currentColor"/>`;
  }
  writeFileSync(
    join(out, "contours.svg"),
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 900" width="900" height="900"><g stroke="#3b3833" stroke-opacity="0.07" stroke-width="1.2" fill="none" color="#3b3833">${paths}</g></svg>`,
  );
}

console.log("Placeholders written to", out);
