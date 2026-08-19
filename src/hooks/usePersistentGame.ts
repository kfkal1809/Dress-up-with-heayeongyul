import { useEffect, useState } from 'react'
import { initialGameState } from '../data/items'
import type { GameState } from '../types'

const STORAGE_KEY = 'haeyeongyeol-dress-up-v1'

const loadGame = (): GameState => {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (!saved) return initialGameState

    const parsed = JSON.parse(saved) as Partial<GameState>
    return {
      haenam: { ...initialGameState.haenam, ...parsed.haenam },
      haenyeo: { ...initialGameState.haenyeo, ...parsed.haenyeo },
      background: parsed.background ?? initialGameState.background,
    }
  } catch {
    return initialGameState
  }
}

export const usePersistentGame = () => {
  const [game, setGame] = useState<GameState>(loadGame)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(game))
  }, [game])

  return [game, setGame] as const
}
