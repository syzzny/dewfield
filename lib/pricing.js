// 주문 금액 계산 — 장바구니와 결제 화면이 같은 규칙을 써요.
export const FREE_SHIPPING = 30000;
export const SHIPPING_FEE = 3000;
export const GIFT_WRAP = 3000;
export const FIRST_ORDER_RATE = 0.2;
export const POINT_RATE = 0.03;

export const ROUTINE = ['mild-gel-cleanser', 'cica-calming-toner', 'barrier-serum', 'moisture-cream'];
// 루틴 4종 기본 용량 합계
const ROUTINE_PRICE = 100000;
export const ROUTINE_DISCOUNT = ROUTINE_PRICE * 0.18;

export function computeTotals(lines, { coupon = true, gift = false } = {}) {
  const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0);
  // 단품 4종을 모두 담으면 루틴 구성 할인 18% (₩100,000 → ₩82,000)
  const hasRoutine = ROUTINE.every((slug) => lines.some((l) => l.slug === slug));
  const routineDiscount = hasRoutine ? Math.round(ROUTINE_PRICE * 0.18) : 0;
  const couponDiscount = coupon ? Math.round((subtotal - routineDiscount) * FIRST_ORDER_RATE) : 0;
  const giftFee = gift ? GIFT_WRAP : 0;
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING ? 0 : SHIPPING_FEE;
  const total = subtotal - routineDiscount - couponDiscount + giftFee + shipping;
  return {
    subtotal,
    routineDiscount,
    couponDiscount,
    giftFee,
    shipping,
    total,
    points: Math.round(total * POINT_RATE),
    toFreeShipping: Math.max(0, FREE_SHIPPING - subtotal),
  };
}
