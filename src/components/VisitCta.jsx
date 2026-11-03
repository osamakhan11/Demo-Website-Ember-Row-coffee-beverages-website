import { useCart } from '../context/CartContext.jsx'

const hours = [
  ['Monday – Friday', '7:00 – 17:00'],
  ['Saturday', '8:00 – 17:00'],
  ['Sunday', '8:00 – 16:00'],
]

export default function VisitCta() {
  const { setOpen, count } = useCart()
  return (
    <section className="visit" id="visit" aria-labelledby="visit-title">
      <div className="visit-card">
        <h2 id="visit-title">Skip the queue</h2>
        <p>Order from your phone, walk in, pick it up from the shelf by the window. Ready in about five minutes.</p>
        <button className="btn btn-spark" onClick={() => setOpen(true)}>
          {count ? `Review your order (${count})` : 'Start an order'}
        </button>
      </div>
      <div className="visit-info">
        <address>
          14 Calvert Avenue
          <br />
          Bethnal Green, London E2 7JP
        </address>
        <table className="hours">
          <caption className="sr-only">Opening hours</caption>
          <tbody>
            {hours.map(([d, h]) => (
              <tr key={d}>
                <th scope="row">{d}</th>
                <td>{h}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <a className="text-link" href="https://maps.google.com/?q=14+Calvert+Avenue+London+E2+7JP" target="_blank" rel="noreferrer">
          Get directions
        </a>
      </div>
    </section>
  )
}
