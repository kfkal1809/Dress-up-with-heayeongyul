import type { BackgroundItem, Category, CharacterKey, CharacterState, DressItem, GameState } from '../types'

const item = (
  gender: CharacterKey,
  category: DressItem['category'],
  id: string,
  name: string,
  color: string,
  accent: string,
  icon: string,
): DressItem => ({ gender, category, id, name, color, accent, icon })

export const categoryMeta: Record<Category, { label: string; icon: string }> = {
  hair: { label: '헤어', icon: '✂' },
  top: { label: '상의', icon: '♧' },
  bottom: { label: '하의', icon: '▥' },
  outfit: { label: '한벌옷', icon: '✦' },
  shoes: { label: '신발', icon: '◒' },
  hat: { label: '모자', icon: '⌒' },
  accessory: { label: '소품', icon: '★' },
  background: { label: '배경', icon: '▧' },
}

const haenamItems: DressItem[] = [
  item('haenam', 'hair', 'hn-basic', '단정한 기본머리', '#604333', '#8b6249', '✂'),
  item('haenam', 'hair', 'hn-wave', '살짝 웨이브', '#654536', '#9a6b4d', '〰'),
  item('haenam', 'hair', 'hn-bowl', '덮은 머리', '#252b32', '#4a535e', '●'),
  item('haenam', 'hair', 'hn-part', '짧은 가르마', '#694632', '#9c6d4e', '⌁'),
  item('haenam', 'hair', 'hn-curl', '부드러운 곱슬', '#704a32', '#9f704d', '❧'),
  item('haenam', 'hair', 'hn-crop', '깔끔한 숏컷', '#30343a', '#59616a', '✦'),

  item('haenam', 'top', 'hn-tank', '흰 민소매', '#fffdf6', '#c8d4dc', '◇'),
  item('haenam', 'top', 'hn-white-tee', '흰 티셔츠', '#fffaf0', '#76a7c9', 'T'),
  item('haenam', 'top', 'hn-stripe', '줄무늬 티', '#f7f2e8', '#4b78a1', '≋'),
  item('haenam', 'top', 'hn-hoodie', '하늘 후드티', '#91c9e8', '#fff4d6', '♧'),
  item('haenam', 'top', 'hn-knit', '닻 니트', '#f4ead3', '#4578a2', '⚓'),
  item('haenam', 'top', 'hn-shirt', '옥스퍼드 셔츠', '#dbeaf4', '#7399b2', '▤'),
  item('haenam', 'top', 'hn-couple-top', '바다 커플티', '#f7dad6', '#e46f7d', '♥'),

  item('haenam', 'bottom', 'hn-shorts', '흰 반바지', '#fffdf6', '#bfcdd7', '▱'),
  item('haenam', 'bottom', 'hn-jeans', '청바지', '#5d83a8', '#2f577e', '▥'),
  item('haenam', 'bottom', 'hn-navy-shorts', '네이비 반바지', '#395a7a', '#f3ce78', '▱'),
  item('haenam', 'bottom', 'hn-slacks', '베이지 슬랙스', '#c9b99f', '#8d7d67', '▥'),
  item('haenam', 'bottom', 'hn-work-pants', '작업복 바지', '#e78637', '#9d4e25', '▦'),

  item('haenam', 'outfit', 'hn-sailor-white', '항해사 기본 제복', '#f8f3e7', '#1f4e78', '⚓'),
  item('haenam', 'outfit', 'hn-sailor-navy', '네이비 제복', '#304f70', '#e8b84d', '★'),
  item('haenam', 'outfit', 'hn-work-orange', '주황 작업복', '#ed8738', '#874725', '▦'),
  item('haenam', 'outfit', 'hn-work-blue', '파란 작업복', '#497da5', '#f1c858', '▤'),
  item('haenam', 'outfit', 'hn-raincoat', '노랑 우비', '#f4c94a', '#dd8d2c', '☂'),
  item('haenam', 'outfit', 'hn-pajamas', '줄무늬 잠옷', '#d5e6ef', '#75a0ba', '☾'),
  item('haenam', 'outfit', 'hn-resort', '휴양지룩', '#63b9ac', '#f4d570', '☀'),

  item('haenam', 'shoes', 'hn-barefoot', '맨발', '#f5c9aa', '#d49b7d', '◡'),
  item('haenam', 'shoes', 'hn-sneakers', '운동화', '#f6f2e9', '#527b9c', '◒'),
  item('haenam', 'shoes', 'hn-slippers', '슬리퍼', '#7fc5dc', '#467e9b', '═'),
  item('haenam', 'shoes', 'hn-boots', '장화', '#f1c846', '#ae7b28', '▰'),
  item('haenam', 'shoes', 'hn-safety', '안전화', '#79543c', '#e2a43d', '◼'),

  item('haenam', 'hat', 'none', '착용 안 함', '#fffaf0', '#b8c8d2', '×'),
  item('haenam', 'hat', 'hn-captain-hat', '항해모', '#fff8e9', '#254f78', '⚓'),
  item('haenam', 'hat', 'hn-beret', '닻 베레모', '#315b82', '#f0c765', '●'),
  item('haenam', 'hat', 'hn-cap', '줄무늬 캡', '#e8f0f3', '#4778a3', '▱'),
  item('haenam', 'hat', 'hn-beanie', '비니', '#416c94', '#fff3d4', '♨'),
  item('haenam', 'hat', 'hn-straw', '밀짚모자', '#e8c875', '#315a7e', '☀'),
  item('haenam', 'hat', 'hn-helmet', '안전모', '#f4e8c8', '#5a9278', '+'),

  item('haenam', 'accessory', 'none', '들지 않기', '#fffaf0', '#b8c8d2', '×'),
  item('haenam', 'accessory', 'hn-binoculars', '작은 쌍안경', '#344859', '#d19b3e', '∞'),
  item('haenam', 'accessory', 'hn-radio', '무전기', '#4d6578', '#e5b84c', '▥'),
  item('haenam', 'accessory', 'hn-wrench', '스패너', '#aeb7bc', '#66717a', '⌕'),
  item('haenam', 'accessory', 'hn-coffee', '닻 머그컵', '#f7f1df', '#4777a1', '▣'),
  item('haenam', 'accessory', 'hn-flower', '꽃다발', '#f1a3a7', '#75a36c', '✿'),
  item('haenam', 'accessory', 'hn-fish', '통통 물고기', '#79b9cf', '#f2cb64', '◁'),
]

