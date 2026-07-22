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

const DURATION = 18 // segundos que tarda un auto en cruzar toda la pantalla
const CAR_WIDTH = 180 // ancho aprox. reservado por auto (coincide con el offset de la animación)
const DESKTOP_PX_GAP = 260 // espacio real en píxeles entre auto y auto en desktop
const MOBILE_PX_GAP = 130 // espacio real en píxeles entre auto y auto en mobile (más autos visibles a la vez, pero sin superponerse)

export default function CarDivider() {
  const { t } = useLanguage()
  const [trackLength, setTrackLength] = useState(1440)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const updateMq = () => setIsMobile(mq.matches)
    updateMq()
    mq.addEventListener('change', updateMq)

    const updateWidth = () => setTrackLength(window.innerWidth + CAR_WIDTH * 2)
    updateWidth()
    window.addEventListener('resize', updateWidth)

    return () => {
      mq.removeEventListener('change', updateMq)
      window.removeEventListener('resize', updateWidth)
    }
  }, [])

  // Velocidad real (px/seg) del recorrido en esta pantalla
  const speed = trackLength / DURATION
  // Espaciado en píxeles deseado según el tamaño de pantalla, convertido a delay en segundos
  const pxGap = isMobile ? MOBILE_PX_GAP : DESKTOP_PX_GAP
  const gap = pxGap / speed

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
