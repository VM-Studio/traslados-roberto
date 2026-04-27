import { useLanguage } from '../LanguageContext'

export default function Stats() {
  const { t } = useLanguage()

  const stats = [
    { number: t('stat1_number'), label: t('stat1_label') },
    { number: t('stat2_number'), label: t('stat2_label') },
    { number: '2',   label: t('stat3_label') },
    { number: 'GBA', label: t('stat4_label') },
  ]

  return (
    <section className="bg-brand-gold py-16 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center text-center">
            <span className="font-serif text-4xl text-brand-black font-bold leading-none">
              {stat.number}
            </span>
            <span className="font-sans text-xs text-brand-black/70 uppercase tracking-widest mt-2 leading-snug">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
