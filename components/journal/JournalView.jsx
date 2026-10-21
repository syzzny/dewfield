'use client';

import Link from 'next/link';
import { useState } from 'react';
import { JOURNAL_CATEGORIES, stories, featuredStory } from '@/data/journal';
import { cx } from '@/lib/format';
import IndexRow from '@/components/ui/IndexRow';
import Img from '@/components/ui/Img';
import Label from '@/components/ui/Label';
import Rich from '@/components/ui/Rich';
import TextLink from '@/components/ui/TextLink';
import StoryCard from '@/components/ui/StoryCard';
import Newsletter from './Newsletter';
import styles from './Journal.module.scss';

export default function JournalView() {
  const [cat, setCat] = useState('All');
  const list = stories.filter((s) => !s.featured && (cat === 'All' || s.category === cat));
  const showFeatured = cat === 'All' || featuredStory.category === cat;

  return (
    <>
      <header className={styles.header} data-intro>
        <IndexRow left="(Journal)  Slow notes" right="Vol. 03 — Autumn 2026" mobileRight="Vol. 03" strong />
        <Rich as="h1" text="Slow notes on skin." italic="on skin." className={styles.title} />
        <div className={styles.tabs} role="tablist">
          {JOURNAL_CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={cat === c}
              className={cx(styles.tab, cat === c && styles.tabOn)}
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </header>

      {showFeatured && (
        <article className={styles.featured}>
          <Link href={`/journal/${featuredStory.slug}`} className={styles.featuredMedia}>
            <Img src={featuredStory.image} className={styles.featuredImg} sizes="(max-width: 900px) 100vw, 60vw" />
          </Link>
          <div className={styles.featuredText}>
            <Label tone="olive">
              Featured — {featuredStory.category} · {featuredStory.readTime}
            </Label>
            <Rich as="h2" text={featuredStory.title} italic={featuredStory.italic} className={styles.featuredTitle} />
            <p className={styles.excerpt}>{featuredStory.excerpt}</p>
            <TextLink href={`/journal/${featuredStory.slug}`}>Read the story</TextLink>
          </div>
        </article>
      )}

      <section className={styles.grid}>
        {list.map((s) => (
          <StoryCard key={s.slug} story={s} />
        ))}
        {list.length === 0 && <p className={styles.empty}>이 카테고리의 글을 준비하고 있어요.</p>}
      </section>

      <Newsletter />
    </>
  );
}
