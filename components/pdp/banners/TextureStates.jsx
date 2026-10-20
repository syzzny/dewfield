import Img from '@/components/ui/Img';
import Label from '@/components/ui/Label';
import Rich from '@/components/ui/Rich';
import { pad } from '@/lib/format';
import styles from './TextureStates.module.scss';

/** 제형 변화 3단계 — 이미지 위 글래스 카드 (클렌저: From gel, to cloud) */
export default function TextureStates({ label, title, italic, image, states }) {
  return (
    <section className={styles.banner}>
      <Img src={image} sat={-0.2} className={styles.bg} parallax={0.1} />
      <span className={styles.fade} />
      <div className={styles.head}>
        <Label>{label}</Label>
        <Rich as="h2" text={title} italic={italic} className={styles.title} />
      </div>
      <ol className={styles.states}>
        {states.map((s, i) => (
          <li key={s.en} data-reveal="up">
            <span className={styles.stateHead}>
              <Label tone="olive">{pad(i + 1)}</Label>
              <span className={styles.en}>{s.en}</span>
            </span>
            <span className={styles.ko}>{s.ko}</span>
            <span className={styles.text}>{s.text}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
