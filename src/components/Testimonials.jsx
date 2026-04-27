import { motion } from 'framer-motion'
import { useLanguage } from '../LanguageContext'

export default function Testimonials() {
  const { t } = useLanguage()

  // Estos testimonios son placeholder. El cliente deberá confirmarlos o reemplazarlos.
  const testimonials = [
    { nameKey: 'testimonial1_name', roleKey: 'testimonial1_role', textKey: 'testimonial1_text' },
    { nameKey: 'testimonial2_name', roleKey: 'testimonial2_role', textKey: 'testimonial2_text' },
    { nameKey: 'testimonial3_name', roleKey: 'testimonial3_role', textKey: 'testimonial3_text' },
  ]

  return (
    <section className="bg-brand-dark py-24 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">

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
            {t('section_testimonials_tag')}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-brand-cream max-w-2xl mx-auto">
            {t('section_testimonials_title')}
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <motion.div
              key={item.nameKey}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: i * 0.15 }}
              className="bg-brand-black border border-white/5 p-8 flex flex-col"
            >
              {/* Comillas decorativas */}
              <span className="font-serif text-6xl text-brand-gold/20 leading-none select-none">
                &ldquo;
              </span>

              {/* Texto del testimonio */}
              <p className="font-serif text-base italic text-brand-cream/80 leading-relaxed mt-2 flex-1">
                {t(item.textKey)}
              </p>

              {/* Autor */}
              <div className="mt-6 pt-6 border-t border-white/5">
                <p className="font-sans text-sm font-medium text-brand-gold">{t(item.nameKey)}</p>
                <p className="font-sans text-xs text-brand-gray-light mt-0.5">{t(item.roleKey)}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
