'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { questions, quizIntro } from '@/data/quiz';
import { getProduct } from '@/data/products';
import { buildProfile } from '@/lib/skinProfile';
import { saveProfile } from '@/lib/profile';
import { ROUTINE, ROUTINE_DISCOUNT } from '@/lib/pricing';
import { useCart } from '@/context/CartContext';
import { won, pad, cx } from '@/lib/format';
import Img from '@/components/ui/Img';
import Label from '@/components/ui/Label';
import Rich from '@/components/ui/Rich';
import Button from '@/components/ui/Button';
import ProductTile from '@/components/ui/ProductTile';
import { ProfileMetrics } from '@/components/account/SkinProfileCard';
import { images } from '@/data/images';
import styles from './SkinFinder.module.scss';

const TOTAL = questions.length;

function QuizHeader({ onBack }) {
  const router = useRouter();
  return (
    <header className={styles.header}>
      <div className={styles.headLeft}>
        {onBack && (
          <button type="button" onClick={onBack}>
            ← <span className={styles.desktopOnly}> Back</span>
          </button>
        )}
      </div>
      <Link href="/" className={styles.logo}>
        Dewfield
      </Link>
      <div className={styles.headRight}>
        <span className={styles.desktopOnly}>Skin finder</span>
        <button type="button" onClick={() => router.push('/')}>
          Close ✕
        </button>
      </div>
    </header>
  );
}

