'use client';

import { useEffect, useRef, useState } from 'react';
import { cx } from '@/lib/format';
import styles from './Img.module.scss';

/**
 * 이미지 프레임. 부모 크기를 꽉 채우고(object-fit: cover), 이미지가 없으면 paper-2 블록으로 남아요.
 * sat: Figma 이미지 필터의 saturation 값 (-0.15 → 채도 85%)
 * reveal: 'image'(기본, 위에서 열리며 가라앉기) | 'fade' | false
 * parallax: 0.08 같은 숫자를 주면 스크롤보다 천천히 움직여요 (풀블리드 배경용)
 */
export default function Img({
  src,
  alt = '',
  sat = -0.15,
  position,
  className,
  eager = false,
  blend,
  reveal = 'image',
  parallax,
}) {
  const ref = useRef(null);
  const [failed, setFailed] = useState(false);

  // 하이드레이션 전에 이미 로드 실패한 경우도 잡아요.
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, [src]);

  return (
    <span
      className={cx(styles.frame, className)}
      data-reveal={reveal ? (parallax && reveal === 'image' ? 'fade' : reveal) : undefined}
      data-parallax={parallax || undefined}
    >
      {src && !failed && (
        <img
          ref={ref}
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
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
