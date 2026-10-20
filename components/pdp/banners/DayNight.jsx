import Img from '@/components/ui/Img';
import Label from '@/components/ui/Label';
import Rich from '@/components/ui/Rich';
import styles from './DayNight.module.scss';

// 06:00 기준 24시간 타임라인에서의 위치 (0~1)
const pos = (h) => ((h - 6 + 24) % 24) / 24;
const HOURS = [6, 9, 12, 15, 18, 21, 24, 3, 6];

/** 낮/밤 분할 + 24시간 타임라인 (크림) */
export default function DayNight({ label, day, night, image, morning, repair }) {
  const from = pos(repair.from);
  const to = pos(repair.to) || 1;
  return (
    <section className={styles.banner}>
      <Img src={image} sat={-0.1} className={styles.img} parallax={0.08} />
      <span className={styles.shade} />
      <Label className={styles.label}>{label}</Label>

      <div className={styles.day}>
        <Label tone="olive">{day.label}</Label>
        <Rich as="h2" text={day.title} italic={day.italic} className={styles.title} />
        <p className={styles.body}>{day.body}</p>
      </div>

      <div className={styles.night}>
        <Label tone="sage">{night.label}</Label>
        <Rich as="h2" text={night.title} italic={night.italic} className={styles.title} />
        <p className={styles.body}>{night.body}</p>
      </div>

      <div className={styles.timeline} data-reveal="scene" aria-label={`회복 시간 ${repair.label}`}>
        <span className={styles.line} />
        {HOURS.map((h, i) => {
          const p = i === HOURS.length - 1 ? 1 : pos(h);
          return (
            <span key={i} className={styles.hour} style={{ '--p': p }} data-dark={p >= 0.5 || undefined}>
              <Label>{String(h % 24 === 0 ? 24 : h).padStart(2, '0')}:00</Label>
            </span>
          );
        })}
        <span className={styles.repair} style={{ '--from': from, '--to': to }}>
          <Label tone="sage">{repair.label}</Label>
        </span>
        <span className={styles.morning} style={{ '--p': pos(morning.hour) }}>
          <Label tone="olive">{morning.label}</Label>
        </span>
      </div>
    </section>
  );
}
