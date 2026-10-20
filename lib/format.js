// ₩23,800 형식
export const won = (value) => `${value < 0 ? '−' : ''}₩${Math.abs(value).toLocaleString('ko-KR')}`;

export const number = (value) => value.toLocaleString('ko-KR');

// 01, 02 …
export const pad = (n) => String(n).padStart(2, '0');

export const cx = (...classes) => classes.filter(Boolean).join(' ');
