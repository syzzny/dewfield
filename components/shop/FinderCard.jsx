import Link from 'next/link';
import { cx } from '@/lib/format';
import Label from '@/components/ui/Label';
import Rich from '@/components/ui/Rich';
import styles from './FinderCard.module.scss';

/** 쇼핑 그리드 속 피부 진단 카드 */
export default function FinderCard({ className }) {
  return (
    <Link href="/skin-finder" className={cx(styles.card, className)}>
      <Label tone="sage">
        (Skin finder) <span className={styles.desktopOnly}>5 questions · </span>1 min
      </Label>
      <div className={styles.body}>
        <Rich text={'Not sure\nwhere to start?'} italic="where to start?" className={styles.title} />
        <p className={styles.text}>
          다섯 개의 질문으로 지금 피부에 맞는
          <br />
          성분과 루틴을 골라드려요.
        </p>
        <span className={styles.cta}>
          피부 진단 시작하기 <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}
