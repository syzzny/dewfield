'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { member, accountMenu, orderStatus, orders, coupons, defaultProfile } from '@/data/account';
import { getProduct } from '@/data/products';
import { loadProfile } from '@/lib/profile';
import { useCart } from '@/context/CartContext';
import { won, cx } from '@/lib/format';
import IndexRow from '@/components/ui/IndexRow';
import Img from '@/components/ui/Img';
import Label from '@/components/ui/Label';
import Rich from '@/components/ui/Rich';
import Button from '@/components/ui/Button';
import SkinProfileCard from './SkinProfileCard';
import styles from './MyPage.module.scss';

function Orders() {
  const { add } = useCart();
  return (
    <section className={styles.block}>
      <IndexRow left="(01)  Orders & delivery" right="Recent 3 months" strong />
      <ul className={styles.status}>
        {orderStatus.map((s) => (
          <li key={s.label} className={cx(s.active && styles.statusOn)}>
            <span className={styles.statusCount}>{s.count}</span>
            <span className={styles.statusLabel}>{s.label}</span>
          </li>
        ))}
      </ul>
      <ul className={styles.orders}>
        {orders.map((o) => (
          <li key={o.no}>
            <span className={styles.stack}>
              {o.items.map((slug) => (
                <Img key={slug} src={getProduct(slug).image} className={styles.stackImg} reveal={false} sizes="120px" />
              ))}
            </span>
            <span className={styles.orderInfo}>
              <span className={styles.orderMeta}>
                <Label>{o.date}</Label>
                <Label className={styles.orderNo}>{o.no}</Label>
              </span>
              <span className={styles.orderTitle}>{o.title}</span>
              <span className={styles.orderTotal}>{won(o.total)}</span>
            </span>
            <span className={styles.orderSide}>
              <span className={cx(styles.orderStatus, o.accent && styles.accent)}>{o.status}</span>
              <button
                type="button"
                className={styles.orderAction}
                onClick={() => o.action === '다시 구매' && add(o.items[0], 1)}
              >
                {o.action}
              </button>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Subscription() {
  return (
    <section className={styles.refill}>
      <div>
        <Label tone="olive">Refill ritual</Label>
        <p className={styles.refillTitle}>토너가 떨어질 때쯤, 알아서 보내드릴까요?</p>
        <p className={styles.refillText}>6주마다 정기 배송 · 매회 10% 추가 할인 · 언제든 해지 가능</p>
      </div>
      <Button trailing="→">정기 배송 시작</Button>
    </section>
  );
}

function Benefits() {
  return (
    <section className={styles.block}>
      <IndexRow left="(02)  Coupons & points" right={`${member.stats[2].value}`} strong />
      <ul className={styles.coupons}>
        {coupons.map((c) => (
          <li key={c.title}>
            <span className={styles.couponTitle}>{c.title}</span>
            <span className={styles.couponNote}>
              {c.note} · {c.until}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Placeholder({ title, text }) {
  return (
    <section className={styles.block}>
      <IndexRow left={`(—)  ${title}`} strong />
      <p className={styles.placeholder}>{text}</p>
    </section>
  );
}

export default function MyPage() {
  const [tab, setTab] = useState('orders');
  const [profile, setProfile] = useState(defaultProfile);

  useEffect(() => {
    const saved = loadProfile();
    if (saved) setProfile(saved);
  }, []);

  return (
    <>
      <header className={styles.header} data-intro>
        <IndexRow
          left="(Account)  Orders · Profile · Benefits"
          right={`Level — ${member.level}`}
          mobileRight={member.level}
          strong
        />
        <div className={styles.headRow}>
          <div className={styles.hello}>
            <Rich as="h1" text="My Dewfield." italic="Dewfield." className={styles.title} />
            <p className={styles.sub}>
              {member.name} 님 · {member.level} 등급 · {member.joined} 가입
            </p>
          </div>
          <ul className={styles.stats}>
            {member.stats.map((s) => (
              <li key={s.label}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </header>

      <div className={styles.body}>
        <nav className={styles.side} aria-label="마이페이지 메뉴">
          {accountMenu.map((m) => (
            <button
              key={m.id}
              type="button"
              className={cx(styles.sideItem, tab === m.id && styles.sideOn)}
              onClick={() => setTab(m.id)}
              aria-current={tab === m.id ? 'page' : undefined}
            >
              {m.label}
              {tab === m.id && <span aria-hidden>→</span>}
            </button>
          ))}
          <Link href="/login" className={styles.sideItem}>
            로그아웃
          </Link>
        </nav>

        <div className={styles.main}>
          {(tab === 'orders' || tab === 'profile') && <SkinProfileCard profile={profile} />}
          {tab === 'orders' && (
            <>
              <Orders />
              <Subscription />
            </>
          )}
          {tab === 'benefits' && <Benefits />}
          {tab === 'reviews' && (
            <Placeholder title="Reviews" text="작성한 리뷰 5개 · 리뷰를 쓰면 ₩3,000 쿠폰을 드려요." />
          )}
          {tab === 'subscription' && <Subscription />}
          {tab === 'info' && (
            <Placeholder title="Profile" text={`${member.name} · yoonseo@email.com · 010-1234-5678`} />
          )}
        </div>
      </div>
    </>
  );
}
