import { findItem } from '../data/items'
import type { CharacterKey, CharacterState } from '../types'

interface CharacterCanvasProps {
  character: CharacterKey
  state: CharacterState
  active?: boolean
}

const INK = '#263746'
const SKIN = '#f7cdb0'
const SKIN_SHADE = '#dda98b'

const itemColors = (character: CharacterKey, id: string | null, fallback = '#fffaf0') => {
  const selected = findItem(character, id)
  return { color: selected?.color ?? fallback, accent: selected?.accent ?? '#6e91aa' }
}

function HairBack({ character, hair }: { character: CharacterKey; hair: string }) {
  const { color } = itemColors(character, hair, '#5f4133')
  if (character === 'haenam') return null

  if (hair === 'hy-long-wave' || hair === 'hy-bangs') {
    return <path d="M48 92 Q42 34 120 25 Q198 34 192 94 L191 183 Q177 206 160 190 Q147 207 130 190 Q112 207 96 190 Q77 205 61 185 Z" fill={color} />
  }
  if (hair === 'hy-ponytail') {
    return <path d="M168 53 Q219 49 208 111 Q198 152 171 131 Q189 105 170 80 Z" fill={color} stroke={INK} strokeWidth="4" />
  }
  if (hair === 'hy-braids') {
    return (
      <g fill={color} stroke={INK} strokeWidth="3">
        <path d="M60 102 Q35 128 55 157 Q37 176 57 196 Q73 183 62 163 Q79 142 65 115 Z" />
        <path d="M180 102 Q205 128 185 157 Q203 176 183 196 Q167 183 178 163 Q161 142 175 115 Z" />
      </g>
    )
  }
  if (hair === 'hy-bob' || hair === 'hy-short') {
    return <path d="M49 82 Q57 25 120 26 Q183 25 192 83 L187 146 Q171 171 154 151 Q137 172 120 152 Q102 172 85 151 Q68 170 53 145 Z" fill={color} stroke={INK} strokeWidth="4" />
  }
  return null
}

function HairFront({ character, hair }: { character: CharacterKey; hair: string }) {
  const { color, accent } = itemColors(character, hair, '#5f4133')
  const common = { fill: color, stroke: INK, strokeWidth: 4, strokeLinejoin: 'round' as const }

  if (character === 'haenyeo') {
    if (hair === 'hy-bun') {
      return (
        <g {...common}>
          <circle cx="122" cy="30" r="27" />
          <path d="M51 90 Q49 35 120 31 Q192 35 190 92 Q177 67 157 61 Q145 84 122 63 Q99 83 81 61 Q61 70 51 90 Z" />
          <path d="M71 59 Q92 40 117 45" fill="none" stroke={accent} strokeWidth="5" opacity=".45" />
        </g>
      )
    }
    if (hair === 'hy-long-wave') {
      return <path {...common} d="M51 90 Q49 35 120 28 Q191 35 189 93 Q174 64 152 58 Q144 82 122 62 Q101 82 85 59 Q63 68 51 90 Z" />
    }
    if (hair === 'hy-ponytail') {
      return <path {...common} d="M50 93 Q49 36 121 29 Q191 37 190 93 Q173 65 151 57 Q142 82 121 61 Q100 82 84 59 Q64 68 50 93 Z" />
    }
    if (hair === 'hy-short') {
      return <path {...common} d="M51 91 Q45 43 89 31 Q120 17 155 34 Q195 44 189 94 Q176 73 157 64 Q142 85 120 67 Q98 84 82 64 Q63 72 51 91 Z" />
    }
    if (hair === 'hy-bangs') {
      return <path {...common} d="M50 91 Q49 34 120 28 Q190 34 190 92 Q173 67 155 59 L148 89 Q134 73 125 58 Q111 78 91 88 L86 59 Q65 68 50 91 Z" />
    }
    return <path {...common} d="M50 92 Q49 35 120 28 Q191 35 190 93 Q178 71 158 61 Q148 83 128 65 Q113 85 95 65 Q75 82 50 92 Z" />
  }

  switch (hair) {
    case 'hn-wave':
      return <path {...common} d="M49 93 Q43 49 77 35 Q92 18 116 34 Q138 16 157 36 Q189 44 190 93 Q171 72 154 61 Q147 81 129 64 Q113 86 97 65 Q77 83 49 93 Z" />
    case 'hn-bowl':
      return <path {...common} d="M49 93 Q49 31 120 27 Q191 31 191 94 Q172 77 153 67 Q137 87 119 69 Q99 86 84 66 Q64 77 49 93 Z" />
    case 'hn-part':
      return <path {...common} d="M49 92 Q48 39 112 28 Q178 24 190 91 Q164 70 139 51 Q135 74 119 62 Q104 79 80 67 Q65 76 49 92 Z" />
    case 'hn-curl':
      return (
        <g {...common}>
          <path d="M49 92 Q44 51 73 36 Q83 20 102 34 Q119 13 136 33 Q158 16 169 40 Q194 54 190 94 Q170 74 156 62 Q146 84 128 66 Q111 84 96 64 Q72 84 49 92 Z" />
          <circle cx="87" cy="42" r="15" /><circle cx="126" cy="35" r="16" /><circle cx="160" cy="48" r="14" />
        </g>
      )
    case 'hn-crop':
      return <path {...common} d="M52 87 Q57 35 116 29 Q175 32 188 83 Q169 66 153 57 L146 72 L130 58 L115 72 L98 57 L83 72 L70 59 Q59 71 52 87 Z" />
    default:
      return <path {...common} d="M49 92 Q47 42 84 33 Q102 20 120 35 Q141 19 157 38 Q187 47 190 92 Q172 70 154 62 Q146 82 128 65 Q110 84 95 65 Q74 83 49 92 Z" />
  }
}

