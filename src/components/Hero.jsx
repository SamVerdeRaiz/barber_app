export default function Hero() {
  return (
    <section className="bg-black text-white text-center py-20 px-4">
      <img
        src="/hero.jpg"
        alt="Barbería"
        className="mx-auto w-full max-w-md rounded-2xl shadow-lg"
      />

      <h1 className="text-4xl md:text-6xl font-bold mt-8">
        Cortes premium sin esperar
      </h1>

      <p className="mt-4 text-lg text-gray-300">
        Reserva tu cita en segundos y luce impecable
      </p>

      <button
        onClick={() =>
          window.open("https://wa.me/521XXXXXXXXXX", "_blank")
        }
        className="mt-6 bg-green-500 hover:bg-green-600 px-8 py-3 rounded-xl font-semibold transition"
      >
        Agendar por WhatsApp
      </button>
      
    </section>
  );
}