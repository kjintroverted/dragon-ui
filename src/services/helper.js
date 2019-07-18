export function calculateModifier(x) {
  const y = Math.floor((x - 10) / 2);
  return y < 0 ? `${y}` : `+${y}`;
}
