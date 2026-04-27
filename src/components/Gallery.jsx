import { motion } from 'framer-motion'
import { useLanguage } from '../LanguageContext'

const scrollTo = (id) => {
  const el = document.querySelector(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Gallery() {
  const { t } = useLanguage()

  const vehicles = [
    { labelKey: 'fleet1_label', descKey: 'fleet1_desc' },
    { labelKey: 'fleet2_label', descKey: 'fleet2_desc' },
    { labelKey: 'fleet3_label', descKey: 'fleet3_desc' },
  ]

  return (
    <section id="flota" className="bg-brand-black py-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <div className="w-12 h-px bg-brand-gold mx-auto mb-4" />
          <p className="font-sans text-xs tracking-widest2 text-brand-gold uppercase mb-3">
            {t('section_fleet_tag')}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-brand-cream max-w-2xl mx-auto">
            {t('section_fleet_title')}
          </h2>
        </motion.div>

        {/* Grid de vehículos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {vehicles.map((vehicle, i) => (
            <motion.div
              key={vehicle.labelKey}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: i * 0.15 }}
              className="aspect-video bg-brand-dark border border-white/5 relative overflow-hidden group"
            >
              {/* Placeholder — Reemplazar con <img> cuando el cliente provea fotos */}
              <div className="w-full h-full bg-gradient-to-br from-brand-dark to-brand-black flex items-center justify-center">
                <div className="w-12 h-px bg-brand-gold/20" />
              </div>

              {/* Overlay hover */}
              <div className="absolute inset-0 bg-brand-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center px-6 text-center">
                <span className="font-sans text-xs tracking-widest text-brand-gold uppercase">
                  {t(vehicle.labelKey)}
                </span>
                <span className="font-serif text-sm text-brand-cream mt-1 leading-snug">
                  {t(vehicle.descKey)}
                </span>
              </div>

              {/* Label visible siempre en mobile */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-brand-black/90 to-transparent md:hidden">
                <span className="font-sans text-xs tracking-widest text-brand-gold uppercase block">
                  {t(vehicle.labelKey)}
                </span>
                <span className="font-serif text-xs text-brand-cream/80 mt-0.5 block">
                  {t(vehicle.descKey)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA inferior */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
          className="text-center mt-14"
        >
          <p className="font-sans font-light text-sm text-brand-gray-light max-w-lg mx-auto mb-6">
            {t('fleet_cta_text')}
          </p>
          <button
            onClick={() => scrollTo('#contacto')}
            className="border border-brand-gold text-brand-gold font-sans text-xs tracking-widest uppercase px-8 py-3 hover:bg-brand-gold hover:text-brand-black transition-all duration-300"
          >
            {t('fleet_cta_btn')}
          </button>
        </motion.div>

      </div>
    </section>
  )
}
