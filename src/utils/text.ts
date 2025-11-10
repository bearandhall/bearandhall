// src/utils/text.ts
export function toMutableText(
  t: string | ReadonlyArray<string>
): string | string[] {
  return Array.isArray(t) ? ([...t] as string[]) : t;
}
