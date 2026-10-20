import { notFound } from 'next/navigation';
import { products, getProduct } from '@/data/products';
import Marquee from '@/components/layout/Marquee';
import Breadcrumb from '@/components/pdp/Breadcrumb';
import ProductTop from '@/components/pdp/ProductTop';
import Reviews from '@/components/pdp/Reviews';
import SetPromo from '@/components/pdp/SetPromo';
import Recommended from '@/components/pdp/Recommended';
import { banners } from '@/components/pdp/banners';
import { pad } from '@/lib/format';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const product = getProduct(params.slug);
  if (!product) return {};
  return { title: `${product.name} · ${product.korean}`, description: product.description };
}

export default function ProductPage({ params }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  // 인덱스 행이 있는 섹션에 (01), (02)… 순서를 매기고, 리뷰·추천이 그 뒤를 이어요.
  let order = 0;
  const sections = product.sections.map((section) => (section.index ? { ...section, order: pad(++order) } : section));
  const reviewOrder = pad(++order);
  const recommendOrder = pad(++order);
  const total = pad(order);

  return (
    <>
      <Breadcrumb product={product} />
      <ProductTop product={product} />
      {sections.map((section, i) => {
        const Banner = banners[section.type];
        if (!Banner) return null;
        return <Banner key={section.type + i} product={product} {...section} order={section.order} total={total} />;
      })}
      <Reviews product={product} order={reviewOrder} total={total} />
      {!product.isSet && <SetPromo />}
      <Recommended product={product} order={recommendOrder} total={total} />
      <Marquee />
    </>
  );
}
