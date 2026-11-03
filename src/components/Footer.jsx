export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="footer-panel">
        <div>
          <p className="brand">Ember Row</p>
          <p>Coffee, matcha and slow drinks. Roasted in Hackney, poured in Bethnal Green.</p>
        </div>
        <nav aria-label="Footer">
          <a href="#menu">Menu</a>
          <a href="#brew">Brew guide</a>
          <a href="#roaster">Roastery</a>
          <a href="#visit">Visit</a>
        </nav>
        <div>
          <a href="mailto:hello@emberrow.coffee">hello@emberrow.coffee</a>
          <a href="tel:+442070000000">020 7000 0000</a>
        </div>
      </div>
      <p className="legal">
        © {year} Ember Row Coffee Ltd. <a href="#top">Privacy</a> <a href="#top">Allergens</a>{' '}
        <a href="https://unsplash.com" target="_blank" rel="noreferrer">Photography from Unsplash</a>
      </p>
    </footer>
  )
}
