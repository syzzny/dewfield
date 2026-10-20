'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { footerLinks } from '@/data/navigation';
import Label from '@/components/ui/Label';
import styles from './Footer.module.scss';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const pathname = usePathname();

  const subscribe = (e) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setDone(true);
    setEmail('');
  };

  // 결제 · 피부 진단은 집중을 위해 푸터를 숨겨요.
  if (pathname === '/checkout' || pathname.startsWith('/skin-finder')) return null;

  return (
    <footer className={styles.footer}>
      <div className={styles.columns}>
        <form className={styles.newsletter} onSubmit={subscribe}>
          <Label tone="sage">Newsletter</Label>
          <p className={styles.pitch}>
            느린 피부 루틴 이야기를
            <br />한 달에 한 번 보내드려요
          </p>
          <div className={styles.email}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={done ? '구독해 주셔서 고마워요' : '이메일 주소'}
              aria-label="이메일 주소"
            />
            <button type="submit">Subscribe →</button>
          </div>
        </form>

        <div className={styles.links}>
          {footerLinks.map((group) => (
            <div key={group.title} className={styles.group}>
              <Label tone="sage">{group.title}</Label>
              {group.links.map((link) => (
                <Link key={link.label} href={link.href} className={link.desktopOnly ? styles.desktopOnly : undefined}>
                  {link.mobileLabel ? (
                    <>
                      <span className={styles.desktopOnly}>{link.label}</span>
                      <span className={styles.mobileOnly}>{link.mobileLabel}</span>
                    </>
                  ) : (
                    link.label
                  )}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.meta}>
        <Label className={styles.desktopOnly}>© 2026 Dewfield</Label>
        <Label>Instagram · Youtube · Kakao</Label>
        <Label className={styles.desktopOnly}>Seoul, Korea</Label>
        <Label className={styles.mobileOnly}>© 2026 Dewfield — Seoul, Korea</Label>
      </div>

      <div className={styles.wordmark} aria-hidden>
        Dewfield
      </div>
    </footer>
  );
}
