import Img from '@/components/ui/Img';
import Label from '@/components/ui/Label';
import styles from './HeroBanner.module.scss';

/** 풀블리드 이미지 + 거대한 두 줄 세리프 + 그리드 라인 (토너: Calm in a drop) */
export default function HeroBanner({ label, aside, line1, line2, lead, body, image }) {
  return (
    <section className={styles.banner}>
      <Img src={image} sat={-0.3} className={styles.bg} parallax={0.12} />
      <span className={styles.shade} />
      <span className={styles.grid} aria-hidden>
        <i /> <i /> <i /> <i />
        <b />
      </span>
      <div className={styles.labels}>
        <Label>{label}</Label>
        <Label className={styles.aside}>{aside}</Label>
      </div>
      <h2 className={styles.title}>
        <span className={styles.l1} data-reveal="rise">
          {line1}
        </span>
        <em className={styles.l2} data-reveal="rise" data-reveal-delay="200">
          {line2}
        </em>
      </h2>
      <p className={styles.lead} data-reveal="up" data-reveal-delay="400">
        {lead}
      </p>
      <p className={styles.body} data-reveal="up" data-reveal-delay="500">
        {body}
      </p>
    </section>
  );
}
