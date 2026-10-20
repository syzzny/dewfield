import Link from 'next/link';
import { cx } from '@/lib/format';
import styles from './TextLink.module.scss';

/** 밑줄 라벨 링크 — "SHOP THE LINE →" */
export default function TextLink({ href = '#', children, arrow = true, tone, subtle = false, className, ...rest }) {
  const Tag = href ? Link : 'button';
  return (
    <Tag
      href={href || undefined}
      className={cx(styles.link, tone && styles[tone], subtle && styles.subtle, className)}
      {...rest}
    >
      {children}
      {arrow && <span aria-hidden> →</span>}
    </Tag>
  );
}
