import type { CSSProperties } from 'react'
import type { SpriteSpec } from '../types'

interface SpriteFrameProps {
  sprite: SpriteSpec
  className?: string
  label?: string
}

export function SpriteFrame({ sprite, className = '', label }: SpriteFrameProps) {
  const rows = sprite.rows ?? 1
  const column = sprite.index % sprite.columns
  const row = Math.floor(sprite.index / sprite.columns)
  const x = sprite.columns === 1 ? 50 : (column / (sprite.columns - 1)) * 100
  const y = rows === 1 ? 50 : (row / (rows - 1)) * 100

  const style = {
    '--sprite-atlas': `url(${sprite.atlas})`,
    '--sprite-size': sprite.fit === 'cell'
      ? `${sprite.columns * 100}% ${rows * 100}%`
      : `${sprite.columns * 100}% auto`,
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
