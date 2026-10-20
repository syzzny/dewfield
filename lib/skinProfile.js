import { questions } from '@/data/quiz';

const clamp = (v) => Math.max(5, Math.min(95, Math.round(v)));

// 답변 → 피부 지표(0~100)
const BASE = {
  dry: { hydration: 30, oil: 25 },
  combo: { hydration: 45, oil: 55 },
  sensitive: { hydration: 35, oil: 45 },
  oily: { hydration: 55, oil: 75 },
};

/**
 * 진단 결과 계산 — 화면용 프로필을 만들어요.
 * answers: { type, concerns[], sensitivity, texture, steps }
 */
export function buildProfile(answers, date = new Date()) {
  const base = BASE[answers.type] ?? BASE.sensitive;
  const concerns = answers.concerns ?? [];
  const sensitivity = clamp((answers.sensitivity ?? 3) * 20);
  const hydration = clamp(
    base.hydration - (concerns.includes('dryness') ? 0 : -5) - (concerns.includes('flakes') ? 8 : 0),
  );
  const oil = clamp(base.oil + (concerns.includes('pores') ? 10 : 0));
  const barrier = clamp(70 - sensitivity / 3 - concerns.length * 4 - (answers.type === 'sensitive' ? 8 : 0));

  const first = sensitivity >= 60 ? 'Sensitive' : oil >= 60 ? 'Balanced' : 'Calm';
  const second = hydration < 40 ? 'thirsty skin.' : oil >= 60 ? 'shiny skin.' : 'steady skin.';

  const descByType = {
    dry: '건조하고 장벽이 얇아진 수분 부족형이에요.',
    combo: '부위마다 유수분 차이가 큰 복합형이에요.',
    sensitive: '쉽게 붉어지고 속은 건조한 민감 · 수분 부족형이에요.',
    oily: '유분은 많지만 속은 마르기 쉬운 지성형이에요.',
  };

  const concernOptions = questions.find((q) => q.id === 'concerns').options;
  const textureOption = questions.find((q) => q.id === 'texture').options.find((o) => o.id === answers.texture);
  const tags = [
    ...concerns.map((id) => concernOptions.find((o) => o.id === id)?.tag).filter(Boolean),
    ...(textureOption ? [textureOption.tag] : []),
  ];

  const d = date;
  return {
    updated: `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`,
    title: `${first},\n${second}`,
    italic: second,
    description: `${descByType[answers.type] ?? descByType.sensitive}\n자극은 덜고, 수분과 장벽을 먼저 채워 주세요.`,
    tags,
    metrics: [
      { label: '민감도', value: sensitivity },
      { label: '수분', value: hydration },
      { label: '유분', value: oil },
      { label: '장벽', value: barrier },
    ],
    // 토너 매칭률 — 민감할수록 높아요
    match: Math.min(98, 70 + Math.round(sensitivity / 4) + (answers.texture === 'water' ? 5 : 0)),
  };
}
