import type { BackgroundItem, Category, CharacterKey, CharacterState, DressItem, GameState, SpriteSpec } from '../types'

const sprite = (atlas: string, index: number, columns: number, rows = 1, fit: SpriteSpec['fit'] = 'crop'): SpriteSpec => ({ atlas, index, columns, rows, fit })

const item = (
  gender: CharacterKey,
  category: DressItem['category'],
  id: string,
  name: string,
  color: string,
  accent: string,
  icon: string,
  artwork?: SpriteSpec,
  requiresHead = false,
): DressItem => ({ gender, category, id, name, color, accent, icon, sprite: artwork, requiresHead })

const HN_SAILOR = '/assets/sprites/haenam-sailor-outfits.png'
const HN_ENGINEER = '/assets/sprites/haenam-engineer-outfits.png'
const HN_HAIR = '/assets/sprites/haenam-hair.png'
const HN_ITEMS = '/assets/sprites/haenam-items.png'
const HN_EXTRA_OUTFITS = '/assets/sprites/haenam-extra-outfits.png'
const HN_WEDDING_OUTFITS = '/assets/sprites/haenam-wedding-outfits.png'
const HN_EXTRA_ITEMS = '/assets/sprites/haenam-extra-items.png'
const HY_OUTFITS = '/assets/sprites/haenyeo-outfits.png'
const HY_HAIR = '/assets/sprites/haenyeo-hair.png'
const HY_ITEMS = '/assets/sprites/haenyeo-items.png'
const HY_EXTRA_OUTFITS = '/assets/sprites/haenyeo-extra-outfits.png'
const HY_WEDDING_OUTFITS = '/assets/sprites/haenyeo-wedding-outfits.png'
const HY_EXTRA_ITEMS = '/assets/sprites/haenyeo-extra-items.png'
const WEDDING_ITEMS = '/assets/sprites/wedding-items.png'

export const categoryMeta: Record<Category, { label: string; icon: string }> = {
  hair: { label: '헤어', icon: '✂' },
  top: { label: '상의', icon: '♧' },
  bottom: { label: '하의', icon: '▥' },
  outfit: { label: '옷', icon: '✦' },
  shoes: { label: '신발', icon: '◒' },
  hat: { label: '모자', icon: '⌒' },
  accessory: { label: '소품', icon: '★' },
  background: { label: '배경', icon: '▧' },
}

