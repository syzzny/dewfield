import Link from 'next/link';
import { cx } from '@/lib/format';
import Img from './Img';
import Label from './Label';
import styles from './StoryCard.module.scss';

/**
 * 저널 카드
 * variant: home(라벨 + 한글 제목) | grid(카테고리·날짜 + 영문 + 한글) | related
 */
export default function StoryCard({ story, variant = 'grid', className }) {
  const title = story.title.replace(/\n/g, ' ');
  return (
    <Link href={`/journal/${story.slug}`} className={cx(styles.card, styles[variant], className)} data-reveal="up">
      <Img src={story.image} sat={-0.2} className={styles.img} sizes="(max-width: 900px) 80vw, 33vw" />
      {variant === 'home' ? (
        <>
          <Label className={styles.small}>Journal</Label>
          <span className={styles.ko}>{story.korean}</span>
        </>
      ) : (
        <>
          <span className={styles.metaRow}>
            <Label tone="olive">{story.category}</Label>
            {variant === 'grid' && <Label>{story.date}</Label>}
          </span>
          <span className={styles.en}>{title}</span>
          <span className={styles.sub}>{story.korean}</span>
        </>
      )}
    </Link>
  );
}
