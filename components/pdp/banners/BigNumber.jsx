import CountUp from '@/components/motion/CountUp';
import Img from '@/components/ui/Img';
import Label from '@/components/ui/Label';
import styles from './BigNumber.module.scss';

/** 거대한 숫자 + 성분 스토리 (토너: 72%) */
export default function BigNumber({ number, unit, label, aside, title, body, facts, image }) {
  return (
    <section className={styles.banner}>
      <Img src={image} sat={-0.2} className={styles.bg} parallax={0.12} />
      <span className={styles.shade} />
      <Label className={styles.label}>{label}</Label>
      <Label className={styles.aside}>{aside}</Label>
      <div className={styles.copy}>
        <h2 className={styles.title}>{title}</h2>
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
      <p className={styles.number} aria-hidden>
        <CountUp value={number} duration={2000} />
        <em>{unit}</em>
      </p>
    </section>
  );
}
