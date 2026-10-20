import { Suspense } from 'react';
import Marquee from '@/components/layout/Marquee';
import ShopView from '@/components/shop/ShopView';
import Benefits from '@/components/shop/Benefits';

export const metadata = { title: 'Shop all' };

export default function ShopPage() {
  return (
    <>
      {/* 카테고리를 주소(?category=)에서 읽기 때문에 Suspense로 감싸요 */}
      <Suspense>
        <ShopView />
      </Suspense>
      <Benefits />
      <Marquee />
    </>
  );
}
