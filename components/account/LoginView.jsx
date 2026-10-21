'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { images } from '@/data/images';
import IndexRow from '@/components/ui/IndexRow';
import Img from '@/components/ui/Img';
import Label from '@/components/ui/Label';
import Rich from '@/components/ui/Rich';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import styles from './LoginView.module.scss';

const SOCIAL = ['카카오', '네이버', 'Apple'];

export default function LoginView() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [keep, setKeep] = useState(true);
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!email.includes('@') || password.length < 4) {
      setError('이메일과 비밀번호를 확인해 주세요');
      return;
    }
    router.push('/mypage');
  };

  return (
    <section className={styles.wrap} data-intro>
      <div className={styles.visual}>
        <Img
          src={images.leaf}
          sat={-0.25}
          className={styles.img}
          eager
          parallax={0.06}
          sizes="(max-width: 900px) 100vw, 50vw"
        />
        <span className={styles.shade} />
        <Label tone="cream" className={styles.label}>
          (Members) Dewfield club
        </Label>
      </div>

      <form className={styles.form} onSubmit={submit} noValidate>
        <IndexRow left="(Login)  Sign in" right="Member" strong />
        <Rich as="h1" text="Sign in." italic="in." className={styles.title} />
        <p className={styles.lead}>로그인하고 피부 프로필과 주문 내역을 확인하세요.</p>
        <Input
          label="이메일"
          type="email"
          autoComplete="email"
          placeholder="yoonseo@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="비밀번호"
          type={show ? 'text' : 'password'}
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          action={show ? '숨기기' : '보기'}
          onAction={() => setShow((v) => !v)}
          error={error}
        />
        <div className={styles.row}>
          <label className={styles.check}>
            <input type="checkbox" checked={keep} onChange={(e) => setKeep(e.target.checked)} />
            <span className={styles.box} />
            로그인 상태 유지
          </label>
          <Link href="#" className={styles.find}>
            비밀번호 찾기
          </Link>
        </div>
        <Button type="submit" block trailing="→">
          로그인
        </Button>
        <div className={styles.or}>
          <i />
          <Label>Or</Label>
          <i />
        </div>
        <div className={styles.social}>
          {SOCIAL.map((s) => (
            <button key={s} type="button" onClick={() => router.push('/mypage')}>
              {s}로 시작하기
            </button>
          ))}
        </div>
        <p className={styles.join}>
          아직 회원이 아니신가요? <Link href="#">회원가입하고 20% 쿠폰 받기</Link>
        </p>
      </form>
    </section>
  );
}
