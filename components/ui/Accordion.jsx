'use client';

import { useState } from 'react';
import { cx } from '@/lib/format';
import styles from './Accordion.module.scss';

/** items: [{ title, content }] — 한 번에 하나만 열려요. */
export default function Accordion({ items, className }) {
  const [open, setOpen] = useState(-1);
  return (
    <div className={cx(styles.accordion, className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.title} className={styles.item}>
            <button
              type="button"
              className={styles.head}
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              <span>{item.title}</span>
              <span className={styles.icon} aria-hidden>
                {isOpen ? '−' : '+'}
              </span>
            </button>
            <div className={cx(styles.panel, isOpen && styles.open)}>
              <div className={styles.inner}>
                <div className={styles.content}>{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
