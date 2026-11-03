import { CartProvider } from './context/CartContext.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Story from './components/Story.jsx'
import Menu from './components/Menu.jsx'
import BrewGuide from './components/BrewGuide.jsx'
import Roaster from './components/Roaster.jsx'
import VisitCta from './components/VisitCta.jsx'
import Newsletter from './components/Newsletter.jsx'
import Footer from './components/Footer.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import Toast from './components/Toast.jsx'

export default function App() {
  return (
    <CartProvider>
      <Header />
      <main id="main">
        <Hero />
        <Story />
        <Menu />
        <BrewGuide />
        <Roaster />
        <VisitCta />
        <Newsletter />
      </main>
      <Footer />
      <CartDrawer />
      <Toast />
    </CartProvider>
  )
}
