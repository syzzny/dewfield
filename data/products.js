import { images } from './images';

// =============================================================
// 상품 데이터
// - 상세페이지는 이 데이터만 보고 그려져요.
// - sections: 상품마다 다른 배너 구성. type은 components/pdp/banners/index.js에 등록된 이름이에요.
//   배너 순서를 바꾸거나 다른 상품의 배너를 재사용하려면 여기 배열만 수정하면 돼요.
// =============================================================

export const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'cleanse', label: 'Cleanse' },
  { id: 'tone', label: 'Tone' },
  { id: 'treat', label: 'Treat' },
  { id: 'moisturize', label: 'Moisturize' },
];

// 쇼핑 페이지 탭에는 세트까지 보여줘요.
export const SHOP_CATEGORIES = [...CATEGORIES, { id: 'set', label: 'Sets' }];

// 피부 고민 필터
export const CONCERNS = [
  { id: 'redness', label: '붉은기 · 홍조' },
  { id: 'dryness', label: '속건조' },
  { id: 'trouble', label: '트러블' },
  { id: 'sensitive', label: '예민함' },
  { id: 'barrier', label: '장벽 손상' },
];

export const SORTS = [
  { id: 'recommended', label: '추천순' },
  { id: 'price-asc', label: '낮은 가격순' },
  { id: 'price-desc', label: '높은 가격순' },
  { id: 'reviews', label: '리뷰 많은순' },
];

const sharedReviewFacts = [
  { value: '71%', label: '재구매율' },
  { value: '82%', label: '진정 효과 만족' },
  { value: '76%', label: '저자극 만족' },
];

