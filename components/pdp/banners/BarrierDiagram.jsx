import { cx } from '@/lib/format';
import IndexRow from '@/components/ui/IndexRow';
import SectionHead from '@/components/ui/SectionHead';
import styles from './BarrierDiagram.module.scss';

// 벽돌 배치 — 홀수 줄은 반 칸씩 밀려요.
const ROWS = [5, 4, 5, 4, 5];

function Wall({ filled, title, text }) {
  return (
    <figure className={cx(styles.wall, filled && styles.filled)}>
      <div className={styles.bricks} aria-hidden>
        {!filled && (
          <span className={styles.vapor}>
            <i />
            <i />
            <i />
            <em>수분 증발</em>
          </span>
        )}
        {ROWS.map((count, r) => (
          <div key={r} className={cx(styles.row, r % 2 && styles.offset)}>
            {Array.from({ length: count }, (_, i) => (
              <span key={i} />
            ))}
          </div>
        ))}
      </div>
      <figcaption>
        <span className={styles.wallTitle}>{title}</span>
        <span className={styles.wallText}>{text}</span>
      </figcaption>
    </figure>
  );
}

/** 피부 장벽 Before / After 다이어그램 (세럼) */
export default function BarrierDiagram({ label, aside, title, italic, body, before, after, legend }) {
  return (
    <section className={styles.section}>
      <IndexRow left={label} right={aside} strong />
      <SectionHead title={title} italic={italic} body={body} size="xl" />
      <div className={styles.diagram} data-reveal="scene">
        <Wall {...before} />
        <span className={styles.divider} aria-hidden />
        <Wall {...after} filled />
      </div>
      <div className={styles.legend}>
        <span>
          <i className={styles.keyBrick} />
          {legend[0]}
        </span>
        <span>
          <i className={styles.keyLipid} />
          {legend[1]}
        </span>
      </div>
    </section>
  );
}
