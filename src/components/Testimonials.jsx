import { useEffect, useState } from "react";

const testimonials = [
  {
    nombre: "Carlos Ramírez",
    texto: "El mejor corte que me han hecho, 100% recomendado.",
  },
  {
    nombre: "Luis Gómez",
    texto: "Rápido, profesional y sin esperar. Excelente servicio.",
  },
  {
    nombre: "Miguel Torres",
    texto: "Desde que agendo aquí no cambio de barbería.",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  // 🔥 AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="Testimonials"
      className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-6"
    >
      {/* TÍTULO */}
      <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center">
        Lo que dicen nuestros clientes
      </h2>

      {/* CARRUSEL */}
<div className="relative w-full max-w-2xl text-center overflow-hidden h-48 flex items-center justify-center">
        {testimonials.map((item, i) => (
          <div
            key={i}
            className={`transition-all duration-700 ease-in-out absolute w-full ${
              i === index
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            {/* ⭐ ESTRELLAS SVG */}
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="gold"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.826 1.512 8.243L12 18.896l-7.448 4.479 1.512-8.243L0 9.306l8.332-1.151z" />
                </svg>
              ))}
            </div>

            {/* TEXTO */}
            <p className="text-xl md:text-2xl italic text-gray-300 mb-4">
              "{item.texto}"
            </p>

            {/* NOMBRE */}
            <p className="text-lg font-semibold text-white">
              — {item.nombre}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
}