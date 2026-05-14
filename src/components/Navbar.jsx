import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../LanguageContext'
import LanguageSelector from './LanguageSelector'

export default function Navbar() {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { labelKey: 'nav_services', href: '#servicios' },
    { labelKey: 'nav_why',      href: '#por-que' },
    { labelKey: 'nav_fleet',    href: '#flota' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = (href) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-500 ${
          scrolled
            ? 'bg-white shadow-lg border-b border-brand-gold/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">

          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="flex flex-col items-center cursor-pointer"
          >
            <span className="font-serif text-brand-gold tracking-widest text-lg leading-none">
              TRASLADOS
            </span>
            <span className="font-sans font-light text-brand-text tracking-widest text-xs leading-none mt-0.5 italic">
              con experiencia
            </span>
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleLinkClick(link.href) }}
                className="font-sans text-sm font-light text-brand-text-soft hover:text-brand-gold tracking-widest uppercase transition-colors duration-300"
              >
                {t(link.labelKey)}
              </a>
            ))}
          </nav>

          {/* CTA + language selector + hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setMenuOpen(false); handleLinkClick('#contacto') }}
              className="hidden md:inline-block bg-brand-gold text-brand-black text-xs tracking-widest uppercase px-5 py-2 hover:bg-brand-gold-light transition-all duration-300"
            >
              {t('nav_cta')}
            </button>

            {/* Separador + Language selector (desktop) */}
            <div className="hidden md:flex items-center gap-3">
              <div className="w-px h-4 bg-white/20" />
              <LanguageSelector />
            </div>

            {/* Hamburger button */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 relative"
              aria-label="Abrir menú"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="block w-6 h-px bg-brand-gold origin-center"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                className="block w-6 h-px bg-brand-gold origin-center"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="block w-6 h-px bg-brand-gold origin-center"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-10 md:hidden"
          >
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleLinkClick(link.href) }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="font-serif text-2xl text-brand-text hover:text-brand-gold transition-colors duration-300 cursor-pointer"
              >
                {t(link.labelKey)}
              </motion.a>
            ))}

            <motion.button
              onClick={() => { setMenuOpen(false); handleLinkClick('#contacto') }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: links.length * 0.08 }}
              className="mt-4 border border-brand-gold text-brand-gold text-xs tracking-widest uppercase px-8 py-3 hover:bg-brand-gold hover:text-brand-black transition-all duration-300"
            >
              {t('nav_cta')}
            </motion.button>

            {/* Language selector en mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: (links.length + 1) * 0.08 }}
            >
              <LanguageSelector />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
