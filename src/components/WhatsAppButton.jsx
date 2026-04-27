import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import { useLanguage } from '../LanguageContext'

export default function WhatsAppButton() {
  const { t } = useLanguage()

  return (
    <a
      href="https://wa.me/54NUMEROCLIENTE"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label={t('whatsapp_tooltip')}
    >
      {/* Tooltip */}
      <span className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap bg-brand-dark text-brand-cream font-sans text-xs px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        {t('whatsapp_tooltip')}
      </span>

      {/* Botón */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="w-14 h-14 rounded-full bg-green-600 hover:bg-green-500 shadow-lg flex items-center justify-center transition-colors duration-300"
      >
        <FaWhatsapp className="text-white text-2xl" />
      </motion.div>
    </a>
  )
}
