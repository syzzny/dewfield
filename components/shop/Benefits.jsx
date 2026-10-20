import Label from '@/components/ui/Label';
import { pad } from '@/lib/format';
import styles from './Benefits.module.scss';

const ITEMS = [
  { en: 'Free shipping', ko: '3만 원 이상 무료배송' },
  { en: 'Samples, always', ko: '모든 주문 샘플 3종 증정' },
  { en: '30-day returns', ko: '개봉 후에도 30일 이내 반품' },
  { en: 'Skin finder', ko: '1분 진단으로 맞춤 추천' },
];

export default function Benefits() {
  return (
    <section className={styles.band}>
      {ITEMS.map((item, i) => (
        <div key={item.en} className={styles.item} data-reveal="up">
          <Label tone="olive">{pad(i + 1)}</Label>
          <p className={styles.en}>{item.en}</p>
          <p className={styles.ko}>{item.ko}</p>
        </div>
      ))}
    </section>
  );
}
