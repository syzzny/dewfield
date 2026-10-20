'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { discountRate } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { won, number, pad, cx } from '@/lib/format';
import Img from '@/components/ui/Img';
import Label from '@/components/ui/Label';
import Rich from '@/components/ui/Rich';
import Stars from '@/components/ui/Stars';
import Button from '@/components/ui/Button';
import Accordion from '@/components/ui/Accordion';
import styles from './ProductTop.module.scss';

export default function ProductTop({ product }) {
  const router = useRouter();
  const { add } = useCart();
  const [active, setActive] = useState(0);
  const [option, setOption] = useState(0);
  const [added, setAdded] = useState(false);

  const price = product.options[option].price;
  const rate = discountRate(product);
  const total = product.gallery.length;

  const addToBag = () => {
    add(product.slug, option);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const buyNow = () => {
    add(product.slug, option);
    router.push('/checkout');
  };

  const details = [
    { title: '상세 설명', content: product.description },
    {
      title: '전성분',
      content: '정제수 대신 원료 베이스 · 자연 유래 성분 23종 이내 · 인공 향료, 색소, 파라벤, 설페이트 무첨가',
    },
    {
      title: '사용 방법',
      content: product.ritualStep ? product.ritualStep.text : '클렌저 → 토너 → 세럼 → 크림 순서로 사용해요.',
    },
    {
      title: '배송 · 교환 · 반품',
      content: '3만 원 이상 무료배송 · 평일 15시 전 주문 시 당일 출고\n개봉 후에도 30일 이내 반품할 수 있어요.',
    },
  ];

  return (
    <section className={styles.top}>
      <div className={styles.gallery}>
        <div className={styles.main}>
          <Img src={product.gallery[active]} alt={product.name} className={styles.mainImg} eager reveal="fade" />
          <Label className={styles.badge}>{product.badge}</Label>
          <span className={styles.no}>{product.no}</span>
          <Label className={styles.counter}>
            {pad(active + 1)} / {pad(total)}
          </Label>
          <span className={styles.pager} aria-hidden>
            {product.gallery.map((_, i) => (
              <i key={i} className={cx(i === active && styles.on)} />
            ))}
          </span>
        </div>
        <div className={styles.thumbs}>
          {product.gallery.map((src, i) => (
            <button
              key={src + i}
              type="button"
              className={cx(styles.thumb, i === active && styles.thumbOn, i === 0 && styles.firstThumb)}
              onClick={() => setActive(i === active ? 0 : i)}
              aria-label={`${i + 1}번째 이미지 보기`}
            >
              <Img src={src} sat={-0.2} reveal={false} />
            </button>
          ))}
        </div>
      </div>

      <div className={styles.panel}>
        <div className={styles.title}>
          <Label>
            ({product.no === 'Set' ? 'Set' : `No. ${product.no}`}) {product.code} — {product.size}
          </Label>
          <Rich as="h1" text={product.title} italic={product.titleItalic} className={styles.name} />
          <p className={styles.korean}>{product.korean}</p>
          <p className={styles.desc}>{product.description}</p>
          <a href="#reviews" className={styles.rating}>
            <Stars value={product.rating} />
            <span>
              {product.rating} · 리뷰 {number(product.reviewCount)}
            </span>
          </a>
        </div>

        <div className={styles.price}>
          <span className={styles.now}>{won(price)}</span>
          {option === 0 && product.originalPrice && (
            <>
              <s className={styles.was}>{won(product.originalPrice)}</s>
              <Label tone="olive">{rate}% off</Label>
            </>
          )}
        </div>

        <fieldset className={styles.options}>
          <div className={styles.optionsHead}>
            <legend>용량</legend>
            <button type="button" className={styles.guide}>
              Size guide
            </button>
          </div>
          {product.options.map((o, i) => (
            <label key={o.label + i} className={cx(styles.option, option === i && styles.optionOn)}>
              <input type="radio" name="option" checked={option === i} onChange={() => setOption(i)} />
              <span className={styles.radio} />
              <span className={styles.optionLabel}>
                {o.label}
                {o.note && <> — {o.note}</>}
              </span>
              <span className={styles.optionPrice}>{won(o.price)}</span>
            </label>
          ))}
        </fieldset>

        <div className={styles.cta}>
          <Button block trailing={`${won(price)}  →`} onClick={buyNow}>
            바로 구매
          </Button>
          <Button block variant="secondary" trailing={added ? '✓' : '+'} onClick={addToBag}>
            {added ? '장바구니에 담았어요' : '장바구니 담기'}
          </Button>
          <p className={styles.notice}>
            무료배송 · <span className={styles.desktopOnly}>오늘 15시 전 주문 시 </span>내일 도착 · 샘플 3종 증정
          </p>
        </div>

        <Accordion items={details} />
      </div>
    </section>
  );
}