export const products = [
  // ------------------------------------------------------------ 01 TONER
  {
    slug: 'cica-calming-toner',
    listBadge: 'Best seller',
    concerns: ['redness', 'sensitive', 'trouble'],
    no: '01',
    tag: 'No. 01',
    name: 'Cica Calming Toner',
    shortName: 'Calming Toner',
    title: 'Cica Calming\nToner',
    titleItalic: 'Toner',
    korean: '시카 카밍 토너',
    tagline: '병풀 72% 진정 워터 토너',
    category: 'tone',
    categoryKo: '토너',
    code: 'Calming Toner',
    size: '200 ml',
    badge: 'Best seller',
    description:
      '병풀 추출물 72%를 담은 워터 토너. 달아오른 피부를 조용히 가라앉히고, 무너진 결을 차분하게 정돈합니다.',
    rating: 4.9,
    reviewCount: 2184,
    price: 23800,
    originalPrice: 28000,
    options: [
      { label: '200 ml', price: 23800 },
      { label: '400 ml', note: '대용량', price: 39800 },
      { label: '200 ml × 2', note: '세트', price: 42800 },
    ],
    image: images.toner,
    gallery: [images.toner, images.swatch, images.tonerTexture, images.centella, images.packshot],
    ritualStep: { step: 'Tone', text: '두 번 겹쳐 발라 열감을 내리고 결을 정돈해요.' },
    sections: [
      {
        type: 'heroBanner',
        label: '(No. 01)  Calm in a drop',
        aside: 'Centella 72%',
        line1: 'Calm in',
        line2: 'a drop.',
        lead: '달아오른 피부 위에\n한 방울의 고요를',
        body: '정제수 대신 병풀 추출물을 72% 담았어요.\n물처럼 가볍게, 진정은 깊게.',
        image: images.leaf,
      },
      {
        type: 'textureIngredients',
        index: 'Texture & ingredients',
        title: 'Water,\nbut kinder.',
        italic: 'but kinder.',
        body: '물처럼 투명하고 가볍게. 끈적임 없이\n한 번에 스며드는 pH 5.5 약산성 워터 제형.',
        image: images.swatch,
        callouts: [
          { title: 'pH 5.5', text: '약산성 워터 제형' },
          { title: 'Fragrance free', text: '무향 · 무색소' },
        ],
        ingredients: [
          {
            value: '72%',
            name: '병풀 추출물',
            en: 'Centella',
            text: '정제수 대신 담아 붉은기와 열감을 빠르게 진정해요.',
          },
          {
            value: '×5',
            name: '5중 히알루론산',
            en: 'Hyaluronic',
            text: '크기가 다른 다섯 가지 분자가 겉과 속을 채워요.',
          },
          { value: '2%', name: '판테놀', en: 'Panthenol', text: '예민해진 장벽을 진정시키고 회복을 도와요.' },
          { value: '10%', name: '녹차 추출물', en: 'Green tea', text: '카테킨이 외부 자극으로부터 피부를 지켜요.' },
        ],
      },
      {
        type: 'bigNumber',
        number: '72',
        unit: '%',
        label: '(Ingredient story)  Centella asiatica',
        aside: 'Replaces water — not added to it',
        title: '정제수 자리에\n병풀을 채웠어요',
        body: '대부분의 토너는 물이 80% 이상이에요. 듀필드는 그 자리를\n병풀 추출물로 채워, 바르는 순간부터 진정이 시작돼요.',
        facts: [
          { value: '72%', label: '병풀 추출물' },
          { value: '14d', label: '저온 숙성' },
          { value: 'Jeju', label: '제주 유기농 원료' },
        ],
        image: images.centellaField,
      },
      {
        type: 'howToUse',
        index: 'How to use',
        title: '닦아내고, 두 번 겹쳐\n눌러 담아요',
        imageCaption: 'Press,\nnot rub.',
        image: images.skin,
        steps: [
          { en: 'Prep', ko: '세안 후 물기 정돈', text: '미온수로 세안한 뒤 수건으로 가볍게 눌러 물기를 정리해요.' },
          { en: 'Wipe', ko: '결 따라 닦아내기', text: '화장솜에 충분히 적셔 안쪽에서 바깥쪽으로 부드럽게 쓸어내요.' },
          {
            en: 'Press',
            ko: '손바닥으로 두 번',
            text: '손바닥에 덜어 두 번 겹쳐 바르고, 손의 온기로 눌러 흡수시켜요.',
          },
        ],
        tip: '열감이 올라온 날엔 화장솜에 적셔 3분간 올려두세요.',
      },
      {
        type: 'hydrationChart',
        label: '(Clinical)  48-hour hydration',
        title: '48 hours,\nstill calm.',
        italic: 'still calm.',
        body: '바른 직후부터 48시간 동안 피부 수분량을 측정했어요.\n일반 워터 토너보다 천천히, 오래 머물러요.',
        hours: [0, 1, 6, 12, 24, 48],
        series: { product: [95, 93, 86, 80, 71, 62], standard: [90, 78, 58, 42, 26, 15] },
        callouts: [
          { index: 2, value: '86', text: '6시간 후 수분 지수' },
          { index: 5, value: '62', text: '48시간 후에도' },
        ],
        legend: ['시카 카밍 토너', '일반 워터 토너 (비교군)'],
        note: '* 자사 인체적용시험, n=32, 2026.05',
      },
      {
        type: 'results',
        index: 'The results',
        title: 'Four weeks,\nquieter skin.',
        italic: 'quieter skin.',
        image: images.packshot,
        stats: [
          { value: '−41%', text: '사용 직후 붉은기가\n눈에 띄게 줄었어요' },
          { value: '+58%', text: '30분 후에도 피부 수분량이\n그대로 유지됐어요' },
          { value: '98%', text: '저자극 패치 테스트를\n통과했어요' },
        ],
        note: '* 자사 인체적용시험 결과 (n=32, 2026.05), 개인차가 있을 수 있습니다.',
      },
    ],
    reviews: {
      quote: '“달아오른 볼이 몇 분 만에 가라앉아요.\n순한데 확실한, 이런 토너를 오래 찾았어요.”',
      author: '정*희 — 민감성 피부, 30대',
      facts: sharedReviewFacts,
      items: [
        {
          title: '순한데 촉촉함이 오래가요',
          body: '향이 없어서 예민한 날에도 부담 없고, 두 번 레이어링하면 미스트가 필요 없어요.',
          author: '한*솔 — 복합성, 20대',
        },
        {
          title: '트러블 진정이 빨라요',
          body: '토너 팩으로 쓰면 다음 날 붉은기가 확실히 덜해요. 벌써 세 번째 구매예요.',
          author: '윤*민 — 지성, 30대',
        },
        {
          title: '결이 차분해졌어요',
          body: '아침에 닦아내고 나면 메이크업이 들뜨지 않고 하루 종일 편안해요.',
          author: '김*연 — 민감성, 30대',
        },
      ],
    },
  },

  // ------------------------------------------------------------ 02 CLEANSER
  {
    slug: 'mild-gel-cleanser',
    concerns: ['sensitive', 'trouble'],
    no: '02',
    tag: 'No. 02',
    name: 'Mild Gel Cleanser',
    shortName: 'Gel Cleanser',
    title: 'Mild Gel\nCleanser',
    titleItalic: 'Cleanser',
    korean: '마일드 젤 클렌저',
    tagline: 'pH 5.5 약산성 젤 클렌저',
    category: 'cleanse',
    categoryKo: '클렌저',
    code: 'Gel Cleanser',
    size: '150 ml',
    badge: 'Low pH',
    description: 'pH 5.5 약산성 젤 클렌저. 노폐물만 부드럽게 씻어내고, 피부에 필요한 유분과 장벽은 그대로 남겨둡니다.',
    rating: 4.8,
    reviewCount: 874,
    price: 18000,
    originalPrice: 20000,
    options: [
      { label: '150 ml', price: 18000 },
      { label: '300 ml', note: '대용량', price: 29800 },
      { label: '150 ml × 2', note: '세트', price: 32400 },
    ],
    image: images.cleanser,
    gallery: [images.cleanser, images.foam, images.hyaluronic, images.centella, images.swatch],
    ritualStep: { step: 'Cleanse', text: '약산성 젤로 노폐물만 부드럽게 씻어내요.' },
    sections: [
      {
        type: 'phScale',
        label: '(No. 02)  Rinse, don’t strip',
        aside: 'pH balance',
        title: 'Rinse,\ndon’t strip.',
        italic: 'don’t strip.',
        body: '건강한 피부의 pH는 4.5–5.5 약산성이에요.\n일반 폼 클렌저(pH 9–10)는 세안 후 피부를 알칼리로 기울여\n장벽이 다시 회복될 때까지 당김과 붉은기를 남겨요.',
        markers: [
          { ph: 5, mobilePh: 4.2, title: 'Skin 4.5–5.5', text: '건강한 피부', position: 'below' },
          { ph: 5.5, mobilePh: 6.1, title: 'Dewfield 5.5', text: '마일드 젤 클렌저', highlight: true },
          { ph: 9.5, mobilePh: 9.3, title: 'Foam 9–10', text: '일반 폼 클렌저' },
          { ph: 10.5, mobilePh: 11.5, title: 'Soap 10+', text: '고체 비누', position: 'below' },
        ],
        zone: [4.5, 5.5],
      },
      {
        type: 'timerDial',
        label: '(No. 02)  The 30-second rule',
        seconds: 30,
        caption: 'Gentle massage',
        marks: [
          { at: 0, title: '0″', text: '물에 적시기' },
          { at: 10, title: '10″', text: '손바닥에서 거품 내기' },
          { at: 30, title: '30″', text: '미온수로 헹구기' },
        ],
        title: 'Thirty seconds,\nno longer.',
        italic: 'no longer.',
        body: '오래 문지를수록 깨끗해지는 게 아니에요.\n30초면 노폐물은 충분히 녹아 나오고,\n그 이상은 장벽을 지키는 유분까지 씻어내요.',
        facts: [
          { value: '−32%', label: '세안 후 당김 감소' },
          { value: '0', label: '설페이트 계면활성제' },
        ],
      },
      {
        type: 'textureStates',
        label: '(Texture)  One pump, three states',
        title: 'From gel, to cloud.',
        italic: 'to cloud.',
        image: images.foam,
        states: [
          { en: 'Gel', ko: '투명한 젤 한 펌프', text: '물 없이 손바닥에 덜어 온도를 맞춰요.' },
          { en: 'Lather', ko: '쫀쫀한 미세 거품', text: '물을 조금씩 더하면 크림 같은 거품이 돼요.' },
          { en: 'Rinse', ko: '미끄러짐 없이 깔끔하게', text: '헹군 뒤 당김도, 잔여감도 남지 않아요.' },
        ],
      },
    ],
    reviews: {
      quote: '“세안 후에 당기지 않는 클렌저는 처음이에요.\n순한데 메이크업까지 깔끔하게 지워져요.”',
      author: '정*희 — 민감성 피부, 30대',
      facts: [
        { value: '68%', label: '재구매율' },
        { value: '88%', label: '당김 없음 만족' },
        { value: '79%', label: '저자극 만족' },
      ],
      items: [
        {
          title: '거품이 정말 부드러워요',
          body: '손에서 거품을 내면 크림처럼 쫀쫀해져요. 헹굼도 빨라요.',
          author: '한*솔 — 복합성, 20대',
        },
        {
          title: '아침 세안용으로 딱이에요',
          body: '물세안만 하던 민감 피부인데, 이건 아침에 써도 편안해요.',
          author: '윤*민 — 지성, 30대',
        },
        {
          title: '세 통째 재구매',
          body: '한 통으로 두 달 가까이 써요. 펌프형이라 위생적이에요.',
          author: '김*연 — 민감성, 30대',
        },
      ],
    },
  },

  // ------------------------------------------------------------ 03 SERUM
  {
    slug: 'barrier-serum',
    listBadge: 'New',
    concerns: ['dryness', 'barrier', 'sensitive'],
    no: '03',
    tag: 'No. 03',
    name: 'Barrier Serum',
    shortName: 'Barrier Serum',
    title: 'Barrier\nSerum',
    titleItalic: 'Serum',
    korean: '세라마이드 배리어 세럼',
    tagline: '세라마이드 3중 장벽 세럼',
    category: 'treat',
    categoryKo: '세럼',
    code: 'Barrier Serum',
    size: '50 ml',
    badge: 'New',
    description:
      '피부 지질과 닮은 세라마이드 3중 복합체가 무너진 장벽의 틈을 채우고, 수분이 빠져나가지 않도록 붙잡아요.',
    rating: 4.8,
    reviewCount: 1532,
    price: 31200,
    originalPrice: 39000,
    options: [
      { label: '50 ml', price: 31200 },
      { label: '100 ml', note: '대용량', price: 52000 },
      { label: '50 ml × 2', note: '세트', price: 56200 },
    ],
    image: images.serum,
    gallery: [images.serum, images.drop, images.ceramide, images.hyaluronic, images.centella],
    ritualStep: { step: 'Treat', text: '장벽의 틈을 채워 수분이 빠져나가지 않게 해요.' },
    sections: [
      {
        type: 'barrierDiagram',
        label: '(No. 03)  Fill the gaps',
        aside: 'Skin barrier, illustrated',
        title: 'Fill the gaps.',
        italic: 'gaps.',
        body: '피부 장벽은 벽돌(각질 세포)과 그 사이를 메우는\n시멘트(지질)로 이뤄져요. 시멘트가 부족해지면\n틈으로 수분이 빠져나가고 자극이 들어와요.',
        before: { title: 'Before', text: '지질이 부족해 틈이 벌어진 장벽' },
        after: { title: 'After', text: '세라마이드가 틈을 채운 장벽' },
        legend: ['각질 세포 (벽돌)', '세라마이드 · 지질 (시멘트)'],
      },
      {
        type: 'dose',
        label: '(No. 03)  The dose',
        number: '3',
        title: 'Three drops.\nThat’s all.',
        italic: 'That’s all.',
        body: '스포이드 한 번에 세 방울이면 얼굴 전체에\n충분해요. 손바닥에 펴서 감싸듯 눌러주세요.',
        fact: { value: '50 ml ≈ 120일', label: '아침 · 저녁 세 방울 기준' },
        image: images.drop,
      },
      {
        type: 'ratioBar',
        label: '(Formula)  What’s in one drop',
        aside: 'Full list — 21 ingredients',
        title: 'In one drop.',
        italic: 'one drop.',
        body: '정제수 대신 병풀수를 베이스로,\n장벽에 필요한 것만 담았어요.',
        items: [
          { value: 62, en: 'Centella water', ko: '병풀수', color: '#2b3424' },
          { value: 14, en: 'Glycerin', ko: '글리세린', color: '#5e6b47' },
          { value: 3, en: 'Ceramide ×3', ko: '세라마이드 복합체', color: '#c6cdb3' },
          { value: 2, en: 'Hyaluronic ×5', ko: '히알루론산', color: '#d6dbc7' },
          { value: 2, en: 'Panthenol', ko: '판테놀', color: '#e5e0d1' },
          { value: 17, en: 'Others', ko: '기타 16종', color: '#edebe0' },
        ],
      },
    ],
    reviews: {
      quote: '“환절기마다 갈라지던 볼이 이번엔 멀쩡해요.\n묽은데 바르고 나면 속이 꽉 찬 느낌이에요.”',
      author: '정*희 — 민감성 피부, 30대',
      facts: [
        { value: '74%', label: '재구매율' },
        { value: '86%', label: '보습 만족' },
        { value: '81%', label: '흡수력 만족' },
      ],
      items: [
        {
          title: '속건조가 사라졌어요',
          body: '겉은 산뜻한데 속은 촉촉해요. 크림 전에 바르면 밀착력이 좋아져요.',
          author: '한*솔 — 복합성, 20대',
        },
        {
          title: '각질이 덜 일어나요',
          body: '2주 정도 쓰니 코 옆 각질이 눈에 띄게 줄었어요.',
          author: '윤*민 — 지성, 30대',
        },
        {
          title: '레티놀이랑 같이 써요',
          body: '자극 있는 제품 쓸 때 같이 바르면 따가움이 덜해요.',
          author: '김*연 — 민감성, 30대',
        },
      ],
    },
  },

  // ------------------------------------------------------------ 04 CREAM
  {
    slug: 'moisture-cream',
    concerns: ['dryness', 'barrier'],
    no: '04',
    tag: 'No. 04',
    name: 'Moisture Cream',
    shortName: 'Moisture Cream',
    title: 'Moisture\nCream',
    titleItalic: 'Cream',
    korean: '그린티 수분 크림',
    tagline: '녹차 10% 휘핑 수분 크림',
    category: 'moisturize',
    categoryKo: '크림',
    code: 'Moisture Cream',
    size: '80 ml',
    badge: 'Night care',
    description:
      '녹차 추출물 10%와 세라마이드를 담은 휘핑 크림. 가볍게 녹아들어 밤사이 수분이 빠져나가지 않도록 얇게 덮어줍니다.',
    rating: 4.9,
    reviewCount: 3019,
    price: 27000,
    originalPrice: 30000,
    options: [
      { label: '80 ml', price: 27000 },
      { label: '80 ml', note: '리필 파우치', price: 22000 },
      { label: '80 ml + 리필', price: 45000 },
    ],
    image: images.cream,
    gallery: [images.cream, images.creamTop, images.night, images.greenTea, images.ceramide],
    ritualStep: { step: 'Seal', text: '가볍게 덮어 48시간 촉촉함을 지켜요.' },
    sections: [
      {
        type: 'dayNight',
        label: '(No. 04)  Day — night',
        day: {
          label: 'Day',
          title: 'A thin veil\nby day.',
          italic: 'by day.',
          body: '아침엔 쌀알 크기만큼. 얇게 펴 바르면\n메이크업 아래에서도 밀리지 않아요.',
        },
        night: {
          label: 'Night',
          title: 'Seal the night.',
          italic: 'the night.',
          body: '저녁엔 콩알 크기만큼 넉넉하게. 피부가 회복하는\n밤 10시–새벽 2시 동안 수분을 단단히 가둬요.',
        },
        image: images.night,
        morning: { hour: 7.5, label: 'AM 07:30' },
        repair: { from: 22, to: 2, label: 'Repair window  22:00 – 02:00' },
      },
      {
        type: 'orbit',
        label: '(Texture)  Whipped cream',
        title: 'Whipped, then gone.',
        italic: 'then gone.',
        image: images.creamTop,
        states: [
          { en: 'Whipped', text: '휘핑처럼 공기를 머금은 제형' },
          { en: 'Melting', text: '체온에 닿으면 녹아내려요' },
          { en: 'Sealing', text: '얇은 막으로 수분을 가둬요' },
          { en: 'Matte', text: '끈적임 없는 보송한 마무리' },
        ],
      },
      {
        type: 'weightScale',
        label: '(Feel)  Where it sits',
        aside: 'Light ← → Rich',
        title: 'Rich enough,\nnever heavy.',
        italic: 'never heavy.',
        body: '크림의 보습력은 그대로, 무게는 로션에 가깝게.\n지성 피부도 밤에 부담 없이 쓸 수 있어요.',
        steps: ['Water', 'Gel', 'Lotion', 'Cream', 'Balm'],
        position: 0.64,
        marker: { title: 'Moisture Cream', text: '로션과 크림 사이' },
        facts: [
          { value: '10%', label: '녹차 추출물' },
          { value: '3%', label: '세라마이드 NP' },
          { value: '0.8s', label: '흡수까지 걸리는 시간' },
          { value: 'Matte', label: '마무리감' },
        ],
      },
    ],
    reviews: {
      quote: '“자고 일어나도 볼이 말랑해요.\n크림인데 무겁지 않아서 여름에도 써요.”',
      author: '정*희 — 민감성 피부, 30대',
      facts: [
        { value: '76%', label: '재구매율' },
        { value: '90%', label: '보습 지속 만족' },
        { value: '72%', label: '산뜻함 만족' },
      ],
      items: [
        {
          title: '지성인데도 편해요',
          body: '유분기 많은 피부라 크림을 피했는데, 이건 보송하게 마무리돼요.',
          author: '한*솔 — 복합성, 20대',
        },
        {
          title: '리필 파우치가 좋아요',
          body: '용기는 그대로 두고 리필만 사니까 쓰레기도 줄었어요.',
          author: '윤*민 — 지성, 30대',
        },
        {
          title: '밤에 두껍게 발라요',
          body: '수면팩처럼 두껍게 바르고 자면 아침 피부결이 달라요.',
          author: '김*연 — 민감성, 30대',
        },
      ],
    },
  },

  // ------------------------------------------------------------ SET
  {
    slug: 'the-ritual-set',
    listBadge: '−25%',
    concerns: ['redness', 'dryness', 'trouble', 'sensitive', 'barrier'],
    no: 'Set',
    tag: 'Set',
    name: 'The Ritual Set',
    shortName: 'Ritual Set',
    title: 'The Ritual\nSet',
    titleItalic: 'Set',
    korean: '데일리 장벽 루틴 4종',
    tagline: '루틴 4종 미니 · 리넨 파우치',
    category: 'set',
    categoryKo: '세트',
    code: 'The Ritual — 4 steps',
    size: '4 minis',
    badge: 'Autumn edition',
    isSet: true,
    description:
      '클렌저부터 크림까지, 듀필드의 네 단계를 한 번에. 처음 시작하기 좋은 미니 사이즈에 리넨 파우치를 더했어요.',
    rating: 4.9,
    reviewCount: 1048,
    price: 54000,
    originalPrice: 72000,
    options: [
      { label: '미니 세트 · 리넨 파우치', price: 54000 },
      { label: '정품 세트', note: '4종', price: 82000 },
      { label: '미니 세트 + 선물 포장', price: 57000 },
    ],
    image: images.set,
    gallery: [images.set, images.flatlay, images.gift, images.toner, images.cream],
    sections: [
      {
        type: 'staircase',
        label: '(Set)  Four steps, one ritual',
        title: 'Four steps,\none ritual.',
        italic: 'one ritual.',
        body: '아침엔 세 단계, 저녁엔 네 단계.\n순서대로 쓰기만 하면 돼요.',
        steps: [
          { en: 'Cleanse', text: '마일드 젤 클렌저 · 75 ml', image: images.cleanser },
          { en: 'Tone', text: '시카 카밍 토너 · 100 ml', image: images.toner },
          { en: 'Treat', text: '배리어 세럼 · 25 ml', image: images.serum },
          { en: 'Seal', text: '그린티 수분 크림 · 40 ml', image: images.cream },
        ],
      },
      {
        type: 'receipt',
        label: '(Set)  The math',
        title: 'Less spent,\nmore ritual.',
        italic: 'more ritual.',
        body: '따로 살 때보다 18,000원 가볍게.\n선물 포장과 메시지 카드는 무료예요.',
        orderNo: 'Order no. DF-SET-1020',
        lines: [
          { label: '마일드 젤 클렌저 75 ml', price: 12000 },
          { label: '시카 카밍 토너 100 ml', price: 16000 },
          { label: '배리어 세럼 25 ml', price: 22000 },
          { label: '그린티 수분 크림 40 ml', price: 18000 },
          { label: '리넨 파우치', price: 4000 },
        ],
        adjustments: [
          { label: '따로 살 때', price: 72000, strike: true },
          { label: '세트 할인 25%', price: -18000, accent: true },
          { label: '선물 포장 · 메시지 카드', price: 0, accent: true },
        ],
        totalPrice: 54000,
        thanks: 'Thank you, quietly.',
      },
      {
        type: 'schedule',
        label: '(Set)  Morning & evening',
        aside: 'How the four steps split',
        title: 'Three by day,\nfour by night.',
        italic: 'four by night.',
        image: images.flatlay,
        columns: ['01  Cleanse', '02  Tone', '03  Treat', '04  Seal'],
        rows: [
          { title: 'Morning', time: '07:30 — 3분', cells: ['가볍게 세안', '두 번 토닝', null, '쌀알만큼'] },
          {
            title: 'Evening',
            time: '22:00 — 5분',
            accent: true,
            cells: ['30초 세안', '토너 팩 3분', '세 방울', '콩알만큼'],
          },
        ],
      },
    ],
    reviews: {
      quote: '“미니 사이즈로 한 달 써보고 정품을 샀어요.\n순서만 따라 했는데 피부가 조용해졌어요.”',
      author: '정*희 — 민감성 피부, 30대',
      facts: [
        { value: '64%', label: '정품 전환율' },
        { value: '93%', label: '선물 만족' },
        { value: '80%', label: '입문 만족' },
      ],
      items: [
        {
          title: '선물로 최고예요',
          body: '리넨 파우치랑 메시지 카드까지 들어 있어서 따로 포장할 필요가 없어요.',
          author: '한*솔 — 복합성, 20대',
        },
        {
          title: '입문용으로 딱',
          body: '뭘 먼저 발라야 할지 몰랐는데 번호대로 쓰면 돼서 편해요.',
          author: '윤*민 — 지성, 30대',
        },
        {
          title: '여행용으로 들고 다녀요',
          body: '미니 사이즈라 출장 갈 때 파우치째 챙겨요.',
          author: '김*연 — 민감성, 30대',
        },
      ],
    },
  },
];

