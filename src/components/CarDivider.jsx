// Reemplazar con imagen PNG de auto con fondo transparente para mejor resultado visual

export default function CarDivider() {
  return (
    <>
      <style>{`
        @keyframes drive {
          from { left: -160px; }
          to   { left: calc(100% + 160px); }
        }
        .car-animate {
          animation: drive 8s linear infinite;
          position: absolute;
          top: 75%;
          transform: translateY(-70%);
          width: 160px;
          height: auto;
        }
      `}</style>

      <div className="relative w-full h-20 bg-brand-surface overflow-hidden">

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
          src="/cardivider.png"
          alt=""
          className="car-animate"
        />
      </div>
    </>
  )
}
