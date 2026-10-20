import CountUp from '@/components/motion/CountUp';
import { images } from '@/data/images';
import { ingredients } from '@/data/ingredients';
import IndexRow from '@/components/ui/IndexRow';
import Img from '@/components/ui/Img';
import Label from '@/components/ui/Label';
import Rich from '@/components/ui/Rich';
import styles from './Ingredients.module.scss';

export default function Ingredients({ index = '(04)  Ingredients', count = '04 / 07', id }) {
  return (
    <section className={styles.section} id={id}>
      <Img src={images.light} sat={-0.3} className={styles.light} reveal={false} />
      <div className={styles.content}>
        <IndexRow left={index} right={`Dewfield — ${count}`} mobileRight={count} dark />
        <div className={styles.titleRow}>
          <Rich as="h2" text={'What’s inside,\nand why.'} italic="and why." className={styles.title} />
          <p className={styles.lead}>
            전 성분 23가지. 피부를 자극할 수 있는 것은
            <br />
            처음부터 빼고, 꼭 필요한 네 가지만 남겼어요.
          </p>
        </div>
        <ul className={styles.columns}>
          {ingredients.map((item) => (
            <li key={item.id} className={styles.col} data-reveal="up">
              <Img src={item.image} sat={-0.25} className={styles.img} />
              <div className={styles.meta}>
                <div className={styles.valueRow}>
                  <CountUp value={item.value} className={styles.value} />
                  <Label tone="sage">
                    <span className={styles.desktopOnly}>{item.en}</span>
                    <span className={styles.mobileOnly}>{item.shortEn ?? item.en}</span>
                  </Label>
                </div>
                <p className={styles.name}>{item.ko}</p>
                <p className={styles.text}>{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
