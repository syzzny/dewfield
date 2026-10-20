import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import '@fontsource/instrument-sans/400.css';
import '@fontsource/instrument-sans/500.css';
import '@fontsource/noto-sans-kr/300.css';
import '@fontsource/noto-sans-kr/400.css';
import '@fontsource/noto-sans-kr/500.css';
import '@/styles/globals.scss';

import { CartProvider } from '@/context/CartContext';
import { NavProvider } from '@/context/NavContext';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import MotionRoot from '@/components/motion/MotionRoot';

export const metadata = {
  title: {
    default: 'Dewfield — Quiet skin.',
    template: '%s — Dewfield',
  },
  description: '덜어낼수록, 피부는 조용해집니다. 자연 유래 저자극 포뮬러로 완성한 데일리 장벽 루틴, 듀필드.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f2efe8',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/* 첫 화면이 그려지기 전에 모션 준비 상태로 — 요소가 보였다 사라지는 깜빡임 방지 */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('motion-ready')" }} />
      </head>
      <body>
        <CartProvider>
          <NavProvider>
            <Nav />
            <main>{children}</main>
            <Footer />
            <MotionRoot />
          </NavProvider>
        </CartProvider>
      </body>
    </html>
  );
}
