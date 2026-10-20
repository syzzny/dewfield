import Link from 'next/link';
import { images } from '@/data/images';
import { getProduct } from '@/data/products';
import { won, pad } from '@/lib/format';
import IndexRow from '@/components/ui/IndexRow';
import Img from '@/components/ui/Img';
import Button from '@/components/ui/Button';
import styles from './Ritual.module.scss';

// 루틴 순서 — 클렌저 → 토너 → 세럼 → 크림
const ORDER = ['mild-gel-cleanser', 'cica-calming-toner', 'barrier-serum', 'moisture-cream'];

export default function Ritual() {
  const steps = ORDER.map(getProduct);
  const set = getProduct('the-ritual-set');

  return (
    <section className={styles.section}>
      <IndexRow left="(05)  The ritual" right="Dewfield — 05 / 07" mobileRight="05 / 07" />
      <div className={styles.body}>
        <div className={styles.visual}>
          <Img src={images.stones} sat={-0.3} className={styles.img} reveal="fade" />
          <p className={styles.caption}>
            Morning
            <br />& Night
          </p>
        </div>

        <div className={styles.steps}>
          <h2 className={styles.title}>
            아침과 저녁, 네 단계면
            <br />
            충분해요
          </h2>
          <ol className={styles.list}>
            {steps.map((p, i) => (
              <li key={p.slug} data-reveal="up">
                <Link href={`/shop/${p.slug}`} className={styles.step}>
                  <span className={styles.no}>{pad(i + 1)}</span>
                  <span className={styles.stepText}>
                    <span className={styles.stepHead}>
                      <span className={styles.en}>{p.ritualStep.step}</span>
                      <span className={styles.ko}>{p.korean}</span>
                    </span>
                    <span className={styles.desc}>{p.ritualStep.text}</span>
                  </span>
                  <span className={styles.arrow} aria-hidden>
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ol>
          <div className={styles.cta}>
            <span className={styles.setName}>The Ritual Set — {won(set.price)}</span>
            <Button href={`/shop/${set.slug}`} caps trailing="→" className={styles.desktopBtn}>
              Shop the ritual
            </Button>
            <Button href={`/shop/${set.slug}`} block trailing="→" className={styles.mobileBtn}>
              루틴 세트 · {won(set.price)}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
