export type CharacterKey = 'haenam' | 'haenyeo'

export type Category =
  | 'hair'
  | 'top'
  | 'bottom'
  | 'outfit'
  | 'shoes'
  | 'hat'
  | 'accessory'
  | 'background'

export interface SpriteSpec {
  atlas: string
  index: number
  columns: number
  rows?: number
  fit?: 'crop' | 'cell'
}

export interface DressItem {
  id: string
  name: string
  category: Exclude<Category, 'background'>
  gender: CharacterKey
  color: string
  accent: string
  icon: string
  sprite?: SpriteSpec
  requiresHead?: boolean
}

export interface BackgroundItem {
  id: string
  name: string
  category: 'background'
  color: string
  accent: string
  icon: string
}

export interface CharacterState {
  nickname: string
  hair: string
  top: string
  bottom: string
  outfit: string | null
  shoes: string
  hat: string | null
  accessory: string | null
}

export interface GameState {
  haenam: CharacterState
  haenyeo: CharacterState
  background: string
}
