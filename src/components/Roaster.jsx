import { Suspense, lazy } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion.js'
import { photos } from '../data/photos.js'
import Photo from './Photo.jsx'

const BeansScene = lazy(() => import('../three/BeansScene.jsx'))

const origins = [
  ['Finca La Esperanza', 'Huila, Colombia', 'Washed Caturra. Red apple, panela.'],
  ['Kiambu Cooperative', 'Kiambu, Kenya', 'SL28 & SL34. Blackcurrant, grapefruit.'],
  ['Sítio Boa Vista', 'Minas Gerais, Brazil', 'Natural Yellow Bourbon. Hazelnut, milk chocolate.'],
  ['Yamashiro Tea Garden', 'Uji, Japan', 'Shade-grown tencha for our ceremonial matcha.'],
]

export default function Roaster() {
  const reduced = useReducedMotion()
  return (
    <section className="roaster" id="roaster" aria-labelledby="roaster-title">
      <div className="roaster-stage">
        <Suspense fallback={<div className="stage-loading">Roasting…</div>}>
          <BeansScene reducedMotion={reduced} />
        </Suspense>
        <p className="stage-hint">Drag to scatter the beans</p>
      </div>
      <div className="roaster-text">
        <h2 id="roaster-title">Roasted in Arch 7, Hackney</h2>
        <p>
          Our head roaster Imani Okafor profiles every lot on a 15 kg Giesen, cupping each batch the morning after. We
          roast light enough to taste the farm, and dark enough that it still works with milk.
        </p>
        <div className="roaster-photo">
          <Photo photo={photos.portafilter} sizes="(max-width: 900px) 100vw, 45vw" />
        </div>
        <ul className="origins">
          {origins.map(([farm, place, notes]) => (
            <li key={farm}>
              <strong>{farm}</strong>
              <span>{place}</span>
              <em>{notes}</em>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
