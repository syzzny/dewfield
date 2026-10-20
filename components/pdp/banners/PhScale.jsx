import { cx } from '@/lib/format';
import IndexRow from '@/components/ui/IndexRow';
import SectionHead from '@/components/ui/SectionHead';
import styles from './PhScale.module.scss';

const pos = (ph) => (ph - 1) / 13; // pH 1–14

/** pH 눈금 — 데스크톱은 가로, 모바일은 세로 막대 */
export default function PhScale({ label, aside, title, italic, body, markers, zone }) {
  return (
    <section className={styles.section}>
      <IndexRow left={label} right={aside} strong />
      <SectionHead title={title} italic={italic} body={body} size="xl" />

      <div className={styles.scale} data-reveal="scene">
        <div className={styles.bar}>
          <span className={styles.zone} style={{ '--from': pos(zone[0]), '--to': pos(zone[1]) }} aria-hidden />
        </div>
        <ol className={styles.ticks} aria-hidden>
          {Array.from({ length: 14 }, (_, i) => (
            <li key={i} style={{ '--p': pos(i + 1) }} className={cx((i === 6 || i === 13) && styles.major)}>
              <span>{i + 1}</span>
            </li>
          ))}
        </ol>
        {markers.map((m) => (
          <div
            key={m.title}
            className={cx(styles.marker, m.highlight && styles.highlight, m.position === 'below' && styles.below)}
            style={{ '--p': pos(m.ph), '--pm': pos(m.mobilePh ?? m.ph), '--d': `${0.9 + pos(m.ph) * 0.9}s` }}
          >
            <span className={styles.dot} />
            <span className={styles.stem} />
            <span className={styles.tag}>
              <span className={styles.tagTitle}>{m.title}</span>
              <span className={styles.tagText}>{m.text}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
