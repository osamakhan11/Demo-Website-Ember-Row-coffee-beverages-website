# Ember Row — coffee & beverages website

React 19 + Vite site for a coffee and matcha shop, with a draggable 3D cup (Three.js via React Three Fiber).

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the build locally
```

Needs Node 18+.

## What's on the page

| Section | Features |
| --- | --- |
| Hero | 3D cup you can drag and spin; switch espresso / flat white / matcha / iced matcha and the cup spins and refills; rising steam; GSAP letter-by-letter headline |
| Story | Asymmetric layout, reveals on scroll (IntersectionObserver) |
| Menu | Filterable masonry grid, grayscale → colour on hover, quick add to order |
| Brew guide | Pour-over and matcha step carousel + live calculator sliders (dose, ratio, temperature → water and time) |
| Roastery | Floating 3D coffee beans you can drag around |
| Visit / order CTA | Address, hours, sparkle button that opens the order |
| Newsletter + feed | Email validation, success/error states |
| Order drawer | Cart with quantities (saved in localStorage), pickup time slots, milk choice, validation, order confirmation |

## Project layout

```
src/
  components/   Header, Hero, Story, Menu, BrewGuide, Roaster, VisitCta, Newsletter, Footer, CartDrawer, Toast
  three/        CupScene.jsx (hero cup), BeansScene.jsx (roastery)
  context/      CartContext.jsx (cart state + localStorage)
  data/menu.js  drinks, prices, colours (edit this to change the menu)
  hooks/        useReveal, useReducedMotion
  lib/api.js    form/order submission
  styles/       variables.css (palette, type scale), globals.css
```

## Connecting a backend

Forms and orders work out of the box with a simulated response. To send them to a real API, create `.env`:

```
VITE_API_URL=https://your-api.example.com
```

`lib/api.js` will then POST JSON to `/orders` and `/newsletter`.

## Deploy

Vercel or Netlify: build command `npm run build`, output folder `dist`. `public/_redirects` is included for Netlify.

## Accessibility & performance

- 3D scenes are lazy-loaded and split into their own chunk.
- `prefers-reduced-motion` turns off auto-animation, steam and the headline intro.
- Skip link, visible focus styles, labelled controls, Escape closes the drawer.

## Photos

All photos are from [Unsplash](https://unsplash.com) and free to use under the [Unsplash License](https://unsplash.com/license). They are loaded straight from Unsplash, so the site needs an internet connection to show them; if a photo can't load, the illustrated version shows instead.

To change a photo, edit `src/data/photos.js`: open any photo on unsplash.com, copy the `photo-…` part of its image address into `id`.

| Used for | Photographer | Image |
| --- | --- | --- |
| espresso | Nenad Kaevik | [photo-1762265687611-a6cd23ca8fcf](https://images.unsplash.com/photo-1762265687611-a6cd23ca8fcf) |
| flat-white | Nathan Dumlao | [photo-1512568400610-62da28bc8a13](https://images.unsplash.com/photo-1512568400610-62da28bc8a13) |
| cortado | Hrant Khachatryan | [photo-1497636577773-f1231844b336](https://images.unsplash.com/photo-1497636577773-f1231844b336) |
| filter | Victoria Shes | [photo-1552833755-fdb50eeb8cf1](https://images.unsplash.com/photo-1552833755-fdb50eeb8cf1) |
| ceremonial | Jason Leung | [photo-1515823064-d6e0c04616a7](https://images.unsplash.com/photo-1515823064-d6e0c04616a7) |
| matcha-latte | Liana S | [photo-1766426910014-63a302fa137e](https://images.unsplash.com/photo-1766426910014-63a302fa137e) |
| hojicha | Jeremy Yap | [photo-1485808191679-5f86510681a2](https://images.unsplash.com/photo-1485808191679-5f86510681a2) |
| chai | Armin Lotfi | [photo-1563311977-d285756282dc](https://images.unsplash.com/photo-1563311977-d285756282dc) |
| cold-brew | Nathan Dumlao | [photo-1517701550927-30cf4ba1dba5](https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5) |
| iced-matcha | Olena Bohovyk | [photo-1717603545758-88cc454db69b](https://images.unsplash.com/photo-1717603545758-88cc454db69b) |
| espresso-tonic | Eiliv Aceron | [photo-1527156231393-7023794f363c](https://images.unsplash.com/photo-1527156231393-7023794f363c) |
| cascara | Jennifer Pallian | [photo-1499638673689-79a0b5115d87](https://images.unsplash.com/photo-1499638673689-79a0b5115d87) |
| cafe | Clifford | [photo-1511081692775-05d0f180a065](https://images.unsplash.com/photo-1511081692775-05d0f180a065) |
| barista | Fahmi Fakhrudin | [photo-1541167760496-1628856ab772](https://images.unsplash.com/photo-1541167760496-1628856ab772) |
| portafilter | Mohamed Shaffaf | [photo-1616388761741-a5936c6f61f6](https://images.unsplash.com/photo-1616388761741-a5936c6f61f6) |
| feed 1 | Nathan Dumlao | [photo-1529892485617-25f63cd7b1e9](https://images.unsplash.com/photo-1529892485617-25f63cd7b1e9) |
| feed 2 | Payoon Gerinto | [photo-1589698272390-0501a07619bb](https://images.unsplash.com/photo-1589698272390-0501a07619bb) |
| feed 3 | Mohamed Shaffaf | [photo-1616388761741-a5936c6f61f6](https://images.unsplash.com/photo-1616388761741-a5936c6f61f6) |
| feed 4 | tabitha turner | [photo-1592663527359-cf6642f54cff](https://images.unsplash.com/photo-1592663527359-cf6642f54cff) |
| feed 5 | sentidos humanos | [photo-1624893578106-a98840591afc](https://images.unsplash.com/photo-1624893578106-a98840591afc) |
| feed 6 | Phil Desforges | [photo-1559001724-fbad036dbc9e](https://images.unsplash.com/photo-1559001724-fbad036dbc9e) |
