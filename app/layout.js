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

// 페이지가 그려지기 전에 실행되는 작은 스크립트
// 1) 모션 준비 상태로 — 요소가 보였다 사라지는 깜빡임 방지.
//    안전장치: 4초 안에 MotionRoot가 동작을 시작하지 못하면(스크립트 오류 등) 숨김을 풀어 전부 보여줘요.
// 2) 새로고침하면 항상 맨 위에서 시작 — 브라우저가 이전 스크롤 위치로 되돌리는 것을 막아요.
//    (뒤로 가기 / 앞으로 가기의 위치 복원은 그대로 둬요)
const BOOT = `(function(){
var r=document.documentElement;r.classList.add('motion-ready');
setTimeout(function(){if(!r.classList.contains('motion-live'))r.classList.remove('motion-ready');},4000);
try{var n=performance.getEntriesByType('navigation')[0];
if(n&&n.type==='reload'&&!location.hash){history.scrollRestoration='manual';window.scrollTo(0,0);
window.addEventListener('load',function(){window.scrollTo(0,0);setTimeout(function(){history.scrollRestoration='auto';},0);});}}catch(e){}
})();`;

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
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
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
