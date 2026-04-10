export default function CTA() {
  return (
    <section>
      <h2>Agenda tu cita ahora</h2>
      <p>Evita filas y asegura tu lugar hoy mismo</p>

      <button
        onClick={() =>
          window.open("https://wa.me/521XXXXXXXXXX", "_blank")
        }
      >
        Reservar ahora
      </button>
    </section>
  );
}