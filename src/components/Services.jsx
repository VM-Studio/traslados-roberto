import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaMapMarkedAlt, FaGlassCheers, FaKey } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../LanguageContext'

export default function Services() {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [openId, setOpenId] = useState(null)

  const services = [
    {
      id: 1,
      Icon: FaMapMarkedAlt,
      tag: t('service1_tag'),
      title: t('service1_title'),
      description: t('service1_desc'),
      features: [t('service1_f1'), t('service1_f2'), t('service1_f3'), t('service1_f4')],
      cta: t('service1_cta'),
    },
    {
      id: 2,
      Icon: FaGlassCheers,
      tag: t('service2_tag'),
      title: t('service2_title'),
      description: t('service2_desc'),
      features: [t('service2_f1'), t('service2_f2'), t('service2_f3'), t('service2_f4')],
      cta: t('service2_cta'),
    },
    {
      id: 3,
      Icon: FaKey,
      tag: t('service3_tag'),
      title: t('service3_title'),
      description: t('service3_desc'),
      features: [t('service3_f1'), t('service3_f2'), t('service3_f3'), t('service3_f4')],
      cta: t('service3_cta'),
    },
  ]

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id))

  return (
    <section id="servicios" className="bg-brand-dark py-24 px-4 md:px-6">
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
            {t('section_services_tag')}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-brand-cream max-w-2xl mx-auto">
            {t('section_services_title')}
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {services.map((service, i) => {
            const isOpen = openId === service.id
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: i * 0.15 }}
                className={`relative bg-brand-black border p-6 md:p-8 flex flex-col overflow-hidden transition-colors duration-300 ${
                  isOpen ? 'border-brand-gold/50' : 'border-white/5 hover:border-brand-gold/30'
                }`}
              >
                {/* Top gold line */}
                <div
                  className={`absolute top-0 left-0 w-full h-px bg-brand-gold transition-transform duration-500 origin-left ${
                    isOpen ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />

                {/* Tag */}
                <span className="font-sans text-xs tracking-widest text-brand-gold uppercase mb-4">
                  {service.tag}
                </span>

                {/* Icon */}
                <service.Icon className="text-3xl text-brand-gold/50 mb-5" />

                {/* Title */}
                <h3 className="font-serif text-xl text-brand-cream leading-snug mb-5">
                  {service.title}
                </h3>

                {/* VER MÁS / VER MENOS toggle */}
                <button
                  onClick={() => toggle(service.id)}
                  className="self-start flex items-center gap-2 font-sans text-xs tracking-widest text-brand-gold uppercase mb-0"
                >
                  {isOpen ? 'VER MENOS' : 'VER MÁS'}
                  <motion.span
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="inline-block"
                  >
                    →
                  </motion.span>
                </button>

                {/* Expandable content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 flex flex-col gap-4">
                        {/* Separator */}
                        <div className="w-8 h-px bg-brand-gold/30" />

                        {/* Description */}
                        <p className="font-sans font-light text-sm text-brand-gray-light leading-relaxed">
                          {service.description}
                        </p>

                        {/* Features */}
                        <ul className="flex flex-col gap-2 mt-1">
                          {service.features.map((feat) => (
                            <li key={feat} className="flex items-center">
                              <span className="w-1 h-1 rounded-full bg-brand-gold mr-2 shrink-0" />
                              <span className="font-sans text-xs text-brand-gray-light">{feat}</span>
                            </li>
                          ))}
                        </ul>

                        {/* CTA button → /reservar */}
                        <button
                          onClick={() => navigate('/reservar')}
                          className="mt-4 self-start border border-brand-gold text-brand-gold font-sans text-xs tracking-widest uppercase px-5 py-2.5 hover:bg-brand-gold hover:text-brand-black transition-all duration-300"
                        >
                          {service.cta}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
