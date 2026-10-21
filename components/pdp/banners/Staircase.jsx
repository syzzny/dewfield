import Img from '@/components/ui/Img';
import Label from '@/components/ui/Label';
import Rich from '@/components/ui/Rich';
import { pad } from '@/lib/format';
import styles from './Staircase.module.scss';

/** 계단처럼 높아지는 네 단계 이미지 (세트: Four steps, one ritual) */
export default function Staircase({ label, title, italic, body, steps }) {
  return (
    <section className={styles.banner}>
      <div className={styles.head}>
        <Label>{label}</Label>
        <Rich as="h2" text={title} italic={italic} className={styles.title} />
        <p className={styles.body}>{body}</p>
      </div>
      <ol className={styles.stairs}>
        {steps.map((s, i) => (
          <li key={s.en} style={{ '--i': i }} data-reveal="up">
            <span className={styles.stepHead}>
              <span className={styles.no}>{pad(i + 1)}</span>
              <span className={styles.en}>{s.en}</span>
            </span>
            <Img src={s.image} className={styles.img} sizes="(max-width: 900px) 25vw, 20vw" />
            <span className={styles.text}>{s.text}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
