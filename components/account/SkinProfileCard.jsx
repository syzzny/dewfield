import Link from 'next/link';
import Label from '@/components/ui/Label';
import Rich from '@/components/ui/Rich';
import { cx } from '@/lib/format';
import styles from './SkinProfileCard.module.scss';

/** 피부 프로필 카드 — 마이페이지 · 진단 결과에서 함께 써요. */
export default function SkinProfileCard({ profile, retake = true }) {
  return (
    <div className={styles.card}>
      <div className={styles.summary}>
        <Label tone="sage">(Skin profile) Updated {profile.updated}</Label>
        <Rich as="h2" text={profile.title} italic={profile.italic} className={styles.title} />
        <ul className={styles.tags}>
          {profile.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        {retake && (
          <div className={styles.links}>
            <Link href="/skin-finder">Retake skin finder →</Link>
            <Link href="/shop/the-ritual-set">My ritual</Link>
          </div>
        )}
      </div>
      <div className={styles.metrics}>
        <ProfileMetrics metrics={profile.metrics} note={profile.note} />
      </div>
    </div>
  );
}

/** 지표 막대 — 민감도 · 수분 · 유분 · 장벽 (prev가 있으면 이전 값과 비교) */
export function ProfileMetrics({ metrics, note }) {
  return (
    <>
      {metrics.map((m) => {
        const delta = m.prev == null ? null : m.value - m.prev;
        return (
          <div key={m.label} className={styles.metric}>
            <span className={styles.metricLabel}>{m.label}</span>
            <span className={styles.track} style={{ '--v': m.value / 100, '--p': (m.prev ?? m.value) / 100 }}>
              <i className={styles.fill} />
              {m.prev != null && <i className={styles.prev} />}
              <i className={styles.knob} />
            </span>
            <span className={styles.value}>{m.value}</span>
            {delta != null && (
              <span className={cx(styles.delta, (m.label === '민감도' ? delta < 0 : delta > 0) && styles.good)}>
                {delta > 0 ? `+${delta}` : `−${Math.abs(delta)}`}
              </span>
            )}
          </div>
        );
      })}
      {note && <p className={styles.note}>○ {note}</p>}
    </>
  );
}
