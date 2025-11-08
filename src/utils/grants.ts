// 공통 함수: src/utils/grants.ts
export const hasGrant = (key:string) => {
  const s = localStorage.getItem('gho:grants');
  if (!s) return false;
  try { return new Set(JSON.parse(s)).has(key); } catch { return false; }
};
