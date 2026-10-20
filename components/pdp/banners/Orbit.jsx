import Img from '@/components/ui/Img';
import Label from '@/components/ui/Label';
import Rich from '@/components/ui/Rich';
import { pad } from '@/lib/format';
import styles from './Orbit.module.scss';

/** 원형 텍스처 이미지 + 네 방향 라벨 (크림: Whipped, then gone) */
export default function Orbit({ label, title, italic, image, states }) {
  return (
    <section className={styles.banner}>
      <Label className={styles.label}>{label}</Label>
      <Rich as="h2" text={title} italic={italic} className={styles.title} />
      <div className={styles.orbit} data-reveal="scene">
        <span className={styles.ring} aria-hidden />
        <Img src={image} sat={-0.15} className={styles.circle} reveal="fade" />
        {states.map((s, i) => (
          <div key={s.en} className={styles.state} data-i={i} style={{ '--d': `${0.6 + i * 0.18}s` }}>
            <span className={styles.dot} />
            <span className={styles.stem} />
            <span className={styles.text}>
              <span className={styles.head}>
                <Label tone="olive">{pad(i + 1)}</Label>
                <span className={styles.en}>{s.en}</span>
              </span>
              <span className={styles.desc}>{s.text}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
