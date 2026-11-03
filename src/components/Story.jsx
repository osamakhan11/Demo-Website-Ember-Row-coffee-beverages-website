import { useReveal } from '../hooks/useReveal.js'
import { photos } from '../data/photos.js'
import Photo from './Photo.jsx'

export default function Story() {
  const [ref, visible] = useReveal()
  return (
    <section className={`story ${visible ? 'is-visible' : ''}`} id="story" ref={ref}>
      <div className="story-quote">
        <p>
          We opened in 2019 with one lever machine and a rule: nobody waits longer than a song for their coffee, and
          nothing gets rushed to make that happen.
        </p>
        <figure className="story-photos">
          <div className="story-photo story-photo-main">
            <Photo photo={photos.cafe} sizes="(max-width: 900px) 100vw, 40vw" />
          </div>
          <div className="story-photo story-photo-inset">
            <Photo photo={photos.barista} sizes="(max-width: 900px) 50vw, 20vw" />
          </div>
        </figure>
      </div>
      <div className="story-body">
        <h2>A corner shop that roasts its own</h2>
        <p>
          Ember Row started as a hatch on Calvert Avenue. Today we roast twice a week in a railway arch in Hackney, buy
          green coffee from four farms we have visited, and whisk every matcha to order.
        </p>
        <p>
          Milk comes from a single dairy in Somerset. Oat milk is barista-grade and free of charge. Cups are
          compostable, and if you bring your own, the filter is on us.
        </p>
        <dl className="story-facts">
          <div>
            <dt>Farms we buy from</dt>
            <dd>4</dd>
          </div>
          <div>
            <dt>Roast days a week</dt>
            <dd>2</dd>
          </div>
          <div>
            <dt>Charge for oat milk</dt>
            <dd>£0</dd>
          </div>
        </dl>
      </div>
      <div className="story-texture" aria-hidden="true" />
    </section>
  )
}
