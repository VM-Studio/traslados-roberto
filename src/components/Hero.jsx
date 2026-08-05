import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../LanguageContext'

// Imagen vertical/cuadrada para celular y panorámica para tablet/desktop
const BG_IMAGE_MOBILE = '/herocelular1.png'
const BG_IMAGE_DESKTOP = '/hero.png'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: 'easeOut', delay },
})

export default function Hero() {
  const { t } = useLanguage()
  const [currentTitle, setCurrentTitle] = useState(0)

  const heroTitles = [
    { line1: t('hero_title_1'), line2: t('hero_title_2') },
    { line1: t('hero_title_3'), line2: t('hero_title_4') },
    { line1: t('hero_title_5'), line2: t('hero_title_6') },
    { line1: t('hero_title_7'), line2: t('hero_title_8') },
    { line1: t('hero_title_9'), line2: t('hero_title_10') },
  ]

  // Mismo tamaño de tipografía para todos los títulos en sm/desktop.
  // Solo en mobile, los primeros dos títulos (los más cortos) se ven un
  // poco más grandes que el resto para aprovechar mejor el espacio.
  const titleSizeClass = (index) =>
    index < 2
      ? 'text-4xl sm:text-4xl md:text-6xl'
      : 'text-3xl sm:text-4xl md:text-6xl'

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % heroTitles.length)
    }, 5500)
    return () => clearInterval(interval)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const scrollTo = (id) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="inicio"
      className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background image — herocelular1.png en mobile, hero.png desde tablet/desktop */}
      <div
        className="absolute inset-0 z-0 bg-center bg-no-repeat bg-cover sm:hidden"
        style={{ backgroundImage: `url(${BG_IMAGE_MOBILE})` }}
      />
      <div
        className="absolute inset-0 z-0 bg-center bg-no-repeat bg-cover hidden sm:block"
        style={{ backgroundImage: `url(${BG_IMAGE_DESKTOP})` }}
      />

      {/* Semi-transparent overlay so text stays readable */}
      <div className="absolute inset-0 z-10 bg-black/60 pointer-events-none" />

      {/* Overlay gradient — quitado para fondo claro */}

      {/* Content */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-6 text-center pt-20 flex flex-col items-center justify-center flex-1">

        {/* Título principal — rotación animada */}
        <motion.div {...fadeUp(0.4)} className="w-full px-2 leading-tight min-h-[120px] sm:min-h-[160px] md:min-h-[200px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
            >
              <h1 className="w-full text-center text-balance">
                <span className={`block font-serif ${titleSizeClass(currentTitle)} font-normal text-white italic`}>
                  {heroTitles[currentTitle].line1}
                </span>
                <span className={`block font-serif ${titleSizeClass(currentTitle)} font-semibold text-brand-gold`}>
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
                  i === currentTitle ? 'w-8 bg-brand-gold' : 'w-3 bg-white/30'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Bajada */}
        <motion.p
          {...fadeUp(0.6)}
          className="font-sans font-light text-xs sm:text-lg text-white max-w-2xl mx-auto mt-6"
        >
          {t('hero_subtitle')}
        </motion.p>

        {/* Botones */}
        <motion.div
          {...fadeUp(0.8)}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
        >
          <button
            onClick={() => scrollTo('#contacto')}
            className="bg-brand-gold text-brand-black font-sans text-sm font-medium tracking-widest uppercase px-8 py-4 hover:bg-brand-gold/90 transition-all duration-300 w-full sm:w-auto"
          >
            {t('hero_cta_primary')}
          </button>
          <button
            onClick={() => scrollTo('#servicios')}
            className="border border-white/30 text-white font-sans text-sm font-light tracking-widest uppercase px-8 py-4 hover:border-brand-gold hover:text-brand-gold transition-all duration-300 w-full sm:w-auto"
          >
            {t('hero_cta_secondary')}
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-20 flex flex-col items-center gap-2 pb-10">
        <span className="font-sans text-xs tracking-widest text-white uppercase">scroll</span>
        <div className="w-px h-10 bg-white/20 relative overflow-hidden">
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
