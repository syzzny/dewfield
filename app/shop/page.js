import Marquee from '@/components/layout/Marquee';
import ShopView from '@/components/shop/ShopView';
import { SHOP_CATEGORIES } from '@/data/products';
import Benefits from '@/components/shop/Benefits';

export const metadata = { title: 'Shop all' };

export default function ShopPage({ searchParams }) {
  const category = SHOP_CATEGORIES.some((c) => c.id === searchParams?.category) ? searchParams.category : 'all';
  return (
    <>
      {/* 주소의 ?category= 를 서버에서 읽어 넘겨요 — 그리드가 처음부터 서버에서 그려져요 */}
      <ShopView initialCategory={category} />
      <Benefits />
      <Marquee />
    </>
  );
}
