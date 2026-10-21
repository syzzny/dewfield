'use client';

import { useEffect, useState } from 'react';
import { getProduct, discountRate } from '@/data/products';
import { images } from '@/data/images';
import { won, pad } from '@/lib/format';
import Img from '@/components/ui/Img';
import Label from '@/components/ui/Label';
import Rich from '@/components/ui/Rich';
import Button from '@/components/ui/Button';
import styles from './SetPromo.module.scss';

const ENDS_AT = new Date('2026-11-10T23:59:59+09:00');
const INCLUDES = ['클렌저', '토너', '세럼', '크림'];

// 프로모션 종료까지 남은 시간 (분 단위로 갱신)
function useCountdown(target) {
  const [left, setLeft] = useState(null);
  useEffect(() => {
    const tick = () => setLeft(Math.max(0, target - Date.now()));
    tick();
    const id = setInterval(tick, 60 * 1000);
    return () => clearInterval(id);
  }, [target]);
  if (left === null) return null;
  const m = Math.floor(left / 60000);
  return { d: Math.floor(m / 1440), h: Math.floor((m % 1440) / 60), m: m % 60 };
}

/** 모든 단품 상세페이지 하단의 리추얼 세트 프로모션 */
export default function SetPromo() {
  const set = getProduct('the-ritual-set');
  const t = useCountdown(ENDS_AT.getTime());

  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <div className={styles.media}>
          <Img src={images.gift} sat={-0.12} className={styles.img} sizes="(max-width: 900px) 100vw, 50vw" />
          <span className={styles.fade} />
          {t && (
            <span className={styles.timer} aria-label="프로모션 남은 시간">
              <Label>Ends in</Label>
              <b>{t.d}</b>
              <Label>D</Label>
              <b>{pad(t.h)}</b>
              <Label>H</Label>
              <b>{pad(t.m)}</b>
              <Label>M</Label>
            </span>
          )}
        </div>
        <div className={styles.copy}>
          <div className={styles.tagRow}>
            <Label tone="cream" className={styles.tag}>
              Autumn edition
            </Label>
            <Label>10.20 — 11.10</Label>
          </div>
          <Rich as="h2" text={'The Ritual\nSet, wrapped.'} italic="wrapped." className={styles.title} />
          <p className={styles.body}>
            루틴 4종에 리넨 파우치를 더한 가을 한정 세트.
            <span className={styles.desktopOnly}>
              <br />
              선물 포장과 메시지 카드를 무료로 넣어드려요.
            </span>
          </p>
          <div className={styles.price}>
            <span className={styles.now}>{won(set.price)}</span>
            <s>{won(set.originalPrice)}</s>
            <span className={styles.off}>−{discountRate(set)}%</span>
          </div>
          <ol className={styles.includes}>
            {INCLUDES.map((item, i) => (
              <li key={item}>
                <Label tone="olive">{pad(i + 1)}</Label>
                {item}
              </li>
            ))}
            <li>
              <Label tone="olive">+</Label>
              리넨 파우치
            </li>
          </ol>
          <Button href={`/shop/${set.slug}`} trailing="→" className={styles.cta}>
            세트 구성 보기
          </Button>
        </div>
      </div>
    </section>
  );
}
