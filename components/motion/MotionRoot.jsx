'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * 스크롤 모션 관리자 — 레이아웃에 한 번만 넣어요.
 *
 * 1) data-reveal 이 붙은 요소가 화면에 들어오면 .is-in 클래스를 붙여요.
 *    실제 움직임은 styles/_motion.scss 와 각 컴포넌트 CSS에 있어요.
 *    같은 순간에 들어온 요소들은 위→아래, 왼→오른 순서로 0.08초씩 늦게 시작해요(stagger).
 *    가로 스크롤 영역(모바일 상품 레일 등)은 옆으로 잘려 있어 IntersectionObserver가 '안 보임'으로 판단해요.
 *    그래서 스크롤할 때 세로 위치만 보고 한 번 더 확인해요(sweep).
 * 2) data-parallax="0.12" 요소는 스크롤에 따라 안쪽 이미지를 천천히 움직여요.
 *
 * 서버 컴포넌트에서도 속성만 붙이면 되기 때문에, 어떤 컴포넌트든 쉽게 모션을 줄 수 있어요.
 */
const STAGGER = 70; // ms
const MAX_STAGGER = 6; // 한 번에 7개 이상 들어와도 0.42초 이상 기다리지 않게

export default function MotionRoot() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const root = document.documentElement;

    // ---------- reveal ----------
    const io = new IntersectionObserver(
      (entries) => {
        const entering = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top ||
              a.boundingClientRect.left - b.boundingClientRect.left,
          );
        entering.forEach((e, i) => {
          const el = e.target;
          if (!el.style.getPropertyValue('--reveal-delay')) {
            const own = Number(el.dataset.revealDelay ?? 0);
            el.style.setProperty(
              '--reveal-delay',
              `${own + (el.dataset.revealStagger === 'off' ? 0 : Math.min(i, MAX_STAGGER) * STAGGER)}ms`,
            );
          }
          el.classList.add('is-in');
          io.unobserve(el);
        });
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.1 },
    );

    const observe = (scope) => {
      scope.querySelectorAll?.('[data-reveal]:not(.is-in)').forEach((el) => {
        if (reduce) el.classList.add('is-in');
        else io.observe(el);
      });
    };
    observe(document);

    // 세로 위치만으로 판단하는 보조 확인 — 가로로 잘린 요소도 놓치지 않아요.
    const sweep = () => {
      const limit = window.innerHeight * 0.94;
      document.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.height === 0 && r.width === 0) return; // display:none
        if (r.top < limit && r.bottom > 0) {
          el.classList.add('is-in');
          io.unobserve(el);
        }
      });
    };

    // 클라이언트에서 나중에 그려지는 요소(탭 전환, 장바구니 등)도 감시
    const mo = new MutationObserver((list) => {
      list.forEach((m) =>
        m.addedNodes.forEach(
          (n) => n.nodeType === 1 && (n.matches?.('[data-reveal]') ? observe(n.parentNode) : observe(n)),
        ),
      );
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // ---------- parallax ----------
    let frame = 0;
    let boot = 0;
    const layers = () => [...document.querySelectorAll('[data-parallax]')];
    const update = () => {
      frame = 0;
      sweep();
      const vh = window.innerHeight;
      // 모바일(900px 미만)에서는 패럴랙스를 쓰지 않아요 — 손가락 스크롤과 따로 노는 느낌이 들고 버벅이기 쉬워요.
      if (window.innerWidth < 900) {
        layers().forEach((el) => {
          const img = el.querySelector('img');
          if (img && img.style.transform) img.style.transform = '';
        });
        return;
      }
      layers().forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        const img = el.querySelector('img');
        if (!img) return;
        const speed = Number(el.dataset.parallax) || 0.1;
        // 요소 중심이 화면 중앙에서 얼마나 떨어졌는지 (-1 ~ 1)
        const progress = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2)));
        // 위아래로 움직여도 빈 곳이 보이지 않도록 살짝 확대한 상태에서 이동
        const scale = 1 + speed * 1.2;
        img.style.transform = `translate3d(0, ${(-progress * speed * 50).toFixed(2)}%, 0) scale(${scale})`;
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    if (!reduce) {
      // 첫 sweep은 IntersectionObserver가 먼저 순서(stagger)를 매기도록 한 박자 늦춰요.
      boot = setTimeout(update, 400);
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
    }

    root.classList.add('motion-ready', 'motion-live');

    return () => {
      io.disconnect();
      mo.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
      clearTimeout(boot);
    };
  }, [pathname]);

  return null;
}
