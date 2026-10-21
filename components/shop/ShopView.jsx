'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SHOP_CATEGORIES, CONCERNS, SORTS, products, queryProducts } from '@/data/products';
import { cx, pad } from '@/lib/format';
import IndexRow from '@/components/ui/IndexRow';
import Label from '@/components/ui/Label';
import Rich from '@/components/ui/Rich';
import Chip from '@/components/ui/Chip';
import ProductTile from '@/components/ui/ProductTile';
import FinderCard from './FinderCard';
import styles from './ShopView.module.scss';

const countOf = (id) => (id === 'all' ? products.length : products.filter((p) => p.category === id).length);

/**
 * 카테고리는 주소(?category=)와 연결돼요.
 * 서버(page.js)가 주소에서 읽은 값을 initialCategory로 넘겨 주기 때문에,
 * 상품 그리드가 처음부터 서버에서 그려져요 — 로딩 후 그리드가 생기면서 푸터가 밀려나는 현상(CLS)이 없어요.
 */
export default function ShopView({ initialCategory = 'all' }) {
  const router = useRouter();
  const [category, setActive] = useState(initialCategory);
  // 메뉴 링크·뒤로 가기로 주소가 바뀌면 따라가요
  useEffect(() => setActive(initialCategory), [initialCategory]);
  const [concerns, setConcerns] = useState([]);
  const [sort, setSort] = useState('recommended');
  const [filterOpen, setFilterOpen] = useState(false);

  const list = useMemo(() => queryProducts({ category, concerns, sort }), [category, concerns, sort]);

  const setCategory = (id) => {
    setActive(id); // 탭은 즉시 바뀌고, 주소는 뒤따라 갱신돼요
    router.replace(id === 'all' ? '/shop' : `/shop?category=${id}`, { scroll: false });
  };

  const toggleConcern = (id) =>
    setConcerns((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));

  return (
    <>
      <header className={styles.header} data-intro>
        <IndexRow
          left="(Shop)  All products"
          right={`Autumn 2026 — ${pad(products.length)} items`}
          mobileRight={`${pad(products.length)} items`}
          strong
        />
        <div className={styles.titleRow}>
          <Rich as="h1" text="Shop all." italic="all." className={styles.title} />
          <p className={styles.lead}>
            세안부터 크림까지, 피부를 조용하게 만드는
            <br />네 단계와 그 모든 것을 담은 루틴 세트.
          </p>
        </div>
        <div className={styles.tabs} role="tablist" aria-label="카테고리">
          {SHOP_CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={category === c.id}
              className={cx(styles.tab, category === c.id && styles.tabOn)}
              onClick={() => setCategory(c.id)}
            >
              {c.label}
              <Label className={styles.count}>({countOf(c.id)})</Label>
            </button>
          ))}
        </div>
      </header>

      <div className={styles.toolbar}>
        <button
          type="button"
          className={styles.filterButton}
          onClick={() => setFilterOpen((v) => !v)}
          aria-expanded={filterOpen}
        >
          필터
          {concerns.length > 0 && <span className={styles.badge}>{concerns.length}</span>}
        </button>
        <div className={cx(styles.concerns, filterOpen && styles.concernsOpen)}>
          <span className={styles.concernLabel}>피부 고민</span>
          {CONCERNS.map((c) => (
            <Chip key={c.id} selected={concerns.includes(c.id)} onClick={() => toggleConcern(c.id)}>
              {c.label}
            </Chip>
          ))}
        </div>
        <div className={styles.right}>
          <span className={styles.result}>{list.length}개 상품</span>
          <label className={styles.sort}>
            <span className="sr-only">정렬</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
            <span aria-hidden>▾</span>
          </label>
        </div>
      </div>

      {concerns.length > 0 && (
        <div className={styles.active}>
          {concerns.map((id) => (
            <Chip key={id} selected size="s" onClick={() => toggleConcern(id)}>
              {CONCERNS.find((c) => c.id === id).label}
            </Chip>
          ))}
        </div>
      )}

      <div className={styles.grid}>
        {list.map((p, i) => (
          // 첫 줄(최대 3개)은 첫 화면에 보이니 먼저 받아서 바로 보여줘요
          <ProductTile key={p.slug} product={p} badge={p.listBadge} showSize eager={i < 3} className={styles.tile} />
        ))}
        <FinderCard className={styles.finder} />
        {list.length === 0 && (
          <p className={styles.empty}>
            조건에 맞는 상품이 없어요.{' '}
            <button type="button" onClick={() => setConcerns([])}>
              필터 초기화
            </button>
          </p>
        )}
      </div>
    </>
  );
}
