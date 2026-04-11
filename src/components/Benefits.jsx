export default function Benefits() {
  return (
    <section id="Benefits"className="bg-black text-white">

      {/* 🔥 BLOQUE 1 */}
      <div className="h-screen flex flex-col md:flex-row">

        {/* 🖼 IMAGEN IZQUIERDA FULL */}
        <div
          className="hidden md:block md:w-1/2 h-full bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('/barber2.jpg')" }}
        ></div>

        {/* 🖼 IMAGEN MOBILE */}
        <div
          className="md:hidden w-full h-[50vh] bg-cover bg-center"
          style={{ backgroundImage: "url('/barber1.jpg')" }}
        ></div>

        {/* 📝 TEXTO DERECHA */}
        <div className="md:w-1/2 flex items-center justify-center px-6 md:px-20 py-10">
          
          <div className="max-w-md w-full">
            
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Eleva tu estilo
            </h2>

            <p className="text-gray-400 mb-8 text-base md:text-lg">
              Más que un corte, una experiencia diseñada para hombres que cuidan su imagen.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-lg">Atención profesional</h3>
                <p className="text-gray-400 text-sm">Barberos expertos que entienden tu estilo.</p>
              </div>

              <div>
                <h3 className="font-serif text-lg">Sin esperas</h3>
                <p className="text-gray-400 text-sm">Agenda en segundos y llega directo.</p>
              </div>

              <div>
                <h3 className="font-serif text-lg">Resultado garantizado</h3>
                <p className="text-gray-400 text-sm">Siempre sales con el look correcto.</p>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 🔥 BLOQUE 2 */}
      <div className="h-screen flex flex-col md:flex-row">

        {/* 🖼 IMAGEN DERECHA */}
        <div
          className="hidden md:block md:w-1/2 h-full bg-cover bg-center bg-fixed order-2"
          style={{ backgroundImage: "url('/barber2.jpg')" }}
        ></div>

        {/* 🖼 IMAGEN MOBILE */}
        <div
          className="md:hidden w-full h-[50vh] bg-cover bg-center"
          style={{ backgroundImage: "url('/barber2.jpg')" }}
        ></div>

        {/* 📝 TEXTO IZQUIERDA */}
        <div className="md:w-1/2 flex items-center justify-center px-6 md:px-20 py-10 order-1">
          
          <div className="max-w-md w-full">

            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Precisión en cada detalle
            </h2>

            <p className="text-gray-400 text-base md:text-lg">
              Cada corte está pensado para resaltar tu estilo personal y adaptarse a ti.
            </p>

          </div>

        </div>
      </div>

    </section>
  );
}