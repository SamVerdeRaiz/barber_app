export default function Services() {
  return (
    <section className="py-16 px-4 text-center">
      <h2 className="text-3xl font-bold mb-10">Servicios</h2>
      

      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 shadow-lg rounded-xl">
          <h3 className="text-xl font-semibold">Corte clásico</h3>
          <p className="text-gray-500 mt-2">$150 MXN</p>
        </div>

        <div className="p-6 shadow-lg rounded-xl">
          <h3 className="text-xl font-semibold">Corte + barba</h3>
          <p className="text-gray-500 mt-2">$200 MXN</p>
        </div>

        <div className="p-6 shadow-lg rounded-xl">
          <h3 className="text-xl font-semibold">Barba</h3>
          <p className="text-gray-500 mt-2">$100 MXN</p>
        </div>
      </div>
    </section>
  );
}