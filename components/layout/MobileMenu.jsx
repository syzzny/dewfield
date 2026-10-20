'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { mobileMenu, menuChips } from '@/data/navigation';
import { images } from '@/data/images';
import { cx, pad } from '@/lib/format';
import Img from '@/components/ui/Img';
import styles from './MobileMenu.module.scss';

export default function MobileMenu({ open, onClose, count }) {
  const router = useRouter();
  const [query, setQuery] = useState('');

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  const submit = (e) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query)}`);
    onClose();
  };

  return (
    <div className={cx(styles.menu, open && styles.open)} aria-hidden={!open} role="dialog" aria-label="메뉴">
      <div className={styles.top}>
        <button type="button" onClick={onClose}>
          Close ✕
        </button>
        <Link href="/" className={styles.logo}>
          Dewfield
        </Link>
        <Link href="/cart" className={styles.bag}>
          Bag ({count})
        </Link>
      </div>

      <form className={styles.search} onSubmit={submit}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="무엇을 찾으세요?"
          aria-label="검색어"
        />
        <button type="submit">Search</button>
      </form>

      <ul className={styles.links}>
        {mobileMenu.map((item, i) => (
          <li key={item.label}>
            <Link href={item.href}>
              <span className={styles.no}>{pad(i + 1)}</span>
              <span className={styles.word}>{item.label}</span>
              <span aria-hidden>→</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className={styles.chips}>
        {menuChips.map((chip) => (
          <Link key={chip.label} href={chip.href}>
            {chip.label}
          </Link>
        ))}
      </div>

      <div className={styles.bottom}>
        <Link href="/skin-finder" className={styles.finder}>
          <Img src={images.leaf} sat={-0.25} className={styles.thumb} reveal={false} />
          <span className={styles.finderText}>
            <span className={styles.finderLabel}>Skin finder · 1 min</span>내 피부에 맞는 루틴 찾기
          </span>
          <span aria-hidden>→</span>
        </Link>
        <div className={styles.account}>
          <Link href="/login">Login</Link>
          <Link href="/mypage">My page</Link>
          <Link href="#">Help</Link>
        </div>
      </div>
    </div>
  );
}
