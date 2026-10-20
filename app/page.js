import { NavOverlay } from '@/context/NavContext';
import Marquee from '@/components/layout/Marquee';
import Hero from '@/components/home/Hero';
import Philosophy from '@/components/home/Philosophy';
import ShopSection from '@/components/home/ShopSection';
import Ingredients from '@/components/home/Ingredients';
import Ritual from '@/components/home/Ritual';
import Proof from '@/components/home/Proof';
import JournalStrip from '@/components/home/JournalStrip';

export default function HomePage() {
  return (
    <>
      <NavOverlay />
      <Hero />
      <Marquee />
      <Philosophy />
      <ShopSection />
      <Ingredients />
      <Ritual />
      <Proof />
      <JournalStrip />
    </>
  );
}
