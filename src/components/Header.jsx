import { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext.jsx'

const links = [
  ['#story', 'Our story'],
  ['#menu', 'Menu'],
  ['#brew', 'Brew guide'],
  ['#roaster', 'Roastery'],
  ['#visit', 'Visit'],
]

export default function Header() {
  const { count, setOpen } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <a href="#top" className="brand" aria-label="Ember Row home">
        <span className="brand-mark" aria-hidden="true" />
        Ember Row
      </a>
      <nav aria-label="Main" className={`nav ${menuOpen ? 'is-open' : ''}`}>
        {links.map(([href, label]) => (
          <a key={href} href={href} onClick={() => setMenuOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <button className="cart-button" onClick={() => setOpen(true)} aria-label={`Open order, ${count} items`}>
          Order
          <span className="cart-count" aria-hidden="true">{count}</span>
        </button>
        <button
          className="burger"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
