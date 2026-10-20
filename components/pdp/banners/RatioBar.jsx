import IndexRow from '@/components/ui/IndexRow';
import SectionHead from '@/components/ui/SectionHead';
import styles from './RatioBar.module.scss';

/** 성분 비율 막대 + 범례 (세럼: In one drop) */
export default function RatioBar({ label, aside, title, italic, body, items }) {
  return (
    <section className={styles.section}>
      <IndexRow left={label} right={aside} strong />
      <SectionHead title={title} italic={italic} body={body} size="m" />
      <div
        className={styles.bar}
        data-reveal="scene"
        role="img"
        aria-label={items.map((i) => `${i.ko} ${i.value}%`).join(', ')}
      >
        {items.map((item, i) => (
          <span key={item.en} style={{ flexGrow: item.value, background: item.color, '--i': i }} />
        ))}
      </div>
      <ul className={styles.legend}>
        {items.map((item) => (
          <li key={item.en}>
            <i style={{ background: item.color }} />
            <span className={styles.value}>{item.value}%</span>
            <span className={styles.en}>{item.en}</span>
            <span className={styles.ko}>{item.ko}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
