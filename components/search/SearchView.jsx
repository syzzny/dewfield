'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { searchProducts, getProduct } from '@/data/products';
import { searchStories } from '@/data/journal';
import { cx } from '@/lib/format';
import IndexRow from '@/components/ui/IndexRow';
import Img from '@/components/ui/Img';
import Label from '@/components/ui/Label';
import Rich from '@/components/ui/Rich';
import Chip from '@/components/ui/Chip';
import Button from '@/components/ui/Button';
import ProductTile from '@/components/ui/ProductTile';
import styles from './SearchView.module.scss';

const RELATED = ['병풀', '붉은기', '민감성', '토너 팩'];
const SUGGEST = ['녹차', '칙칙한 톤', '수분'];

/** 검색어(q)는 서버(page.js)가 주소에서 읽어 넘겨줘요 — 결과가 처음부터 서버에서 그려져요 */
export default function SearchView({ q = '' }) {
  const router = useRouter();
  const [value, setValue] = useState(q);
  const [tab, setTab] = useState('all');
  const input = useRef(null);

  useEffect(() => setValue(q), [q]);
  useEffect(() => {
    if (!q) input.current?.focus();
  }, [q]);

  const go = (term) => router.replace(term ? `/search?q=${encodeURIComponent(term)}` : '/search', { scroll: false });

  const products = searchProducts(q);
  const stories = searchStories(q);
  const hasResults = products.length + stories.length > 0;

  return (
    <>
      <form
        className={styles.bar}
        onSubmit={(e) => {
          e.preventDefault();
          go(value);
        }}
        role="search"
      >
        <Label>(Search)</Label>
        <div className={styles.field}>
          <input
            ref={input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="무엇을 찾으세요?"
            aria-label="검색어"
            className={cx(!hasResults && q && styles.serifInput)}
          />
          {value && (
            <button type="button" onClick={() => go('')} className={styles.clear}>
              <span className={styles.desktopOnly}>Clear </span>✕
            </button>
          )}
        </div>
        {q && hasResults && (
          <p className={styles.summary}>
            <span className={styles.desktopOnly}>‘{q}’ 검색 결과 · </span>상품 {products.length} · 저널 {stories.length}
          </p>
        )}
        {q && hasResults && (
          <div className={styles.tabs}>
            {[
              ['all', 'All'],
              ['products', `Products (${products.length})`],
              ['journal', `Journal (${stories.length})`],
            ].map(([id, label]) => (
              <button key={id} type="button" className={cx(tab === id && styles.tabOn)} onClick={() => setTab(id)}>
                {label}
              </button>
            ))}
          </div>
        )}
      </form>

      {!q && (
        <div className={styles.idle}>
          <Label>Popular</Label>
          <div className={styles.chips}>
            {RELATED.map((r) => (
              <Chip key={r} size="s" onClick={() => go(r)}>
                {r}
              </Chip>
            ))}
          </div>
        </div>
      )}

      {q && hasResults && (
        <div className={styles.body}>
          <section className={cx(styles.products, tab === 'journal' && styles.hideMobile)}>
            <IndexRow
              left={`Products (${products.length})`}
              right="View all  →"
              strong
              className={styles.desktopOnly}
            />
            <div className={styles.productGrid}>
              {products.map((p) => (
                <ProductTile key={p.slug} product={p} />
              ))}
            </div>
          </section>
          <section className={cx(styles.journal, tab === 'products' && styles.hideMobile)}>
            <IndexRow left={`Journal (${stories.length})`} strong />
            {stories.map((s) => (
              <Link key={s.slug} href={`/journal/${s.slug}`} className={styles.story}>
                <Img src={s.image} className={styles.storyImg} reveal={false} sizes="200px" />
                <span className={styles.storyText}>
                  <span className={styles.storyTitle}>{s.title.replace(/\n/g, ' ')}</span>
                  <span className={styles.storyKo}>{s.korean}</span>
                </span>
              </Link>
            ))}
            <div className={styles.related}>
              <Label>Related</Label>
              <div className={styles.chips}>
                {RELATED.map((r) => (
                  <Chip key={r} size="s" onClick={() => go(r)}>
                    {r}
                  </Chip>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {q && !hasResults && (
        <div className={styles.none}>
          <div className={styles.noneText}>
            <Rich
              as="h1"
              text={'Nothing here,\nquite on purpose.'}
              italic="quite on purpose."
              className={styles.noneTitle}
            />
            <p className={styles.noneLead}>
              ‘{q}’와 일치하는 상품이 없어요.
              <br />
              듀필드는 자극이 될 수 있는 성분을 처음부터 쓰지 않아요.
              <br />
              대신 피부 톤을 맑게 하는 녹차 추출물을 담았어요.
            </p>
            <div className={styles.suggest}>
              <span>이렇게 찾아보세요</span>
              {SUGGEST.map((s) => (
                <Chip key={s} size="s" onClick={() => go(s)}>
                  {s}
                </Chip>
              ))}
            </div>
            <Button href="/skin-finder" trailing="→" className={styles.finderBtn}>
              1분 피부 진단으로 찾기
            </Button>
          </div>
          <aside className={styles.loved}>
            <IndexRow left="Most loved" strong />
            <ProductTile product={getProduct('moisture-cream')} />
          </aside>
        </div>
      )}
    </>
  );
}
