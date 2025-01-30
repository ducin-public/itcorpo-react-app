export function generateLightHexColor(): string {
  const min = 100; // Minimum brightness value
  const max = 220; // Maximum value to keep colors not too bright
  
  const r = Math.floor(Math.random() * (max - min) + min);
  const g = Math.floor(Math.random() * (max - min) + min);
  const b = Math.floor(Math.random() * (max - min) + min);
  
  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
}
