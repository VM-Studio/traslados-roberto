import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa'
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
              className="flex flex-col items-start cursor-pointer"
            >
              <span className="font-serif text-brand-gold tracking-widest2 text-xl leading-none">
                ELITE
              </span>
              <span className="font-sans font-light text-brand-cream tracking-widest text-xs leading-none mt-0.5">
                TRANSFERS
              </span>
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

          {/* Col 3 — Redes + contacto */}
          <div>
            <p className="font-sans text-xs tracking-widest text-brand-gold uppercase mb-4">
              {t('footer_follow')}
            </p>
            <div className="flex items-center gap-4 mb-6">
              <a href="#" aria-label="Instagram" className="text-brand-gray-light hover:text-brand-gold transition-colors duration-300">
                <FaInstagram className="text-xl" />
              </a>
              <a href="#" aria-label="Facebook" className="text-brand-gray-light hover:text-brand-gold transition-colors duration-300">
                <FaFacebook className="text-xl" />
              </a>
            </div>
            <a
              href="https://wa.me/54NUMEROCLIENTE"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-sans text-sm text-brand-gray-light hover:text-brand-gold transition-colors duration-300"
            >
              <FaWhatsapp className="text-base text-green-500" />
              +54 [NÚMERO DEL CLIENTE]
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
