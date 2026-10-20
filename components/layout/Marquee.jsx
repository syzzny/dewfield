import { cx } from '@/lib/format';
import styles from './Marquee.module.scss';

const WORDS = ['Calm', 'Hydrate', 'Repair', 'Breathe'];

/** 흐르는 띠 배너 — 같은 묶음을 두 번 이어 붙여 끊김 없이 반복돼요. */
export default function Marquee({ words = WORDS, className }) {
  const group = (hidden) => (
    <div className={styles.group} aria-hidden={hidden}>
      {[...words, ...words].map((w, i) => (
        <span key={i} className={styles.item}>
          <span className={styles.word}>{w}</span>
          <span className={styles.dot} />
        </span>
      ))}
    </div>
  );
  return (
    <div className={cx(styles.marquee, className)}>
      <div className={styles.track}>
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}
