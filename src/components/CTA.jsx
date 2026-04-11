export default function CTA() {
  return (
    <section className="min-h-[60vh] bg-black text-white flex flex-col justify-center items-center text-center px-6">

      {/* 🔥 CONTENIDO */}
      <div className="max-w-xl">

        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">
          Tu estilo empieza aquí
        </h2>

        <p className="text-gray-400 text-base md:text-lg mb-10">
          Agenda en segundos, sin llamadas, sin esperas.
        </p>

        {/* 🔥 BOTÓN PRINCIPAL (SCROLL INTERNO) */}
        <a
          href="#booking"
          className="inline-block border border-white px-8 py-3 rounded-full text-sm tracking-wide hover:bg-white hover:text-black transition"
        >
          Agendar cita
        </a>

      </div>

    </section>
  );
}