function TopLayer({ character, id }: { character: CharacterKey; id: string }) {
  const { color, accent } = itemColors(character, id)
  const tank = id.endsWith('tank')
  const hoodie = id.includes('hoodie')
  const stripe = id.includes('stripe')
  const sailor = id.includes('sailor')
  const couple = id.includes('couple')

  return (
    <g stroke={INK} strokeWidth="4" strokeLinejoin="round">
      {!tank && <path d="M81 174 Q59 176 55 203 L72 220 L84 207 Z" fill={color} />}
      {!tank && <path d="M159 174 Q181 176 185 203 L168 220 L156 207 Z" fill={color} />}
      <path d={tank ? 'M91 170 Q101 182 120 182 Q139 182 149 170 L157 249 L83 249 Z' : 'M80 175 Q97 166 120 170 Q143 166 160 175 L157 249 L83 249 Z'} fill={color} />
      {tank && <path d="M101 168 Q103 188 120 189 Q137 188 139 168" fill="none" />}
      {stripe && <g stroke={accent} strokeWidth="8"><path d="M82 196 H158" /><path d="M83 218 H157" /></g>}
      {hoodie && <><path d="M99 171 Q120 200 141 171" fill={accent} opacity=".45" /><path d="M111 181 V207 M129 181 V207" fill="none" strokeWidth="2.5" /></>}
      {sailor && <path d="M88 174 L120 207 L152 174 L143 170 L120 190 L97 170 Z" fill={accent} />}
      {id.includes('shirt') && <><path d="M120 174 V244" fill="none" stroke={accent} strokeWidth="2.5" /><circle cx="126" cy="194" r="2" fill={accent} stroke="none" /><circle cx="126" cy="214" r="2" fill={accent} stroke="none" /></>}
      {id.includes('knit') && <text x="120" y="218" textAnchor="middle" fontSize="27" fill={accent} stroke="none">⚓</text>}
      {couple && <text x="120" y="218" textAnchor="middle" fontSize="29" fill={accent} stroke="none">♥</text>}
      {id.includes('cardigan') && <><path d="M120 174 V246" fill="none" stroke={accent} strokeWidth="3" /><circle cx="126" cy="199" r="3" fill={accent} stroke="none" /><circle cx="126" cy="219" r="3" fill={accent} stroke="none" /></>}
    </g>
  )
}

