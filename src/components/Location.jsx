export default function Location() {
  return (
    <section
      id="Location"
      className="min-h-screen bg-black text-white flex flex-col justify-center px-6 md:px-20 py-16"
    >

      <div className="grid md:grid-cols-2 gap-10 items-center">

        {/* 📝 INFO */}
        <div>

          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">
            Visítanos
          </h2>

          <p className="text-gray-400 mb-8 max-w-md">
            Estamos ubicados en Lerma, Estado de México. 
            Ven y vive la experiencia de un corte premium sin esperas.
          </p>

          {/* DETALLES */}
          <div className="space-y-4 text-sm text-gray-300">

            <p>📍 Lerma, Estado de México</p>
            <p>🕒 Lunes a Sábado: 10:00 - 19:00</p>
            <p>📞 Atención directa al llegar o con cita previa</p>

          </div>

          {/* BOTÓN */}
          <a
            href="https://www.google.com/maps?q=Lerma+Estado+de+Mexico"
            target="_blank"
            className="inline-block mt-8 border border-white px-6 py-3 rounded-full text-sm hover:bg-white hover:text-black transition"
          >
            Abrir en Google Maps
          </a>

        </div>

        {/* 🗺 MAPA */}
        <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-white/10">
          <iframe
            src="https://www.google.com/maps?q=Lerma+Estado+de+Mexico&output=embed"
            className="w-full h-full"
            loading="lazy"
          ></iframe>
        </div>

      </div>

    </section>
  );
}