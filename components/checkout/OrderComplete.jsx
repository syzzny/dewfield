'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { images } from '@/data/images';
import { loadOrder, arrivalDate } from '@/lib/order';
import { won } from '@/lib/format';
import IndexRow from '@/components/ui/IndexRow';
import Img from '@/components/ui/Img';
import Rich from '@/components/ui/Rich';
import Button from '@/components/ui/Button';
import styles from './OrderComplete.module.scss';

// 주문 기록이 없을 때(바로 들어온 경우) 보여줄 예시
const SAMPLE = {
  no: 'DF-261020-0417',
  address: '서울특별시 강남구 가로수길 12, 3층',
  total: 65600,
  payment: '신용카드 일시불',
};

export default function OrderComplete() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    setOrder(loadOrder() ?? { ...SAMPLE, arrival: arrivalDate() });
  }, []);

  const o = order ?? { ...SAMPLE, arrival: '' };

  const info = [
    { label: '배송지', value: o.address, desktopOnly: true },
    { label: '도착 예정', value: o.arrival },
    { label: '결제 금액', value: `${won(o.total)} · ${o.payment}`, mobile: won(o.total) },
    { label: '함께 보내는 것', value: '샘플 3종 · 루틴 가이드 카드', mobile: '샘플 3종 · 루틴 카드' },
  ];

  return (
    <section className={styles.wrap}>
      <Img src={images.gift} sat={-0.12} className={styles.img} eager reveal="fade" />
      <div className={styles.content}>
        <IndexRow left={`(Order)  No. ${o.no}`} right="Step 03 / 03" mobileRight="03 / 03" strong />
        <Rich as="h1" text={'Thank you,\nquietly.'} italic="quietly." className={styles.title} />
        <p className={styles.lead}>
          주문이 완료됐어요. <span className={styles.desktopOnly}>오늘 15시 전 주문이라 </span>내일 도착 예정이에요.
          <br />
          주문 내역은 <span className={styles.desktopOnly}>이메일과 </span>카카오톡으로 보내드렸어요.
        </p>
        <dl className={styles.info}>
          {info.map((row) => (
            <div key={row.label} className={row.desktopOnly ? styles.desktopOnly : undefined}>
              <dt>{row.label}</dt>
              <dd>
                {row.mobile ? (
                  <>
                    <span className={styles.desktopOnly}>{row.value}</span>
                    <span className={styles.mobileOnly}>{row.mobile}</span>
                  </>
                ) : (
                  row.value
                )}
              </dd>
            </div>
          ))}
        </dl>
        <div className={styles.buttons}>
          <Button href="/mypage" block trailing="→">
            주문 상세 보기
          </Button>
          <Button href="/shop" variant="secondary" block trailing="→">
            쇼핑 계속하기
          </Button>
        </div>
        <Link href="/skin-finder" className={styles.tip}>
          <em>Tip —</em>
          <span>
            <span className={styles.desktopOnly}>제품이 도착하기 전, 1분 피부 진단으로 사용 순서를 받아보세요</span>
            <span className={styles.mobileOnly}>도착 전에 1분 피부 진단으로 사용 순서를 받아보세요</span>
          </span>
          <strong className={styles.desktopOnly}>진단하기 →</strong>
        </Link>
      </div>
    </section>
  );
}
