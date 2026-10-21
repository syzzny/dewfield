import Link from 'next/link';
import { images } from '@/data/images';
import { getProduct } from '@/data/products';
import { won } from '@/lib/format';
import Img from '@/components/ui/Img';
import Label from '@/components/ui/Label';
import TextLink from '@/components/ui/TextLink';
import Button from '@/components/ui/Button';
import styles from './Hero.module.scss';

export default function Hero() {
  const toner = getProduct('cica-calming-toner');

  return (
    <section className={styles.hero} data-intro>
      <Img src={images.hills} sat={-0.35} className={styles.bg} eager parallax={0.12} />
      <span className={styles.shade} />

      {/* 에디토리얼 그리드 라인 */}
      <span className={styles.grid} aria-hidden>
        <i /> <i /> <i /> <i />
        <b />
      </span>

      <div className={styles.labels} data-reveal="fade" data-reveal-delay="200" data-reveal-stagger="off">
        <Label>
          (01) The calming line<span className={styles.desktopOnly}> — Autumn 2026</span>
        </Label>
        <Label>
          <span className={styles.desktopOnly}>Seoul — Est. 2026</span>
          <span className={styles.mobileOnly}>Autumn 2026</span>
        </Label>
      </div>

      <h1 className={styles.title}>
        <span className={styles.quiet} data-reveal="rise" data-reveal-delay="100" data-reveal-stagger="off">
          Quiet
        </span>
        <em className={styles.skin} data-reveal="rise" data-reveal-delay="320" data-reveal-stagger="off">
          skin.
        </em>
      </h1>

      <div className={styles.copy} data-reveal="up" data-reveal-delay="650" data-reveal-stagger="off">
        <p className={styles.lead}>
          덜어낼수록,
          <br />
          피부는 조용해집니다
        </p>
        <p className={styles.body}>
          자연 유래 저자극 포뮬러로 완성한
          <br />
          데일리 장벽 루틴, 듀필드.
        </p>
        <TextLink href="/shop" tone="cream" className={styles.desktopLink}>
          Shop the line
        </TextLink>
        <Button href="/shop" variant="light" block trailing="→" className={styles.mobileCta}>
          라인 둘러보기
        </Button>
      </div>

      <Link
        href={`/shop/${toner.slug}`}
        className={styles.card}
        data-reveal="up"
        data-reveal-delay="850"
        data-reveal-stagger="off"
      >
        <Img src={toner.image} className={styles.cardImg} sizes="240px" eager />
        <span className={styles.cardRow}>
          <Label>No. {toner.no}</Label>
          <Label>{toner.size}</Label>
        </span>
        <span className={styles.cardName}>{toner.name}</span>
        <span className={styles.cardMeta}>
          {toner.korean} · {won(toner.price)}
        </span>
      </Link>

      <Label className={styles.scroll}>Scroll</Label>
    </section>
  );
}
