// 마지막 주문을 세션에 저장해 주문 완료 화면에서 보여줘요. (실제 결제 연동 대신)
const KEY = 'dewfield-last-order';

export const saveOrder = (order) => {
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(order));
  } catch {
    /* noop */
  }
};

export const loadOrder = () => {
  try {
    const raw = window.sessionStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const makeOrderNo = (date = new Date()) => {
  const yymmdd = date.toISOString().slice(2, 10).replace(/-/g, '');
  return `DF-${yymmdd}-${String(Math.floor(1000 + Math.random() * 9000))}`;
};

// 오늘 15시 전 주문이면 다음 날 도착
export const arrivalDate = (date = new Date()) => {
  const d = new Date(date);
  d.setDate(d.getDate() + (d.getHours() < 15 ? 1 : 2));
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return `${d.getMonth() + 1}월 ${d.getDate()}일 (${days[d.getDay()]})`;
};
