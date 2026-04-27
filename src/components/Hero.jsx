import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../LanguageContext'

const BG_IMAGE = '' // Reemplazá con la URL de tu imagen de fondo

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: 'easeOut', delay },
})

export default function Hero() {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [currentTitle, setCurrentTitle] = useState(0)

  const heroTitles = [
    { line1: t('hero_title_1'), line2: t('hero_title_2') },
    { line1: t('hero_title_3'), line2: t('hero_title_4') },
    { line1: t('hero_title_5'), line2: t('hero_title_6') },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % heroTitles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const scrollTo = (id) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <motion.div
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="absolute inset-0 z-0"
        style={
          BG_IMAGE
            ? { backgroundImage: `url(${BG_IMAGE})`, backgroundSize: 'cover', backgroundPosition: 'center' }
            : {}
        }
      >
        {!BG_IMAGE && <div className="w-full h-full bg-zinc-900" />}
      </motion.div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-brand-black/90 via-brand-black/60 to-transparent" />

      {/* Content */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-6 text-center pt-20 flex flex-col items-center justify-center flex-1">

        {/* Supertítulo */}
        <motion.p
          {...fadeUp(0.2)}
          className="font-sans text-xs font-light tracking-widest2 text-brand-gold uppercase mb-6"
        >
          {t('hero_tag')}
        </motion.p>

        {/* Título principal — rotación animada */}
        <motion.div {...fadeUp(0.4)} className="leading-tight min-h-[120px] sm:min-h-[160px] md:min-h-[200px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              <h1 className="text-center">
                <span className="block font-serif text-3xl sm:text-5xl md:text-7xl font-normal text-brand-cream italic">
                  {heroTitles[currentTitle].line1}
                </span>
                <span className="block font-serif text-3xl sm:text-5xl md:text-7xl font-semibold text-brand-gold">
                  {heroTitles[currentTitle].line2}
                </span>
              </h1>
            </motion.div>
          </AnimatePresence>

          {/* Indicadores */}
          <div className="flex gap-2 justify-center mt-6">
            {heroTitles.map((_, i) => (
              <div
                key={i}
                className={`h-px transition-all duration-500 ${
                  i === currentTitle ? 'w-8 bg-brand-gold' : 'w-3 bg-white/20'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Bajada */}
        <motion.p
          {...fadeUp(0.6)}
          className="font-sans font-light text-sm sm:text-lg text-brand-gray-light max-w-2xl mx-auto mt-6"
        >
          {t('hero_subtitle')}
        </motion.p>

        {/* Botones */}
        <motion.div
          {...fadeUp(0.8)}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
        >
          <button
            onClick={() => navigate('/reservar')}
            className="bg-brand-gold text-brand-black font-sans text-sm font-medium tracking-widest uppercase px-8 py-4 hover:bg-brand-gold/90 transition-all duration-300 w-full sm:w-auto"
          >
            {t('hero_cta_primary')}
          </button>
          <button
            onClick={() => scrollTo('#servicios')}
            className="border border-brand-cream/30 text-brand-cream font-sans text-sm font-light tracking-widest uppercase px-8 py-4 hover:border-brand-gold hover:text-brand-gold transition-all duration-300 w-full sm:w-auto"
          >
            {t('hero_cta_secondary')}
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-20 flex flex-col items-center gap-2 pb-10">
        <span className="font-sans text-xs tracking-widest text-brand-gray uppercase">scroll</span>
        <div className="w-px h-10 bg-brand-gray/30 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-brand-gold"
            animate={{ y: [0, 20] }}
            transition={{ duration: 1.2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          />
        </div>
      </div>
    </section>
  )
}
