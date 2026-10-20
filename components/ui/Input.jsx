import { useId } from 'react';
import { cx } from '@/lib/format';
import styles from './Input.module.scss';

/**
 * 밑줄 입력창 — Figma "Ed / Input"
 * action: 오른쪽 텍스트 버튼(주소 검색, 변경 …)
 * as="select"면 options로 셀렉트를 그려요.
 */
export default function Input({ label, action, onAction, as = 'input', options = [], className, error, ...rest }) {
  const id = useId();
  return (
    <div className={cx(styles.field, error && styles.hasError, className)}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div className={styles.control}>
        {as === 'select' ? (
          <>
            <select id={id} {...rest}>
              {options.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
            <span className={styles.caret} aria-hidden>
              ▾
            </span>
          </>
        ) : (
          <input id={id} {...rest} />
        )}
        {action && (
          <button type="button" className={styles.action} onClick={onAction}>
            {action}
          </button>
        )}
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
