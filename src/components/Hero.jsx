import { useEffect, useState } from "react";

export default function Hero() {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fade = Math.max(1 - scrollY / 400, 0);
      setOpacity(fade);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="Hero" className="relative h-screen overflow-hidden">

      {/* 🔥 FONDO */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      ></div>

      {/* 🔥 OVERLAY */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* 🔥 CONTENIDO */}
      <div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-4 transition-opacity duration-200"
      >
        <h1 className="text-4xl md:text-6xl font-serif">
          Shining Salon and barber 
        </h1>

        <p className="mt-4 text-lg text-gray-300 max-w-xl font-sans">
          Reserva tu cita en segundos y luce impecable
        </p>
              <a
  href="#BookingForm"
  className="mt-6 bg-white text-black px-8 py-3 rounded-xl font-semibold"
>
  Agendar ahora
</a>
      </div>

      {/* 🔥 FLECHA FIJA ABAJO */}
      <div className="absolute bottom-10 w-full flex justify-center z-10">
        <a
          href="#Services"
          className="text-white text-center hover:opacity-70 transition"
        >
          <p className="text-sm">Ver servicios</p>
          <div className="text-2xl">↓</div>
        </a>
    
      </div>

    </section>
  );
}