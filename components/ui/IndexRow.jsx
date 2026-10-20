import { cx } from '@/lib/format';
import Label from './Label';
import styles from './IndexRow.module.scss';

/**
 * 섹션 상단 hairline 행 — "(02)  PHILOSOPHY ——— DEWFIELD — 02 / 07"
 * dark: 어두운 배경 위 (cream 라인)
 * mobileRight: 모바일에서 오른쪽에 대신 보여줄 짧은 문구
 */
export default function IndexRow({ left, right, mobileRight, dark = false, strong = false, className }) {
  return (
    <div className={cx(styles.row, dark && styles.dark, strong && styles.strong, className)} data-reveal="line">
      <Label>{left}</Label>
      {right && (
        <Label className={cx(styles.right, mobileRight && styles.hideMobile)} tone={strong ? undefined : 'soft'}>
          {right}
        </Label>
      )}
      {mobileRight && (
        <Label className={styles.showMobile} tone="soft">
          {mobileRight}
        </Label>
      )}
    </div>
  );
}
