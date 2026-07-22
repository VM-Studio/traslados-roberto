// Tira de autos de la flota pasando en loop infinito por la línea divisoria
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
const GAP = DURATION / CARS.length // separación pareja entre autos

export default function CarDivider() {
  const { t } = useLanguage()

  return (
    <>
      <style>{`
        @keyframes drive {
          from { left: -160px; }
          to   { left: calc(100% + 160px); }
        }
        .car-animate {
          animation: drive ${DURATION}s linear infinite;
          position: absolute;
          bottom: 25%;
          height: 56px;
          width: auto;
          max-width: 160px;
          object-fit: contain;
          object-position: bottom center;
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

        {/* Autos de la flota animados en loop, con espacio parejo entre ellos */}
        {CARS.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className="car-animate"
            style={{ animationDelay: `-${i * GAP}s` }}
          />
        ))}
      </div>
    </>
  )
}

