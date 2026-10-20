import CountUp from '@/components/motion/CountUp';
import { images } from '@/data/images';
import IndexRow from '@/components/ui/IndexRow';
import Img from '@/components/ui/Img';
import Label from '@/components/ui/Label';
import styles from './Philosophy.module.scss';

const FACTS = [
  { value: '72%', label: '병풀 추출물 함량', short: '병풀 함량' },
  { value: '0', label: '인공 향료 · 색소', short: '인공 향료' },
  { value: '5.5', label: '약산성 pH 밸런스', short: '약산성 pH' },
];

export default function Philosophy() {
  return (
    <section className={styles.section}>
      <IndexRow left="(02)  Philosophy" right="Dewfield — 02 / 07" mobileRight="02 / 07" />
      <div className={styles.body}>
        <div className={styles.statement}>
          <p className={styles.quote}>
            피부가 원래 알고 있는 것을 믿어요. 그래서 우리는 더하는 대신 덜어냅니다 — <em>less, but kinder.</em>
          </p>
          <ul className={styles.facts}>
            {FACTS.map((f) => (
              <li key={f.value} data-reveal="up">
                <CountUp value={f.value} className={styles.value} />
                <span className={styles.label}>
                  <span className={styles.long}>{f.label}</span>
                  <span className={styles.short}>{f.short}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <figure className={styles.figure}>
          <Img src={images.leaf} sat={-0.25} className={styles.img} />
          <figcaption>
            <Label>Fig. 01</Label>
            <em>Centella, morning light</em>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
