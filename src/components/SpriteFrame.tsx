import type { CSSProperties } from 'react'
import type { SpriteSpec } from '../types'

interface SpriteFrameProps {
  sprite: SpriteSpec
  className?: string
  label?: string
}

// This legacy sheet contains 12 items arranged as 6 columns x 2 rows.
const ATLAS_GRID_FIXES: Record<string, readonly [number, number]> = {
  '/assets/sprites/haenyeo-items.png': [6, 2],
}

/**
 * Render one cell from an uploaded PNG sprite atlas using a real <img>.
 * This avoids relying on CSS custom-property background images and makes the
 * browser load the repository PNG directly for both character layers and
 * wardrobe thumbnails.
 */
export function SpriteFrame({ sprite, className = '', label }: SpriteFrameProps) {
  const corrected = ATLAS_GRID_FIXES[sprite.atlas]
  const columns = Math.max(1, corrected?.[0] ?? sprite.columns)
  const rows = Math.max(1, corrected?.[1] ?? sprite.rows ?? 1)
  const cellCount = columns * rows
  const safeIndex = Math.min(Math.max(0, sprite.index), cellCount - 1)
  const column = safeIndex % columns
  const row = Math.floor(safeIndex / columns)

  const frameStyle: CSSProperties = {
    overflow: 'hidden',
  }

  const imageStyle: CSSProperties = {
    position: 'absolute',
    left: `${-column * 100}%`,
    top: `${-row * 100}%`,
    width: `${columns * 100}%`,
    height: `${rows * 100}%`,
    maxWidth: 'none',
    maxHeight: 'none',
    objectFit: 'fill',
    pointerEvents: 'none',
    userSelect: 'none',
  }

  return (
    <span
      className={`sprite-frame ${className}`}
      style={frameStyle}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <img
        src={sprite.atlas}
        alt=""
        aria-hidden="true"
        draggable={false}
        style={imageStyle}
      />
    </span>
  )
}
