'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CATEGORIES, products, getProductsByCategory } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { won, cx } from '@/lib/format';
import IndexRow from '@/components/ui/IndexRow';
import Img from '@/components/ui/Img';
import Label from '@/components/ui/Label';
import Rich from '@/components/ui/Rich';
import ProductTile from '@/components/ui/ProductTile';
import Button from '@/components/ui/Button';
import styles from './ShopSection.module.scss';

export default function ShopSection() {
  const [category, setCategory] = useState('all');
  const { add } = useCart();

  const list = getProductsByCategory(category);
  // 전체 보기일 땐 베스트셀러를 크게, 나머지를 2×2로 — 디자인 그대로
  const feature = category === 'all' ? list[0] : null;
  const rest = feature ? list.slice(1) : list;

  return (
    <section className={styles.section}>
      <IndexRow left="(03)  The calming line" right="Dewfield — 03 / 07" mobileRight="03 / 07" />

      <div className={styles.titleRow}>
        <Rich as="h2" text={'The Calming\nLine'} italic="Line" className={styles.title} />
        <div className={styles.aside}>
          <p>
            세안부터 크림까지, 네 단계로 완성하는
            <br />
            듀필드의 데일리 장벽 루틴.
          </p>
          <div className={styles.filters} role="tablist" aria-label="카테고리">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={category === c.id}
                className={cx(styles.filter, category === c.id && styles.active)}
                onClick={() => setCategory(c.id)}
              >
                {c.id === 'all' ? `All (${products.length})` : c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={cx(styles.grid, !feature && styles.gridFlat)}>
        {feature && (
          <article className={styles.feature}>
            <Link href={`/shop/${feature.slug}`} className={styles.featureMedia}>
              <Img src={feature.image} className={styles.featureImg} sizes="(max-width: 900px) 100vw, 50vw" />
              <Label className={styles.featureTag}>
                {feature.badge} — No. {feature.no}
              </Label>
              <span className={styles.featureNo}>{feature.no}</span>
            </Link>
            <div className={styles.featureMeta}>
              <div>
                <Link href={`/shop/${feature.slug}`} className={styles.featureName}>
                  {feature.name}
                </Link>
                <p className={styles.featureKo}>
                  {feature.korean}
                  <span className={styles.desktopOnly}> · {feature.tagline}</span>
                </p>
              </div>
              <div className={styles.featureBuy}>
                <span>{won(feature.price)}</span>
                <button type="button" className={styles.add} onClick={() => add(feature.slug)}>
                  Add to bag +
                </button>
              </div>
            </div>
          </article>
        )}

        <div className={styles.small}>
          {rest.map((p) => (
            <ProductTile key={p.slug} product={p} className={styles.tile} />
          ))}
        </div>
      </div>

      <Button href="/shop" variant="secondary" className={styles.viewAll}>
        전체 상품 보기
      </Button>
    </section>
  );
}
