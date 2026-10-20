import { cx } from '@/lib/format';
import styles from './Chip.module.scss';

/** 알약 모양 선택 칩 — Figma "Ed / Chip" */
export default function Chip({ children, selected = false, onClick, href, size = 'm', dark = false, className }) {
  const cls = cx(styles.chip, styles[size], selected && styles.selected, dark && styles.dark, className);
  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={cls} aria-pressed={selected} onClick={onClick}>
      {children}
      {onClick && (
        <span className={styles.icon} aria-hidden>
          {selected ? '✕' : '+'}
        </span>
      )}
    </button>
  );
}
