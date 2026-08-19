import type { CSSProperties } from 'react'
import type { SpriteSpec } from '../types'

interface SpriteFrameProps {
  sprite: SpriteSpec
  className?: string
  label?: string
}

/**
 * Image-gen sprite sheets are square atlases, not single horizontal strips.
 * Some item metadata still describes the first-generation strip layout
 * (7x1 / 8x1 / 12x1), which makes the browser crop empty fragments from the
 * 1536x1536 PNGs. Keep the item ids/indexes intact and normalize only the
 * atlas geometry here so both character layers and wardrobe thumbnails use
 * the same corrected crop.
 */
const ATLAS_GRID: Record<string, readonly [columns: number, rows: number]> = {
  '/assets/sprites/haenam-sailor-outfits.png': [4, 2],
  '/assets/sprites/haenam-engineer-outfits.png': [3, 2],
  '/assets/sprites/haenam-hair.png': [4, 2],
  '/assets/sprites/haenam-items.png': [6, 2],
  '/assets/sprites/haenam-extra-outfits.png': [4, 2],
  '/assets/sprites/haenam-wedding-outfits.png': [4, 2],
  '/assets/sprites/haenam-extra-items.png': [4, 2],
  '/assets/sprites/haenyeo-outfits.png': [4, 2],
  '/assets/sprites/haenyeo-hair.png': [4, 2],
  '/assets/sprites/haenyeo-items.png': [6, 2],
  '/assets/sprites/haenyeo-extra-outfits.png': [4, 2],
  '/assets/sprites/haenyeo-wedding-outfits.png': [4, 2],
  '/assets/sprites/haenyeo-extra-items.png': [4, 2],
  '/assets/sprites/wedding-items.png': [4, 2],
}

export function SpriteFrame({ sprite, className = '', label }: SpriteFrameProps) {
  const correctedGrid = ATLAS_GRID[sprite.atlas]
  const columns = correctedGrid?.[0] ?? sprite.columns
  const rows = correctedGrid?.[1] ?? sprite.rows ?? 1
  const column = sprite.index % columns
  const row = Math.floor(sprite.index / columns)
  const x = columns === 1 ? 50 : (column / (columns - 1)) * 100
  const y = rows === 1 ? 50 : (row / (rows - 1)) * 100

  // Multi-row sheets must size both axes explicitly. Using `auto` here makes
  // a square atlas scale from element width and shifts the requested row out
  // of view whenever the element is tall (the exact failure seen in deploy).
  const useCellGrid = rows > 1 || sprite.fit === 'cell'

  const style = {
    '--sprite-atlas': `url(${sprite.atlas})`,
    '--sprite-size': useCellGrid
      ? `${columns * 100}% ${rows * 100}%`
      : `${columns * 100}% auto`,
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
