import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import CarDivider from './components/CarDivider'
import WhyUs from './components/WhyUs'
import Stats from './components/Stats'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import ReservarPage from './pages/ReservarPage'

function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <CarDivider />
        <WhyUs />
        <Stats />
        <Gallery />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
      <WhatsAppButton />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/reservar" element={<ReservarPage />} />
    </Routes>
  )
}
