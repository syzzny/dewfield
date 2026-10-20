import CountUp from '@/components/motion/CountUp';
import IndexRow from '@/components/ui/IndexRow';
import Img from '@/components/ui/Img';
import Rich from '@/components/ui/Rich';
import styles from './Results.module.scss';

/** 결과 수치 — 패키지샷 + 큰 숫자 3개 */
export default function Results({ product, order, total, index, title, italic, image, stats, note }) {
  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <IndexRow
          left={`(${order})  ${index}`}
          right={`${product.name} — ${order} / ${total}`}
          mobileRight={`${order} / ${total}`}
        />
        <Rich as="h2" text={title} italic={italic} className={styles.title} />
      </div>
      <Img src={image} sat={0} className={styles.img} />
      <ul className={styles.stats}>
        {stats.map((s) => (
          <li key={s.value} data-reveal="up">
            <CountUp value={s.value} className={styles.value} />
            <span className={styles.text}>{s.text}</span>
          </li>
        ))}
      </ul>
      <p className={styles.note}>{note}</p>
    </section>
  );
}
