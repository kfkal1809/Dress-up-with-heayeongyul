# 해연결 옷입히기 — 해남이 ♥ 해녀

해남이와 해녀를 각각 꾸미고 한 장의 커플 기념사진처럼 완성하는 모바일 우선 웹게임입니다.

## 구현 기능

- 두 캐릭터 독립 코디
- 헤어, 상의, 하의, 한벌옷, 신발, 모자, 소품 선택
- 8종 배경 선택
- 캐릭터별 별명 입력(최대 10자)
- 현재 캐릭터 랜덤 코디 및 둘 다 랜덤
- 캐릭터별 초기화
- 커플 완성 화면
- 브라우저 LocalStorage 자동 저장
- 모바일·PC 반응형 UI
- 동일 SVG 좌표계 기반 의상 레이어 정렬

## 실행 방법

```bash
npm install
npm run dev
```

프로덕션 빌드:

```bash
npm run build
```

## 배포

Vercel에서 이 저장소를 Import하면 별도 환경변수 없이 배포할 수 있습니다. Framework Preset은 `Vite`, Build Command는 `npm run build`, Output Directory는 `dist`를 사용합니다.

## 구조

```text
src/
  components/
    CharacterCanvas.tsx  # 캐릭터·의상 SVG 레이어
    SceneDecor.tsx       # 배경별 장식
  data/items.ts          # 캐릭터 아이템·배경 데이터
  hooks/usePersistentGame.ts
  App.tsx
  styles.css
```
