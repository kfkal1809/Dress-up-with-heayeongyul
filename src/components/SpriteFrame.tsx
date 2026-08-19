import type { CSSProperties } from 'react'
import type { SpriteSpec } from '../types'

interface SpriteFrameProps {
  sprite: SpriteSpec
  className?: string
  label?: string
}

// This one legacy sheet was registered as 12x1, but the uploaded PNG is
// 2172x724 and contains 12 square-ish cells arranged as 6 columns x 2 rows.
// Keep the correction beside the generic renderer so every other atlas uses
// the geometry declared by the real item data without filename guesses.
const ATLAS_GRID_FIXES: Record<string, readonly [number, number]> = {
  '/assets/sprites/haenyeo-items.png': [6, 2],
}

/** Render one cell from an uploaded PNG sprite atlas. */
export function SpriteFrame({ sprite, className = '', label }: SpriteFrameProps) {
  const corrected = ATLAS_GRID_FIXES[sprite.atlas]
  const columns = Math.max(1, corrected?.[0] ?? sprite.columns)
  const rows = Math.max(1, corrected?.[1] ?? sprite.rows ?? 1)
  const cellCount = columns * rows
  const safeIndex = Math.min(Math.max(0, sprite.index), cellCount - 1)
  const column = safeIndex % columns
  const row = Math.floor(safeIndex / columns)
  const x = columns === 1 ? 50 : (column / (columns - 1)) * 100
  const y = rows === 1 ? 50 : (row / (rows - 1)) * 100

  // Size both axes explicitly. The previous `auto` height preserved the
  // entire long-strip aspect ratio, so the visible DOM frame showed only a
  // thin/empty slice of the uploaded character image. With an exact atlas
  // grid, each selected cell occupies this frame and neighbouring cells stay
  // outside it.
  const style = {
    '--sprite-atlas': `url(${sprite.atlas})`,
    '--sprite-size': `${columns * 100}% ${rows * 100}%`,
    '--sprite-x': `${x}%`,
    '--sprite-y': `${y}%`,
  } as CSSProperties

  return (
    <span
      className={`sprite-frame ${className}`}
      style={style}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  )
}
