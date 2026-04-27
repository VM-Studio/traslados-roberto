import { Fragment } from 'react'
import { motion } from 'framer-motion'
import {
  FaUserTie,
  FaLanguage,
  FaShieldAlt,
  FaStar,
  FaClock,
  FaMapMarkedAlt,
} from 'react-icons/fa'
import { useLanguage } from '../LanguageContext'

export default function WhyUs() {
  const { t } = useLanguage()

  const reasons = [
    { icon: FaUserTie,      titleKey: 'why1_title', descKey: 'why1_desc' },
    { icon: FaLanguage,     titleKey: 'why2_title', descKey: 'why2_desc' },
    { icon: FaShieldAlt,    titleKey: 'why3_title', descKey: 'why3_desc' },
    { icon: FaStar,         titleKey: 'why4_title', descKey: 'why4_desc' },
    { icon: FaClock,        titleKey: 'why5_title', descKey: 'why5_desc' },
    { icon: FaMapMarkedAlt, titleKey: 'why6_title', descKey: 'why6_desc' },
  ]

  const steps = [
    { number: '01', titleKey: 'step1_title', descKey: 'step1_desc' },
    { number: '02', titleKey: 'step2_title', descKey: 'step2_desc' },
    { number: '03', titleKey: 'step3_title', descKey: 'step3_desc' },
  ]

  return (
    <>
      {/* ── SECCIÓN 1: POR QUÉ ELEGIRNOS ── */}
      <section id="por-que" className="bg-brand-black py-24 px-4 md:px-6">
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
              {t('section_why_tag')}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-cream max-w-2xl mx-auto">
              {t('section_why_title')}
            </h2>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reasons.map((reason, i) => {
              const Icon = reason.icon
              return (
                <motion.div
                  key={reason.titleKey}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.1 }}
                  className="p-6"
                >
                  <Icon className="text-2xl text-brand-gold mb-4" />
                  <div className="w-8 h-px bg-brand-gold/40 mb-4" />
                  <h3 className="font-serif text-lg text-brand-cream">{t(reason.titleKey)}</h3>
                  <p className="font-sans font-light text-sm text-brand-gray-light leading-relaxed mt-2">
                    {t(reason.descKey)}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 2: CÓMO FUNCIONA ── */}
      <section id="como-funciona" className="bg-white py-24 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">

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
              {t('section_how_tag')}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-black max-w-2xl mx-auto">
              {t('section_how_title')}
            </h2>
          </motion.div>

          {/* Steps */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-0 items-start md:items-center">
            {steps.map((step, i) => (
              <Fragment key={step.number}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.15 }}
                  className="flex flex-col items-center text-center max-w-xs mx-auto md:mx-0 px-4 py-6 md:py-0"
                >
                  <span className="font-serif text-5xl text-brand-gold/30 font-bold leading-none">
                    {step.number}
                  </span>
                  <h3 className="font-serif text-lg text-brand-black mt-2">{t(step.titleKey)}</h3>
                  <p className="font-sans font-light text-sm text-zinc-500 mt-2 leading-relaxed">
                    {t(step.descKey)}
                  </p>
                </motion.div>

                {/* Conector horizontal solo entre steps, solo desktop */}
                {i < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.15 + 0.3 }}
                    className="hidden md:block flex-1 h-px bg-brand-gold/30 self-center origin-left"
                  />
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
