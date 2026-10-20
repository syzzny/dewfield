'use client';

import Link from 'next/link';
import { getProduct } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { won, pad } from '@/lib/format';
import Img from '@/components/ui/Img';
import Label from '@/components/ui/Label';
import styles from './Article.module.scss';

// 본문 블록 렌더러 — data/journal.js의 body 배열을 순서대로 그려요.
function ProductMention({ slug }) {
  const { add } = useCart();
  const p = getProduct(slug);
  if (!p) return null;
  return (
    <aside className={styles.mention}>
      <Link href={`/shop/${p.slug}`} className={styles.mentionImg}>
        <Img src={p.image} alt={p.name} reveal={false} />
      </Link>
      <div className={styles.mentionText}>
        <Label tone="olive">In this story</Label>
        <Link href={`/shop/${p.slug}`} className={styles.mentionName}>
          {p.name}
        </Link>
        <span className={styles.mentionMeta}>
          {p.korean} · {won(p.price)}
        </span>
      </div>
      <button type="button" className={styles.mentionAdd} onClick={() => add(p.slug)}>
        담기 +
      </button>
    </aside>
  );
}

export default function ArticleBody({ blocks }) {
  return (
    <div className={styles.body}>
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'lead':
            return (
              <p key={i} className={styles.lead}>
                {b.text}
              </p>
            );
          case 'text':
            return (
              <p key={i} className={styles.text}>
                {b.text}
              </p>
            );
          case 'quote':
            return (
              <blockquote key={i} className={styles.quote}>
                <p>{b.text}</p>
                <footer>{b.translation}</footer>
              </blockquote>
            );
          case 'images':
            return (
              <figure key={i} className={styles.figure}>
                <div className={styles.images}>
                  {b.items.map((src) => (
                    <Img key={src} src={src} className={styles.inlineImg} />
                  ))}
                </div>
                {b.caption && <figcaption>{b.caption}</figcaption>}
              </figure>
            );
          case 'steps':
            return (
              <ol key={i} className={styles.steps}>
                {b.items.map((s, n) => (
                  <li key={s.en}>
                    <span className={styles.stepNo}>{pad(n + 1)}</span>
                    <span className={styles.stepEn}>{s.en}</span>
                    <span className={styles.stepText}>{s.text}</span>
                  </li>
                ))}
              </ol>
            );
          case 'product':
            return <ProductMention key={i} slug={b.slug} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
