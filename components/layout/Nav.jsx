'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { mainMenu } from '@/data/navigation';
import { useCart } from '@/context/CartContext';
import { useNavMode } from '@/context/NavContext';
import { cx } from '@/lib/format';
import MobileMenu from './MobileMenu';
import styles from './Nav.module.scss';

export default function Nav() {
  const { overlay } = useNavMode();
  const { count } = useCart();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // 페이지 이동 시 메뉴 닫기
  useEffect(() => setMenuOpen(false), [pathname]);

  const dark = overlay && !scrolled;

  // 피부 진단은 자체 헤더(QuizHeader)를 써요.
  if (pathname.startsWith('/skin-finder')) return null;

  // 결제 화면은 이탈을 줄이기 위해 단순한 헤더만 보여줘요.
  if (pathname === '/checkout') {
    return (
      <header className={cx(styles.nav, styles.checkout)}>
        <div className={styles.inner}>
          <Link href="/cart" className={styles.back}>
            ← <span className={styles.desktopOnly}>Back to </span>bag
          </Link>
          <Link href="/" className={styles.logo}>
            Dewfield
          </Link>
          <span className={styles.secure}>
            Secure<span className={styles.desktopOnly}> checkout</span>
          </span>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className={cx(styles.nav, overlay && styles.overlay, dark && styles.dark)}>
        <nav className={styles.inner} aria-label="주 메뉴">
          <ul className={styles.menu}>
            {mainMenu.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={cx(pathname.startsWith(item.href) && item.href !== '/' && styles.active)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
          >
            Menu
          </button>

          <Link href="/" className={styles.logo} aria-label="Dewfield 홈">
            Dewfield
          </Link>

          <ul className={styles.utility}>
            <li className={styles.desktopOnly}>
              <Link href="/search">Search</Link>
            </li>
            <li className={styles.desktopOnly}>
              <Link href="/mypage">Account</Link>
            </li>
            <li>
              <Link href="/cart">Bag ({count})</Link>
            </li>
          </ul>
        </nav>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} count={count} />
    </>
  );
}
