import { useMemo, useState } from 'react'
import { categories, menu } from '../data/menu.js'
import { money, useCart } from '../context/CartContext.jsx'
import { photos } from '../data/photos.js'
import Photo from './Photo.jsx'

function CupArt({ item }) {
  return (
    <div className={`cup-art ${item.iced ? 'is-iced' : ''}`} style={{ '--liquid': item.liquid, '--foam': item.foam }}>
      {/* illustrated cup = fallback if the photo can't load */}
      <span className="cup-rim" aria-hidden="true" />
      <span className="cup-pour" aria-hidden="true" />
      {!item.iced && item.art !== 'crema' && <span className="cup-heart" aria-hidden="true" />}
      <Photo photo={photos[item.id]} alt={item.name} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 400px" />
    </div>
  )
}

export default function Menu() {
  const [filter, setFilter] = useState('All')
  const { add } = useCart()
  const items = useMemo(() => (filter === 'All' ? menu : menu.filter((m) => m.category === filter)), [filter])

  return (
    <section className="menu" id="menu" aria-labelledby="menu-title">
      <div className="section-head">
        <h2 id="menu-title">Today's menu</h2>
        <p>Every drink can be made with oat, whole or skimmed milk. Decaf Row Blend available all day.</p>
      </div>

      <div className="filters" role="tablist" aria-label="Filter drinks">
        {categories.map((c) => (
          <button key={c} role="tab" aria-selected={filter === c} className={filter === c ? 'is-active' : ''} onClick={() => setFilter(c)}>
            {c}
          </button>
        ))}
      </div>

      <ul className="menu-grid">
        {items.map((item) => (
          <li key={item.id} className="menu-card">
            <CupArt item={item} />
            <div className="menu-card-body">
              <div className="menu-card-top">
                <h3>{item.name}</h3>
                <span className="price">{money(item.price)}</span>
              </div>
              <p>{item.notes}</p>
              <button className="quick-add" onClick={() => add(item)} aria-label={`Add ${item.name} to order`}>
                Add to order
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
