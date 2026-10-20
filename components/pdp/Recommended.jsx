'use client';

import { useRef, useState } from 'react';
import { getRelated } from '@/data/products';
import { cx } from '@/lib/format';
import IndexRow from '@/components/ui/IndexRow';
import ProductTile from '@/components/ui/ProductTile';
import SectionHead from '@/components/ui/SectionHead';
import styles from './Recommended.module.scss';

export default function Recommended({ product, order, total }) {
  const items = getRelated(product.slug);
  const strip = useRef(null);
  const [page, setPage] = useState(0);

  // 모바일 가로 스크롤 위치 → 페이지 표시
  const onScroll = () => {
    const el = strip.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setPage(max > 0 ? Math.round((el.scrollLeft / max) * (items.length - 2)) : 0);
  };

  return (
    <section className={styles.section}>
      <IndexRow
        left={`(${order})  Complete the ritual`}
        right={`${product.name} — ${order} / ${total}`}
        mobileRight={`${order} / ${total}`}
      />
      <SectionHead
        title={'Complete\nthe ritual.'}
        italic="the ritual."
        body={'함께 쓰면 더 깊어지는\n듀필드의 데일리 루틴.'}
        size="m"
        className={styles.head}
      />
      <div className={styles.grid} ref={strip} onScroll={onScroll}>
        {items.map((p) => (
          <ProductTile key={p.slug} product={p} className={styles.tile} />
        ))}
      </div>
      <span className={styles.pager} aria-hidden>
        {items.slice(0, items.length - 1).map((p, i) => (
          <i key={p.slug} className={cx(i === page && styles.on)} />
        ))}
      </span>
    </section>
  );
}