const haenamItems: DressItem[] = [
  item('haenam', 'hair', 'hn-basic', '단정한 기본머리', '#604333', '#8b6249', '✂', sprite(HN_HAIR, 0, 7)),
  item('haenam', 'hair', 'hn-wave', '살짝 웨이브', '#654536', '#9a6b4d', '〰', sprite(HN_HAIR, 1, 7)),
  item('haenam', 'hair', 'hn-bowl', '덮은 머리', '#252b32', '#4a535e', '●', sprite(HN_HAIR, 2, 7)),
  item('haenam', 'hair', 'hn-part', '짧은 가르마', '#694632', '#9c6d4e', '⌁', sprite(HN_HAIR, 3, 7)),
  item('haenam', 'hair', 'hn-curl', '부드러운 곱슬', '#704a32', '#9f704d', '❧', sprite(HN_HAIR, 4, 7)),
  item('haenam', 'hair', 'hn-pomade', '포마드 스타일', '#30343a', '#59616a', '✦', sprite(HN_HAIR, 5, 7)),
  item('haenam', 'hair', 'hn-long', '약간 긴 머리', '#70472f', '#a66f4c', '⌁', sprite(HN_HAIR, 6, 7)),

  item('haenam', 'top', 'hn-tank', '흰 민소매', '#fffdf6', '#c8d4dc', '◇'),
  item('haenam', 'bottom', 'hn-shorts', '흰 반바지', '#fffdf6', '#bfcdd7', '▱'),
  item('haenam', 'shoes', 'hn-barefoot', '맨발', '#f5c9aa', '#d49b7d', '◡'),

  item('haenam', 'outfit', 'hn-sailor-white', '항해사 기본 제복', '#f8f3e7', '#1f4e78', '⚓', sprite(HN_SAILOR, 0, 7)),
  item('haenam', 'outfit', 'hn-sailor-short', '반팔 제복', '#f4eee0', '#355f82', '⚓', sprite(HN_SAILOR, 1, 7)),
  item('haenam', 'outfit', 'hn-sailor-navy', '네이비 가디건 제복', '#304f70', '#e8b84d', '★', sprite(HN_SAILOR, 2, 7)),
  item('haenam', 'outfit', 'hn-raincoat', '노랑 우비', '#f4c94a', '#dd8d2c', '☂', sprite(HN_SAILOR, 3, 7)),
  item('haenam', 'outfit', 'hn-walk', '닻 산책룩', '#f4ead3', '#4578a2', '⚓', sprite(HN_SAILOR, 4, 7)),
  item('haenam', 'outfit', 'hn-pajamas', '줄무늬 잠옷', '#d5e6ef', '#75a0ba', '☾', sprite(HN_SAILOR, 5, 7)),
  item('haenam', 'outfit', 'hn-resort', '휴양지룩', '#63b9ac', '#f4d570', '☀', sprite(HN_SAILOR, 6, 7)),
  item('haenam', 'outfit', 'hn-work-orange', '주황 작업복', '#ed8738', '#874725', '▦', sprite(HN_ENGINEER, 0, 6)),
  item('haenam', 'outfit', 'hn-work-blue', '파란 작업복', '#497da5', '#f1c858', '▤', sprite(HN_ENGINEER, 1, 6)),
  item('haenam', 'outfit', 'hn-maintenance', '정비복', '#3e4f5f', '#e2ad4e', '▥', sprite(HN_ENGINEER, 2, 6)),
  item('haenam', 'outfit', 'hn-engineer-rain', '기관사 우비', '#f4c94a', '#dd8d2c', '☂', sprite(HN_ENGINEER, 3, 6)),
  item('haenam', 'outfit', 'hn-engineer-walk', '기관사 산책룩', '#eee3cf', '#547a9b', '☀', sprite(HN_ENGINEER, 4, 6)),
  item('haenam', 'outfit', 'hn-engineer-pajamas', '체크 잠옷', '#d3e6f1', '#6e99b4', '☾', sprite(HN_ENGINEER, 5, 6)),

  item('haenam', 'outfit', 'hn-extra-sailor', '화이트 항해사 제복', '#f8f6ef', '#274f78', '⚓', sprite(HN_EXTRA_OUTFITS, 0, 4, 2, 'cell'), true),
  item('haenam', 'outfit', 'hn-extra-rescue', '해상 구조대 작업복', '#f27d2d', '#27374d', '▦', sprite(HN_EXTRA_OUTFITS, 1, 4, 2, 'cell'), true),
  item('haenam', 'outfit', 'hn-extra-navy-work', '네이비 정비 작업복', '#304b75', '#bf813f', '▥', sprite(HN_EXTRA_OUTFITS, 2, 4, 2, 'cell'), true),
  item('haenam', 'outfit', 'hn-extra-marine', '세일러 마린룩', '#f5f1e8', '#2d4f79', '≋', sprite(HN_EXTRA_OUTFITS, 3, 4, 2, 'cell'), true),
  item('haenam', 'outfit', 'hn-extra-raincoat', '노랑 레인코트', '#f4c83f', '#355375', '☂', sprite(HN_EXTRA_OUTFITS, 4, 4, 2, 'cell'), true),
  item('haenam', 'outfit', 'hn-extra-resort', '민트 휴양지룩', '#78c9b2', '#f0ddbb', '☀', sprite(HN_EXTRA_OUTFITS, 5, 4, 2, 'cell'), true),
  item('haenam', 'outfit', 'hn-extra-pajama', '물개 파자마', '#9bc6f3', '#fff3dc', '☾', sprite(HN_EXTRA_OUTFITS, 6, 4, 2, 'cell'), true),
  item('haenam', 'outfit', 'hn-extra-cardigan', '베이지 가디건룩', '#e8d8bd', '#6c4d3e', '♧', sprite(HN_EXTRA_OUTFITS, 7, 4, 2, 'cell'), true),

  item('haenam', 'outfit', 'hn-wedding-black', '블랙 턱시도', '#20232d', '#f2eee6', '♥', sprite(HN_WEDDING_OUTFITS, 0, 4, 2, 'cell'), true),
  item('haenam', 'outfit', 'hn-wedding-white', '화이트 턱시도', '#f7f4ed', '#222a36', '♥', sprite(HN_WEDDING_OUTFITS, 1, 4, 2, 'cell'), true),
  item('haenam', 'outfit', 'hn-wedding-navy', '네이비 웨딩 슈트', '#263f73', '#d8b964', '✦', sprite(HN_WEDDING_OUTFITS, 2, 4, 2, 'cell'), true),
  item('haenam', 'outfit', 'hn-wedding-beige', '베이지 가든 슈트', '#e3d1b4', '#6d4f3a', '✿', sprite(HN_WEDDING_OUTFITS, 3, 4, 2, 'cell'), true),
  item('haenam', 'outfit', 'hn-wedding-gray', '그레이 클래식 슈트', '#bfc3ca', '#31466d', '✦', sprite(HN_WEDDING_OUTFITS, 4, 4, 2, 'cell'), true),
  item('haenam', 'outfit', 'hn-wedding-captain', '화이트 선장 예복', '#f8f6ef', '#25456d', '⚓', sprite(HN_WEDDING_OUTFITS, 5, 4, 2, 'cell'), true),
  item('haenam', 'outfit', 'hn-wedding-suspenders', '크림 멜빵 웨딩룩', '#efe3cf', '#76503b', '♢', sprite(HN_WEDDING_OUTFITS, 6, 4, 2, 'cell'), true),
  item('haenam', 'outfit', 'hn-wedding-blue', '라이트블루 웨딩 슈트', '#a9cff1', '#e6b85e', '★', sprite(HN_WEDDING_OUTFITS, 7, 4, 2, 'cell'), true),

  item('haenam', 'hat', 'none', '착용 안 함', '#fffaf0', '#b8c8d2', '×'),
  item('haenam', 'hat', 'hn-captain-hat', '항해모', '#fff8e9', '#254f78', '⚓', sprite(HN_ITEMS, 0, 6, 2)),
  item('haenam', 'hat', 'hn-beret', '닻 베레모', '#315b82', '#f0c765', '●', sprite(HN_ITEMS, 1, 6, 2)),
  item('haenam', 'hat', 'hn-seagull-pin', '갈매기핀', '#fffdf4', '#6b8da6', '⌁', sprite(HN_ITEMS, 2, 6, 2)),
  item('haenam', 'hat', 'hn-cap', '줄무늬 캡', '#e8f0f3', '#4778a3', '▱', sprite(HN_ITEMS, 3, 6, 2)),
  item('haenam', 'hat', 'hn-beanie', '닻 비니', '#416c94', '#fff3d4', '♨', sprite(HN_ITEMS, 4, 6, 2)),
  item('haenam', 'hat', 'hn-compass-pin', '나침반 장식', '#e8c875', '#315a7e', '✦', sprite(HN_ITEMS, 5, 6, 2)),
  item('haenam', 'hat', 'hn-extra-captain-hat', '금장 선장모', '#fff8ea', '#243c67', '⚓', sprite(HN_EXTRA_ITEMS, 0, 4, 2, 'cell')),

  item('haenam', 'accessory', 'none', '들지 않기', '#fffaf0', '#b8c8d2', '×'),
  item('haenam', 'accessory', 'hn-binoculars', '작은 쌍안경', '#344859', '#d19b3e', '∞', sprite(HN_ITEMS, 6, 6, 2)),
  item('haenam', 'accessory', 'hn-sea-note', '바다 노트', '#315879', '#e7bc58', '▤', sprite(HN_ITEMS, 7, 6, 2)),
  item('haenam', 'accessory', 'hn-crossbag', '미니 크로스백', '#f1dfbd', '#4778a1', '▱', sprite(HN_ITEMS, 8, 6, 2)),
  item('haenam', 'accessory', 'hn-coffee', '닻 머그컵', '#f7f1df', '#4777a1', '▣', sprite(HN_ITEMS, 9, 6, 2)),
  item('haenam', 'accessory', 'hn-shell-key', '조개 키링', '#efcfab', '#76a495', '♢', sprite(HN_ITEMS, 10, 6, 2)),
  item('haenam', 'accessory', 'hn-umbrella', '파도 우산', '#f5f2e8', '#5d8bae', '☂', sprite(HN_ITEMS, 11, 6, 2)),
  item('haenam', 'accessory', 'hn-extra-binoculars', '파랑 쌍안경', '#314a78', '#85c7ed', '∞', sprite(HN_EXTRA_ITEMS, 1, 4, 2, 'cell')),
  item('haenam', 'accessory', 'hn-extra-radio', '선박 무전기', '#2f3446', '#ef7c2f', '▤', sprite(HN_EXTRA_ITEMS, 2, 4, 2, 'cell')),
  item('haenam', 'accessory', 'hn-extra-wrench', '정비 스패너', '#d7dce3', '#667385', '⌁', sprite(HN_EXTRA_ITEMS, 3, 4, 2, 'cell')),
  item('haenam', 'accessory', 'hn-extra-coffee', '따뜻한 커피', '#d8b895', '#6d4939', '▣', sprite(HN_EXTRA_ITEMS, 4, 4, 2, 'cell')),
  item('haenam', 'accessory', 'hn-extra-bouquet', '파랑 꽃다발', '#f5e8c9', '#4877ae', '✿', sprite(HN_EXTRA_ITEMS, 5, 4, 2, 'cell')),
  item('haenam', 'accessory', 'hn-extra-suitcase', '항해 캐리어', '#f5f1e7', '#3568a0', '▧', sprite(HN_EXTRA_ITEMS, 6, 4, 2, 'cell')),
  item('haenam', 'accessory', 'hn-extra-lifering', '구명튜브', '#f6f1e6', '#e6534f', '◉', sprite(HN_EXTRA_ITEMS, 7, 4, 2, 'cell')),
  item('haenam', 'accessory', 'hn-wedding-bouquet', '바다 웨딩 부케', '#f8f3e8', '#8fbcec', '✿', sprite(WEDDING_ITEMS, 0, 4, 2, 'cell')),
  item('haenam', 'accessory', 'hn-wedding-boutonniere', '웨딩 부토니에', '#f7f1e6', '#86add7', '❀', sprite(WEDDING_ITEMS, 3, 4, 2, 'cell')),
  item('haenam', 'accessory', 'hn-wedding-ring', '조개 반지함', '#f6e9cf', '#2f4777', '♢', sprite(WEDDING_ITEMS, 4, 4, 2, 'cell')),
  item('haenam', 'accessory', 'hn-wedding-cake', '바다 웨딩 케이크', '#fff8e7', '#85b9e5', '♨', sprite(WEDDING_ITEMS, 5, 4, 2, 'cell')),
  item('haenam', 'accessory', 'hn-wedding-invite', '바다 웨딩 초대장', '#fff9ed', '#86b5e6', '▤', sprite(WEDDING_ITEMS, 7, 4, 2, 'cell')),
]

