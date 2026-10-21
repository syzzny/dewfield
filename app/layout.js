import localFont from 'next/font/local';
import '@fontsource/noto-sans-kr/300.css';
import '@fontsource/noto-sans-kr/400.css';
import '@fontsource/noto-sans-kr/500.css';
import '@/styles/globals.scss';

import { CartProvider } from '@/context/CartContext';
import { NavProvider } from '@/context/NavContext';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import MotionRoot from '@/components/motion/MotionRoot';

// 영문 폰트는 next/font로 직접 제공해요.
// - 첫 화면에 필요한 파일을 미리 내려받고(preload),
// - 폰트가 도착하기 전 대체 글꼴의 크기를 맞춰 글자가 바뀌며 밀리는 현상을 줄여요.
// (한글 Noto Sans KR은 글자 수가 많아 @fontsource의 분할 파일을 그대로 써요)
const serif = localFont({
  src: [
    { path: './fonts/instrument-serif-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/instrument-serif-latin-400-italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-serif',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
});

const sans = localFont({
  src: [
    { path: './fonts/instrument-sans-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/instrument-sans-latin-500-normal.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-sans',
  display: 'swap',
  fallback: ['Helvetica Neue', 'Arial', 'sans-serif'],
});

// 페이지가 그려지기 전에 실행되는 작은 스크립트
// 1) 모션 준비 상태로 — 요소가 보였다 사라지는 깜빡임 방지.
//    안전장치: 4초 안에 MotionRoot가 동작을 시작하지 못하면(스크립트 오류 등) 숨김을 풀어 전부 보여줘요.
// 2) 새로고침하면 항상 맨 위에서 시작 — 브라우저가 이전 스크롤 위치로 되돌리는 것을 막아요.
//    (뒤로 가기 / 앞으로 가기의 위치 복원은 그대로 둬요)
// 페이지가 그려지기 전에 실행되는 작은 스크립트
// 1) 모션 준비 상태로 — 요소가 보였다 사라지는 깜빡임 방지.
//    안전장치: 4초 안에 MotionRoot가 동작을 시작하지 못하면(스크립트 오류 등) 숨김을 풀어 전부 보여줘요.
// 2) 새로고침(강력 새로고침 포함)하면 항상 맨 위에서 시작해요.
//    - 브라우저는 '떠나는 순간'의 scrollRestoration 값을 기억했다가 다시 열 때 써요.
//      그래서 페이지를 떠날 때 manual로 바꿔 두고, 다시 열리면 즉시(부드러운 스크롤 없이) 맨 위로 올려요.
//    - 사이트 안에서의 뒤로/앞으로 가기는 로드가 끝난 뒤 auto로 되돌려 그대로 복원돼요.
const BOOT = `(function(){
var r=document.documentElement,h=history;
r.classList.add('motion-ready');
setTimeout(function(){if(!r.classList.contains('motion-live'))r.classList.remove('motion-ready');},4000);
try{
var top=function(){window.scrollTo({top:0,left:0,behavior:'instant'});};
addEventListener('beforeunload',function(){h.scrollRestoration='manual';});
var n=performance.getEntriesByType('navigation')[0];
if(n&&n.type==='reload'&&!location.hash){h.scrollRestoration='manual';top();
document.addEventListener('DOMContentLoaded',top);
addEventListener('load',function(){top();setTimeout(function(){h.scrollRestoration='auto';},0);});}
else{h.scrollRestoration='auto';}
}catch(e){}
})();`;

// 공유 미리보기(OG) 이미지의 절대 주소를 만들 때 쓰는 기준 주소.
// 배포 후 .env에 NEXT_PUBLIC_SITE_URL=https://내도메인 을 넣어 주세요. (Vercel은 없어도 자동으로 잡혀요)
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Dewfield — Quiet skin.',
    template: '%s — Dewfield',
  },
  description: '덜어낼수록, 피부는 조용해집니다. 자연 유래 저자극 포뮬러로 완성한 데일리 장벽 루틴, 듀필드.',
  // 이미지는 app/opengraph-image.jpg · twitter-image.jpg 파일을 Next.js가 자동으로 연결해요
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: 'Dewfield',
    // title을 비워 두면 페이지마다의 제목(예: Barrier Serum — Dewfield)이 그대로 쓰여요
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f2efe8',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      </head>
      <body>
        {/* 키보드 사용자를 위한 본문 바로가기 — Tab을 처음 누르면 나타나요 */}
        <a href="#main" className="skip-link">
          본문 바로가기
        </a>
        <CartProvider>
          <NavProvider>
            <Nav />
            <main id="main" tabIndex={-1}>
              {children}
            </main>
            <Footer />
            <MotionRoot />
          </NavProvider>
        </CartProvider>
      </body>
    </html>
  );
}
