// Tira de autos de la flota pasando en loop infinito por la línea divisoria.
// Técnica: una sola fila de autos con gap fijo (mismo espacio adelante y atrás
// en TODOS los autos), duplicada una vez, animada con translateX de 0 a -50%.
// Como es un solo bloque que se repite idéntico, el espaciado es matemáticamente
// perfecto y el loop es siempre continuo, sin importar el ancho de pantalla.
import { useLanguage } from '../LanguageContext'

const CARS = [
  '/flota/fordka.png',
  '/flota/hondacivic.png',
  '/flota/jeeprenegade.png',
  '/flota/peugeot208.png',
  '/flota/renaultlogan.png',
  '/flota/toyotacorolla.png',
]

const DURATION = 22 // segundos que tarda la tira completa en recorrer y repetirse

function CarTrack() {
  return (
    <div className="flex items-end shrink-0 gap-16 sm:gap-24 pr-16 sm:pr-24">
      {CARS.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          className="h-10 sm:h-12 w-auto shrink-0"
        />
      ))}
    </div>
  )
}

export default function CarDivider() {
  const { t } = useLanguage()

  return (
    <>
      <style>{`
        @keyframes car-track-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .car-track {
          animation: car-track-scroll ${DURATION}s linear infinite;
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
          className="absolute left-0 right-0 h-px z-10"
          style={{
            top: '75%',
            background: 'linear-gradient(to right, transparent 0%, #C9A96E 15%, #C9A96E 85%, transparent 100%)',
          }}
        />

        {/* Tira de autos duplicada, moviéndose como un único bloque continuo */}
        <div
          className="absolute flex items-end"
          style={{ bottom: '25%', left: 0 }}
        >
          <div className="car-track flex items-end">
            <CarTrack />
            <CarTrack />
          </div>
        </div>
      </div>
    </>
  )
}
