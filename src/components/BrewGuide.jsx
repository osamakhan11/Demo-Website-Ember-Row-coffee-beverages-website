import { useRef, useState } from 'react'

const methods = {
  pourover: {
    label: 'Pour-over (V60)',
    steps: [
      ['Heat & rinse', 'Bring water to temperature and rinse the paper filter to remove papery taste. Tip the rinse water away.'],
      ['Grind', 'Grind medium-fine, like table salt. Grind just before you brew; flavour fades within minutes.'],
      ['Bloom', 'Pour twice the coffee weight in water, swirl, and wait 40 seconds while CO₂ escapes.'],
      ['Pour in circles', 'Pour slowly in small spirals to your target weight, keeping the bed level.'],
      ['Draw down', 'Let it drain. Aim to finish around the time shown in the calculator, then swirl and serve.'],
    ],
    dose: { label: 'Coffee', unit: 'g', min: 10, max: 40, step: 1, value: 18 },
    ratio: { label: 'Ratio 1 :', min: 13, max: 18, step: 0.5, value: 16 },
    temp: { label: 'Water', unit: '°C', min: 88, max: 98, step: 1, value: 94 },
  },
  matcha: {
    label: 'Matcha ritual',
    steps: [
      ['Sift', 'Sift the powder into a warm bowl to break up clumps. This is the step most people skip.'],
      ['Paste', 'Add a splash of water and press into a smooth paste with the whisk.'],
      ['Cool the water', 'Matcha scorches above 85°C. Let boiled water rest about three minutes.'],
      ['Whisk', 'Whisk in a quick W shape, not circles, for 15–20 seconds until a fine foam forms.'],
      ['Drink straight away', 'Matcha settles fast. Drink within a few minutes, or pour over milk for a latte.'],
    ],
    dose: { label: 'Matcha', unit: 'g', min: 1, max: 5, step: 0.5, value: 2 },
    ratio: { label: 'Ratio 1 :', min: 25, max: 50, step: 5, value: 35 },
    temp: { label: 'Water', unit: '°C', min: 70, max: 85, step: 1, value: 78 },
  },
}

function Slider({ id, cfg, value, onChange }) {
  return (
    <label className="slider" htmlFor={id}>
      <span className="slider-label">
        {cfg.label}
        <output>
          {value}
          {cfg.unit ?? ''}
        </output>
      </span>
      <input id={id} type="range" min={cfg.min} max={cfg.max} step={cfg.step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </label>
  )
}

export default function BrewGuide() {
  const [method, setMethod] = useState('pourover')
  const m = methods[method]
  const [vals, setVals] = useState({ dose: m.dose.value, ratio: m.ratio.value, temp: m.temp.value })
  const track = useRef(null)

  const switchMethod = (key) => {
    setMethod(key)
    const n = methods[key]
    setVals({ dose: n.dose.value, ratio: n.ratio.value, temp: n.temp.value })
    track.current?.scrollTo({ left: 0, behavior: 'smooth' })
  }

  const water = Math.round(vals.dose * vals.ratio)
  const seconds = method === 'pourover' ? Math.round(120 + water * 0.18) : 20
  const time = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`

  const scrollBy = (dir) => {
    const el = track.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <section className="brew" id="brew" aria-labelledby="brew-title">
      <div className="section-head">
        <h2 id="brew-title">Brew it at home</h2>
        <div className="method-switch" role="tablist" aria-label="Brew method">
          {Object.entries(methods).map(([key, val]) => (
            <button key={key} role="tab" aria-selected={method === key} className={method === key ? 'is-active' : ''} onClick={() => switchMethod(key)}>
              {val.label}
            </button>
          ))}
        </div>
      </div>

      <div className="brew-layout">
        <div className="steps-wrap">
          <ol className="steps" ref={track} key={method}>
            {m.steps.map(([title, body], i) => (
              <li key={title} className="step" style={{ '--i': i }}>
                <span className="step-num">{i + 1}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ol>
          <div className="steps-nav">
            <button onClick={() => scrollBy(-1)} aria-label="Previous step">‹</button>
            <button onClick={() => scrollBy(1)} aria-label="Next step">›</button>
          </div>
        </div>

        <form className="calculator" onSubmit={(e) => e.preventDefault()} aria-label="Brew calculator">
          <Slider id="dose" cfg={m.dose} value={vals.dose} onChange={(dose) => setVals((v) => ({ ...v, dose }))} />
          <Slider id="ratio" cfg={m.ratio} value={vals.ratio} onChange={(ratio) => setVals((v) => ({ ...v, ratio }))} />
          <Slider id="temp" cfg={m.temp} value={vals.temp} onChange={(temp) => setVals((v) => ({ ...v, temp }))} />
          <div className="calc-result" aria-live="polite">
            <div>
              <span>Water</span>
              <strong>{water} ml</strong>
            </div>
            <div>
              <span>{method === 'pourover' ? 'Total brew time' : 'Whisk for'}</span>
              <strong>{method === 'pourover' ? time : `${seconds} s`}</strong>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
