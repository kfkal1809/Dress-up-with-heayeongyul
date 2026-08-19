import type { CSSProperties } from 'react'
import type { SpriteSpec } from '../types'

interface SpriteFrameProps {
  sprite: SpriteSpec
  className?: string
  label?: string
}

/**
 * Render one cell from an uploaded PNG sprite atlas.
 *
 * The repository contains both horizontal strip atlases (7x1, 6x1, 8x1)
 * and grid atlases (6x2, 4x2). The atlas geometry lives in the item data and
 * must not be guessed from the image filename here.
 *
 * Sizing both axes explicitly is important: `auto` would preserve the whole
 * atlas aspect ratio and crop tall character art inside a shorter DOM box.
 * Making the background exactly `columns × rows` times the frame makes each
 * logical atlas cell fill this element without leaking neighbouring cells.
 */
export function SpriteFrame({ sprite, className = '', label }: SpriteFrameProps) {
  const columns = Math.max(1, sprite.columns)
  const rows = Math.max(1, sprite.rows ?? 1)
  const cellCount = columns * rows
  const safeIndex = Math.min(Math.max(0, sprite.index), cellCount - 1)
  const column = safeIndex % columns
  const row = Math.floor(safeIndex / columns)
  const x = columns === 1 ? 50 : (column / (columns - 1)) * 100
  const y = rows === 1 ? 50 : (row / (rows - 1)) * 100

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
