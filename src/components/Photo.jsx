import { useState } from 'react'

const WIDTHS = [400, 800, 1200, 1600]
export const unsplashUrl = (id, w) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`

/**
 * Responsive Unsplash photo. Fades in once loaded; if it can't load
 * (offline, blocked, removed) it disappears and whatever sits behind it
 * — the illustrated fallback — shows instead.
 */
export default function Photo({ photo, sizes = '(max-width: 700px) 100vw, 33vw', className = '', alt, eager = false }) {
  const [state, setState] = useState('loading')
  if (!photo || state === 'error') return null
  return (
    <img
      className={`photo ${state === 'loaded' ? 'is-loaded' : ''} ${className}`}
      src={unsplashUrl(photo.id, 800)}
      srcSet={WIDTHS.map((w) => `${unsplashUrl(photo.id, w)} ${w}w`).join(', ')}
      sizes={sizes}
      alt={alt ?? photo.alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onLoad={() => setState('loaded')}
      onError={() => setState('error')}
    />
  )
}
