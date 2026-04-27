import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronDown } from 'react-icons/fa'
import { useLanguage } from '../LanguageContext'

const languages = [
  { code: 'es', label: 'ESP', flag: '🇪🇸' },
  { code: 'en', label: 'ENG', flag: '🇺🇸' },
]

export default function LanguageSelector() {
  const { lang, setLang } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const active = languages.find((l) => l.code === lang)

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <div
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 cursor-pointer select-none"
      >
        <span className="text-lg leading-none">{active.flag}</span>
        <span className="font-sans text-xs font-medium tracking-widest text-brand-cream uppercase">
          {active.label}
        </span>
        <FaChevronDown
          className={`text-brand-gold text-xs transition-transform duration-200 ${open ? 'rotate-180' : 'rotate-0'}`}
        />
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="lang-dropdown"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-2 bg-brand-dark border border-white/10 shadow-xl min-w-[120px] z-50"
          >
            {languages.map((language, i) => {
              const isActive = lang === language.code
              return (
                <div
                  key={language.code}
                  onClick={() => { setLang(language.code); setOpen(false) }}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors duration-150 ${
                    i < languages.length - 1 ? 'border-b border-white/5' : ''
                  } ${!isActive ? 'hover:bg-white/5' : ''}`}
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />
                  )}
                  <span className="text-lg leading-none">{language.flag}</span>
                  <span
                    className={`font-sans text-xs tracking-widest uppercase ${
                      isActive ? 'text-brand-gold font-medium' : 'text-brand-gray-light'
                    }`}
                  >
                    {language.label}
                  </span>
                </div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