const haenyeoItems: DressItem[] = [
  item('haenyeo', 'hair', 'hy-bob', '단발 웨이브', '#684535', '#9a6c4e', '✂', sprite(HY_HAIR, 0, 8)),
  item('haenyeo', 'hair', 'hy-long-wave', '긴 웨이브', '#704833', '#a77450', '〰', sprite(HY_HAIR, 1, 8)),
  item('haenyeo', 'hair', 'hy-bun', '동그란 똥머리', '#5d4034', '#90624b', '●', sprite(HY_HAIR, 2, 8)),
  item('haenyeo', 'hair', 'hy-braids', '양갈래', '#70452f', '#a56c48', '❧', sprite(HY_HAIR, 3, 8)),
  item('haenyeo', 'hair', 'hy-ponytail', '포니테일', '#623f31', '#97634a', '⌁', sprite(HY_HAIR, 4, 8)),
  item('haenyeo', 'hair', 'hy-short', '몽글 숏컷', '#5b3e34', '#8d6150', '✦', sprite(HY_HAIR, 5, 8)),
  item('haenyeo', 'hair', 'hy-bangs', '앞머리 단발', '#714934', '#a66f4c', '│', sprite(HY_HAIR, 6, 8)),
  item('haenyeo', 'hair', 'hy-hat-basic', '모자용 긴 머리', '#714934', '#a66f4c', '⌁', sprite(HY_HAIR, 7, 8)),

  item('haenyeo', 'top', 'hy-tank', '흰 민소매', '#fffdf6', '#c8d4dc', '◇'),
  item('haenyeo', 'bottom', 'hy-shorts', '흰 반바지', '#fffdf6', '#bfcdd7', '▱'),
  item('haenyeo', 'shoes', 'hy-barefoot', '맨발', '#f5c9aa', '#d49b7d', '◡'),

  item('haenyeo', 'outfit', 'hy-overalls', '첫멜빵 기본룩', '#527ea4', '#f2cf80', '▦', sprite(HY_OUTFITS, 0, 7)),
  item('haenyeo', 'outfit', 'hy-stripe-overalls', '줄무늬 멜빵룩', '#527ea4', '#e56f68', '≋', sprite(HY_OUTFITS, 1, 7)),
  item('haenyeo', 'outfit', 'hy-pastel-dress', '파스텔 원피스', '#a9d4c8', '#5f9f92', '✿', sprite(HY_OUTFITS, 2, 7)),
  item('haenyeo', 'outfit', 'hy-knit-dress', '크림 니트 원피스', '#ecd9b9', '#b39570', '♧', sprite(HY_OUTFITS, 3, 7)),
  item('haenyeo', 'outfit', 'hy-pajamas', '체크 잠옷', '#efb6b5', '#c86f72', '☾', sprite(HY_OUTFITS, 4, 7)),
  item('haenyeo', 'outfit', 'hy-raincoat', '노랑 우비', '#f4c94a', '#dd8d2c', '☂', sprite(HY_OUTFITS, 5, 7)),
  item('haenyeo', 'outfit', 'hy-outing', '해변 산책룩', '#f2e5ce', '#5f84a5', '☀', sprite(HY_OUTFITS, 6, 7)),

  item('haenyeo', 'outfit', 'hy-extra-sailor-dress', '네이비 세일러 원피스', '#314c86', '#e76572', '⚓', sprite(HY_EXTRA_OUTFITS, 0, 4, 2, 'cell'), true),
  item('haenyeo', 'outfit', 'hy-extra-princess', '핑크 리본 드레스', '#f4b6cc', '#d7668d', '♥', sprite(HY_EXTRA_OUTFITS, 1, 4, 2, 'cell'), true),
  item('haenyeo', 'outfit', 'hy-extra-cardigan', '리본 가디건룩', '#f2e6cf', '#82604f', '♧', sprite(HY_EXTRA_OUTFITS, 2, 4, 2, 'cell'), true),
  item('haenyeo', 'outfit', 'hy-extra-duck-rain', '노랑 오리 우비', '#f5c738', '#5786ba', '☂', sprite(HY_EXTRA_OUTFITS, 3, 4, 2, 'cell'), true),
  item('haenyeo', 'outfit', 'hy-extra-summer', '하늘빛 여름 마린룩', '#b8dafa', '#4779ae', '☀', sprite(HY_EXTRA_OUTFITS, 4, 4, 2, 'cell'), true),
  item('haenyeo', 'outfit', 'hy-extra-bunny-pajama', '보라 토끼 파자마', '#c7b5f2', '#fff3db', '☾', sprite(HY_EXTRA_OUTFITS, 5, 4, 2, 'cell'), true),
  item('haenyeo', 'outfit', 'hy-extra-white-dress', '하얀 꽃 리본 드레스', '#f7f5ed', '#8faed9', '✿', sprite(HY_EXTRA_OUTFITS, 6, 4, 2, 'cell'), true),
  item('haenyeo', 'outfit', 'hy-extra-deck-overalls', '네이비 갑판 멜빵복', '#304b78', '#e88b46', '▦', sprite(HY_EXTRA_OUTFITS, 7, 4, 2, 'cell'), true),

  item('haenyeo', 'outfit', 'hy-wedding-rose', '장미 레이어드 웨딩드레스', '#fff8ee', '#d7b98c', '♥', sprite(HY_WEDDING_OUTFITS, 0, 4, 2, 'cell'), true),
  item('haenyeo', 'outfit', 'hy-wedding-blue-ribbon', '블루 리본 웨딩드레스', '#f2f6ff', '#8fb9ed', '♥', sprite(HY_WEDDING_OUTFITS, 1, 4, 2, 'cell'), true),
  item('haenyeo', 'outfit', 'hy-wedding-mermaid', '레이스 머메이드 드레스', '#fff9f0', '#e9d7c4', '✦', sprite(HY_WEDDING_OUTFITS, 2, 4, 2, 'cell'), true),
  item('haenyeo', 'outfit', 'hy-wedding-mini', '리본 미니 웨딩드레스', '#fff8ee', '#d8b77a', '⋈', sprite(HY_WEDDING_OUTFITS, 3, 4, 2, 'cell'), true),
  item('haenyeo', 'outfit', 'hy-wedding-pink', '핑크 플라워 드레스', '#f7c6d5', '#e987a7', '✿', sprite(HY_WEDDING_OUTFITS, 4, 4, 2, 'cell'), true),
  item('haenyeo', 'outfit', 'hy-wedding-garden', '가든 카디건 드레스', '#f4ead7', '#90a9d2', '❀', sprite(HY_WEDDING_OUTFITS, 5, 4, 2, 'cell'), true),
  item('haenyeo', 'outfit', 'hy-wedding-sailor', '세일러 웨딩드레스', '#f3f6ff', '#759ee0', '⚓', sprite(HY_WEDDING_OUTFITS, 6, 4, 2, 'cell'), true),
  item('haenyeo', 'outfit', 'hy-wedding-jumpsuit', '화이트 웨딩 점프슈트', '#f9f2e8', '#c59b62', '♢', sprite(HY_WEDDING_OUTFITS, 7, 4, 2, 'cell'), true),

  item('haenyeo', 'hat', 'none', '착용 안 함', '#fffaf0', '#b8c8d2', '×'),
  item('haenyeo', 'hat', 'hy-ribbon', '리본핀', '#e9a3aa', '#b45f6b', '⋈', sprite(HY_ITEMS, 0, 12)),
  item('haenyeo', 'hat', 'hy-seagull-pin', '갈매기핀', '#fffdf4', '#6b8da6', '⌁', sprite(HY_ITEMS, 1, 12)),
  item('haenyeo', 'hat', 'hy-anchor-pin', '닻 머리핀', '#477ca7', '#f2c866', '⚓', sprite(HY_ITEMS, 2, 12)),
  item('haenyeo', 'hat', 'hy-flower-pin', '작은 꽃핀', '#fff5e3', '#e2a44d', '✿', sprite(HY_ITEMS, 3, 12)),
  item('haenyeo', 'hat', 'hy-beanie', '닻 비니', '#416c94', '#fff3d4', '♨', sprite(HY_ITEMS, 4, 12)),
  item('haenyeo', 'hat', 'hy-beret', '크림 베레모', '#f0e5cf', '#4778a1', '●', sprite(HY_ITEMS, 5, 12)),
  item('haenyeo', 'hat', 'hy-extra-sailor-hat', '블루 리본 세일러모', '#f7f5eb', '#568bcd', '⚓', sprite(HY_EXTRA_ITEMS, 0, 4, 2, 'cell')),
  item('haenyeo', 'hat', 'hy-extra-flower-pin', '블루 꽃 리본핀', '#f8f3e7', '#79a9e5', '✿', sprite(HY_EXTRA_ITEMS, 1, 4, 2, 'cell')),
  item('haenyeo', 'hat', 'hy-extra-heart-glasses', '하트 선글라스', '#ee7eaf', '#76517d', '♥', sprite(HY_EXTRA_ITEMS, 2, 4, 2, 'cell')),
  item('haenyeo', 'hat', 'hy-wedding-tiara', '조개 진주 티아라', '#f8edd4', '#83aee8', '♕', sprite(WEDDING_ITEMS, 1, 4, 2, 'cell')),
  item('haenyeo', 'hat', 'hy-wedding-veil', '블루 리본 베일', '#f8f7ef', '#89b4eb', '⋈', sprite(WEDDING_ITEMS, 2, 4, 2, 'cell')),

  item('haenyeo', 'accessory', 'none', '들지 않기', '#fffaf0', '#b8c8d2', '×'),
  item('haenyeo', 'accessory', 'hy-heart-bag', '하트 가방', '#e89ba5', '#bb5f70', '♥', sprite(HY_ITEMS, 6, 12)),
  item('haenyeo', 'accessory', 'hy-crossbag', '미니 크로스백', '#f1dfbd', '#4778a1', '▱', sprite(HY_ITEMS, 7, 12)),
  item('haenyeo', 'accessory', 'hy-coffee', '닻 머그컵', '#f7f1df', '#4777a1', '▣', sprite(HY_ITEMS, 8, 12)),
  item('haenyeo', 'accessory', 'hy-sea-note', '바다 노트', '#315879', '#e7bc58', '▤', sprite(HY_ITEMS, 9, 12)),
  item('haenyeo', 'accessory', 'hy-shell', '조개 목걸이', '#efcfab', '#76a495', '♢', sprite(HY_ITEMS, 10, 12)),
  item('haenyeo', 'accessory', 'hy-balloon', '갈매기 풍선', '#fffdf3', '#7293a9', '♧', sprite(HY_ITEMS, 11, 12)),
  item('haenyeo', 'accessory', 'hy-extra-shell-bag', '핑크 조개 가방', '#f5bdd1', '#70a8dd', '♢', sprite(HY_EXTRA_ITEMS, 3, 4, 2, 'cell')),
  item('haenyeo', 'accessory', 'hy-extra-phone', '토끼 핑크폰', '#efafc7', '#e26288', '▣', sprite(HY_EXTRA_ITEMS, 4, 4, 2, 'cell')),
  item('haenyeo', 'accessory', 'hy-extra-bouquet', '핑크 튤립 꽃다발', '#f5c3d3', '#74a8d8', '✿', sprite(HY_EXTRA_ITEMS, 5, 4, 2, 'cell')),
  item('haenyeo', 'accessory', 'hy-extra-suitcase', '핑크 여행 캐리어', '#f0acc6', '#77aee5', '▧', sprite(HY_EXTRA_ITEMS, 6, 4, 2, 'cell')),
  item('haenyeo', 'accessory', 'hy-extra-dolphin', '리본 돌고래 인형', '#9fcbed', '#ec91ad', '♧', sprite(HY_EXTRA_ITEMS, 7, 4, 2, 'cell')),
  item('haenyeo', 'accessory', 'hy-wedding-bouquet', '바다 웨딩 부케', '#f8f3e8', '#8fbcec', '✿', sprite(WEDDING_ITEMS, 0, 4, 2, 'cell')),
  item('haenyeo', 'accessory', 'hy-wedding-ring', '조개 반지함', '#f6e9cf', '#2f4777', '♢', sprite(WEDDING_ITEMS, 4, 4, 2, 'cell')),
  item('haenyeo', 'accessory', 'hy-wedding-cake', '바다 웨딩 케이크', '#fff8e7', '#85b9e5', '♨', sprite(WEDDING_ITEMS, 5, 4, 2, 'cell')),
  item('haenyeo', 'accessory', 'hy-wedding-pearl-bag', '진주 조개 핸드백', '#fff5e3', '#88b6e8', '♢', sprite(WEDDING_ITEMS, 6, 4, 2, 'cell')),
  item('haenyeo', 'accessory', 'hy-wedding-invite', '바다 웨딩 초대장', '#fff9ed', '#86b5e6', '▤', sprite(WEDDING_ITEMS, 7, 4, 2, 'cell')),
]

