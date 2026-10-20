import CountUp from '@/components/motion/CountUp';
import Label from '@/components/ui/Label';
import Rich from '@/components/ui/Rich';
import styles from './TimerDial.module.scss';

/** 30초 다이얼 — 눈금은 SVG dash, 진행 호는 SVG path */
export default function TimerDial({ label, seconds, caption, marks, title, italic, body, facts }) {
  // 60초 기준 다이얼 위에 30초만큼의 호
  const R = 290;
  const angle = (s) => (s / 60) * 2 * Math.PI - Math.PI / 2;
  const pt = (s, r = R) => [300 + r * Math.cos(angle(s)), 300 + r * Math.sin(angle(s))];
  const [sx, sy] = pt(0);
  const [ex, ey] = pt(seconds);

  return (
    <section className={styles.banner}>
      <Label className={styles.label}>{label}</Label>
      <div className={styles.dial} data-reveal="scene">
        <svg viewBox="0 0 600 600" aria-hidden>
          <circle
            cx="300"
            cy="300"
            r="268"
            className={styles.ticks60}
            pathLength="60"
            transform="rotate(-90 300 300)"
          />
          <circle
            cx="300"
            cy="300"
            r="262"
            className={styles.ticks12}
            pathLength="12"
            transform="rotate(-90 300 300)"
          />
          <path d={`M ${sx} ${sy} A ${R} ${R} 0 0 1 ${ex} ${ey}`} className={styles.arc} pathLength={1} />
          <circle cx={ex} cy={ey} r="9" className={styles.end} />
        </svg>
        <div className={styles.center}>
          <CountUp value={`${seconds}″`} duration={2200} className={styles.big} />
          <Label tone="sage">{caption}</Label>
        </div>
        {marks.map((m) => (
          <div key={m.at} className={styles.mark} data-at={m.at}>
            <span className={styles.markTitle}>{m.title}</span>
            <span className={styles.markText}>{m.text}</span>
          </div>
        ))}
      </div>
      <div className={styles.copy}>
        <Rich as="h2" text={title} italic={italic} className={styles.title} />
        <p className={styles.body}>{body}</p>
        <ul className={styles.facts}>
          {facts.map((f) => (
            <li key={f.label}>
              <span className={styles.factValue}>{f.value}</span>
              <span className={styles.factLabel}>{f.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
