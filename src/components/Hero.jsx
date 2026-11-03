import { Suspense, lazy, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { heroDrinks } from '../data/menu.js'
import { useCart } from '../context/CartContext.jsx'
import { useReducedMotion } from '../hooks/useReducedMotion.js'

const CupScene = lazy(() => import('../three/CupScene.jsx'))

export default function Hero() {
  const [drink, setDrink] = useState(heroDrinks[1])
  const { add } = useCart()
  const reduced = useReducedMotion()
  const root = useRef(null)

  // One orchestrated page-load moment: the headline letters settle in like poured crema.
  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.from('.hero-title .char', {
        yPercent: 110,
        rotate: 6,
        opacity: 0,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.035,
      })
      gsap.from('.hero-copy, .drink-switch, .hero-cta', { opacity: 0, y: 24, duration: 0.9, delay: 0.6, stagger: 0.1 })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  const title = 'Slow drinks for quick mornings'
  return (
    <section className="hero" id="top" ref={root} style={{ '--drink': drink.liquid, '--foam': drink.foam }}>
      <div className="hero-text">
        <h1 className="hero-title" aria-label={title}>
          {title.split(' ').map((word, w) => (
            <span className="word" key={w} aria-hidden="true">
              {word.split('').map((c, i) => (
                <span className="char" key={i}>
                  {c}
                </span>
              ))}
            </span>
          ))}
        </h1>
        <p className="hero-copy">
          Small-batch roasts from our Hackney roastery, ceremonial matcha from Uji, and a cold bar that changes with the
          season. Order ahead and it will be waiting.
        </p>

        <div className="drink-switch" role="radiogroup" aria-label="Choose a drink to preview">
          {heroDrinks.map((d) => (
            <button
              key={d.id}
              role="radio"
              aria-checked={drink.id === d.id}
              className={drink.id === d.id ? 'is-active' : ''}
              onClick={() => setDrink(d)}
              style={{ '--swatch': d.liquid }}
            >
              <span className="swatch" aria-hidden="true" />
              {d.name}
            </button>
          ))}
        </div>

        <div className="hero-cta">
          <button className="btn btn-solid" onClick={() => add(drink)}>
            Add a {drink.name.toLowerCase()} · £{drink.price.toFixed(2)}
          </button>
          <a className="btn btn-line" href="#menu">
            See the full menu
          </a>
        </div>
      </div>

      <div className="hero-stage">
        <Suspense fallback={<div className="stage-loading">Warming the cup…</div>}>
          <CupScene drink={drink} reducedMotion={reduced} />
        </Suspense>
        <p className="stage-hint">Drag to turn the cup</p>
      </div>
    </section>
  )
}