export const itemsByCharacter: Record<CharacterKey, DressItem[]> = { haenam: haenamItems, haenyeo: haenyeoItems }

export const backgrounds: BackgroundItem[] = [
  { id: 'clear-sea', name: '맑은 바다', category: 'background', color: '#99d7f2', accent: '#3488ba', icon: '☀' },
  { id: 'deck', name: '선박 갑판', category: 'background', color: '#b9dcf0', accent: '#d6a86c', icon: '⚓' },
  { id: 'sunset', name: '노을 바다', category: 'background', color: '#f6b3a8', accent: '#d5717b', icon: '◐' },
  { id: 'night', name: '밤바다', category: 'background', color: '#426489', accent: '#f4da87', icon: '☾' },
  { id: 'cabin', name: '포근한 선실', category: 'background', color: '#ead6b5', accent: '#8a654b', icon: '⌂' },
  { id: 'beach', name: '여름 해변', category: 'background', color: '#a7dfeb', accent: '#efca79', icon: '☂' },
  { id: 'cherry', name: '벚꽃 항구', category: 'background', color: '#f6ced6', accent: '#88b6ce', icon: '✿' },
  { id: 'hearts', name: '두근두근', category: 'background', color: '#f7d9dc', accent: '#dd7f8d', icon: '♥' },
]

export const defaultCharacterState: Record<CharacterKey, CharacterState> = {
  haenam: { nickname: '해남이', hair: 'hn-basic', top: 'hn-tank', bottom: 'hn-shorts', outfit: 'hn-extra-sailor', shoes: 'hn-barefoot', hat: null, accessory: null },
  haenyeo: { nickname: '해녀', hair: 'hy-bob', top: 'hy-tank', bottom: 'hy-shorts', outfit: 'hy-extra-sailor-dress', shoes: 'hy-barefoot', hat: null, accessory: null },
}

export const initialGameState: GameState = {
  haenam: { ...defaultCharacterState.haenam },
  haenyeo: { ...defaultCharacterState.haenyeo },
  background: 'clear-sea',
}

export const getItems = (character: CharacterKey, category: Exclude<Category, 'background'>) =>
  itemsByCharacter[character].filter((dressItem) => dressItem.category === category)

export const findItem = (character: CharacterKey, id: string | null) =>
  id ? itemsByCharacter[character].find((dressItem) => dressItem.id === id) : undefined
