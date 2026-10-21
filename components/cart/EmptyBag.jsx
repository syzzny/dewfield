import Link from 'next/link';
import { images } from '@/data/images';
import { getProduct } from '@/data/products';
import IndexRow from '@/components/ui/IndexRow';
import Img from '@/components/ui/Img';
import Label from '@/components/ui/Label';
import Rich from '@/components/ui/Rich';
import Button from '@/components/ui/Button';
import styles from './EmptyBag.module.scss';

const RECENT = ['cica-calming-toner', 'barrier-serum'];

export default function EmptyBag() {
  return (
    <section className={styles.wrap}>
      <div className={styles.content}>
        <IndexRow left="(Bag)  0 items" strong className={styles.index} />
        <Label className={styles.mobileLabel}>(Bag) 0 items</Label>
        <Rich as="h1" text={'Your bag\nis resting.'} italic="is resting." className={styles.title} />
        <p className={styles.lead}>
          아직 담은 상품이 없어요.
          <br />
          피부에 맞는 루틴부터 천천히 골라보세요.
        </p>
        <div className={styles.buttons}>
          <Button href="/shop" trailing="→">
            라인 둘러보기
          </Button>
          <Button href="/skin-finder" variant="secondary" trailing="→">
            피부 진단하기
          </Button>
        </div>
        <div className={styles.recent}>
          <Label>Recently viewed</Label>
          <div className={styles.recentList}>
            {RECENT.map(getProduct).map((p) => (
              <Link key={p.slug} href={`/shop/${p.slug}`} className={styles.recentItem}>
                <Img src={p.image} className={styles.recentImg} reveal={false} sizes="200px" />
                {p.shortName}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.visual}>
        <Img
          src={images.stones}
          sat={-0.3}
          className={styles.img}
          reveal="fade"
          sizes="(max-width: 900px) 100vw, 50vw"
        />
      </div>
    </section>
  );
}
