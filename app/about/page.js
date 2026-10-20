import CountUp from '@/components/motion/CountUp';
import { NavOverlay } from '@/context/NavContext';
import { images } from '@/data/images';
import Marquee from '@/components/layout/Marquee';
import Ingredients from '@/components/home/Ingredients';
import IndexRow from '@/components/ui/IndexRow';
import Img from '@/components/ui/Img';
import Label from '@/components/ui/Label';
import Rich from '@/components/ui/Rich';
import SectionHead from '@/components/ui/SectionHead';
import Button from '@/components/ui/Button';
import styles from '@/components/about/About.module.scss';

export const metadata = { title: 'Our story' };

const RULES = [
  {
    en: 'Less',
    ko: '덜어내기',
    text: '자극이 될 수 있는 성분은 처음부터 넣지 않아요. 전 성분 23가지, 그 이상은 늘리지 않아요.',
  },
  { en: 'Honest', ko: '투명하게', text: '모든 성분의 함량과 원산지를 공개해요. 임상 결과도 숫자 그대로 보여드려요.' },
  {
    en: 'Slow',
    ko: '천천히',
    text: '피부가 스스로 회복하는 속도를 기다려요. 즉각적인 효과보다 오래가는 편안함을 만들어요.',
  },
];

const FIELD = [
  { value: '33.4°N', label: '제주 한경면 유기농 밭' },
  { value: '14 days', label: '저온 숙성 추출' },
  { value: '0 km', label: '원료 산지 직거래' },
];

const NUMBERS = [
  { value: '23', label: '전 성분 개수' },
  { value: '0', label: '인공 향료 · 색소' },
  { value: '72%', label: '병풀 추출물 함량' },
  { value: '41,280', label: '누적 리뷰' },
];

export default function AboutPage() {
  return (
    <>
      <NavOverlay />

      <section className={styles.hero}>
        <Img src={images.centellaField} sat={-0.25} className={styles.heroImg} eager parallax={0.12} />
        <span className={styles.heroShade} />
        <span className={styles.heroLines} aria-hidden>
          <i /> <i /> <i />
        </span>
        <Label className={styles.heroLabel}>(Our story) Est. 2026 — Seoul</Label>
        <h1 className={styles.heroTitle}>
          <span data-reveal="rise" data-reveal-delay="100" data-reveal-stagger="off">
            Less,
          </span>{' '}
          <em data-reveal="rise" data-reveal-delay="320" data-reveal-stagger="off">
            but kinder.
          </em>
        </h1>
        <p className={styles.heroLead}>
          우리는 무엇을 더할지보다
          <br />
          무엇을 뺄지를 먼저 고민해요.
        </p>
      </section>

      <section className={styles.section}>
        <IndexRow left="(01)  Origin" right="01 / 04" strong />
        <div className={styles.origin}>
          <div className={styles.originText}>
            <Rich
              as="h2"
              text={'It began with\none sensitive cheek.'}
              italic="one sensitive cheek."
              className={styles.originTitle}
            />
            <p className={styles.originBody}>
              {
                '듀필드는 바르는 것마다 붉어지던 한 사람의 피부에서 시작됐어요. 좋은 성분을 더할수록 오히려 예민해지는 피부를 보며, 우리는 반대로 덜어내기로 했어요.\n\n정제수 대신 병풀을, 향료 대신 아무것도. 피부가 원래 알고 있는 회복의 속도를 믿고, 그 속도를 방해하지 않는 제품만 만들어요.'
              }
            </p>
          </div>
          <figure className={styles.figure}>
            <Img src={images.portrait} className={styles.figImg} />
            <figcaption>
              <Label>Fig. 01</Label>
              <em>Founder’s morning ritual</em>
            </figcaption>
          </figure>
        </div>
      </section>

      <div className={styles.principles}>
        <section className={styles.section}>
          <IndexRow left="(02)  Principles" right="02 / 04" dark strong />
          <Rich as="h2" text="Three quiet rules." italic="quiet rules." className={styles.bigTitle} />
          <ol className={styles.rules}>
            {RULES.map((r, i) => (
              <li key={r.en} data-reveal="up">
                <span className={styles.ruleNo}>0{i + 1}</span>
                <span className={styles.ruleHead}>
                  <span className={styles.ruleEn}>{r.en}</span>
                  <span className={styles.ruleKo}>{r.ko}</span>
                </span>
                <p className={styles.ruleText}>{r.text}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <section className={styles.field}>
        <div className={styles.fieldHead}>
          <IndexRow left="(03)  The field" right="03 / 04" strong />
          <SectionHead
            title={'Grown slowly\nin Jeju.'}
            italic="in Jeju."
            body={
              '제주 서쪽 유기농 밭에서 병풀과 녹차를 키워요.\n화산토의 미네랄을 머금고 자란 원료를 14일간\n저온 숙성해 추출합니다.'
            }
            size="m"
          />
        </div>
        <div className={styles.fieldMedia}>
          <Img src={images.hills} sat={-0.3} className={styles.fieldImg} parallax={0.12} />
          <div className={styles.coords}>
            {FIELD.map((f) => (
              <div key={f.value}>
                <strong>{f.value}</strong>
                <span>{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Ingredients id="ingredients" index="(Index)  Ingredients" count="23 total" />

      <section className={styles.section}>
        <IndexRow left="(04)  In numbers" right="04 / 04" strong />
        <ul className={styles.numbers}>
          {NUMBERS.map((n) => (
            <li key={n.label} data-reveal="up">
              <CountUp value={n.value} className={styles.numValue} />
              <span className={styles.numLabel}>{n.label}</span>
            </li>
          ))}
        </ul>
        <div className={styles.note}>
          <blockquote>
            “덜어낸 자리에서
            <br />
            피부는 비로소 숨을 쉬어요.”
          </blockquote>
          <Label>Dewfield — Founding note</Label>
          <div className={styles.cta}>
            <Button href="/shop" trailing="→">
              라인 둘러보기
            </Button>
            <Button href="#ingredients" variant="secondary" trailing="→">
              성분 사전 보기
            </Button>
          </div>
        </div>
      </section>

      <Marquee />
    </>
  );
}
