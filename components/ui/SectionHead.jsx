import { cx } from '@/lib/format';
import Rich from './Rich';
import styles from './SectionHead.module.scss';

/**
 * 큰 세리프 제목 + 오른쪽 설명 — 거의 모든 섹션에 반복되는 머리 부분
 * size: xl(140) | l(120) | m(110) | s(96) | xs(72)  ※ 데스크톱 기준 px
 * dark: 어두운 배경 (강조 단어 sage)
 */
export default function SectionHead({ title, italic, body, size = 'l', dark = false, as = 'h2', className, children }) {
  return (
    <div className={cx(styles.head, dark && styles.dark, className)}>
      <Rich as={as} text={title} italic={italic} className={cx(styles.title, styles[size])} />
      {(body || children) && (
        <div className={styles.side}>
          {body && (
            <p className={styles.body} data-reveal="up" data-reveal-delay="200">
              {body}
            </p>
          )}
          {children}
        </div>
      )}
    </div>
  );
}
