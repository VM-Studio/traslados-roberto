// Reemplazar con imagen PNG de auto con fondo transparente para mejor resultado visual

export default function CarDivider() {
  return (
    <>
      <style>{`
        @keyframes drive {
          from { transform: translateX(-160px) translateY(-85%); }
          to   { transform: translateX(calc(100vw + 160px)) translateY(-85%); }
        }
        .car-animate {
          animation: drive 8s linear infinite;
        }
      `}</style>

      <div className="relative w-full h-20 bg-brand-black overflow-hidden">

        {/* Línea dorada que se desvanece en los extremos */}
        <div
          className="absolute left-0 right-0 h-px"
          style={{
            top: '75%',
            background: 'linear-gradient(to right, transparent 0%, #C9A96E 15%, #C9A96E 85%, transparent 100%)',
          }}
        />

        {/* Auto animado */}
        <img
          src="/image.png"
          alt=""
          className="car-animate absolute w-32 h-auto"
          style={{ top: '75%', left: 0 }}
        />
      </div>
    </>
  )
}
