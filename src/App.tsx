import { useEffect, useMemo, useState } from 'react'
import { CharacterCanvas } from './components/CharacterCanvas'
import { SceneDecor } from './components/SceneDecor'
import {
  backgrounds,
  categoryMeta,
  defaultCharacterState,
  getItems,
  itemsByCharacter,
} from './data/items'
import { usePersistentGame } from './hooks/usePersistentGame'
import type { Category, CharacterKey, CharacterState, DressItem } from './types'

const editorCategories: Category[] = ['hair', 'top', 'bottom', 'outfit', 'shoes', 'hat', 'accessory', 'background']

const characterLabel: Record<CharacterKey, string> = {
  haenam: '해남이',
  haenyeo: '해녀',
}

const randomFrom = <T,>(values: T[]) => values[Math.floor(Math.random() * values.length)]

const virtualNoneOutfit = (character: CharacterKey): DressItem => ({
  id: 'none',
  name: '상의 + 하의',
  category: 'outfit',
  gender: character,
  color: '#fffaf0',
  accent: '#88a6ba',
  icon: '↺',
})

function App() {
  const [game, setGame] = usePersistentGame()
  const [activeCharacter, setActiveCharacter] = useState<CharacterKey>('haenam')
  const [category, setCategory] = useState<Category>('hair')
  const [completed, setCompleted] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const currentState = game[activeCharacter]
  const selectedBackground = backgrounds.find((background) => background.id === game.background) ?? backgrounds[0]

  const visibleItems = useMemo(() => {
    if (category === 'background') return backgrounds
    const list = getItems(activeCharacter, category)
    return category === 'outfit' ? [virtualNoneOutfit(activeCharacter), ...list] : list
  }, [activeCharacter, category])

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(null), 1500)
    return () => window.clearTimeout(timer)
  }, [toast])

  const updateCharacter = (character: CharacterKey, update: Partial<CharacterState>) => {
    setGame((previous) => ({
      ...previous,
      [character]: { ...previous[character], ...update },
    }))
  }

  const selectItem = (id: string) => {
    if (category === 'background') {
      setGame((previous) => ({ ...previous, background: id }))
      return
    }

    const update: Partial<CharacterState> = {}
    if (category === 'hat' || category === 'accessory' || category === 'outfit') {
      update[category] = id === 'none' ? null : id
    } else {
      update[category] = id
      if (category === 'top' || category === 'bottom') update.outfit = null
    }
    updateCharacter(activeCharacter, update)
  }

  const selectedItemId = () => {
    if (category === 'background') return game.background
    if (category === 'hat' || category === 'accessory' || category === 'outfit') return currentState[category] ?? 'none'
    return currentState[category]
  }

  const randomizeCharacter = (character: CharacterKey) => {
    const hair = randomFrom(getItems(character, 'hair')).id
    const shoes = randomFrom(getItems(character, 'shoes')).id
    const hat = randomFrom(getItems(character, 'hat')).id
    const accessory = randomFrom(getItems(character, 'accessory')).id
    const useOutfit = Math.random() > 0.55
    const outfit = useOutfit ? randomFrom(getItems(character, 'outfit')).id : null
    const top = randomFrom(getItems(character, 'top')).id
    const bottom = randomFrom(getItems(character, 'bottom')).id

    updateCharacter(character, {
      hair,
      top,
      bottom,
      outfit,
      shoes,
      hat: hat === 'none' ? null : hat,
      accessory: accessory === 'none' ? null : accessory,
    })
  }

  const handleRandomCurrent = () => {
    randomizeCharacter(activeCharacter)
    setToast(`${characterLabel[activeCharacter]} 랜덤 코디 완성!`)
  }

  const handleRandomBoth = () => {
    const makeRandomState = (character: CharacterKey): CharacterState => {
      const previous = game[character]
      const hat = randomFrom(getItems(character, 'hat')).id
      const accessory = randomFrom(getItems(character, 'accessory')).id
      const useOutfit = Math.random() > 0.55
      return {
        ...previous,
        hair: randomFrom(getItems(character, 'hair')).id,
        top: randomFrom(getItems(character, 'top')).id,
        bottom: randomFrom(getItems(character, 'bottom')).id,
        outfit: useOutfit ? randomFrom(getItems(character, 'outfit')).id : null,
        shoes: randomFrom(getItems(character, 'shoes')).id,
        hat: hat === 'none' ? null : hat,
        accessory: accessory === 'none' ? null : accessory,
      }
    }
    setGame((previous) => ({
      ...previous,
      haenam: makeRandomState('haenam'),
      haenyeo: makeRandomState('haenyeo'),
    }))
    setToast('둘만의 랜덤 커플룩 완성!')
  }

  const resetCurrent = () => {
    setGame((previous) => ({
      ...previous,
      [activeCharacter]: { ...defaultCharacterState[activeCharacter] },
    }))
    setToast(`${characterLabel[activeCharacter]} 처음 모습으로 돌아왔어요`)
  }

  const outfitCount = (character: CharacterKey) => itemsByCharacter[character].filter((item) => item.category !== 'hair').length

  return (
    <main className="page-shell">
      <section className={`game-card ${completed ? 'completion-mode' : ''}`}>
        <header className="game-header">
          <div className="header-kicker"><span>⚓</span> 해기사와 연인들의 항해일지 <span>⚓</span></div>
          <h1>해남이 <b>♥</b> 해녀 옷입히기</h1>
          {!completed && <p>두 사람에게 찰떡같은 항해룩을 입혀주세요!</p>}
        </header>

        <section
          className={`couple-stage background-${selectedBackground.id}`}
          aria-label={`${selectedBackground.name} 배경의 커플 캐릭터`}
        >
          <SceneDecor background={selectedBackground.id} />
          <div className="stage-top-label">
            <span>{completed ? '⚓ OUR SAILING DIARY ⚓' : selectedBackground.icon}</span>
          </div>
          <div className="character-row">
            {(['haenam', 'haenyeo'] as CharacterKey[]).map((character) => (
              <article
                className={`character-slot ${activeCharacter === character && !completed ? 'selected' : ''}`}
                key={character}
                onClick={() => !completed && setActiveCharacter(character)}
              >
                <button
                  type="button"
                  className="character-select-hitbox"
                  onClick={() => setActiveCharacter(character)}
                  aria-label={`${characterLabel[character]} 꾸미기 선택`}
                  tabIndex={completed ? -1 : 0}
                />
                <CharacterCanvas character={character} state={game[character]} active={activeCharacter === character && !completed} />
                {completed ? (
                  <div className="finished-name">{game[character].nickname || characterLabel[character]}</div>
                ) : (
                  <label className="nickname-field">
                    <span className="sr-only">{characterLabel[character]} 별명</span>
                    <input
                      value={game[character].nickname}
                      maxLength={10}
                      onChange={(event) => updateCharacter(character, { nickname: event.target.value })}
                      onClick={(event) => event.stopPropagation()}
                      placeholder={characterLabel[character]}
                    />
                    <small>{character === 'haenam' ? '💙' : '🩷'}</small>
                  </label>
                )}
              </article>
            ))}
          </div>
          {completed && <p className="sailing-message">오늘도 무사히 항해 중 <span>♥</span></p>}
        </section>

        {completed ? (
          <section className="completion-actions">
            <div className="completion-stamp">함께라서 더 반짝이는 오늘 ✦</div>
            <button className="primary-action edit-again" type="button" onClick={() => setCompleted(false)}>
              <span>✎</span> 다시 꾸미기
            </button>
          </section>
        ) : (
          <section className="editor-panel">
            <div className="character-tabs" role="tablist" aria-label="꾸밀 캐릭터 선택">
              <button
                type="button"
                className={activeCharacter === 'haenam' ? 'active haenam' : ''}
                onClick={() => setActiveCharacter('haenam')}
                role="tab"
                aria-selected={activeCharacter === 'haenam'}
              >
                <span>💙</span> 해남이 꾸미기 <small>{outfitCount('haenam')}개</small>
              </button>
              <button
                type="button"
                className={activeCharacter === 'haenyeo' ? 'active haenyeo' : ''}
                onClick={() => setActiveCharacter('haenyeo')}
                role="tab"
                aria-selected={activeCharacter === 'haenyeo'}
              >
                <span>🩷</span> 해녀 꾸미기 <small>{outfitCount('haenyeo')}개</small>
              </button>
            </div>

            <nav className="category-tabs" aria-label="꾸미기 카테고리">
              {editorCategories.map((categoryKey) => (
                <button
                  type="button"
                  key={categoryKey}
                  className={category === categoryKey ? 'active' : ''}
                  onClick={() => setCategory(categoryKey)}
                >
                  <span>{categoryMeta[categoryKey].icon}</span>
                  {categoryMeta[categoryKey].label}
                </button>
              ))}
            </nav>

            <div className="item-section-heading">
              <strong>{categoryMeta[category].label}</strong>
              <span>옆으로 넘겨 골라보세요</span>
            </div>
            <div className="item-shelf" role="listbox" aria-label={`${categoryMeta[category].label} 아이템`}>
              {visibleItems.map((dressItem) => {
                const selected = selectedItemId() === dressItem.id
                return (
                  <button
                    type="button"
                    className={`item-card ${selected ? 'selected' : ''}`}
                    key={dressItem.id}
                    onClick={() => selectItem(dressItem.id)}
                    role="option"
                    aria-selected={selected}
                  >
                    <span
                      className="item-visual"
                      style={{ '--item-color': dressItem.color, '--item-accent': dressItem.accent } as React.CSSProperties}
                    >
                      <i>{dressItem.icon}</i>
                    </span>
                    <b>{dressItem.name}</b>
                    {selected && <em aria-hidden="true">✓</em>}
                  </button>
                )
              })}
            </div>

            <div className="utility-actions">
              <button type="button" onClick={resetCurrent}><span>↺</span> 처음 모습</button>
              <button type="button" onClick={handleRandomCurrent}><span>🎲</span> 랜덤 코디</button>
              <button type="button" onClick={handleRandomBoth}><span>✨</span> 둘 다 랜덤</button>
            </div>

            <button className="primary-action" type="button" onClick={() => setCompleted(true)}>
              <span>♥</span> 우리 커플 완성
            </button>
            <div className="autosave-note"><span>✓</span> 코디와 별명은 이 기기에 자동 저장돼요</div>
          </section>
        )}

        <footer className="game-footer">
          <span>〰</span> 바다의 스타일로 나만의 항해를 꾸며봐! <span>⚓</span>
        </footer>

        {toast && <div className="toast" role="status">{toast}</div>}
      </section>
    </main>
  )
}

export default App