const haenyeoItems: DressItem[] = [
  item('haenyeo', 'hair', 'hy-bob', '단발 웨이브', '#684535', '#9a6c4e', '✂'),
  item('haenyeo', 'hair', 'hy-long-wave', '긴 웨이브', '#704833', '#a77450', '〰'),
  item('haenyeo', 'hair', 'hy-bun', '동그란 똥머리', '#5d4034', '#90624b', '●'),
  item('haenyeo', 'hair', 'hy-braids', '양갈래', '#70452f', '#a56c48', '❧'),
  item('haenyeo', 'hair', 'hy-ponytail', '포니테일', '#623f31', '#97634a', '⌁'),
  item('haenyeo', 'hair', 'hy-short', '몽글 숏컷', '#5b3e34', '#8d6150', '✦'),
  item('haenyeo', 'hair', 'hy-bangs', '앞머리 긴머리', '#714934', '#a66f4c', '│'),

  item('haenyeo', 'top', 'hy-tank', '흰 민소매', '#fffdf6', '#c8d4dc', '◇'),
  item('haenyeo', 'top', 'hy-white-tee', '흰 티셔츠', '#fffaf0', '#e59a9a', 'T'),
  item('haenyeo', 'top', 'hy-stripe', '딸기 줄무늬 티', '#fff4e8', '#e56f68', '≋'),
  item('haenyeo', 'top', 'hy-cardigan', '크림 가디건', '#f4e8cf', '#b79070', '♧'),
  item('haenyeo', 'top', 'hy-sailor-top', '세일러 블라우스', '#f7f3e9', '#4778a2', '⚓'),
  item('haenyeo', 'top', 'hy-couple-top', '바다 커플티', '#f7dad6', '#e46f7d', '♥'),

  item('haenyeo', 'bottom', 'hy-shorts', '흰 반바지', '#fffdf6', '#bfcdd7', '▱'),
  item('haenyeo', 'bottom', 'hy-jeans', '청바지', '#5d83a8', '#2f577e', '▥'),
  item('haenyeo', 'bottom', 'hy-denim-skirt', '데님 치마', '#5f86aa', '#345b7d', '△'),
  item('haenyeo', 'bottom', 'hy-pink-skirt', '살랑 분홍치마', '#eaa8ae', '#be6f7a', '▽'),
  item('haenyeo', 'bottom', 'hy-beige-pants', '베이지 바지', '#cdbda5', '#927d65', '▥'),

  item('haenyeo', 'outfit', 'hy-overalls', '첫멜빵 기본룩', '#527ea4', '#f2cf80', '▦'),
  item('haenyeo', 'outfit', 'hy-pastel-dress', '파스텔 원피스', '#a9d4c8', '#5f9f92', '✿'),
  item('haenyeo', 'outfit', 'hy-knit-dress', '크림 니트 원피스', '#ecd9b9', '#b39570', '♧'),
  item('haenyeo', 'outfit', 'hy-pajamas', '체크 잠옷', '#efb6b5', '#c86f72', '☾'),
  item('haenyeo', 'outfit', 'hy-raincoat', '노랑 우비', '#f4c94a', '#dd8d2c', '☂'),
  item('haenyeo', 'outfit', 'hy-outing', '해변 산책룩', '#f2e5ce', '#5f84a5', '☀'),
  item('haenyeo', 'outfit', 'hy-sailor-dress', '해녀 세일러룩', '#f8f3e7', '#315f87', '⚓'),

  item('haenyeo', 'shoes', 'hy-barefoot', '맨발', '#f5c9aa', '#d49b7d', '◡'),
  item('haenyeo', 'shoes', 'hy-sneakers', '운동화', '#f6f2e9', '#db7f86', '◒'),
  item('haenyeo', 'shoes', 'hy-slippers', '분홍 슬리퍼', '#e8a3ac', '#b75d6b', '═'),
  item('haenyeo', 'shoes', 'hy-boots', '노랑 장화', '#f1c846', '#ae7b28', '▰'),
  item('haenyeo', 'shoes', 'hy-flats', '메리제인', '#744b40', '#d8b791', '●'),

  item('haenyeo', 'hat', 'none', '착용 안 함', '#fffaf0', '#b8c8d2', '×'),
  item('haenyeo', 'hat', 'hy-ribbon', '리본핀', '#e9a3aa', '#b45f6b', '⋈'),
  item('haenyeo', 'hat', 'hy-seagull-pin', '갈매기핀', '#fffdf4', '#6b8da6', '⌁'),
  item('haenyeo', 'hat', 'hy-anchor-pin', '닻 머리핀', '#477ca7', '#f2c866', '⚓'),
  item('haenyeo', 'hat', 'hy-flower-pin', '작은 꽃핀', '#fff5e3', '#e2a44d', '✿'),
  item('haenyeo', 'hat', 'hy-beanie', '닻 비니', '#416c94', '#fff3d4', '♨'),
  item('haenyeo', 'hat', 'hy-beret', '크림 베레모', '#f0e5cf', '#4778a1', '●'),
  item('haenyeo', 'hat', 'hy-captain-hat', '커플 항해모', '#fff8e9', '#254f78', '⚓'),

  item('haenyeo', 'accessory', 'none', '들지 않기', '#fffaf0', '#b8c8d2', '×'),
  item('haenyeo', 'accessory', 'hy-heart-bag', '하트 가방', '#e89ba5', '#bb5f70', '♥'),
  item('haenyeo', 'accessory', 'hy-crossbag', '미니 크로스백', '#f1dfbd', '#4778a1', '▱'),
  item('haenyeo', 'accessory', 'hy-coffee', '닻 머그컵', '#f7f1df', '#4777a1', '▣'),
  item('haenyeo', 'accessory', 'hy-diary', '항해일지 노트', '#315879', '#e7bc58', '▤'),
  item('haenyeo', 'accessory', 'hy-shell', '조개 목걸이', '#efcfab', '#76a495', '♢'),
  item('haenyeo', 'accessory', 'hy-balloon', '갈매기 풍선', '#fffdf3', '#7293a9', '♧'),
]

export const itemsByCharacter: Record<CharacterKey, DressItem[]> = {
  haenam: haenamItems,
  haenyeo: haenyeoItems,
}

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
  haenam: {
    nickname: '해남이',
    hair: 'hn-basic',
    top: 'hn-tank',
    bottom: 'hn-shorts',
    outfit: null,
    shoes: 'hn-barefoot',
    hat: null,
    accessory: null,
  },
  haenyeo: {
    nickname: '해녀',
    hair: 'hy-bob',
    top: 'hy-tank',
    bottom: 'hy-shorts',
    outfit: null,
    shoes: 'hy-barefoot',
    hat: null,
    accessory: null,
  },
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