function BottomLayer({ character, id }: { character: CharacterKey; id: string }) {
  const { color, accent } = itemColors(character, id)
  const skirt = id.includes('skirt')
  const long = id.includes('jeans') || id.includes('slacks') || id.includes('pants')

  if (skirt) {
    return (
      <g stroke={INK} strokeWidth="4" strokeLinejoin="round">
        <path d="M84 238 H156 L170 292 Q120 305 70 292 Z" fill={color} />
        <path d="M82 246 Q120 257 158 246" fill="none" stroke={accent} strokeWidth="3" opacity=".7" />
      </g>
    )
  }

  return (
    <g stroke={INK} strokeWidth="4" strokeLinejoin="round">
      <path d={long ? 'M79 240 H118 L117 320 H83 Z' : 'M79 240 H119 L116 284 H79 Z'} fill={color} />
      <path d={long ? 'M122 240 H161 L157 320 H123 Z' : 'M121 240 H161 L161 284 H124 Z'} fill={color} />
      <path d="M120 242 V266" fill="none" stroke={accent} strokeWidth="2.5" />
      {id.includes('work') && <path d="M88 260 H109 M131 260 H152" stroke={accent} strokeWidth="3" />}
    </g>
  )
}

function OutfitLayer({ character, id }: { character: CharacterKey; id: string }) {
  const { color, accent } = itemColors(character, id)
  const raincoat = id.includes('raincoat')
  const pajamas = id.includes('pajamas')
  const dress = id.includes('dress')
  const overalls = id.includes('overalls')
  const work = id.includes('work')
  const sailor = id.includes('sailor')
  const resort = id.includes('resort') || id.includes('outing')

  return (
    <g stroke={INK} strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
      <path d="M78 177 Q58 179 54 205 L72 222 L84 208 Z" fill={color} />
      <path d="M162 177 Q182 179 186 205 L168 222 L156 208 Z" fill={color} />
      {dress ? (
        <path d="M82 174 Q120 164 158 174 L150 232 L176 307 Q120 324 64 307 L90 232 Z" fill={color} />
      ) : (
        <>
          <path d="M79 174 Q120 164 161 174 L157 251 H83 Z" fill={color} />
          <path d="M83 246 H118 L116 320 H82 Z" fill={color} />
          <path d="M122 246 H157 L158 320 H124 Z" fill={color} />
        </>
      )}
      {(sailor || id.includes('pastel')) && <path d="M89 174 L120 204 L151 174 L140 168 L120 187 L100 168 Z" fill={accent} />}
      {sailor && <text x="120" y="227" textAnchor="middle" fontSize="22" fill={accent} stroke="none">⚓</text>}
      {work && <><path d="M120 174 V315" fill="none" stroke={accent} strokeWidth="3" /><path d="M92 193 H112 V213 H92 Z M129 193 H149 V213 H129 Z" fill="none" stroke={accent} strokeWidth="3" /></>}
      {overalls && <><path d="M93 175 L101 255 H139 L147 175" fill={color} stroke={accent} /><path d="M99 193 H141 V247 H99 Z" fill={color} stroke={accent} /><path d="M111 209 H130 V227 H111 Z" fill="none" stroke={accent} strokeWidth="3" /></>}
      {raincoat && <><path d="M120 178 V309" fill="none" stroke={accent} strokeWidth="3" /><path d="M92 198 H110 V217 H92 Z M130 198 H148 V217 H130 Z" fill="none" stroke={accent} strokeWidth="3" /><path d="M86 171 Q120 139 154 171 Q144 178 120 184 Q96 178 86 171 Z" fill={color} /></>}
      {pajamas && <><path d="M120 176 V247" fill="none" stroke={accent} strokeWidth="3" /><path d="M83 198 H158 M83 221 H158 M84 266 H117 M123 266 H157 M84 288 H116 M124 288 H157" fill="none" stroke={accent} strokeWidth="6" opacity=".65" /><circle cx="128" cy="195" r="3" fill={accent} stroke="none" /><circle cx="128" cy="216" r="3" fill={accent} stroke="none" /></>}
      {resort && <><path d="M82 194 Q120 207 158 194 M84 218 Q120 231 156 218" fill="none" stroke={accent} strokeWidth="8" opacity=".8" /><path d="M103 184 l8 8 m28 -8 l-8 8" stroke={accent} strokeWidth="4" /></>}
      {id.includes('knit') && <><path d="M92 194 Q120 214 148 194 M90 220 Q120 240 150 220" fill="none" stroke={accent} strokeWidth="3" opacity=".65" /><text x="120" y="270" textAnchor="middle" fontSize="20" fill={accent} stroke="none">✿</text></>}
      {id.includes('navy') && <><path d="M90 181 L120 207 L150 181" fill="none" stroke="#f4d06b" strokeWidth="6" /><circle cx="120" cy="224" r="4" fill="#f4d06b" stroke="none" /></>}
    </g>
  )
}

