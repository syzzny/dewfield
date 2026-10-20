import Link from 'next/link';
import { won, cx } from '@/lib/format';
import Img from './Img';
import Label from './Label';
import styles from './ProductTile.module.scss';

/**
 * 상품 타일 — Figma "Ed / Product tile" / "Ed / Product tile compact"
 * compact: 모바일 2열 그리드나 가로 스크롤에서 쓰는 작은 타일
 */
export default function ProductTile({ product, compact = false, badge, showSize = false, className }) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className={cx(styles.tile, compact && styles.compact, className)}
      data-reveal="up"
    >
      <span className={styles.media}>
        <Img src={product.image} alt={product.name} className={styles.img} />
        <Label className={styles.tag}>{product.tag}</Label>
        {badge && <Label className={styles.badge}>{badge}</Label>}
      </span>
      <span className={styles.meta}>
        <span className={styles.names}>
          <span className={styles.name}>
            {compact ? (
              product.shortName
            ) : (
              <>
                <span className={styles.full}>{product.name}</span>
                <span className={styles.short}>{product.shortName}</span>
              </>
            )}
          </span>
          <span className={styles.korean}>
            {product.korean}
            {showSize && !product.isSet && <span className={styles.size}> · {product.size}</span>}
          </span>
        </span>
        <span className={styles.price}>{won(product.price)}</span>
      </span>
    </Link>
  );
}
