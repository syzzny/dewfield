'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getProduct } from '@/data/products';

/**
 * 장바구니 상태 — 전역 Context + localStorage
 * item: { slug, option(옵션 index), qty }
 */
const CartContext = createContext(null);
const STORAGE_KEY = 'dewfield-bag';
const EXTRAS_KEY = 'dewfield-bag-extras';

const read = (key, fallback) => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const write = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* 저장 불가 환경에서는 메모리로만 유지 */
  }
};

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  // 쿠폰 · 선물 포장 같은 주문 옵션
  const [extras, setExtras] = useState({ coupon: true, gift: false });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setItems(read(STORAGE_KEY, []));
    setExtras((prev) => read(EXTRAS_KEY, prev));
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) write(STORAGE_KEY, items);
  }, [items, ready]);

  useEffect(() => {
    if (ready) write(EXTRAS_KEY, extras);
  }, [extras, ready]);

  const setExtra = useCallback((key, value) => setExtras((prev) => ({ ...prev, [key]: value })), []);

  const add = useCallback((slug, option = 0, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.slug === slug && i.option === option);
      if (found) return prev.map((i) => (i === found ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { slug, option, qty }];
    });
  }, []);

  const setQty = useCallback((slug, option, qty) => {
    setItems((prev) => prev.map((i) => (i.slug === slug && i.option === option ? { ...i, qty: Math.max(1, qty) } : i)));
  }, []);

  const remove = useCallback((slug, option) => {
    setItems((prev) => prev.filter((i) => !(i.slug === slug && i.option === option)));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(() => {
    // 화면에서 바로 쓸 수 있게 상품 정보와 합쳐서 내려줘요.
    const lines = items
      .map((i) => {
        const product = getProduct(i.slug);
        if (!product) return null;
        const option = product.options[i.option] ?? product.options[0];
        return { ...i, product, optionInfo: option, lineTotal: option.price * i.qty };
      })
      .filter(Boolean);
    const count = lines.reduce((sum, l) => sum + l.qty, 0);
    const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0);
    const original = lines.reduce(
      (sum, l) => sum + Math.round((l.product.originalPrice / l.product.price) * l.optionInfo.price) * l.qty,
      0,
    );
    return { ready, lines, count, subtotal, original, extras, setExtra, add, setQty, remove, clear };
  }, [items, extras, ready, add, setQty, remove, clear, setExtra]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart는 CartProvider 안에서 써야 해요.');
  return ctx;
};
