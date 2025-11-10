export function toMutableText(t: string | ReadonlyArray<string>): string | string[] {
  return Array.isArray(t) ? [...t] : t;
}