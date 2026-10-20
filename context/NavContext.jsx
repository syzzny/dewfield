'use client';

import { createContext, useContext, useEffect, useState } from 'react';

/**
 * 헤더 모드 — 히어로 이미지 위에 겹치는 투명 헤더(overlay)를 쓸 페이지에서
 * <NavOverlay /> 한 줄만 넣으면 돼요. (홈, 404)
 */
const NavContext = createContext({ overlay: false, setOverlay: () => {} });

export function NavProvider({ children }) {
  const [overlay, setOverlay] = useState(false);
  return <NavContext.Provider value={{ overlay, setOverlay }}>{children}</NavContext.Provider>;
}

export const useNavMode = () => useContext(NavContext);

export function NavOverlay() {
  const { setOverlay } = useNavMode();
  useEffect(() => {
    setOverlay(true);
    return () => setOverlay(false);
  }, [setOverlay]);
  return null;
}