function Intro({ onStart }) {
  return (
    <div className={styles.intro}>
      <Img src={quizIntro.image} sat={-0.25} className={styles.introImg} eager reveal="fade" />
      <div className={styles.introCopy}>
        <Label>(Skin finder) {TOTAL} questions · 1 min</Label>
        <Rich as="h1" text={quizIntro.title} italic={quizIntro.italic} className={styles.introTitle} />
        <p className={styles.introLead}>{quizIntro.lead}</p>
        <Button onClick={onStart} trailing="→" className={styles.start}>
          진단 시작하기
        </Button>
        <ol className={styles.perks}>
          {quizIntro.perks.map((p, i) => (
            <li key={p}>
              <Label tone="olive">{pad(i + 1)}</Label>
              {p}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

// ---------- 질문 유형별 입력 ----------
function SingleSelect({ q, value, onChange }) {
  return (
    <div className={styles.options} role="radiogroup">
      {q.options.map((o, i) => (
        <button
          key={o.id}
          type="button"
          role="radio"
          aria-checked={value === o.id}
          className={cx(styles.option, value === o.id && styles.optionOn)}
          onClick={() => onChange(o.id)}
        >
          <Label className={styles.key}>{String.fromCharCode(65 + i)}</Label>
          <span className={styles.optionText}>
            <span className={styles.optionTitle}>{o.title}</span>
            <span className={styles.optionDesc}>{o.desc}</span>
          </span>
          <span className={styles.radio} />
        </button>
      ))}
    </div>
  );
}

function MultiSelect({ q, value = [], onChange }) {
  const full = value.length >= q.max;
  const toggle = (id) => {
    if (value.includes(id)) onChange(value.filter((v) => v !== id));
    else if (!full) onChange([...value, id]);
  };
  return (
    <div className={styles.multi}>
      <div className={styles.chips}>
        {q.options.map((o) => {
          const on = value.includes(o.id);
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={on}
              disabled={!on && full}
              className={cx(styles.chip, on && styles.chipOn)}
              onClick={() => toggle(o.id)}
            >
              {o.title}
              <span aria-hidden>{on ? '✓' : '+'}</span>
            </button>
          );
        })}
      </div>
      <p className={styles.count}>
        <strong>
          {value.length} / {q.max}
        </strong>
        {full ? '선택 완료 · 다른 고민을 고르려면 하나를 해제해 주세요.' : '하나 이상 골라 주세요.'}
      </p>
    </div>
  );
}

function Scale({ q, value = 3, onChange }) {
  const steps = Array.from({ length: q.max - q.min + 1 }, (_, i) => q.min + i);
  const pos = (value - q.min) / (q.max - q.min);
  return (
    <div className={styles.scale}>
      <p className={styles.scaleValue}>
        <span>{value}</span> / {q.max} {q.labels[value]}
      </p>
      <div className={styles.track} style={{ '--pos': pos }}>
        <span className={styles.trackFill} />
        {steps.map((s) => (
          <button
            key={s}
            type="button"
            className={cx(styles.stop, s <= value && styles.stopOn, s === value && styles.stopCurrent)}
            style={{ '--p': (s - q.min) / (q.max - q.min) }}
            onClick={() => onChange(s)}
            aria-label={`${s}점 — ${q.labels[s]}`}
          />
        ))}
        <input
          type="range"
          min={q.min}
          max={q.max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={styles.range}
          aria-label="민감도"
        />
      </div>
      <div className={styles.scaleLabels}>
        {[q.min, Math.round((q.min + q.max) / 2), q.max].map((s) => (
          <span key={s}>
            <Label>{s}</Label>
            {q.labels[s]}
          </span>
        ))}
      </div>
      <p className={styles.insight}>
        <em>Note</em>
        {q.note}
      </p>
    </div>
  );
}

function ImageSelect({ q, value, onChange }) {
  return (
    <div className={styles.textures} role="radiogroup">
      {q.options.map((o) => (
        <button
          key={o.id}
          type="button"
          role="radio"
          aria-checked={value === o.id}
          className={cx(styles.texture, value === o.id && styles.textureOn)}
          onClick={() => onChange(o.id)}
        >
          <span className={styles.textureMedia}>
            <Img src={o.image} sat={-0.2} reveal={false} />
            {value === o.id && <span className={styles.check}>✓</span>}
          </span>
          <span className={styles.textureTitle}>{o.title}</span>
          <span className={styles.textureDesc}>{o.desc}</span>
        </button>
      ))}
    </div>
  );
}

const INPUTS = { single: SingleSelect, multi: MultiSelect, scale: Scale, image: ImageSelect };

function Question({ index, q, value, onChange, onNext, onPrev }) {
  const Input = INPUTS[q.type];
  const ready = q.type === 'multi' ? (value ?? []).length > 0 : value != null;
  return (
    <div className={styles.question}>
      <span className={styles.progress} style={{ '--p': (index + 1) / TOTAL }} aria-hidden />
      <div className={styles.qBody}>
        <div className={styles.qText}>
          <Label className={styles.desktopOnly}>
            Question {pad(index + 1)} / {pad(TOTAL)}
          </Label>
          <div className={styles.qNoRow}>
            <span className={styles.qNo}>{pad(index + 1)}</span>
            <Label className={styles.mobileOnly}>
              Question {pad(index + 1)} / {pad(TOTAL)}
            </Label>
          </div>
          <h1 className={styles.qTitle}>{q.title}</h1>
          <p className={styles.qHelp}>{q.help}</p>
        </div>
        <div className={styles.qInput}>
          <Input q={q} value={value} onChange={onChange} />
        </div>
      </div>
      <div className={styles.footerNav}>
        <button type="button" className={styles.prev} onClick={onPrev}>
          ← 이전 질문
        </button>
        <Button onClick={onNext} disabled={!ready} trailing="→" className={styles.next}>
          {index === TOTAL - 1 ? '결과 보기' : '다음'}
        </Button>
      </div>
    </div>
  );
}

function Result({ answers, onRetake }) {
  const router = useRouter();
  const { add } = useCart();
  const [saved, setSaved] = useState(false);
  const profile = useMemo(() => buildProfile(answers), [answers]);
  const routine = ROUTINE.map(getProduct);
  const full = routine.reduce((s, p) => s + p.price, 0);

  const addAll = () => {
    routine.forEach((p) => add(p.slug));
    router.push('/cart');
  };

  const save = () => {
    saveProfile(profile);
    setSaved(true);
  };

  return (
    <div className={styles.result}>
      <section className={styles.resultHero}>
        <div className={styles.resultCopy}>
          <Label tone="sage">Your skin profile</Label>
          <Rich as="h1" text={profile.title} italic={profile.italic} className={styles.resultTitle} />
          <p className={styles.resultDesc}>{profile.description}</p>
          <ul className={styles.tags}>
            {profile.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
        <div className={styles.resultVisual}>
          <Img src={images.leaf} sat={-0.3} className={styles.resultImg} reveal="fade" />
          <div className={styles.metricsCard}>
            <ProfileMetrics metrics={profile.metrics} />
          </div>
        </div>
      </section>

      <section className={styles.routine}>
        <div className={styles.routineHead}>
          <Rich as="h2" text="Your ritual, in four steps." italic="in four steps." className={styles.routineTitle} />
          <p>추천 루틴 4종 · 개별 구매 대비 {won(ROUTINE_DISCOUNT)} 할인</p>
        </div>
        <div className={styles.routineGrid}>
          {routine.map((p, i) => (
            <ProductTile
              key={p.slug}
              product={{
                ...p,
                tag: `Step ${pad(i + 1)}`,
                korean: p.slug === 'cica-calming-toner' ? `${p.korean} · ${profile.match}% match` : p.korean,
              }}
            />
          ))}
        </div>
        <div className={styles.ctaBar}>
          <div className={styles.priceRow}>
            <strong>{won(full - ROUTINE_DISCOUNT)}</strong>
            <s>{won(full)}</s>
            <span>+ 첫 구매 20% 쿠폰이 결과와 함께 발급됐어요</span>
          </div>
          <div className={styles.ctaButtons}>
            <Button variant="secondary" onClick={save}>
              {saved ? '저장했어요 ✓' : '결과 저장하기'}
            </Button>
            <div className={styles.addAll}>
              <Button block trailing="→" onClick={addAll}>
                루틴 한 번에 담기
              </Button>
            </div>
          </div>
        </div>
        <p className={styles.retake}>
          결과가 다르게 느껴지나요?{' '}
          <button type="button" onClick={onRetake}>
            다시 진단하기
          </button>
          {saved && (
            <>
              {' '}
              · <Link href="/mypage">마이페이지에서 보기</Link>
            </>
          )}
        </p>
      </section>
    </div>
  );
}

export default function SkinFinder() {
  // step: -1 인트로, 0~4 질문, 5 결과
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState({ sensitivity: 3 });
  const router = useRouter();

  const q = questions[step];
  const set = (value) => setAnswers((a) => ({ ...a, [q.id]: value }));
  const back = () => (step <= -1 ? router.back() : setStep((s) => s - 1));

  return (
    <div className={styles.finder}>
      <QuizHeader onBack={back} />
      {step === -1 && <Intro onStart={() => setStep(0)} />}
      {q && (
        <Question
          key={q.id}
          index={step}
          q={q}
          value={answers[q.id]}
          onChange={set}
          onPrev={back}
          onNext={() => setStep((s) => s + 1)}
        />
      )}
      {step === TOTAL && (
        <Result
          answers={answers}
          onRetake={() => {
            setAnswers({ sensitivity: 3 });
            setStep(0);
          }}
        />
      )}
    </div>
  );
}
