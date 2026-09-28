export function getRandomItems(arr, count = arr.length) {
  if (!Array.isArray(arr) || arr.length === 0) return [];
  if (typeof count !== "number" || Number.isNaN(count)) return [];

  const n = Math.max(0, Math.min(Math.floor(count), arr.length));
  if (n === 0) return [];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr.splice(arr.length - n, n);
}