// ---------- helpers ----------

export const getProduct = (slug) => products.find((p) => p.slug === slug);

export const getProductsByCategory = (category = 'all') =>
  category === 'all' ? products : products.filter((p) => p.category === category);

// 쇼핑 목록 — 카테고리 · 고민(하나라도 맞으면) · 정렬
export function queryProducts({ category = 'all', concerns = [], sort = 'recommended' } = {}) {
  let list = getProductsByCategory(category);
  if (concerns.length) list = list.filter((p) => p.concerns.some((c) => concerns.includes(c)));
  const sorted = [...list];
  if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price);
  if (sort === 'reviews') sorted.sort((a, b) => b.reviewCount - a.reviewCount);
  return sorted;
}

export const searchProducts = (q) => {
  const k = q.trim().toLowerCase();
  if (!k) return [];
  return products.filter((p) =>
    [p.name, p.korean, p.tagline, p.description, p.categoryKo].join(' ').toLowerCase().includes(k),
  );
};

// 상세페이지 하단 추천 — 자기 자신을 뺀 나머지
export const getRelated = (slug, limit = 4) => products.filter((p) => p.slug !== slug).slice(0, limit);

export const ritualProducts = products.filter((p) => p.ritualStep);

export const discountRate = (p) => (p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : 0);
