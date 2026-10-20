'use client';

import { useState } from 'react';
import Rich from '@/components/ui/Rich';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import styles from './Journal.module.scss';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  return (
    <section className={styles.newsletter}>
      <Rich as="h2" text={'One letter a month,\nnothing more.'} italic="nothing more." className={styles.newsTitle} />
      <form
        className={styles.newsForm}
        onSubmit={(e) => {
          e.preventDefault();
          if (email.includes('@')) setDone(true);
        }}
      >
        <Input
          label="이메일"
          type="email"
          placeholder={done ? '구독해 주셔서 고마워요' : '이메일 주소를 입력해 주세요'}
          value={done ? '' : email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.newsInput}
        />
        <Button type="submit">{done ? '구독 완료' : '구독하기'}</Button>
      </form>
    </section>
  );
}
