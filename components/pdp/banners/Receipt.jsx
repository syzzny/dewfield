import Label from '@/components/ui/Label';
import Rich from '@/components/ui/Rich';
import { won, cx } from '@/lib/format';
import styles from './Receipt.module.scss';

// 바코드 — 고정 패턴(1·2·1·3·1·2 반복)
const BARS = Array.from({ length: 36 }, (_, i) => [1, 2, 1, 3, 1, 2][i % 6]);

/** 영수증으로 보여주는 세트 할인 (세트: Less spent, more ritual) */
export default function Receipt({ label, title, italic, body, orderNo, lines, adjustments, totalPrice, thanks }) {
  return (
    <section className={styles.banner}>
      <Label tone="cream" className={styles.label}>
        {label}
      </Label>
      <div className={styles.copy}>
        <Rich as="h2" text={title} italic={italic} className={styles.title} />
        <p className={styles.body}>{body}</p>
      </div>

      <div className={styles.receipt} data-reveal="scene" aria-label="세트 구성 영수증">
        <p className={styles.brand}>Dewfield</p>
        <Label className={styles.order}>{orderNo}</Label>
        <hr />
        <ul>
          {lines.map((l) => (
            <li key={l.label}>
              <span>{l.label}</span>
              <span className={styles.num}>{won(l.price)}</span>
            </li>
          ))}
        </ul>
        <hr />
        <ul>
          {adjustments.map((a) => (
            <li key={a.label} className={cx(a.accent && styles.accent, a.strike && styles.muted)}>
              <span>{a.label}</span>
              <span className={styles.num}>{a.strike ? <s>{won(a.price)}</s> : won(a.price)}</span>
            </li>
          ))}
        </ul>
        <hr />
        <p className={styles.total}>
          <span>Total</span>
          <span>{won(totalPrice)}</span>
        </p>
        <p className={styles.thanks}>{thanks}</p>
        <span className={styles.barcode} aria-hidden>
          {BARS.map((w, i) => (
            <i key={i} style={{ width: w }} />
          ))}
        </span>
      </div>
    </section>
  );
}
