'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { computeTotals } from '@/lib/pricing';
import { saveOrder, makeOrderNo, arrivalDate } from '@/lib/order';
import { won, number, cx } from '@/lib/format';
import IndexRow from '@/components/ui/IndexRow';
import Img from '@/components/ui/Img';
import Label from '@/components/ui/Label';
import Rich from '@/components/ui/Rich';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import styles from './CheckoutView.module.scss';

const STEPS = ['Bag', 'Details', 'Payment'];
const METHODS = ['신용 · 체크카드', '네이버페이', '카카오페이', '토스페이'];
const REQUESTS = ['문 앞에 놓아주세요', '경비실에 맡겨주세요', '배송 전 연락 주세요', '직접 받을게요'];
const CARDS = ['현대카드', '삼성카드', '신한카드', 'KB국민카드', '우리카드'];
const PLANS = ['일시불', '2개월', '3개월', '6개월'];

// 화면 확인용 기본값 — 실제 서비스에서는 빈 값으로 시작해요.
const INITIAL = {
  name: '김윤서',
  phone: '010-1234-5678',
  email: 'yoonseo@email.com',
  receiver: '김윤서',
  zip: '06035',
  address: '서울특별시 강남구 가로수길 12',
  detail: '3층 301호',
  request: REQUESTS[0],
  card: CARDS[0],
  plan: PLANS[0],
};

function Section({ no, title, children }) {
  return (
    <section className={styles.section}>
      <IndexRow left={`(${no})  ${title}`} right={`${no} / 03`} strong />
      {children}
    </section>
  );
}

function Check({ checked, onChange, children, muted }) {
  return (
    <label className={cx(styles.check, muted && styles.muted)}>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className={styles.box} />
      {children}
    </label>
  );
}

