import { FaWhatsapp } from 'react-icons/fa'
import { useLanguage } from '../LanguageContext'

const scrollTo = (id) => {
  const el = document.querySelector(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Footer() {
  const { t } = useLanguage()

  const serviceLinks = [
    { labelKey: 'footer_link1', href: '#servicios' },
    { labelKey: 'footer_link2', href: '#servicios' },
    { labelKey: 'footer_link3', href: '#servicios' },
  ]

  return (
    <footer className="bg-brand-dark border-t border-white/5 py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Col 1 — Logo + tagline */}
          <div>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              className="flex items-center cursor-pointer"
            >
              <img
                src="/footer.png"
                alt="Traslados con Experiencia - Choferes privados en Escobar y GBA"
                width="200"
                height="133"
                className="h-28 sm:h-32 w-auto object-contain"
                loading="lazy"
              />
            </a>
            <p className="font-sans text-xs text-brand-gray-light leading-relaxed mt-4 max-w-xs">
              {t('footer_tagline')}
            </p>
          </div>

          {/* Col 2 — Servicios */}
          <div>
            <p className="font-sans text-xs tracking-widest text-brand-gold uppercase mb-4">
              {t('footer_services_title')}
            </p>
            <ul className="flex flex-col gap-3">
              {serviceLinks.map((link) => (
                <li key={link.labelKey}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                    className="font-sans text-sm text-brand-gray-light hover:text-brand-cream transition-colors duration-300"
                  >
                    {t(link.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contacto */}
          <div>
            <p className="font-sans text-xs tracking-widest text-brand-gold uppercase mb-4">
              {t('footer_follow')}
            </p>
            <a
              href="https://wa.me/5491171334444"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-sans text-sm text-brand-gray-light hover:text-brand-gold transition-colors duration-300"
            >
              <FaWhatsapp className="text-base text-green-500" />
              +54 9 11 7133-4444
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="font-sans text-xs text-brand-gray">
            {t('footer_rights')}
          </p>
          <p className="font-sans text-xs text-brand-gray">
            {t('footer_design')}
          </p>
        </div>

      </div>
    </footer>
  )
}
