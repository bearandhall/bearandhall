// src/utils/text.ts
// IntroBlock에 배열을 넘길 일이 있으면, readonly → 가변 배열로 바꿔 전달할 때 사용
export function toMutableText(
  t: string | ReadonlyArray<string>
): string | string[] {
  return Array.isArray(t) ? ([...t] as string[]) : t;
}
