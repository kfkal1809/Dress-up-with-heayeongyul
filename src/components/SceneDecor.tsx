interface SceneDecorProps {
  background: string
}

export function SceneDecor({ background }: SceneDecorProps) {
  switch (background) {
    case 'deck':
      return (
        <div className="scene-decor deck-decor" aria-hidden="true">
          <span className="deck-rail" />
          <span className="deck-wheel">⚓</span>
          <span className="deck-floor" />
        </div>
      )
    case 'sunset':
      return (
        <div className="scene-decor" aria-hidden="true">
          <span className="sunset-sun" />
          <span className="far-birds">⌁ ⌁</span>
          <span className="scene-wave wave-one" />
          <span className="scene-wave wave-two" />
        </div>
      )
    case 'night':
      return (
        <div className="scene-decor" aria-hidden="true">
          <span className="moon">☾</span>
          <span className="stars">✦ · ✧ · ✦</span>
          <span className="scene-wave wave-one" />
        </div>
      )
    case 'cabin':
      return (
        <div className="scene-decor cabin-decor" aria-hidden="true">
          <span className="cabin-window"><i /></span>
          <span className="cabin-lamp">⌄</span>
          <span className="cabin-floor" />
        </div>
      )
    case 'beach':
      return (
        <div className="scene-decor" aria-hidden="true">
          <span className="beach-sun">☀</span>
          <span className="beach-cloud">☁</span>
          <span className="scene-wave wave-one" />
          <span className="beach-sand" />
          <span className="beach-shell">♢</span>
        </div>
      )
    case 'cherry':
      return (
        <div className="scene-decor" aria-hidden="true">
          <span className="cherry-branch">⌁</span>
          <span className="cherry-petals">✿ · ✿ · ❀</span>
          <span className="harbor-line" />
        </div>
      )
    case 'hearts':
      return (
        <div className="scene-decor" aria-hidden="true">
          <span className="heart-cloud heart-a">♥</span>
          <span className="heart-cloud heart-b">♡</span>
          <span className="heart-cloud heart-c">♥</span>
          <span className="heart-ribbon">해남이 ♥ 해녀</span>
        </div>
      )
    default:
      return (
        <div className="scene-decor" aria-hidden="true">
          <span className="clear-sun">☀</span>
          <span className="clear-cloud cloud-a">☁</span>
          <span className="clear-cloud cloud-b">☁</span>
          <span className="far-birds">⌁ ⌁</span>
          <span className="scene-wave wave-one" />
          <span className="scene-wave wave-two" />
        </div>
      )
  }
}
