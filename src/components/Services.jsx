export default function Services() {
  return (
    <section
      id="services"
      className="h-screen bg-black text-white relative flex flex-col justify-center px-6 md:px-20"
    >

      {/* 🔥 CONTENIDO */}
      <div className="max-w-5xl w-full">

        {/* TITULO */}
        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-12">
          Servicios
        </h2>

        {/* LISTA */}
        <div className="space-y-10">

          {/* SERVICIO 1 */}
          <div className="flex items-start justify-between border-b border-white/10 pb-4">
            
            <div className="flex items-start gap-4">
              <svg
  className="w-2.5 h-2.5 mt-2 text-white"
  viewBox="0 0 8 8"
  fill="currentColor"
>
  <circle cx="4" cy="4" r="4" />
</svg>

              <div>
                <h3 className="font-serif text-xl">Corte</h3>
                <p className="text-gray-400 text-sm">
                  Estilo moderno adaptado a tu personalidad.
                </p>
              </div>
            </div>

            <span className="text-gray-300 font-medium">$150</span>
          </div>

          {/* SERVICIO 2 */}
          <div className="flex items-start justify-between border-b border-white/10 pb-4">
            
            <div className="flex items-start gap-4">
             <svg
  className="w-2.5 h-2.5 mt-2 text-white"
  viewBox="0 0 8 8"
  fill="currentColor"
>
  <circle cx="4" cy="4" r="4" />
</svg>

              <div>
                <h3 className="font-serif text-xl">Corte + Barba</h3>
                <p className="text-gray-400 text-sm">
                  Look completo con precisión en cada detalle.
                </p>
              </div>
            </div>

            <span className="text-gray-300 font-medium">$220</span>
          </div>

          {/* SERVICIO 3 */}
          <div className="flex items-start justify-between pb-4">
            
            <div className="flex items-start gap-4">
             <svg
  className="w-2.5 h-2.5 mt-2 text-white"
  viewBox="0 0 8 8"
  fill="currentColor"
>
  <circle cx="4" cy="4" r="4" />
</svg>
              <div>
                <h3 className="font-serif text-xl">Barba</h3>
                <p className="text-gray-400 text-sm">
                  Perfilado profesional para un acabado limpio.
                </p>
              </div>
            </div>

            <span className="text-gray-300 font-medium">$100</span>
          </div>

        </div>
      </div>

      {/* 🔥 FLECHA HACIA ARRIBA */}
      <a
        href="#BookingForm"
        className="absolute bottom-6 right-6 flex flex-col items-center text-xs text-white hover:opacity-70 transition"
      >
        <svg
          className="w-6 h-6 animate-bounce mb-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M5 15l7-7 7 7" />
        </svg>

        <span>Agendar cita</span>
      </a>

    </section>
  );
}