function ShoesLayer({ character, id }: { character: CharacterKey; id: string }) {
  const { color, accent } = itemColors(character, id, SKIN)
  if (id.includes('barefoot')) {
    return (
      <g fill={SKIN} stroke={INK} strokeWidth="4">
        <ellipse cx="98" cy="327" rx="21" ry="11" /><ellipse cx="142" cy="327" rx="21" ry="11" />
      </g>
    )
  }
  const boot = id.includes('boots') || id.includes('safety')
  return (
    <g fill={color} stroke={INK} strokeWidth="4" strokeLinejoin="round">
      {boot && <><path d="M82 294 H116 V326 H79 Z" /><path d="M124 294 H158 L161 326 H124 Z" /></>}
      <path d="M78 318 Q96 308 117 320 L116 333 H77 Q72 327 78 318 Z" />
      <path d="M123 320 Q144 308 162 318 Q168 327 163 333 H124 Z" />
      <path d="M81 326 H114 M126 326 H159" stroke={accent} strokeWidth="3" />
    </g>
  )
}

function HatLayer({ character, id }: { character: CharacterKey; id: string | null }) {
  if (!id || id === 'none') return null
  const { color, accent } = itemColors(character, id)
  if (id.includes('captain')) {
    return (
      <g stroke={INK} strokeWidth="4" strokeLinejoin="round">
        <path d="M64 49 Q120 9 176 49 L169 70 Q120 55 71 70 Z" fill={color} />
        <path d="M65 64 Q120 49 175 64 Q169 82 120 76 Q71 82 65 64 Z" fill={accent} />
        <text x="120" y="61" textAnchor="middle" fontSize="20" fill="#f5ca5b" stroke="none">⚓</text>
      </g>
    )
  }
  if (id.includes('ribbon')) {
    return <g fill={color} stroke={INK} strokeWidth="3"><path d="M63 60 Q40 43 40 75 Q58 91 72 70 Q86 89 103 71 Q97 43 72 60 Z" /><circle cx="72" cy="66" r="10" fill={accent} /></g>
  }
  if (id.includes('pin')) {
    return <g><circle cx="72" cy="61" r="13" fill={color} stroke={INK} strokeWidth="3" /><text x="72" y="68" textAnchor="middle" fontSize="18" fill={accent}>{id.includes('flower') ? '✿' : id.includes('anchor') ? '⚓' : '⌁'}</text></g>
  }
  if (id.includes('beanie')) {
    return <g stroke={INK} strokeWidth="4"><path d="M67 64 Q69 12 120 9 Q171 12 174 64 Z" fill={color} /><path d="M64 58 Q120 48 176 58 L171 78 Q120 68 69 78 Z" fill={color} /><circle cx="120" cy="9" r="11" fill={accent} /><text x="120" y="51" textAnchor="middle" fontSize="20" fill={accent} stroke="none">⚓</text></g>
  }
  if (id.includes('straw')) {
    return <g fill={color} stroke={INK} strokeWidth="4"><ellipse cx="120" cy="62" rx="75" ry="18" /><path d="M78 57 Q78 14 120 13 Q162 14 162 57 Z" /><path d="M79 48 H161" stroke={accent} strokeWidth="8" /></g>
  }
  if (id.includes('helmet')) {
    return <g fill={color} stroke={INK} strokeWidth="4"><path d="M65 61 Q70 14 120 14 Q170 14 175 61 Z" /><path d="M58 60 H182 Q179 76 120 72 Q61 76 58 60 Z" /><text x="120" y="50" textAnchor="middle" fontSize="22" fill={accent} stroke="none">+</text></g>
  }
  if (id.includes('cap')) {
    return <g fill={color} stroke={INK} strokeWidth="4"><path d="M67 61 Q71 22 120 22 Q167 23 170 61 Z" /><path d="M117 59 Q166 48 187 67 Q164 77 119 70 Z" /><path d="M105 28 V62 M125 24 V59 M145 31 V59" stroke={accent} strokeWidth="3" /></g>
  }
  return <g fill={color} stroke={INK} strokeWidth="4"><path d="M68 63 Q76 24 120 22 Q163 24 171 63 Q124 54 68 63 Z" /><path d="M68 62 Q120 53 174 62 Q167 75 120 71 Q79 76 68 62 Z" stroke={accent} /></g>
}

