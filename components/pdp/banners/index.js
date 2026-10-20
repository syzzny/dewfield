// =============================================================
// 배너 레지스트리 — data/products.js의 sections[].type 이름과 컴포넌트를 연결해요.
// 새 배너를 만들면 여기에 한 줄 추가하고, 상품 데이터에서 type으로 불러 쓰면 돼요.
// =============================================================
import HeroBanner from './HeroBanner';
import TextureIngredients from './TextureIngredients';
import BigNumber from './BigNumber';
import HowToUse from './HowToUse';
import HydrationChart from './HydrationChart';
import Results from './Results';
import PhScale from './PhScale';
import TimerDial from './TimerDial';
import TextureStates from './TextureStates';
import BarrierDiagram from './BarrierDiagram';
import Dose from './Dose';
import RatioBar from './RatioBar';
import DayNight from './DayNight';
import Orbit from './Orbit';
import WeightScale from './WeightScale';
import Staircase from './Staircase';
import Receipt from './Receipt';
import Schedule from './Schedule';

export const banners = {
  heroBanner: HeroBanner,
  textureIngredients: TextureIngredients,
  bigNumber: BigNumber,
  howToUse: HowToUse,
  hydrationChart: HydrationChart,
  results: Results,
  phScale: PhScale,
  timerDial: TimerDial,
  textureStates: TextureStates,
  barrierDiagram: BarrierDiagram,
  dose: Dose,
  ratioBar: RatioBar,
  dayNight: DayNight,
  orbit: Orbit,
  weightScale: WeightScale,
  staircase: Staircase,
  receipt: Receipt,
  schedule: Schedule,
};