export default function CheckoutView() {
  const router = useRouter();
  const { ready, lines, count, extras, clear } = useCart();
  const [form, setForm] = useState(INITIAL);
  const [method, setMethod] = useState(0);
  const [agree, setAgree] = useState({ terms: true, privacy: true, marketing: false });
  const [saveAddress, setSaveAddress] = useState(true);
  const [foldOpen, setFoldOpen] = useState(false);
  const [errors, setErrors] = useState({});

  if (!ready) return <div className={styles.loading} />;

  if (lines.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>결제할 상품이 없어요.</p>
        <Button href="/shop" trailing="→">
          라인 둘러보기
        </Button>
      </div>
    );
  }

  const t = computeTotals(lines, extras);
  const bind = (key) => ({
    value: form[key],
    onChange: (e) => setForm((f) => ({ ...f, [key]: e.target.value })),
    error: errors[key],
  });

  const submit = (e) => {
    e.preventDefault();
    const required = ['name', 'phone', 'receiver', 'zip', 'address'];
    const next = {};
    required.forEach((k) => {
      if (!form[k].trim()) next[k] = '필수 항목이에요';
    });
    if (!/^01\d-?\d{3,4}-?\d{4}$/.test(form.phone)) next.phone = '휴대폰 번호를 확인해 주세요';
    setErrors(next);
    if (Object.keys(next).length || !agree.terms || !agree.privacy) return;

    saveOrder({
      no: makeOrderNo(),
      address: `${form.address}, ${form.detail}`,
      arrival: arrivalDate(),
      total: t.total,
      payment: method === 0 ? `신용카드 ${form.plan}` : METHODS[method],
      items: lines.map((l) => ({ slug: l.slug, name: l.product.name, qty: l.qty })),
    });
    clear();
    router.push('/order-complete');
  };

  const canPay = agree.terms && agree.privacy;

  return (
    <form onSubmit={submit} noValidate>
      <header className={styles.header}>
        <ol className={styles.steps}>
          {STEPS.map((s, i) => (
            <li key={s} className={cx(i === 1 && styles.current)}>
              <Label tone={i === 1 ? 'olive' : undefined}>{`0${i + 1}`}</Label>
              <span className={styles.stepName}>{s}</span>
            </li>
          ))}
        </ol>
        <Rich as="h1" text="Almost yours." italic="yours." className={styles.title} />
      </header>

      {/* 모바일: 접히는 주문 요약 */}
      <div className={styles.fold}>
        <button type="button" onClick={() => setFoldOpen((v) => !v)} aria-expanded={foldOpen}>
          <span>
            주문 상품 {count}건 보기 {foldOpen ? '▴' : '▾'}
          </span>
          <strong>{won(t.total)}</strong>
        </button>
        {foldOpen && (
          <ul className={styles.foldList}>
            {lines.map((l) => (
              <li key={`${l.slug}-${l.option}`}>
                {l.product.name} · {l.optionInfo.label} × {l.qty}
                <span>{won(l.lineTotal)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.form}>
          <Section no="01" title="Contact">
            <div className={styles.row2}>
              <Input label="이름" autoComplete="name" {...bind('name')} />
              <Input label="휴대폰 번호" inputMode="tel" autoComplete="tel" {...bind('phone')} />
            </div>
            <Input label="이메일 (주문 안내용)" type="email" autoComplete="email" {...bind('email')} />
          </Section>

          <Section no="02" title="Shipping">
            <Input label="받는 분" className={styles.desktopOnly} {...bind('receiver')} />
            <Input label="우편번호" action="주소 검색" inputMode="numeric" {...bind('zip')} />
            <Input label="주소" autoComplete="street-address" {...bind('address')} />
            <Input label="상세 주소" {...bind('detail')} />
            <Input label="배송 요청사항" as="select" options={REQUESTS} {...bind('request')} />
            <Check checked={saveAddress} onChange={setSaveAddress}>
              기본 배송지로 저장
            </Check>
          </Section>

          <Section no="03" title="Payment">
            <div className={styles.methods} role="radiogroup" aria-label="결제 수단">
              {METHODS.map((m, i) => (
                <button
                  key={m}
                  type="button"
                  role="radio"
                  aria-checked={method === i}
                  className={cx(styles.method, method === i && styles.methodOn)}
                  onClick={() => setMethod(i)}
                >
                  <span className={styles.radio} />
                  {m}
                </button>
              ))}
            </div>
            {method === 0 && (
              <div className={cx(styles.row2, styles.desktopOnly)}>
                <Input label="카드사" as="select" options={CARDS} {...bind('card')} />
                <Input label="할부" as="select" options={PLANS} {...bind('plan')} />
              </div>
            )}
            <div className={styles.agrees}>
              <Check checked={agree.terms} onChange={(v) => setAgree((a) => ({ ...a, terms: v }))}>
                주문 내용을 확인했으며 결제에 동의합니다 (필수)
              </Check>
              <Check checked={agree.privacy} onChange={(v) => setAgree((a) => ({ ...a, privacy: v }))}>
                개인정보 수집 · 이용 동의 (필수)
              </Check>
              <Check checked={agree.marketing} onChange={(v) => setAgree((a) => ({ ...a, marketing: v }))} muted>
                쇼핑 정보 수신 동의 (선택)
              </Check>
            </div>
          </Section>
        </div>

        <aside className={styles.summary}>
          <div className={styles.summaryHead}>
            <h2>Your order</h2>
            <Label>{count} items</Label>
          </div>
          <ul className={styles.lines}>
            {lines.map((l) => (
              <li key={`${l.slug}-${l.option}`}>
                <Img src={l.product.image} className={styles.lineImg} reveal={false} />
                <span className={styles.lineName}>
                  {l.product.name} · {l.optionInfo.label}
                  {l.qty > 1 && ` × ${l.qty}`}
                </span>
                <span>{won(l.lineTotal)}</span>
              </li>
            ))}
          </ul>
          <dl className={styles.rows}>
            <div>
              <dt>상품 금액</dt>
              <dd>{won(t.subtotal)}</dd>
            </div>
            {t.routineDiscount > 0 && (
              <div>
                <dt>루틴 구성 할인</dt>
                <dd className={styles.accent}>−{won(t.routineDiscount)}</dd>
              </div>
            )}
            <div>
              <dt>쿠폰 할인</dt>
              <dd className={styles.accent}>−{won(t.couponDiscount)}</dd>
            </div>
            {t.giftFee > 0 && (
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
          <div className={styles.total}>
            <span>최종 결제 금액</span>
            <strong>{won(t.total)}</strong>
          </div>
          <div className={styles.payBar}>
            <Button type="submit" block trailing={`${won(t.total)} →`} disabled={!canPay}>
              결제하기
            </Button>
          </div>
          <p className={styles.points}>적립 예정 {number(t.points)}P · 샘플 3종 함께 발송</p>
          <Link href="/cart" className={styles.edit}>
            장바구니 수정
          </Link>
        </aside>
      </div>
    </form>
  );
}
