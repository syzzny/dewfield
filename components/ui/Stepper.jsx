import styles from './Stepper.module.scss';

/** 수량 조절 — Figma "Ed / Stepper" */
export default function Stepper({ value, onChange, min = 1, max = 99, label = '수량' }) {
  return (
    <div className={styles.stepper} role="group" aria-label={label}>
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="수량 줄이기"
      >
        −
      </button>
      <span className={styles.value} aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="수량 늘리기"
      >
        +
      </button>
    </div>
  );
}
