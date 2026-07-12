import { createContext, useContext, useState, useEffect } from 'react'
import translations from './translations'

const LanguageContext = createContext()

const SEO_BY_LANG = {
  es: {
    title: 'Traslados con Experiencia | Choferes Privados en Escobar y GBA',
    description:
      'Traslados privados con choferes habilitados y bilingües en Escobar y Gran Buenos Aires. City tours, traslados para casamientos y eventos, atención personalizada.',
  },
  en: {
    title: 'Traslados con Experiencia | Private Drivers in Escobar & Buenos Aires',
    description:
      'Private transfers with licensed, bilingual drivers in Escobar and Greater Buenos Aires. City tours, wedding and event transfers, personalized service.',
  },
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('es')

  const t = (key) => translations[lang][key] || key

  useEffect(() => {
    document.documentElement.lang = lang === 'es' ? 'es-AR' : 'en'

    const seo = SEO_BY_LANG[lang] || SEO_BY_LANG.es
    document.title = seo.title

    const descriptionTag = document.querySelector('meta[name="description"]')
    if (descriptionTag) descriptionTag.setAttribute('content', seo.description)

    const ogTitleTag = document.querySelector('meta[property="og:title"]')
    if (ogTitleTag) ogTitleTag.setAttribute('content', seo.title)

    const ogDescTag = document.querySelector('meta[property="og:description"]')
    if (ogDescTag) ogDescTag.setAttribute('content', seo.description)
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
