import { useCart } from '../context/CartContext.jsx'

export default function Toast() {
  const { toast, setOpen } = useCart()
  return (
    <div className={`toast ${toast ? 'is-visible' : ''}`} role="status" aria-live="polite">
      {toast && (
        <>
          <span>{toast}</span>
          <button onClick={() => setOpen(true)}>View order</button>
        </>
      )}
    </div>
  )
}
