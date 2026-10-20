'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { getProduct } from '@/data/products';
import { crossSell } from '@/data/crossSell';
import { computeTotals, FREE_SHIPPING, GIFT_WRAP } from '@/lib/pricing';
import { won, cx } from '@/lib/format';
import IndexRow from '@/components/ui/IndexRow';
import Img from '@/components/ui/Img';
import Label from '@/components/ui/Label';
import Rich from '@/components/ui/Rich';
import Stepper from '@/components/ui/Stepper';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import ProductTile from '@/components/ui/ProductTile';
import EmptyBag from './EmptyBag';
import styles from './CartView.module.scss';

export default function CartView() {
  const { ready, lines, count, extras, setExtra, setQty, remove } = useCart();
  const [editingCoupon, setEditingCoupon] = useState(false);

  if (!ready) return <div className={styles.loading} />;
  if (lines.length === 0) return <EmptyBag />;

  const t = computeTotals(lines, extras);
  const progress = Math.min(1, t.subtotal / FREE_SHIPPING);
  const inBag = new Set(lines.map((l) => `${l.slug}-${l.option}`));
  const suggestions = crossSell
    .filter((s) => !inBag.has(`${s.slug}-${s.option}`))
    .map((s) => {
      const p = getProduct(s.slug);
      return { ...p, ...s, price: p.options[s.option].price };
    });

  return (
    <>
      <header className={styles.header}>
        <IndexRow left="(Bag)  Your selection" right="Step 01 / 03" mobileRight={`${count} items`} strong />
        <Rich as="h1" text={`Your bag (${count})`} italic={`(${count})`} className={styles.title} />
      </header>

      <div className={styles.body}>
        <div className={styles.items}>
          <div className={styles.shipping}>
            <div className={styles.shippingText}>
              <span>
                {t.toFreeShipping === 0 ? '무료배송 조건을 채웠어요' : `${won(t.toFreeShipping)} 더 담으면 무료배송`}
              </span>
              <span className={styles.soft}>
                {won(Math.min(t.subtotal, FREE_SHIPPING))} / {won(FREE_SHIPPING)}
              </span>
            </div>
            <span className={styles.bar}>
              <i style={{ transform: `scaleX(${progress})` }} />
            </span>
          </div>

          <ul className={styles.list}>
            {lines.map((l) => (
              <li key={`${l.slug}-${l.option}`} className={styles.item}>
                <Link href={`/shop/${l.slug}`} className={styles.thumb}>
                  <Img src={l.product.image} alt={l.product.name} reveal={false} />
                </Link>
                <div className={styles.info}>
                  <div className={styles.nameRow}>
                    <Link href={`/shop/${l.slug}`} className={styles.name}>
                      <span className={styles.full}>{l.product.name}</span>
                      <span className={styles.short}>{l.product.shortName}</span>
                    </Link>
                    <button
                      type="button"
                      className={styles.removeX}
                      onClick={() => remove(l.slug, l.option)}
                      aria-label="삭제"
                    >
                      ✕
                    </button>
                  </div>
                  <p className={styles.ko}>
                    {l.product.korean}
                    <span className={styles.mobileInline}> · {l.optionInfo.label}</span>
                  </p>
                  <p className={styles.option}>
                    용량: {l.optionInfo.label}
                    {l.optionInfo.note && ` — ${l.optionInfo.note}`}
                  </p>
                  <div className={styles.qtyRow}>
                    <Stepper value={l.qty} onChange={(q) => setQty(l.slug, l.option, q)} />
                    <span className={styles.mobilePrice}>{won(l.lineTotal)}</span>
                  </div>
                </div>
                <div className={styles.side}>
                  <span className={styles.price}>{won(l.lineTotal)}</span>
                  <button type="button" className={styles.remove} onClick={() => remove(l.slug, l.option)}>
                    삭제
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <label className={styles.gift}>
            <input type="checkbox" checked={extras.gift} onChange={(e) => setExtra('gift', e.target.checked)} />
            <span className={styles.box} />
            선물 포장 추가 (+{won(GIFT_WRAP)}) · 리넨 파우치와 메시지 카드
          </label>
        </div>

        <aside className={styles.summary}>
          <h2 className={styles.summaryTitle}>Order summary</h2>
          <dl className={styles.rows}>
            <div>
              <dt>상품 금액</dt>
              <dd>{won(t.subtotal)}</dd>
            </div>
            <div className={styles.desktopRow}>
              <dt>루틴 구성 할인</dt>
              <dd className={styles.accent}>−{won(t.routineDiscount)}</dd>
            </div>
            {extras.gift && (
              <div>
                <dt>선물 포장</dt>
                <dd>{won(t.giftFee)}</dd>
              </div>
            )}
            <div>
              <dt>배송비</dt>
              <dd>{t.shipping ? won(t.shipping) : '무료'}</dd>
            </div>
          </dl>

          <div className={styles.coupon}>
            {editingCoupon ? (
              <Input
                label="쿠폰 · 할인 코드"
                placeholder="코드를 입력해 주세요"
                action="적용"
                onAction={() => {
                  setExtra('coupon', true);
                  setEditingCoupon(false);
                }}
              />
            ) : (
              <Input
                label="쿠폰 · 할인 코드"
                value={extras.coupon ? '첫 구매 20% 쿠폰 적용됨' : '적용된 쿠폰이 없어요'}
                readOnly
                action={extras.coupon ? '해제' : '변경'}
                onAction={() => (extras.coupon ? setExtra('coupon', false) : setEditingCoupon(true))}
              />
            )}
          </div>

          <dl className={styles.rows}>
            <div>
              <dt>
                <span className={styles.desktopOnly}>쿠폰 할인</span>
                <span className={styles.mobileOnly}>첫 구매 20% 쿠폰</span>
              </dt>
              <dd className={styles.accent}>−{won(t.couponDiscount)}</dd>
            </div>
          </dl>

          <div className={styles.total}>
            <span>결제 예정 금액</span>
            <strong>{won(t.total)}</strong>
          </div>

          <div className={styles.orderBar}>
            <Button href="/checkout" block trailing={`${won(t.total)} →`}>
              주문하기
            </Button>
          </div>
          <p className={styles.pay}>네이버페이 · 카카오페이 · 토스페이 간편결제 가능</p>
          <ul className={styles.notes}>
            <li>— 모든 주문에 샘플 3종을 함께 보내드려요</li>
            <li>— 개봉 후에도 30일 이내 무료 반품</li>
          </ul>
        </aside>
      </div>

      {suggestions.length > 0 && (
        <section className={styles.cross}>
          <div className={styles.crossHead}>
            <Rich as="h2" text="Complete the ritual." italic="the ritual." className={styles.crossTitle} />
            <p className={styles.soft}>클렌저를 더하면 4단계 루틴이 완성돼요</p>
          </div>
          <div className={styles.crossGrid}>
            {suggestions.map((p) => (
              <ProductTile key={`${p.slug}-${p.option}`} product={p} className={styles.crossTile} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
