import { notFound } from 'next/navigation';
import { stories, getStory, getRelatedStories } from '@/data/journal';
import IndexRow from '@/components/ui/IndexRow';
import Img from '@/components/ui/Img';
import Label from '@/components/ui/Label';
import Rich from '@/components/ui/Rich';
import TextLink from '@/components/ui/TextLink';
import StoryCard from '@/components/ui/StoryCard';
import ArticleBody from '@/components/journal/ArticleBody';
import styles from '@/components/journal/Article.module.scss';

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }) {
  const story = getStory(params.slug);
  if (!story) return {};
  return { title: story.title.replace(/\n/g, ' '), description: story.korean };
}

export default function ArticlePage({ params }) {
  const story = getStory(params.slug);
  if (!story) notFound();
  const related = getRelatedStories(story.slug);

  return (
    <article>
      <header className={styles.header}>
        <IndexRow
          left={`(Journal)  ${story.category}`}
          right={`${story.readTime} — ${story.date}`}
          mobileRight={story.date}
          strong
        />
        <Rich as="h1" text={story.title} italic={story.italic} className={styles.title} />
        <p className={styles.subtitle}>{story.subtitle ?? story.korean}</p>
        <div className={styles.credits}>
          {(story.credits ?? ['Words — Dewfield editors']).map((c) => (
            <Label key={c}>{c}</Label>
          ))}
        </div>
      </header>

      <Img src={story.image} sat={-0.2} className={styles.hero} eager parallax={0.1} />

      <ArticleBody blocks={story.body} />

      <section className={styles.related}>
        <div className={styles.relatedHead}>
          <Rich as="h2" text="Keep reading." italic="reading." className={styles.relatedTitle} />
          <TextLink href="/journal" arrow>
            All stories
          </TextLink>
        </div>
        <div className={styles.relatedGrid}>
          {related.map((s) => (
            <StoryCard key={s.slug} story={s} variant="related" />
          ))}
        </div>
      </section>
    </article>
  );
}
