'use client';

import { useEffect, useRef, useState } from 'react';

// "72%", "−41%", "+58%", "×5", "4.9", "41,280", "₩54,000" → 앞글자 · 숫자 · 뒷글자
const parse = (value) => {
  const m = String(value).match(/^([^\d]*)([\d,]*\.?\d+)(.*)$/);
  if (!m) return null;
  const [, prefix, num, suffix] = m;
  const decimals = num.includes('.') ? num.split('.')[1].length : 0;
  return { prefix, suffix, target: Number(num.replace(/,/g, '')), decimals, comma: num.includes(',') };
};

const format = (n, { decimals, comma }) => {
  const fixed = n.toFixed(decimals);
  return comma ? Number(fixed).toLocaleString('en-US', { minimumFractionDigits: decimals }) : fixed;
};

/**
 * 화면에 들어오면 0부터 목표값까지 올라가는 숫자.
 * 숫자가 아닌 값("Matte", "Jeju")은 그대로 보여줘요.
 * 레이아웃이 흔들리지 않도록 최종값과 같은 폭을 미리 잡아둬요.
 */
export default function CountUp({ value, duration = 1600, className }) {
  const ref = useRef(null);
  const parsed = parse(value);
  const [display, setDisplay] = useState(String(value));

  useEffect(() => {
    if (!parsed || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const el = ref.current;
    let raf = 0;
    setDisplay(`${parsed.prefix}${format(0, parsed)}${parsed.suffix}`);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 4); // easeOutQuart
          setDisplay(`${parsed.prefix}${format(parsed.target * eased, parsed)}${parsed.suffix}`);
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span ref={ref} className={className} style={{ position: 'relative', display: 'inline-block' }}>
      {/* 폭 고정용 투명 최종값 */}
      <span aria-hidden style={{ visibility: 'hidden' }}>
        {value}
      </span>
      <span style={{ position: 'absolute', left: 0, top: 0, whiteSpace: 'nowrap' }} aria-label={String(value)}>
        {display}
      </span>
    </span>
  );
}
