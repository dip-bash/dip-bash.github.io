// Automatic, stable icon color per name — no manual color needed for new items.
const HUES = [150, 280, 195, 45, 350, 235, 175, 25, 320, 95];

export const hashString = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
};

export const iconColor = (name: string) => {
  const hue = HUES[hashString(name) % HUES.length];
  return {
    color: `oklch(0.75 0.16 ${hue})`,
    soft: `oklch(0.75 0.16 ${hue} / 0.12)`,
    border: `oklch(0.75 0.16 ${hue} / 0.35)`,
  };
};
