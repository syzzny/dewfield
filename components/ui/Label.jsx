import { cx } from '@/lib/format';
import styles from './Label.module.scss';

/** UPPERCASE 라벨 (Instrument Sans Medium) — tone: ink | soft | olive | sage | cream */
export default function Label({ children, tone, as: Tag = 'span', className, ...rest }) {
  return (
    <Tag className={cx(styles.label, tone && styles[tone], className)} {...rest}>
      {children}
    </Tag>
  );
}
