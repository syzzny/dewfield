import CountUp from '@/components/motion/CountUp';
import { images } from '@/data/images';
import { getProduct } from '@/data/products';
import { number } from '@/lib/format';
import IndexRow from '@/components/ui/IndexRow';
import Img from '@/components/ui/Img';
import Label from '@/components/ui/Label';
import TextLink from '@/components/ui/TextLink';
import styles from './Proof.module.scss';

export default function Proof() {
  const toner = getProduct('cica-calming-toner');
  return (
    <section className={styles.section}>
      <Img src={images.portrait} sat={-0.25} className={styles.img} />
      <div className={styles.content}>
        <IndexRow left="(06)  Proof" right="Dewfield — 06 / 07" mobileRight="06 / 07" />
        <p className={styles.big}>
          <CountUp value="98%" />
        </p>
        <p className={styles.lead}>
          저자극 패치 테스트 통과. 4주 사용 후
          <br />
          붉은기가 줄었다고 답한 사람의 비율이에요.
        </p>
        <blockquote className={styles.quote}>
          <p>“달아오른 볼이 몇 분 만에 가라앉아요. 순한데 확실한, 이런 토너를 오래 찾았어요.”</p>
          <footer>
            <Label as="cite">정*희 — 민감성 피부, 30대</Label>
            <Label tone="olive">
              ★ {toner.rating} · {number(toner.reviewCount)} reviews
            </Label>
          </footer>
        </blockquote>
        <TextLink href={`/shop/${toner.slug}#reviews`} className={styles.link}>
          Read all reviews
        </TextLink>
      </div>
    </section>
  );
}