function AccessoryLayer({ character, id }: { character: CharacterKey; id: string | null }) {
  if (!id || id === 'none') return null
  const { color, accent } = itemColors(character, id)

  if (id.includes('coffee')) {
    return <g transform="translate(164 207)" stroke={INK} strokeWidth="4"><path d="M0 0 H39 V45 Q20 54 0 45 Z" fill={color} /><path d="M39 10 Q61 9 54 31 Q49 40 39 34" fill="none" /><text x="20" y="31" textAnchor="middle" fontSize="18" fill={accent} stroke="none">⚓</text></g>
  }
  if (id.includes('wrench')) {
    return <g transform="translate(174 191) rotate(17)" fill={color} stroke={INK} strokeWidth="4"><path d="M8 0 Q26 9 15 25 L6 34 L18 47 L8 57 L-5 44 L-14 53 L-25 42 L-15 32 L-27 18 L-17 8 L-6 20 L4 10 Q-6 -8 8 0 Z" /></g>
  }
  if (id.includes('binoculars')) {
    return <g transform="translate(165 211)" fill={color} stroke={INK} strokeWidth="4"><circle cx="7" cy="27" r="18" /><circle cx="39" cy="27" r="18" /><path d="M15 17 H31" /><path d="M-1 16 L7 0 H18 L18 19 M47 16 L39 0 H28 L28 19" fill={accent} /></g>
  }
  if (id.includes('radio')) {
    return <g transform="translate(174 206)" stroke={INK} strokeWidth="4"><path d="M0 0 H39 V59 H0 Z" fill={color} /><path d="M29 0 L35 -27" /><circle cx="20" cy="19" r="9" fill={accent} /><path d="M9 41 H30 M9 49 H30" stroke={accent} /></g>
  }
  if (id.includes('flower')) {
    return <g transform="translate(181 220)"><path d="M0 70 Q-8 31 3 7 M0 70 Q16 32 23 14 M0 70 Q-17 36 -24 22" fill="none" stroke="#72905e" strokeWidth="5" /><text x="1" y="25" textAnchor="middle" fontSize="47">💐</text></g>
  }
  if (id.includes('fish')) {
    return <g transform="translate(171 234)" fill={color} stroke={INK} strokeWidth="4"><ellipse cx="17" cy="14" rx="29" ry="19" /><path d="M-10 14 L-35 -3 L-34 30 Z" fill={accent} /><circle cx="29" cy="9" r="3" fill={INK} stroke="none" /></g>
  }
  if (id.includes('heart-bag')) {
    return <g transform="translate(167 213)" stroke={INK} strokeWidth="4"><path d="M-21 -43 Q-4 -67 13 -40" fill="none" /><path d="M-18 0 Q-29 -20 -12 -28 Q0 -33 7 -20 Q16 -33 30 -25 Q47 -13 35 2 L9 31 Z" fill={color} /></g>
  }
  if (id.includes('crossbag')) {
    return <g stroke={INK} strokeWidth="4"><path d="M83 179 Q142 215 178 281" fill="none" /><rect x="154" y="250" width="49" height="44" rx="9" fill={color} /><text x="178" y="280" textAnchor="middle" fontSize="19" fill={accent} stroke="none">⚓</text></g>
  }
  if (id.includes('diary')) {
    return <g transform="translate(166 220) rotate(7)" stroke={INK} strokeWidth="4"><rect width="45" height="59" rx="5" fill={color} /><path d="M8 0 V59 M14 13 H36 M14 23 H32" stroke={accent} /><text x="26" y="48" textAnchor="middle" fontSize="16" fill={accent} stroke="none">⚓</text></g>
  }
  if (id.includes('shell')) {
    return <g><path d="M97 168 Q120 191 143 168" fill="none" stroke={accent} strokeWidth="3" /><path d="M120 188 q-14 9 0 22 q14-13 0-22" fill={color} stroke={INK} strokeWidth="3" /></g>
  }
  if (id.includes('balloon')) {
    return <g transform="translate(178 150)" stroke={INK} strokeWidth="3"><path d="M9 33 Q-6 16 7 3 Q22 -8 35 4 Q48 18 33 34 Q23 42 9 33 Z" fill={color} /><path d="M21 39 Q5 77 19 123" fill="none" /><path d="M9 16 Q21 7 33 16" fill="none" stroke={accent} /></g>
  }
  return null
}

