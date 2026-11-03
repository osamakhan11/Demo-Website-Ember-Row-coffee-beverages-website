import { useState } from 'react'
import { isEmail, submit } from '../lib/api.js'
import { photos } from '../data/photos.js'
import Photo from './Photo.jsx'

const tones = ['#7A4B2A', '#8DAE5A', '#3B1E10', '#D9A25F', '#8DAE5A', '#7A4B2A']
const posts = photos.feed.map((p, i) => ({ ...p, tone: tones[i] }))

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState({ status: 'idle', message: '' })

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!isEmail(email)) {
      setState({ status: 'error', message: 'Enter an email address like name@example.com.' })
      return
    }
    setState({ status: 'loading', message: '' })
    try {
      await submit('newsletter', { email })
      setState({ status: 'done', message: `Subscribed. The next roast note goes to ${email}.` })
      setEmail('')
    } catch (err) {
      setState({ status: 'error', message: err.message })
    }
  }

  return (
    <section className="social" aria-labelledby="news-title">
      <div className="news">
        <h2 id="news-title">The roast note</h2>
        <p>One email a fortnight: what we are roasting, new drinks, and the occasional free-filter Friday.</p>
        <form className="news-form" onSubmit={onSubmit} noValidate>
          <label htmlFor="news-email" className="sr-only">
            Email address
          </label>
          <input
            id="news-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={state.status === 'error'}
            aria-describedby="news-msg"
          />
          <button className="btn btn-solid" disabled={state.status === 'loading'}>
            {state.status === 'loading' ? 'Subscribing…' : 'Subscribe'}
          </button>
        </form>
        <p id="news-msg" className={`form-msg is-${state.status}`} role="status">
          {state.message}
        </p>
      </div>
      <div className="feed">
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="feed-handle">
          @emberrow on Instagram
        </a>
        <ul className="feed-grid">
          {posts.map((p) => (
            <li key={p.id} style={{ '--tone': p.tone }}>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <Photo photo={p} sizes="(max-width: 900px) 33vw, 15vw" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
