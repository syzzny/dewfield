import Img from '@/components/ui/Img';
import Label from '@/components/ui/Label';
import Rich from '@/components/ui/Rich';
import styles from './Dose.module.scss';

/** 거대한 숫자 + 제품 이미지 반쪽 (세럼: Three drops) */
export default function Dose({ label, number, title, italic, body, fact, image }) {
  const count = Number(number) || 3;
  return (
    <section className={styles.banner}>
      <Img src={image} sat={-0.15} className={styles.img} sizes="(max-width: 900px) 100vw, 50vw" />
      <Label tone="cream" className={styles.label}>
        {label}
      </Label>
      <p className={styles.number} aria-hidden data-reveal="rise">
        {number}
      </p>
      <div className={styles.copy}>
        <Rich as="h2" text={title} italic={italic} className={styles.title} />
        <p className={styles.body}>{body}</p>
        <span className={styles.drops} aria-hidden data-reveal="scene">
          {Array.from({ length: count }, (_, i) => (
            <svg key={i} viewBox="0 0 18 28" style={{ '--i': i }}>
              <path d="M9 0C9 0 0 12 0 18.5A9 9 0 0 0 18 18.5C18 12 9 0 9 0Z" />
            </svg>
          ))}
        </span>
        <div className={styles.fact}>
          <span className={styles.factValue}>{fact.value}</span>
          <span className={styles.factLabel}>{fact.label}</span>
        </div>
      </div>
    </section>
  );
}
