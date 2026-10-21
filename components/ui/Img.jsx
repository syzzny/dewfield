'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { cx } from '@/lib/format';
import styles from './Img.module.scss';

/**
 * 이미지 프레임. 부모 크기를 꽉 채우고(object-fit: cover), 이미지가 없으면 paper-2 블록으로 남아요.
 *
 * next/image를 써서 화면 폭에 맞는 크기 · WebP/AVIF 파일을 자동으로 골라 받아요.
 *
 * sat: Figma 이미지 필터의 saturation 값 (-0.15 → 채도 85%)
 * sizes: 이 이미지가 화면에서 차지하는 폭 — 브라우저가 알맞은 크기의 파일을 고르는 기준이에요.
 *        (기본 100vw. 2열 타일이면 '(max-width: 900px) 50vw, 25vw' 처럼)
 * eager: 첫 화면에 보이는 이미지. 먼저 내려받고(priority), 스크립트를 기다리지 않고
 *        CSS 애니메이션만으로 바로 나타나요 — 첫 화면이 늦게 뜨는 문제(LCP)를 막아요.
 * reveal: 'image'(기본, 커튼이 걷히며 가라앉기) | 'fade' | false
 * parallax: 0.08 같은 숫자를 주면 스크롤보다 천천히 움직여요 (풀블리드 배경용)
 */
export default function Img({
  src,
  alt = '',
  sat = -0.15,
  position,
  className,
  sizes = '100vw',
  eager = false,
  blend,
  reveal = 'image',
  parallax,
}) {
  const ref = useRef(null);
  const [failed, setFailed] = useState(false);
  // 스크롤 이미지는 파일이 다 내려온 뒤에만 보여줘요 — 늦게 도착한 사진이 '팍' 하고 나타나는 걸 막아요.
  const [loaded, setLoaded] = useState(false);

  // 하이드레이션 전에 이미 로드가 끝났거나(캐시) 실패한 경우도 잡아요.
  useEffect(() => {
    const img = ref.current;
    if (!img) return;
    if (img.complete) {
      if (img.naturalWidth === 0) setFailed(true);
      else setLoaded(true);
    }
  }, [src]);

  // 첫 화면 이미지는 스크롤 리빌 대신 CSS 인트로(data-intro)로 나타나요. 패럴랙스는 그대로 둬요.
  const scrollReveal = !eager && reveal ? (parallax && reveal === 'image' ? 'fade' : reveal) : undefined;

  return (
    <span
      className={cx(styles.frame, className)}
      data-reveal={scrollReveal}
      data-intro={eager && reveal ? 'fade' : undefined}
      data-eager={eager || undefined}
      data-parallax={parallax || undefined}
      data-loaded={loaded || undefined}
    >
      {src && !failed && (
        <Image
          ref={ref}
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={eager}
          quality={80}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          style={{
            filter: sat ? `saturate(${1 + sat})` : undefined,
            objectPosition: position,
            mixBlendMode: blend,
          }}
        />
      )}
    </span>
  );
}
