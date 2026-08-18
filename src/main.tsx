import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'

fetch('/assets/paper-texture.base64')
  .then((response) => response.text())
  .then((encodedTexture) => {
    document.documentElement.style.setProperty(
      '--paper-texture',
      `url("data:image/webp;base64,${encodedTexture.trim()}")`,
    )
  })
  .catch(() => {
    // The watercolor wash is decorative; the game remains fully usable without it.
  })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
