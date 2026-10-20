import CountUp from '@/components/motion/CountUp';
import { number } from '@/lib/format';
import IndexRow from '@/components/ui/IndexRow';
import Label from '@/components/ui/Label';
import Stars from '@/components/ui/Stars';
import TextLink from '@/components/ui/TextLink';
import Button from '@/components/ui/Button';
import styles from './Reviews.module.scss';

export default function Reviews({ product, order, total }) {
  const { reviews } = product;
  const count = number(product.reviewCount);
  return (
    <section className={styles.section} id="reviews">
      <div className={styles.inner}>
        <IndexRow
          left={`(${order})  Reviews`}
          right={`${product.name} — ${order} / ${total}`}
          mobileRight={`${order} / ${total}`}
        />
        <div className={styles.top}>
          <div className={styles.score}>
            <CountUp value={String(product.rating)} className={styles.big} />
            <span className={styles.scoreMeta}>
              <Stars value={product.rating}>
                <span className={styles.desktopOnly}> {count} reviews</span>
              </Stars>
              <span className={styles.mobileOnly}>
                리뷰 {count}개
                <br />
                {reviews.facts[0].label} {reviews.facts[0].value}
              </span>
            </span>
          </div>
          <div className={styles.quote}>
            <p className={styles.quoteText}>{reviews.quote}</p>
            <Label as="cite">{reviews.author}</Label>
            <ul className={styles.facts}>
              {reviews.facts.map((f) => (
                <li key={f.label}>
                  <CountUp value={f.value} className={styles.factValue} />
                  <span className={styles.factLabel}>{f.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <ul className={styles.list}>
          {reviews.items.map((r) => (
            <li key={r.title} data-reveal="up">
              <Stars />
              <p className={styles.title}>{r.title}</p>
              <p className={styles.body}>{r.body}</p>
              <Label className={styles.author}>{r.author}</Label>
            </li>
          ))}
        </ul>
        <TextLink href="#reviews" className={styles.desktopOnly}>
          Read all {count} reviews
        </TextLink>
        <Button variant="secondary" className={styles.mobileAll}>
          리뷰 {count}개 모두 보기
        </Button>
      </div>
    </section>
  );
}
