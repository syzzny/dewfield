import Img from '@/components/ui/Img';
import IndexRow from '@/components/ui/IndexRow';
import Label from '@/components/ui/Label';
import Rich from '@/components/ui/Rich';
import { cx } from '@/lib/format';
import styles from './Schedule.module.scss';

/** 아침 / 저녁 사용표 (세트: Three by day, four by night) */
export default function Schedule({ label, aside, title, italic, image, columns, rows }) {
  return (
    <section className={styles.banner}>
      <Img src={image} sat={-0.15} className={styles.img} parallax={0.1} />
      <div className={styles.inner}>
        <IndexRow left={label} right={aside} strong className={styles.index} />
        <Rich as="h2" text={title} italic={italic} className={styles.title} />

        <table className={styles.table}>
          <thead>
            <tr>
              <th aria-label="시간" />
              {columns.map((c) => (
                <th key={c} scope="col">
                  <Label>{c}</Label>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.title} className={cx(row.accent && styles.evening)} data-reveal="fade">
                <th scope="row">
                  <span className={styles.rowTitle}>{row.title}</span>
                  <span className={styles.rowTime}>{row.time}</span>
                </th>
                {row.cells.map((cell, i) => (
                  <td key={i} className={cx(!cell && styles.skip)}>
                    <i className={styles.mark} />
                    <span className={styles.mobileStep}>{columns[i].replace(/^\d+\s+/, '')}</span>
                    {cell ?? '건너뛰기'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
