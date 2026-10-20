import IndexRow from '@/components/ui/IndexRow';
import Img from '@/components/ui/Img';
import Label from '@/components/ui/Label';
import SectionHead from '@/components/ui/SectionHead';
import styles from './TextureIngredients.module.scss';

/** 제형 스와치(콜아웃 2개) + 성분 리스트 */
export default function TextureIngredients({
  product,
  order,
  total,
  index,
  title,
  italic,
  body,
  image,
  callouts,
  ingredients,
}) {
  return (
    <section className={styles.section}>
      <IndexRow
        left={`(${order})  ${index}`}
        right={`${product.name} — ${order} / ${total}`}
        mobileRight={`${order} / ${total}`}
      />
      <SectionHead title={title} italic={italic} body={body} size="l" />
      <div className={styles.body}>
        <div className={styles.swatch}>
          <Img src={image} sat={0} blend="multiply" className={styles.img} reveal="fade" />
          <svg className={styles.lines} viewBox="0 0 660 660" aria-hidden data-reveal="scene">
            <polyline points="370,290 370,150 580,150" pathLength={1} />
            <circle cx="370" cy="290" r="3.5" />
            <polyline points="290,390 290,520 90,520" pathLength={1} />
            <circle cx="290" cy="390" r="3.5" />
          </svg>
          {callouts.map((c, i) => (
            <div key={c.title} className={styles[`callout${i}`]}>
              <span className={styles.calloutTitle}>{c.title}</span>
              <span className={styles.calloutText}>{c.text}</span>
            </div>
          ))}
        </div>
        <ul className={styles.list}>
          {ingredients.map((ing) => (
            <li key={ing.en} data-reveal="up">
              <span className={styles.value}>{ing.value}</span>
              <span className={styles.info}>
                <span className={styles.nameRow}>
                  <span className={styles.ko}>{ing.ko ?? ing.name}</span>
                  <Label>{ing.en}</Label>
                </span>
                <span className={styles.text}>{ing.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
