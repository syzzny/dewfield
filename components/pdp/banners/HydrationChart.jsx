import Label from '@/components/ui/Label';
import SectionHead from '@/components/ui/SectionHead';
import styles from './HydrationChart.module.scss';

// 시간축은 앞쪽이 촘촘하도록 로그 비슷한 간격을 써요 (디자인 기준 위치)
const X = { 0: 0, 1: 0.08, 6: 0.22, 12: 0.42, 24: 0.68, 48: 1 };
const xOf = (h) => X[h] ?? h / 48;

/** 48시간 수분 지속 그래프 — SVG 선 + HTML 라벨 */
export default function HydrationChart({ label, title, italic, body, hours, series, callouts, legend, note }) {
  const pts = (values) => values.map((v, i) => `${xOf(hours[i]) * 1000},${(100 - v) * 4}`).join(' ');
  const area = `0,400 ${pts(series.product)} 1000,400`;

  return (
    <section className={styles.banner}>
      <div className={styles.inner}>
        <Label tone="sage" className={styles.label}>
          {label}
        </Label>
        <SectionHead title={title} italic={italic} body={body} size="l" dark />

        <div className={styles.chart}>
          <div className={styles.yAxis} aria-hidden>
            {[100, 75, 50, 25].map((v) => (
              <span key={v} style={{ top: `${(100 - v) * 1}%` }} className={v % 50 ? styles.minor : undefined}>
                <Label>{v}</Label>
              </span>
            ))}
          </div>
          <div className={styles.plot} data-reveal="scene">
            <svg
              viewBox="0 0 1000 400"
              preserveAspectRatio="none"
              role="img"
              aria-label="48시간 피부 수분 지수 비교 그래프"
            >
              <defs>
                <linearGradient id="hydra-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#c6cdb3" stopOpacity="0.28" />
                  <stop offset="1" stopColor="#c6cdb3" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polygon points={area} fill="url(#hydra-area)" />
              <polyline points={pts(series.standard)} className={styles.standard} />
              <polyline points={pts(series.product)} className={styles.product} />
            </svg>
            {series.product.map((v, i) => (
              <span
                key={i}
                className={styles.dot}
                style={{ left: `${xOf(hours[i]) * 100}%`, top: `${100 - v}%`, '--i': xOf(hours[i]) }}
              />
            ))}
            {callouts.map((c) => (
              <div
                key={c.value}
                className={xOf(hours[c.index]) > 0.85 ? `${styles.callout} ${styles.calloutEnd}` : styles.callout}
                style={{ left: `${xOf(hours[c.index]) * 100}%`, top: `${100 - series.product[c.index]}%` }}
              >
                <span className={styles.calloutValue}>{c.value}</span>
                <span className={styles.calloutText}>{c.text}</span>
              </div>
            ))}
            <div className={styles.xAxis}>
              {hours.map((h) => (
                <span key={h} style={{ left: `${xOf(h) * 100}%` }} className={h === 1 ? styles.hideMobile : undefined}>
                  <Label>{h}H</Label>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.legend}>
          <span className={styles.key}>
            <i className={styles.keyProduct} />
            {legend[0]}
          </span>
          <span className={styles.key}>
            <i className={styles.keyStandard} />
            {legend[1]}
          </span>
          <span className={styles.note}>{note}</span>
        </div>
      </div>
    </section>
  );
}