export function CharacterCanvas({ character, state, active = false }: CharacterCanvasProps) {
  const displayName = character === 'haenam' ? '해남이' : '해녀'
  return (
    <svg
      className={`character-canvas ${active ? 'is-active' : ''}`}
      viewBox="0 0 240 350"
      role="img"
      aria-label={`${state.nickname || displayName} 캐릭터`}
    >
      <defs>
        <filter id={`pencil-${character}`} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.028" numOctaves="2" seed={character === 'haenam' ? 7 : 13} result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.65" />
        </filter>
      </defs>
      <g filter={`url(#pencil-${character})`} strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="120" cy="333" rx="57" ry="10" fill="#667b8a" opacity=".16" stroke="none" />
        <HairBack character={character} hair={state.hair} />

        <g fill={SKIN} stroke={INK} strokeWidth="4">
          <path d="M83 181 Q60 186 58 229 Q60 252 75 249 Q84 245 80 225 L88 199 Z" />
          <path d="M157 181 Q180 186 182 229 Q180 252 165 249 Q156 245 160 225 L152 199 Z" />
          <path d="M87 268 L116 268 L115 321 L84 321 Z" />
          <path d="M124 268 L153 268 L156 321 L125 321 Z" />
          <path d="M84 170 Q120 159 156 170 L156 268 H84 Z" />
          <circle cx="54" cy="107" r="19" />
          <circle cx="186" cy="107" r="19" />
          <circle cx="120" cy="105" r="68" />
        </g>

        {state.outfit ? <OutfitLayer character={character} id={state.outfit} /> : <><BottomLayer character={character} id={state.bottom} /><TopLayer character={character} id={state.top} /></>}
        <ShoesLayer character={character} id={state.shoes} />

        <g>
          <ellipse cx="82" cy="126" rx="15" ry="8" fill="#ef9f9f" opacity=".42" />
          <ellipse cx="158" cy="126" rx="15" ry="8" fill="#ef9f9f" opacity=".42" />
          <ellipse cx="91" cy="108" rx="5" ry="8" fill={INK} />
          <ellipse cx="149" cy="108" rx="5" ry="8" fill={INK} />
          <circle cx="89.5" cy="105.5" r="1.4" fill="white" />
          <circle cx="147.5" cy="105.5" r="1.4" fill="white" />
          <path d="M111 132 Q120 140 129 132" fill="none" stroke={INK} strokeWidth="3.5" />
          <path d="M70 107 Q58 111 56 119 M170 107 Q182 111 184 119" fill="none" stroke={SKIN_SHADE} strokeWidth="2.5" opacity=".75" />
        </g>

        <HairFront character={character} hair={state.hair} />
        <AccessoryLayer character={character} id={state.accessory} />
        <HatLayer character={character} id={state.hat} />
      </g>
    </svg>
  )
}
