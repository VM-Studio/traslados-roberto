// Tira de autos de la flota pasando en loop infinito por la línea divisoria
import { useState, useEffect } from 'react'
import { useLanguage } from '../LanguageContext'

const CARS = [
  '/flota/fordka.png',
  '/flota/hondacivic.png',
  '/flota/jeeprenegade.png',
  '/flota/peugeot208.png',
  '/flota/renaultlogan.png',
  '/flota/toyotacorolla.png',
]

const DURATION = 18 // segundos que tarda un auto en cruzar toda la pantalla (desktop, sin cambios)
// En mobile la pantalla es angosta y los autos quedan muy juntos/superpuestos,
// por eso ahí usamos menos autos a la vez con más espacio de tiempo entre cada uno.
const MOBILE_GAP_MULTIPLIER = 2.2

export default function CarDivider() {
  const { t } = useLanguage()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const gap = isMobile
    ? (DURATION / CARS.length) * MOBILE_GAP_MULTIPLIER
    : DURATION / CARS.length

  return (
    <>
      <style>{`
        @keyframes drive {
          from { left: -180px; }
          to   { left: calc(100% + 180px); }
        }
        .car-animate {
          animation: drive ${DURATION}s linear infinite;
          position: absolute;
          bottom: 25%;
          height: 48px;
          width: auto;
        }
      `}</style>

      {/* Mini título — mismo diseño que "LO QUE OFRECEMOS" */}
      <div className="bg-brand-surface pt-12 pb-2 text-center">
        <div className="w-12 h-px bg-brand-gold mx-auto mb-4" />
        <p className="font-sans text-xs tracking-widest2 text-brand-gold uppercase">
          {t('section_fleet_car_tag')}
        </p>
      </div>

      <div className="relative w-full h-20 bg-brand-surface overflow-hidden">

        {/* Línea dorada que se desvanece en los extremos */}
        <div
          className="absolute left-0 right-0 h-px"
          style={{
            top: '75%',
            background: 'linear-gradient(to right, transparent 0%, #C9A96E 15%, #C9A96E 85%, transparent 100%)',
          }}
        />

        {/* Autos de la flota animados en loop, con espacio parejo entre ellos (más separados en mobile) */}
        {CARS.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className="car-animate"
            style={{ animationDelay: `-${i * gap}s` }}
          />
        ))}
      </div>
    </>
  )
}
