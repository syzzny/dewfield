// 마이페이지 예시 데이터 — 실제 서비스에서는 API 응답으로 바뀌는 자리예요.
export const member = {
  name: '김윤서',
  level: 'Dew',
  joined: '2026.04',
  stats: [
    { value: 'Dew', label: '회원 등급' },
    { value: '2', label: '사용 가능 쿠폰' },
    { value: '3,420P', label: '적립금' },
    { value: '5', label: '작성한 리뷰' },
  ],
};

export const accountMenu = [
  { id: 'orders', label: '주문 · 배송' },
  { id: 'profile', label: '내 피부 프로필' },
  { id: 'benefits', label: '쿠폰 · 적립금' },
  { id: 'reviews', label: '리뷰' },
  { id: 'subscription', label: '정기 배송' },
  { id: 'info', label: '회원 정보' },
];

export const orderStatus = [
  { label: '입금 대기', count: 0 },
  { label: '배송 준비', count: 1, active: true },
  { label: '배송 중', count: 0 },
  { label: '배송 완료', count: 4 },
  { label: '교환 · 반품', count: 0 },
];

export const orders = [
  {
    date: '2026.10.20',
    no: 'DF-261020-0417',
    title: '시카 카밍 토너 외 2건',
    total: 65600,
    status: '배송 준비 중',
    accent: true,
    action: '배송 조회',
    items: ['cica-calming-toner', 'barrier-serum', 'moisture-cream'],
  },
  {
    date: '2026.09.02',
    no: 'DF-260902-1188',
    title: '마일드 젤 클렌저',
    total: 18000,
    status: '배송 완료',
    action: '리뷰 쓰기',
    items: ['mild-gel-cleanser'],
  },
  {
    date: '2026.07.15',
    no: 'DF-260715-0352',
    title: '시카 카밍 토너 400 ml',
    total: 39800,
    status: '배송 완료',
    action: '다시 구매',
    items: ['cica-calming-toner'],
  },
];

export const coupons = [
  { title: '첫 구매 20% 할인', until: '2026.12.31까지', note: '전 상품' },
  { title: '리뷰 감사 ₩3,000', until: '2026.11.30까지', note: '₩30,000 이상 구매 시' },
];

// 피부 진단을 한 적 없을 때 보여줄 기본 프로필
export const defaultProfile = {
  updated: '2026.10.19',
  title: 'Sensitive,\nthirsty skin.',
  italic: 'thirsty skin.',
  tags: ['붉은기', '속건조', '예민함'],
  metrics: [
    { label: '민감도', value: 80, prev: 88 },
    { label: '수분', value: 30, prev: 42 },
    { label: '유분', value: 45, prev: 40 },
    { label: '장벽', value: 35, prev: 50 },
  ],
  note: '4월 진단 대비 · 민감도가 8 낮아졌어요',
};
