import Link from 'next/link';
import { cx } from '@/lib/format';
import styles from './Button.module.scss';

/**
 * 버튼 / 링크 버튼
 * variant: primary(올리브 다크) | secondary(외곽선) | light(크림, 어두운 배경 위)
 * block: 가로 꽉 채우고 라벨·trailing을 양 끝으로
 * caps: 영문 대문자 라벨 서체 (SHOP THE RITUAL)
 */
export default function Button({
  children,
  trailing,
  href,
  variant = 'primary',
  block = false,
  caps = false,
  className,
  ...rest
}) {
  const cls = cx(styles.button, styles[variant], block && styles.block, caps && styles.caps, className);
  const content = (
    <>
      <span className={styles.text}>{children}</span>
      {trailing && <span className={styles.trailing}>{trailing}</span>}
    </>
  );
  if (href) {
    return (
      <Link href={href} className={cls} {...rest}>
        {content}
      </Link>
    );
  }
  return (
    <button type="button" className={cls} {...rest}>
      {content}
    </button>
  );
}
