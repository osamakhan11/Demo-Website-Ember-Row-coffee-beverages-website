import { useEffect, useMemo, useRef, useState } from 'react'
import { money, useCart } from '../context/CartContext.jsx'
import { isPhone, submit } from '../lib/api.js'

function pickupSlots() {
  const slots = []
  const now = new Date()
  const start = new Date(now.getTime() + 10 * 60000)
  start.setMinutes(Math.ceil(start.getMinutes() / 5) * 5, 0, 0)
  for (let i = 0; i < 12; i++) {
    const t = new Date(start.getTime() + i * 5 * 60000)
    if (t.getHours() >= 17) break
    slots.push(t.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }))
  }
  return slots
}

export default function CartDrawer() {
  const { items, subtotal, open, setOpen, changeQty, remove, clear } = useCart()
  const [step, setStep] = useState('cart')
  const [form, setForm] = useState({ name: '', phone: '', slot: '', milk: 'Whole' })
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [confirmation, setConfirmation] = useState(null)
  const panel = useRef(null)
  const slots = useMemo(() => (open ? pickupSlots() : []), [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    panel.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, setOpen])

  useEffect(() => {
    if (open && step === 'done' && items.length) setStep('cart')
  }, [open])

  const validate = () => {
    const e = {}
    if (form.name.trim().length < 2) e.name = 'Add the name we should call out.'
    if (!isPhone(form.phone)) e.phone = 'Add a phone number so we can text you when it is ready.'
    if (!form.slot) e.slot = 'Choose a pickup time.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const placeOrder = async (ev) => {
    ev.preventDefault()
    if (!validate()) return
    setSending(true)
    try {
      const res = await submit('orders', { ...form, items, subtotal })
      setConfirmation({ ref: res.reference, slot: form.slot, name: form.name })
      clear()
      setStep('done')
    } catch (err) {
      setErrors({ form: err.message })
    } finally {
      setSending(false)
    }
  }

  const field = (key) => ({
    id: `co-${key}`,
    value: form[key],
    onChange: (e) => setForm((f) => ({ ...f, [key]: e.target.value })),
    'aria-invalid': Boolean(errors[key]),
    'aria-describedby': errors[key] ? `co-${key}-err` : undefined,
  })

  return (
    <div className={`drawer-root ${open ? 'is-open' : ''}`} aria-hidden={!open} inert={!open}>
      <div className="drawer-scrim" onClick={() => setOpen(false)} />
      <aside className="drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title" tabIndex={-1} ref={panel}>
        <div className="drawer-head">
          <h2 id="drawer-title">{step === 'done' ? 'Order placed' : step === 'details' ? 'Pickup details' : 'Your order'}</h2>
          <button className="icon-btn" onClick={() => setOpen(false)} aria-label="Close order">
            ×
          </button>
        </div>

        {step === 'cart' && (
          <>
            {items.length === 0 ? (
              <div className="drawer-empty">
                <p>Nothing here yet. Pick a drink from the menu and it will appear in this list.</p>
                <a className="btn btn-line" href="#menu" onClick={() => setOpen(false)}>
                  Browse the menu
                </a>
              </div>
            ) : (
              <>
                <ul className="line-items">
                  {items.map((i) => (
                    <li key={i.key}>
                      <span className="li-swatch" style={{ background: i.liquid }} aria-hidden="true" />
                      <div className="li-main">
                        <strong>{i.name}</strong>
                        <span>{money(i.price * i.qty)}</span>
                      </div>
                      <div className="qty" aria-label={`Quantity of ${i.name}`}>
                        <button onClick={() => changeQty(i.key, -1)} aria-label={`One fewer ${i.name}`}>−</button>
                        <span aria-live="polite">{i.qty}</span>
                        <button onClick={() => changeQty(i.key, 1)} aria-label={`One more ${i.name}`}>+</button>
                      </div>
                      <button className="li-remove" onClick={() => remove(i.key)} aria-label={`Remove ${i.name}`}>
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="drawer-foot">
                  <div className="total">
                    <span>Subtotal</span>
                    <strong>{money(subtotal)}</strong>
                  </div>
                  <button className="btn btn-solid btn-block" onClick={() => setStep('details')}>
                    Continue to pickup
                  </button>
                </div>
              </>
            )}
          </>
        )}

        {step === 'details' && (
          <form className="checkout" onSubmit={placeOrder} noValidate>
            <label htmlFor="co-name">Name for the cup</label>
            <input {...field('name')} autoComplete="given-name" />
            {errors.name && <p className="field-err" id="co-name-err">{errors.name}</p>}

            <label htmlFor="co-phone">Mobile number</label>
            <input {...field('phone')} type="tel" autoComplete="tel" placeholder="07700 900123" />
            {errors.phone && <p className="field-err" id="co-phone-err">{errors.phone}</p>}

            <label htmlFor="co-slot">Pickup time</label>
            <select {...field('slot')}>
              <option value="">Choose a time</option>
              {slots.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            {slots.length === 0 && <p className="field-hint">We are closed for today. Ordering opens again at 7:00.</p>}
            {errors.slot && <p className="field-err" id="co-slot-err">{errors.slot}</p>}

            <fieldset className="milk">
              <legend>Milk</legend>
              {['Whole', 'Oat', 'Skimmed', 'None'].map((m) => (
                <label key={m}>
                  <input type="radio" name="milk" value={m} checked={form.milk === m} onChange={() => setForm((f) => ({ ...f, milk: m }))} />
                  {m}
                </label>
              ))}
            </fieldset>

            {errors.form && <p className="field-err">{errors.form}</p>}
            <div className="drawer-foot">
              <div className="total">
                <span>Pay in store</span>
                <strong>{money(subtotal)}</strong>
              </div>
              <button className="btn btn-solid btn-block" disabled={sending}>
                {sending ? 'Placing order…' : 'Place order'}
              </button>
              <button type="button" className="text-link" onClick={() => setStep('cart')}>
                Back to your order
              </button>
            </div>
          </form>
        )}

        {step === 'done' && confirmation && (
          <div className="drawer-done">
            <p className="done-ref">{confirmation.ref}</p>
            <p>
              Thanks, {confirmation.name}. Your order will be on the window shelf at {confirmation.slot}. We will text you
              when it is ready.
            </p>
            <button className="btn btn-line" onClick={() => { setStep('cart'); setOpen(false) }}>
              Close
            </button>
          </div>
        )}
      </aside>
    </div>
  )
}
