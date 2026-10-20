import { cx } from '@/lib/format';

/**
 * 줄바꿈(\n)과 강조 단어(이탤릭)를 함께 처리하는 텍스트.
 * <Rich text={'The Calming\nLine'} italic="Line" />
 * → 디자인의 "세리프 제목 + 마지막 단어 이탤릭" 패턴을 데이터만으로 그릴 수 있어요.
 *
 * reveal(기본 true): 화면에 들어올 때 줄 단위로 차례로 떠올라요. (styles/_motion.scss 'lines')
 */
export default function Rich({ text, italic, as: Tag = 'span', reveal = true, className, ...rest }) {
  const start = italic ? text.lastIndexOf(italic) : -1;
  const end = start < 0 ? -1 : start + italic.length;

  // 한 줄 안에서 이탤릭 구간만 <em>으로 감싸기
  let offset = 0;
  const lines = text.split('\n').map((line, i) => {
    const from = offset;
    const to = offset + line.length;
    offset = to + 1;

    let content = line;
    if (start >= 0 && start < to && end > from) {
      const a = Math.max(start, from) - from;
      const b = Math.min(end, to) - from;
      content = (
        <>
          {line.slice(0, a)}
          <em>{line.slice(a, b)}</em>
          {line.slice(b)}
        </>
      );
    }

    return (
      <span key={i} className="reveal-line" style={{ '--line': i }}>
        {content}
      </span>
    );
  });

  return (
    <Tag className={cx('pre-line', className)} data-reveal={reveal ? 'lines' : undefined} {...rest}>
      {lines}
    </Tag>
  );
}
