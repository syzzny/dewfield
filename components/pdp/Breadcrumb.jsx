import Link from 'next/link';
import Label from '@/components/ui/Label';
import styles from './Breadcrumb.module.scss';

export default function Breadcrumb({ product }) {
  return (
    <div className={styles.bar}>
      <nav aria-label="현재 위치" className={styles.trail}>
        <Link href="/shop">스킨케어</Link>
        <span aria-hidden>/</span>
        <Link href={`/shop?category=${product.category}`}>{product.categoryKo}</Link>
        <span aria-hidden>/</span>
        <span aria-current="page">{product.korean}</span>
      </nav>
      <Label>The calming line — {product.no === 'Set' ? 'Set' : `No. ${product.no}`}</Label>
    </div>
  );
}
