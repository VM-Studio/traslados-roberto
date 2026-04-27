import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import { useLanguage } from '../LanguageContext'

const inputClass =
  'bg-transparent border-b border-zinc-300 focus:border-brand-gold text-zinc-800 text-sm py-3 w-full outline-none placeholder:text-zinc-400 transition-colors duration-300 font-sans'
const labelClass =
  'block text-xs text-zinc-500 tracking-widest uppercase font-sans mb-1'

const initialForm = {
  nombre: '',
  email: '',
  telefono: '',
  servicio: '',
  fecha: '',
  mensaje: '',
}

export default function ReservarPage() {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    // Conectar con EmailJS o backend propio
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Header mínimo */}
      <header className="w-full flex items-center justify-between px-4 sm:px-6 py-5 border-b border-zinc-100">
        <button
          onClick={() => navigate('/')}
          className="flex flex-col items-start cursor-pointer group"
          aria-label="Volver al inicio"
        >
          <span className="font-serif text-brand-gold tracking-widest2 text-xl leading-none">
            ELITE
          </span>
          <span className="font-sans font-light text-zinc-600 tracking-widest text-xs leading-none mt-0.5">
            TRANSFERS
          </span>
        </button>

        <button
          onClick={() => navigate('/')}
          className="font-sans text-xs tracking-widest text-zinc-400 hover:text-brand-gold uppercase transition-colors duration-300 flex items-center gap-2"
        >
          ← {t('nav_services') === 'Services' ? 'Back' : 'Volver'}
        </button>
      </header>

      {/* Contenido centrado */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full max-w-xl"
        >
          {/* Encabezado del formulario */}
          <div className="mb-10">
            <div className="w-10 h-px bg-brand-gold mb-4" />
            <p className="font-sans text-xs tracking-widest2 text-brand-gold uppercase mb-2">
              {t('section_contact_tag')}
            </p>
            <h1 className="font-serif text-3xl md:text-4xl text-zinc-900">
              {t('section_contact_title')}
            </h1>
            <p className="font-sans font-light text-sm text-zinc-500 mt-3 leading-relaxed">
              {t('contact_desc')}
            </p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center py-16"
            >
              <div className="w-10 h-px bg-brand-gold mx-auto mb-6" />
              <p className="font-serif text-2xl text-brand-gold">
                {t('form_success')}
              </p>
              <button
                onClick={() => navigate('/')}
                className="mt-8 font-sans text-xs tracking-widest uppercase text-zinc-500 hover:text-brand-gold transition-colors duration-300"
              >
                ← {t('nav_services') === 'Services' ? 'Back to home' : 'Volver al inicio'}
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-7">

              {/* Nombre */}
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

              {/* Email + Teléfono */}
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

              {/* Servicio + Fecha */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                <div>
                  <label className={labelClass}>{t('form_service')}</label>
                  <select
                    name="servicio"
                    value={form.servicio}
                    onChange={handleChange}
                    required
                    className={`${inputClass} bg-white`}
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
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Mensaje */}
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

              {/* Botón enviar */}
              <button
                type="submit"
                className="w-full bg-brand-gold text-brand-black font-sans text-sm font-medium tracking-widest uppercase py-4 hover:bg-brand-gold/90 transition-colors duration-300"
              >
                {t('form_submit')}
              </button>

              {/* Separador */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-zinc-200" />
                <span className="font-sans text-xs text-zinc-400 uppercase tracking-widest">o</span>
                <div className="flex-1 h-px bg-zinc-200" />
              </div>

              {/* WhatsApp */}
              <a
                href="https://wa.me/54NUMEROCLIENTE"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 border border-green-600 text-green-700 font-sans text-sm tracking-widest uppercase py-4 hover:bg-green-50 transition-colors duration-300"
              >
                <FaWhatsapp className="text-lg" />
                {t('contact_whatsapp_btn')}
              </a>

            </form>
          )}
        </motion.div>
      </main>

    </div>
  )
}
