import IndexRow from '@/components/ui/IndexRow';
import Img from '@/components/ui/Img';
import { pad } from '@/lib/format';
import styles from './HowToUse.module.scss';

/** 사용 방법 — 이미지 + 번호 단계 리스트 */
export default function HowToUse({ product, order, total, index, title, imageCaption, image, steps, tip }) {
  return (
    <section className={styles.section}>
      <IndexRow
        left={`(${order})  ${index}`}
        right={`${product.name} — ${order} / ${total}`}
        mobileRight={`${order} / ${total}`}
      />
      <div className={styles.body}>
        <div className={styles.visual}>
          <Img
            src={image}
            sat={-0.25}
            position="65% 50%"
            className={styles.img}
            sizes="(max-width: 900px) 100vw, 50vw"
          />
          <p className={styles.caption}>{imageCaption}</p>
        </div>
        <div className={styles.steps}>
          <h2 className={styles.title}>{title}</h2>
          <ol className={styles.list}>
            {steps.map((s, i) => (
              <li key={s.en} data-reveal="up">
                <span className={styles.no}>{pad(i + 1)}</span>
                <span className={styles.text}>
                  <span className={styles.head}>
                    <span className={styles.en}>{s.en}</span>
                    <span className={styles.ko}>{s.ko}</span>
                  </span>
                  <span className={styles.desc}>{s.text}</span>
                </span>
              </li>
            ))}
          </ol>
          {tip && (
            <p className={styles.tip}>
              <em>Tip —</em> {tip}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
