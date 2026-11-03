import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'ember-row-cart'

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function reducer(items, action) {
  switch (action.type) {
    case 'add': {
      const key = action.item.key ?? action.item.id
      const existing = items.find((i) => i.key === key)
      if (existing) return items.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i))
      return [...items, { ...action.item, key, qty: 1 }]
    }
    case 'qty':
      return items
        .map((i) => (i.key === action.key ? { ...i, qty: i.qty + action.delta } : i))
        .filter((i) => i.qty > 0)
    case 'remove':
      return items.filter((i) => i.key !== action.key)
    case 'clear':
      return []
    default:
      return items
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, loadInitial)
  const [open, setOpen] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* storage unavailable — cart still works for this visit */
    }
  }, [items])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2200)
    return () => clearTimeout(t)
  }, [toast])

  const value = useMemo(() => {
    const count = items.reduce((n, i) => n + i.qty, 0)
    const subtotal = items.reduce((n, i) => n + i.qty * i.price, 0)
    return {
      items,
      count,
      subtotal,
      open,
      toast,
      setOpen,
      add: (item) => {
        dispatch({ type: 'add', item })
        setToast(`${item.name} added to your order`)
      },
      changeQty: (key, delta) => dispatch({ type: 'qty', key, delta }),
      remove: (key) => dispatch({ type: 'remove', key }),
      clear: () => dispatch({ type: 'clear' }),
    }
  }, [items, open, toast])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}

export const money = (n) => `£${n.toFixed(2)}`
