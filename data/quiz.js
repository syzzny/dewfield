import { images } from './images';

// =============================================================
// 피부 진단(Skin finder) 질문
// type: single | multi | scale | image
// 질문을 바꾸거나 추가할 때는 이 배열만 수정하면 돼요. (결과 계산은 lib/skinProfile.js)
// =============================================================
export const questions = [
  {
    id: 'type',
    type: 'single',
    title: '세안 후 30분,\n피부는 어떤가요?',
    help: '아무것도 바르지 않은 상태를 떠올려 주세요.',
    options: [
      { id: 'dry', title: '당기고 건조해요', desc: '볼과 입가가 특히 땅기고 각질이 보여요' },
      { id: 'combo', title: 'T존만 번들거려요', desc: '이마와 코는 유분, 볼은 건조해요' },
      { id: 'sensitive', title: '쉽게 붉어지고 화끈거려요', desc: '온도 변화나 마찰에 바로 반응해요' },
      { id: 'oily', title: '전체적으로 번들거려요', desc: '오후가 되면 모공과 유분이 도드라져요' },
    ],
  },
  {
    id: 'concerns',
    type: 'multi',
    max: 3,
    title: '요즘 가장 신경 쓰이는\n피부 고민은요?',
    help: '최대 세 개까지 고를 수 있어요.',
    options: [
      { id: 'redness', title: '붉은기 · 홍조', tag: '붉은기' },
      { id: 'dryness', title: '속건조', tag: '속건조' },
      { id: 'trouble', title: '트러블', tag: '트러블' },
      { id: 'flakes', title: '각질', tag: '각질' },
      { id: 'sensitive', title: '예민함 · 따가움', tag: '예민함' },
      { id: 'pores', title: '모공', tag: '모공' },
      { id: 'firmness', title: '탄력 저하', tag: '탄력' },
      { id: 'dull', title: '칙칙한 톤', tag: '칙칙함' },
      { id: 'lines', title: '잔주름', tag: '잔주름' },
    ],
  },
  {
    id: 'sensitivity',
    type: 'scale',
    title: '새 제품을 쓸 때\n얼마나 자주 따가운가요?',
    help: '지난 3개월을 기준으로 골라 주세요.',
    min: 1,
    max: 5,
    labels: { 1: '전혀 없어요', 2: '드물게', 3: '가끔', 4: '자주 그래요', 5: '거의 항상' },
    note: '4 이상이면 향료 · 알코올이 없는 저자극 라인 위주로 추천해요.',
  },
  {
    id: 'texture',
    type: 'image',
    title: '어떤 사용감을\n좋아하세요?',
    help: '손등에 발랐을 때의 느낌을 떠올려 보세요.',
    options: [
      { id: 'water', title: 'Water', desc: '물처럼 가볍게', image: images.swatch, tag: '워터 제형' },
      { id: 'cream', title: 'Cream', desc: '쫀쫀하고 촉촉하게', image: images.ceramide, tag: '크림 제형' },
      { id: 'gel', title: 'Gel', desc: '말랑하고 산뜻하게', image: images.hyaluronic, tag: '젤 제형' },
    ],
  },
  {
    id: 'steps',
    type: 'single',
    title: '하루 루틴은\n몇 단계가 편하세요?',
    help: '아침과 저녁을 합쳐서 생각해 주세요.',
    options: [
      { id: 'minimal', title: '두 단계 이하', desc: '세안하고 하나만 바르는 편이에요' },
      { id: 'basic', title: '서너 단계', desc: '토너 · 세럼 · 크림 정도는 챙겨요' },
      { id: 'full', title: '다섯 단계 이상', desc: '단계별로 꼼꼼하게 바르는 편이에요' },
    ],
  },
];

export const quizIntro = {
  title: 'Find your\nquiet skin.',
  italic: 'quiet skin.',
  lead: '다섯 개의 질문에 답하면 지금 피부에 필요한\n성분과 루틴을 골라드려요',
  image: images.skin,
  perks: ['피부 타입 프로필', '맞춤 4단계 루틴', '첫 구매 20% 쿠폰'],
};
