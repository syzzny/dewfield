# Dewfield — 스킨케어 브랜드 사이트 퍼블리싱

Figma 에디토리얼 시안(데스크톱 1440 · 모바일 390)을 Next.js로 옮긴 반응형 퍼블리싱 프로젝트예요.
390px부터 1440px까지 글자 크기와 여백이 자연스럽게 커지고, 900px을 기준으로 모바일/데스크톱 레이아웃이 바뀌어요.

## 시작하기

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 배포 전 빌드 확인
```

Node.js 18.17 이상이 필요해요. GitHub에 올린 뒤 Vercel에 연결하면 바로 배포돼요.

## 기술 스택

- **Next.js 14 (App Router) + React 18 + JavaScript**
- **SCSS Module**: 컴포넌트마다 스타일 파일을 하나씩 두고, 공통 토큰과 믹스인은 `styles/`에서 불러와요.
- **폰트**: 영문 Instrument Serif · Sans는 `next/font/local`(app/fonts)로 미리 내려받고, 한글 Noto Sans KR은 @fontsource 분할 파일로 제공해요.
- **next/image**: 화면 폭에 맞는 크기의 WebP를 자동으로 골라 받아요 (변환에 `sharp` 사용).
- 외부 상태 관리 라이브러리 없이 **Context + localStorage**로 장바구니를 관리해요.

## 폴더 구조

```
app/                  라우트 (페이지 = 데이터를 조합하는 얇은 파일)
  page.js             홈
  shop/               상품 목록 · [slug] 상세
  cart/ checkout/ order-complete/
  skin-finder/        1분 피부 진단
  about/ journal/ login/ mypage/ search/
  not-found.js        404
components/
  layout/             Nav · MobileMenu · Footer · Marquee
  ui/                 재사용 UI (Button, Label, IndexRow, Rich, Img, ProductTile, Input, Chip, Stepper, Accordion …)
  home/ shop/ cart/ checkout/ account/ journal/ search/ finder/ about/
  pdp/                상세페이지 공통 섹션
  pdp/banners/        상품별 배너 18종 + 레지스트리(index.js)
context/              CartContext(장바구니) · NavContext(투명 헤더)
data/                 상품 · 저널 · 성분 · 진단 질문 · 메뉴 · 이미지 경로
lib/                  가격 계산 · 주문 · 진단 결과 계산 · 포맷 함수
styles/               _tokens.scss · _mixins.scss · globals.scss
public/images/        이미지 (Figma "Dev export — Images" 프레임에서 내보내기)
```

## 유지보수 포인트

**디자인 토큰**
- `styles/_tokens.scss`의 색은 Figma `Dewfield / Color` 컬렉션의 `ed/` 변수와 이름이 같아요.
- `c(olive)`, `c(ink, 0.18)`처럼 불러 써요.

**유동 타이포그래피**
- `fl(28, 54)`은 화면 폭 390px일 때 28px, 1440px일 때 54px이고, 그 사이에서는 비율대로 커져요.
- `serif()`, `kr()`, `label()` 믹스인에 크기를 넘겨 쓰면 돼요.

**제목 강조 패턴**
- `<Rich text={'The Calming\nLine'} italic="Line" />`이라고 쓰면 줄바꿈과 이탤릭 강조가 함께 처리돼요.

**상품별 배너**
- `data/products.js`의 `sections` 배열에 `type`과 내용만 적으면 돼요.
- 컴포넌트는 `components/pdp/banners/index.js` 레지스트리에서 찾아 그려요.
- 배너 순서를 바꾸거나 다른 상품의 배너를 재사용할 때 코드는 고치지 않아도 돼요.

**가격 규칙**
- `lib/pricing.js` 한 곳에 있어요. 장바구니와 결제 화면이 같은 규칙을 써요.
- 무료배송 기준, 첫 구매 20%, 루틴 4종 할인이 여기에 정의돼 있어요.

**이미지**
- `data/images.js`에서 경로를 관리해요.
- `<Img>`에 `sizes`(화면에서 차지하는 폭)를 적어 주면 그 크기에 맞는 파일만 받아요.
- 첫 화면에 보이는 이미지는 `eager`를 붙여요 — 먼저 받고, 스크립트를 기다리지 않고 바로 나타나요.
- 같은 파일명으로 덮어쓰면 교체돼요.
- 이미지가 없으면 베이지 블록으로 자리만 남아요.

## 동작하는 기능

- 장바구니
  - 담기, 수량 변경, 삭제, 무료배송 진행 바, 선물 포장, 쿠폰 적용/해제
  - 새로고침해도 유지돼요 (localStorage).
- 결제
  - 입력값 검증과 필수 약관 체크를 거쳐 주문 완료 화면으로 넘어가요.
  - 주문 번호와 도착 예정일을 만들고, 결제가 끝나면 장바구니를 비워요.
- 피부 진단
  - 질문 5개(단일 선택 · 다중 선택 · 척도 · 이미지 선택)에 답하면 피부 프로필을 계산해요.
  - 추천 루틴을 한 번에 담을 수 있어요.
  - 결과를 저장하면 마이페이지에 반영돼요.
- 상품 목록
  - 카테고리를 바꾸면 URL(`?category=`)에도 반영돼요.
  - 피부 고민 필터와 정렬을 쓸 수 있어요.
- 검색
  - 상품과 저널을 함께 찾아요.
  - 결과가 없을 때 보여주는 화면이 따로 있어요.
- 기타 화면
  - 모바일 전체 메뉴, 저널 카테고리 필터, 마이페이지 탭, 404 화면

> 상품 · 리뷰 · 주문 데이터는 포트폴리오용 예시 값이에요.
