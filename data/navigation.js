// 헤더 · 메뉴 · 푸터 링크
export const mainMenu = [
  { label: 'Shop', href: '/shop' },
  { label: 'Rituals', href: '/skin-finder' },
  { label: 'Ingredients', href: '/about#ingredients' },
  { label: 'Journal', href: '/journal' },
];

export const mobileMenu = [...mainMenu, { label: 'Our story', href: '/about' }];

export const menuChips = [
  { label: 'Cleanse', href: '/shop?category=cleanse' },
  { label: 'Tone', href: '/shop?category=tone' },
  { label: 'Treat', href: '/shop?category=treat' },
  { label: 'Moisturize', href: '/shop?category=moisturize' },
  { label: 'Sets', href: '/shop/the-ritual-set' },
];

export const footerLinks = [
  {
    title: 'Shop',
    links: [
      { label: '전체 상품', href: '/shop' },
      { label: '베스트', href: '/shop/cica-calming-toner' },
      { label: '루틴 세트', href: '/shop/the-ritual-set' },
      { label: '기프트', href: '/shop/the-ritual-set', desktopOnly: true },
    ],
  },
  {
    title: 'Dewfield',
    links: [
      { label: '브랜드 스토리', href: '/about' },
      { label: '성분 사전', href: '/about#ingredients' },
      { label: '저널', href: '/journal' },
      { label: '매장 안내', href: '/about', desktopOnly: true },
    ],
  },
  {
    title: 'Care',
    links: [
      { label: '자주 묻는 질문', mobileLabel: 'FAQ', href: '#' },
      { label: '1:1 문의', href: '#' },
      { label: '배송 안내', mobileLabel: '배송 · 반품', href: '#' },
      { label: '교환 · 반품', href: '#', desktopOnly: true },
    ],
  },
];

// 히어로 이미지 위에 투명한 헤더가 겹치는 페이지
export const overlayNavRoutes = ['/'];
