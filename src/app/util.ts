export function msToTime(ms: number): string {
  const d = Math.floor(ms / (1000 * 60 * 60 * 24));
  const h = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const m = Math.floor((ms / (1000 * 60)) % 60);

  // To get time format 00:00:00
  const days: string = d == 1 ? `${d} day ` : d > 1 ? `${d} days ` : ``;
  const hours: string = h > 0 ? `${h}h ` : ``;
  const minutes: string = m > 0 ? `${m}m` : ``;

  return `${days}${hours}${minutes}`;
}