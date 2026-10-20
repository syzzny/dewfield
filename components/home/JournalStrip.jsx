import { homeStories } from '@/data/journal';
import IndexRow from '@/components/ui/IndexRow';
import Rich from '@/components/ui/Rich';
import TextLink from '@/components/ui/TextLink';
import StoryCard from '@/components/ui/StoryCard';
import styles from './JournalStrip.module.scss';

export default function JournalStrip() {
  return (
    <section className={styles.section}>
      <IndexRow left="(07)  Journal" right="Dewfield — 07 / 07" mobileRight="07 / 07" />
      <div className={styles.head}>
        <Rich as="h2" text={'Slow notes\non skin.'} italic="on skin." className={styles.title} />
        <TextLink href="/journal" subtle className={styles.link}>
          @dewfield.ritual
        </TextLink>
      </div>
      <div className={styles.strip}>
        {homeStories.map((story) => (
          <StoryCard key={story.slug} story={story} variant="home" className={styles.card} />
        ))}
      </div>
    </section>
  );
}
