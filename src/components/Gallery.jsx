import { motion } from 'framer-motion'
import { useLanguage } from '../LanguageContext'

// ─── DATOS DE LOS CHOFERES ───────────────────────────────────────────────────
// Reemplazar `photo` con la ruta real cuando el cliente provea las imágenes.
// Ejemplo: photo: '/choferes/roberto.jpg'
const drivers = [
  {
    id: 1,
    photo: '',           // ← agregar ruta de imagen
    initials: 'R.G.',
    nameKey: 'driver1_name',
    roleKey: 'driver1_role',
    descKey: 'driver1_desc',
  },
  {
    id: 2,
    photo: '',           // ← agregar ruta de imagen
    initials: 'M.L.',
    nameKey: 'driver2_name',
    roleKey: 'driver2_role',
    descKey: 'driver2_desc',
  },
  {
    id: 3,
    photo: '',           // ← agregar ruta de imagen
    initials: 'C.R.',
    nameKey: 'driver3_name',
    roleKey: 'driver3_role',
    descKey: 'driver3_desc',
  },
]

export default function Gallery() {
  const { t } = useLanguage()

  return (
    <section id="flota" className="bg-brand-surface py-24 px-4 md:px-6">
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
          <h2 className="font-serif text-4xl md:text-5xl text-brand-text max-w-2xl mx-auto">
            {t('section_fleet_title')}
          </h2>
        </motion.div>

        {/* Grid de choferes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {drivers.map((driver, i) => (
            <motion.div
              key={driver.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: i * 0.15 }}
              className="flex flex-col"
            >
              {/* Foto / Placeholder */}
              <div className="relative w-full aspect-square bg-white border border-brand-gold/20 overflow-hidden">
                {driver.photo ? (
                  <img
                    src={driver.photo}
                    alt={t(driver.nameKey)}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  /* Placeholder elegante hasta que lleguen las fotos */
                  <div className="w-full h-full bg-gradient-to-b from-brand-surface-alt to-brand-surface flex flex-col items-center justify-center gap-3">
                    <span className="font-serif text-4xl text-brand-gold/40 select-none">
                      {driver.initials}
                    </span>
                    <div className="w-8 h-px bg-brand-gold/20" />
                    <span className="font-sans text-xs tracking-widest text-brand-text-soft/40 uppercase">
                      foto próximamente
                    </span>
                  </div>
                )}
                {/* Línea dorada inferior decorativa */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-brand-gold/30" />
              </div>

              {/* Info */}
              <div className="pt-5 pb-2">
                <p className="font-sans text-xs tracking-widest text-brand-gold uppercase mb-1">
                  {t(driver.roleKey)}
                </p>
                <h3 className="font-serif text-xl text-brand-text leading-snug">
                  {t(driver.nameKey)}
                </h3>
                <p className="font-sans font-light text-sm text-brand-text-soft leading-relaxed mt-2">
                  {t(driver.descKey)}
                </p>
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
          className="text-center mt-16"
        >
          <p className="font-sans font-light text-sm text-brand-text-soft max-w-lg mx-auto mb-6">
            {t('fleet_cta_text')}
          </p>
          <button
            onClick={() => { const el = document.querySelector('#contacto'); if (el) el.scrollIntoView({ behavior: 'smooth' }) }}
            className="bg-brand-gold text-brand-black font-sans text-xs tracking-widest uppercase px-8 py-3 hover:bg-brand-gold-light transition-all duration-300"
          >
            {t('fleet_cta_btn')}
          </button>
        </motion.div>

      </div>
    </section>
  )
}

