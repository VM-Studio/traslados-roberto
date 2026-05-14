import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../LanguageContext'

const initialForm = {
  nombre: '',
  email: '',
  telefono: '',
  servicio: '',
  fecha: '',
  mensaje: '',
}

const inputClass =
  'bg-transparent border-b border-brand-gold/30 focus:border-brand-gold text-brand-text text-sm py-3 w-full outline-none placeholder:text-brand-text-soft/50 transition-colors duration-300 font-sans'
const labelClass = 'block text-xs text-brand-text-soft tracking-widest uppercase font-sans mb-1'

export default function Contact() {
  const { t } = useLanguage()
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Conectar con EmailJS o backend propio
    setSubmitted(true)
  }

  return (
    <section id="contacto" className="bg-brand-surface py-24 px-4 md:px-6">
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
            {t('section_contact_tag')}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-brand-text max-w-2xl mx-auto">
            {t('section_contact_title')}
          </h2>
        </motion.div>

        {/* Formulario centrado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-xl mx-auto"
        >
            {submitted ? (
              <div className="flex items-center justify-center py-20">
                <p className="font-serif text-xl text-brand-gold text-center">
                  {t('form_success')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-7">
                <div>
                  <label className={labelClass}>{t('form_name')}</label>
                  <input
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder={t('form_name')}
                    required
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                  <div>
                    <label className={labelClass}>{t('form_email')}</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>{t('form_phone')}</label>
                    <input
                      name="telefono"
                      value={form.telefono}
                      onChange={handleChange}
                      placeholder="+54 11 ..."
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                  <div>
                    <label className={labelClass}>{t('form_service')}</label>
                    <select
                      name="servicio"
                      value={form.servicio}
                      onChange={handleChange}
                      required
                      className={`${inputClass} bg-brand-surface-alt`}
                    >
                      <option value="" disabled>{t('form_service_placeholder')}</option>
                      <option value="tour">{t('form_service_1')}</option>
                      <option value="evento">{t('form_service_2')}</option>
                      <option value="valet">{t('form_service_3')}</option>
                      <option value="otro">{t('form_service_4')}</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>{t('form_date')}</label>
                    <input
                      name="fecha"
                      type="date"
                      value={form.fecha}
                      onChange={handleChange}
                      className={`${inputClass} color-scheme-dark`}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>{t('form_message')}</label>
                  <textarea
                    name="mensaje"
                    value={form.mensaje}
                    onChange={handleChange}
                    rows={4}
                    placeholder="..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-gold text-brand-black font-sans text-sm font-medium tracking-widest uppercase py-4 hover:bg-brand-gold-light transition-colors duration-300 mt-2"
                >
                  {t('form_submit')}
                </button>
              </form>
            )}
        </motion.div>

      </div>
    </section>
  )
}
