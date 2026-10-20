import { NavOverlay } from '@/context/NavContext';
import { images } from '@/data/images';
import Img from '@/components/ui/Img';
import Label from '@/components/ui/Label';
import Rich from '@/components/ui/Rich';
import Button from '@/components/ui/Button';
import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <section className={styles.page}>
      <NavOverlay />
      <Img src={images.hills} sat={-0.35} className={styles.bg} eager parallax={0.1} />
      <span className={styles.shade} />
      <div className={styles.content}>
        <Label>
          (Error 404)<span className={styles.desktopOnly}> Page not found</span>
        </Label>
        <p className={styles.code} data-reveal="rise">
          404
        </p>
        <div className={styles.row}>
          <Rich as="h1" text={'This path\nleads nowhere.'} italic="leads nowhere." className={styles.title} />
          <div className={styles.side}>
            <p>
              찾으시는 페이지가 옮겨졌거나 사라졌어요.
              <span className={styles.desktopOnly}>
                <br />
                들판을 잠시 걷다가 다시 돌아가 볼까요?
              </span>
            </p>
            <Button href="/" variant="light" trailing="→" className={styles.btn}>
              홈으로 돌아가기
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
