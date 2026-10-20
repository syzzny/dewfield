import { images } from './images';

// =============================================================
// 저널 데이터
// body는 블록 배열이라 글마다 구성을 자유롭게 바꿀 수 있어요.
// block type: lead | text | quote | images | steps | product
// =============================================================

export const JOURNAL_CATEGORIES = ['All', 'Ritual', 'Ingredient', 'Field', 'Interview'];

export const stories = [
  {
    slug: 'night-ten-oclock',
    category: 'Ritual',
    date: '2026.10.20',
    readTime: '6 min read',
    title: 'Night ten o’clock,\nwhen skin rests.',
    italic: 'when skin rests.',
    korean: '피부가 쉬는 시간, 밤 10시의 루틴',
    subtitle: '피부가 스스로 회복하는 밤, 잠들기 전 10분의 루틴',
    excerpt:
      '피부가 스스로 회복하는 밤 시간. 잠들기 전 10분, 두 번의 토닝과 한 겹의 크림으로 충분한 이유를 이야기해요.',
    image: images.skin,
    featured: true,
    credits: ['Words — Dewfield editors', 'Photo — Field studio'],
    body: [
      {
        type: 'lead',
        text: '피부는 밤 10시부터 새벽 2시 사이에 가장 활발하게 스스로를 회복해요. 이 시간에 필요한 건 더 많은 단계가 아니라, 회복을 방해하지 않는 최소한의 보호예요.',
      },
      {
        type: 'text',
        text: '하루 동안 쌓인 자극을 부드럽게 씻어내고, 손바닥에 덜어낸 토너를 두 번 겹쳐 눌러 담아요. 문지르는 대신 누르는 것만으로도 마찰로 인한 붉은기를 크게 줄일 수 있어요. 마지막으로 크림 한 겹을 얇게 덮으면, 밤사이 수분이 빠져나가는 길을 막아줘요.',
      },
      {
        type: 'quote',
        text: '“The less you do at night,\nthe more your skin can.”',
        translation: '밤에 덜 할수록, 피부는 더 많은 걸 해내요',
      },
      {
        type: 'images',
        items: [images.stones, images.swatch],
        caption: 'Fig. 02 — 두 번의 토닝, 그리고 손바닥의 온기',
      },
      {
        type: 'text',
        text: '세 단계만 지켜도 충분해요. 클렌저, 토너, 크림. 세럼은 피부가 유난히 건조한 날에만 더하면 돼요.',
      },
      {
        type: 'steps',
        items: [
          { en: 'Cleanse', text: '미온수로 30초, 약산성 젤 클렌저' },
          { en: 'Tone', text: '손바닥으로 두 번, 눌러서 흡수' },
          { en: 'Seal', text: '크림 한 겹, 얇게 덮기' },
        ],
      },
      { type: 'product', slug: 'cica-calming-toner' },
    ],
  },
  {
    slug: 'why-ph-5-5-matters',
    category: 'Ingredient',
    date: '2026.10.14',
    readTime: '4 min read',
    title: 'Why pH 5.5 matters',
    italic: '5.5 matters',
    korean: 'pH 5.5가 중요한 이유',
    image: images.swatch,
    body: [
      {
        type: 'lead',
        text: '건강한 피부 표면은 pH 4.5–5.5의 약산성이에요. 이 얇은 산성막이 유익한 균을 지키고, 장벽의 지질이 제자리에 머물게 해요.',
      },
      {
        type: 'text',
        text: '일반 폼 클렌저는 pH 9–10의 알칼리성이라 세안 직후 피부를 크게 기울여요. 피부가 원래의 pH로 돌아오기까지 몇 시간이 걸리고, 그 사이 당김과 붉은기가 생기기 쉬워요. 듀필드의 모든 제품을 pH 5.5에 맞춘 이유예요.',
      },
      { type: 'quote', text: '“Rinse, don’t strip.”', translation: '씻어내되, 벗겨내지 않기' },
      { type: 'product', slug: 'mild-gel-cleanser' },
    ],
  },
  {
    slug: 'the-oldest-calm',
    category: 'Ingredient',
    date: '2026.10.08',
    readTime: '5 min read',
    title: 'The oldest calm',
    italic: 'calm',
    korean: '병풀, 가장 오래된 진정 성분',
    image: images.centella,
    body: [
      {
        type: 'lead',
        text: '병풀(센텔라 아시아티카)은 수천 년 동안 상처를 달래는 데 쓰여 온 풀이에요. 듀필드는 이 오래된 진정을 정제수 대신 토너의 바탕으로 삼았어요.',
      },
      {
        type: 'text',
        text: '제주 유기농 밭에서 수확한 병풀을 14일 동안 저온 숙성해 추출해요. 열을 가하지 않아 마데카소사이드와 아시아티코사이드가 온전히 남아요.',
      },
      { type: 'product', slug: 'cica-calming-toner' },
    ],
  },
  {
    slug: 'a-morning-in-jeju',
    category: 'Field',
    date: '2026.09.30',
    readTime: '7 min read',
    title: 'A morning in Jeju',
    italic: 'in Jeju',
    korean: '제주 병풀 밭의 아침',
    image: images.hills,
    body: [
      {
        type: 'lead',
        text: '해가 뜨기 전, 이슬이 마르기 전에 병풀을 거둬요. 가장 수분이 많은 시간이기 때문이에요.',
      },
      {
        type: 'text',
        text: '농장의 하루는 느리게 흘러가요. 땅을 쉬게 하는 휴경기를 두고, 화학 비료 대신 녹비 작물을 길러요. 덜어내는 방식은 밭에서부터 시작돼요.',
      },
      { type: 'images', items: [images.hills, images.leaf], caption: 'Fig. 01 — 제주 서쪽, 이른 아침의 병풀 밭' },
    ],
  },
  {
    slug: 'notes-from-a-sensitive-cheek',
    category: 'Interview',
    date: '2026.09.22',
    readTime: '8 min read',
    title: 'Notes from a sensitive cheek',
    italic: 'sensitive cheek',
    korean: '민감 피부 10년, 창업자 인터뷰',
    image: images.portrait,
    body: [
      {
        type: 'lead',
        text: '“붉은기가 올라오는 날이면 아무것도 바르고 싶지 않았어요.” 듀필드는 그 마음에서 시작됐어요.',
      },
      {
        type: 'text',
        text: '10년 동안 민감 피부로 살며 깨달은 건, 좋은 성분을 더하는 것보다 자극이 될 수 있는 것을 빼는 게 먼저라는 사실이었어요. 전 성분 23가지, 그 숫자가 듀필드의 태도예요.',
      },
      { type: 'quote', text: '“Less, but kinder.”', translation: '덜어내되, 더 다정하게' },
    ],
  },
  {
    slug: 'press-not-rub',
    category: 'Ritual',
    date: '2026.09.15',
    readTime: '3 min read',
    title: 'Press, not rub',
    italic: 'not rub',
    korean: '문지르지 말고, 눌러 담기',
    image: images.stones,
    body: [
      {
        type: 'lead',
        text: '토너를 바를 때 손바닥으로 가볍게 누르는 것만으로도 마찰로 인한 붉은기를 줄일 수 있어요.',
      },
      {
        type: 'steps',
        items: [
          { en: 'Prep', text: '세안 후 물기를 가볍게 정돈' },
          { en: 'Wipe', text: '화장솜으로 결을 따라 닦아내기' },
          { en: 'Press', text: '손바닥으로 두 번 겹쳐 눌러 담기' },
        ],
      },
      { type: 'product', slug: 'cica-calming-toner' },
    ],
  },
  {
    slug: 'less-packaging-too',
    category: 'Field',
    date: '2026.09.04',
    readTime: '4 min read',
    title: 'Less packaging, too',
    italic: 'too',
    korean: '패키지에 담은 덜어냄의 철학',
    image: images.packshot,
    body: [
      {
        type: 'lead',
        text: '듀필드의 용기는 단일 소재 유리와 재생 플라스틱으로 만들어요. 상자는 한 장의 종이를 접어 완성해요.',
      },
      {
        type: 'text',
        text: '크림은 리필 파우치로 다시 채울 수 있어요. 용기를 오래 쓰는 만큼 버려지는 것도 줄어들어요.',
      },
      { type: 'product', slug: 'moisture-cream' },
    ],
  },
];

export const getStory = (slug) => stories.find((s) => s.slug === slug);
export const featuredStory = stories.find((s) => s.featured);
export const getRelatedStories = (slug, limit = 3) => stories.filter((s) => s.slug !== slug).slice(0, limit);

// 홈 저널 스트립에 보여줄 4개
export const homeStories = ['night-ten-oclock', 'why-ph-5-5-matters', 'the-oldest-calm', 'less-packaging-too'].map(
  getStory,
);

export const searchStories = (q) => {
  const k = q.trim().toLowerCase();
  if (!k) return [];
  return stories.filter((s) =>
    [s.title, s.korean, s.excerpt ?? '', ...s.body.map((b) => b.text ?? '')].join(' ').toLowerCase().includes(k),
  );
};
