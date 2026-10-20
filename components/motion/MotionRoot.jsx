'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * 스크롤 모션 관리자 — 레이아웃에 한 번만 넣어요.
 *
 * 1) data-reveal 이 붙은 요소가 화면에 들어오면 .is-in 클래스를 붙여요.
 *    실제 움직임은 styles/_motion.scss 와 각 컴포넌트 CSS에 있어요.
 *    같은 순간에 들어온 요소들은 위→아래, 왼→오른 순서로 0.08초씩 늦게 시작해요(stagger).
 * 2) data-parallax="0.12" 요소는 스크롤에 따라 안쪽 이미지를 천천히 움직여요.
 *
 * 서버 컴포넌트에서도 속성만 붙이면 되기 때문에, 어떤 컴포넌트든 쉽게 모션을 줄 수 있어요.
 */
const STAGGER = 80; // ms

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
            el.style.setProperty('--reveal-delay', `${own + (el.dataset.revealStagger === 'off' ? 0 : i * STAGGER)}ms`);
          }
          el.classList.add('is-in');
          io.unobserve(el);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );

    const observe = (scope) => {
      scope.querySelectorAll?.('[data-reveal]:not(.is-in)').forEach((el) => {
        if (reduce) el.classList.add('is-in');
        else io.observe(el);
      });
    };
    observe(document);

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
    const layers = () => [...document.querySelectorAll('[data-parallax]')];
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      layers().forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        const speed = Number(el.dataset.parallax) || 0.1;
        // 요소 중심이 화면 중앙에서 얼마나 떨어졌는지 (-1 ~ 1)
        const progress = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
        el.style.setProperty('--py', `${(-progress * speed * 100).toFixed(2)}%`);
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    if (!reduce) {
      update();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
    }

    root.classList.add('motion-ready');

    return () => {
      io.disconnect();
      mo.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
