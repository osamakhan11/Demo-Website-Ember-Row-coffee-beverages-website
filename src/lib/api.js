/**
 * Form + order submission.
 * Set VITE_API_URL in a .env file to post to a real backend
 * (e.g. a Vercel/Netlify function). Without it, requests are simulated
 * locally so the whole site works out of the box.
 */
const API_URL = import.meta.env.VITE_API_URL

export async function submit(endpoint, payload) {
  if (API_URL) {
    const res = await fetch(`${API_URL}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error(`The server rejected the request (${res.status}). Try again in a moment.`)
    return res.json()
  }
  await new Promise((r) => setTimeout(r, 700))
  return { ok: true, reference: `ER-${Math.random().toString(36).slice(2, 7).toUpperCase()}` }
}

export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
export const isPhone = (v) => /^[+\d][\d\s()-]{7,}$/.test(v.trim())
