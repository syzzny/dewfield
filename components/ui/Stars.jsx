import styles from './Stars.module.scss';

export default function Stars({ value = 5, children }) {
  return (
    <span className={styles.stars} aria-label={`별점 ${value}점`}>
      <span aria-hidden>{'★'.repeat(Math.round(value))}</span>
      {children}
    </span>
  );
}
