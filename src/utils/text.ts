// src/utils/text.ts

export type TextLike = string | ReadonlyArray<string>;

/** 
 * Pages에서 IntroBlock 등에 넘길 때, readonly 배열을 가변 배열(string[])로 정규화.
 * string은 그대로, 배열은 [...t]로 복사해 반환합니다.
 */


export function toMutableText(t: string | readonly string[]): string | string[] {
  if (typeof t === 'string') {
    return t;
  }
  return [...t];
}