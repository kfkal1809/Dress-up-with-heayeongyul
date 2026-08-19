import { defaultCharacterState, findItem } from '../data/items'
import type { CharacterKey, CharacterState } from '../types'
import { SpriteFrame } from './SpriteFrame'

interface CharacterCanvasProps {
  character: CharacterKey
  state: CharacterState
  active?: boolean
}

export function CharacterCanvas({ character, state, active = false }: CharacterCanvasProps) {
  const displayName = character === 'haenam' ? '해남이' : '해녀'
  const fallbackOutfit = defaultCharacterState[character].outfit
  const outfit = findItem(character, state.outfit) ?? findItem(character, fallbackOutfit)
  const hair = findItem(character, state.hair)
  const hat = findItem(character, state.hat)
  const accessory = findItem(character, state.accessory)
  const isVeil = hat?.id === 'hy-wedding-veil'
  const outfitFit = outfit?.id.includes('-wedding-')
    ? 'outfit-fit-wedding'
    : outfit?.id.includes('-extra-')
      ? 'outfit-fit-extra'
      : 'outfit-fit-classic'

  if (!outfit?.sprite) return null

  return (
    <div
      className={`character-canvas reference-character ${character} ${outfit.requiresHead ? 'requires-head' : 'includes-head'} ${outfitFit} ${active ? 'is-active' : ''}`}
      role="img"
      aria-label={`${state.nickname || displayName} 캐릭터`}
    >
      <span className="character-shadow" aria-hidden="true" />
      {isVeil && hat?.sprite && <SpriteFrame sprite={hat.sprite} className="character-veil" />}
      <SpriteFrame sprite={outfit.sprite} className="character-outfit" />
      {outfit.requiresHead && hair?.sprite && <SpriteFrame sprite={hair.sprite} className="character-head" />}
      {!isVeil && hat?.sprite && (
        <SpriteFrame
          sprite={hat.sprite}
          className={`character-hat ${hat.sprite.fit === 'cell' ? 'cell-sprite-hat' : ''} character-hat-${hat.id}`}
        />
      )}
      {accessory?.sprite && (
        <SpriteFrame
          sprite={accessory.sprite}
          className={`character-accessory ${accessory.sprite.fit === 'cell' ? 'cell-sprite-accessory' : ''} character-accessory-${accessory.id}`}
        />
      )}
    </div>
  )
}
