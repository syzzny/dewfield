import CountUp from '@/components/motion/CountUp';
import IndexRow from '@/components/ui/IndexRow';
import SectionHead from '@/components/ui/SectionHead';
import styles from './WeightScale.module.scss';

/** 제형 무게 스케일 Water → Balm (크림: Rich enough, never heavy) */
export default function WeightScale({ label, aside, title, italic, body, steps, position, marker, facts }) {
  const last = steps.length - 1;
  return (
    <section className={styles.banner}>
      <div className={styles.inner}>
        <IndexRow left={label} right={aside} dark strong />
        <SectionHead title={title} italic={italic} body={body} size="m" dark />
        <div className={styles.scale} style={{ '--pos': position }} data-reveal="scene">
          <span className={styles.track} />
          <span className={styles.fill} />
          {steps.map((s, i) => (
            <span
              key={s}
              className={styles.step}
              style={{ '--p': i / last }}
              data-on={i / last <= position || undefined}
            >
              <i />
              <span>{s}</span>
            </span>
          ))}
          <span className={styles.marker}>
            <span className={styles.markerTag}>
              <em>{marker.title}</em>
              <span>{marker.text}</span>
            </span>
          </span>
        </div>
        <ul className={styles.facts}>
          {facts.map((f) => (
            <li key={f.label}>
              <CountUp value={f.value} className={styles.value} />
              <span className={styles.factLabel}>{f.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
