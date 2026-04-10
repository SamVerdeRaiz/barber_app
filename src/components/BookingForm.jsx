import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

console.log("Insertando en tabla citas...");

const horariosBase = [
  "10:00","11:00","12:00","13:00","14:00",
  "15:00","16:00","17:00","18:00",
];

export default function BookingForm() {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    servicio: "",
    fecha: "",
    hora: "",
    barbero: "",
  });

  const [horarios, setHorarios] = useState(horariosBase);
  const [loading, setLoading] = useState(false);

  // 🔥 FUNCIÓN CENTRAL PARA ACTUALIZAR HORARIOS
  const actualizarHorarios = async (fecha, barbero) => {
    if (!fecha || !barbero) return;

    const { data, error } = await supabase
      .from("citas")
      .select("hora")
      .eq("fecha", fecha)
      .eq("barbero", barbero);

    if (error) {
      console.log(error);
      return;
    }

    const horasOcupadas = data.map((cita) => cita.hora);

    const disponibles = horariosBase.filter(
      (hora) => !horasOcupadas.includes(hora)
    );

    setHorarios(disponibles);
  };

  // 🔹 Manejo general
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🔥 Fecha
  const handleFechaChange = async (e) => {
    const fecha = e.target.value;

    setForm({
      ...form,
      fecha,
      hora: "",
    });

    actualizarHorarios(fecha, form.barbero);
  };

  // 🔥 Barbero
  const handleBarberoChange = async (e) => {
    const barbero = e.target.value;

    setForm({
      ...form,
      barbero,
      hora: "",
    });

    actualizarHorarios(form.fecha, barbero);
  };

  // 🚀 Guardar cita
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data: existing } = await supabase
      .from("citas")
      .select("*")
      .eq("fecha", form.fecha)
      .eq("hora", form.hora)
      .eq("barbero", form.barbero);

    if (existing.length > 0) {
      alert("Ese horario ya está ocupado ❌");
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from("citas")
      .insert([{ ...form, estado: "pendiente" }]);

    if (error) {
      alert("Error al guardar cita");
      console.log(error);
    } else {
      alert("Cita agendada correctamente 💈");

      setForm({
        nombre: "",
        telefono: "",
        servicio: "",
        fecha: "",
        hora: "",
        barbero: "",
      });

      setHorarios(horariosBase);
    }

    setLoading(false);
  };

  // 🔥 REALTIME CORREGIDO (PRO 🔥)
  useEffect(() => {
    const channel = supabase
      .channel("booking-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "citas",
        },
        (payload) => {
          console.log("Cambio detectado:", payload);

          // 🔥 evita stale state
          setTimeout(() => {
            actualizarHorarios(form.fecha, form.barbero);
          }, 0);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []); // 🔥 SOLO UNA VEZ

  return (
    <section className="py-16 px-4 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-6">
        Agenda tu cita
      </h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto space-y-4 bg-white p-6 rounded-xl shadow"
      >
        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded"
        />

        <input
          name="telefono"
          placeholder="Teléfono"
          value={form.telefono}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded"
        />

        <select
          name="servicio"
          value={form.servicio}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded"
        >
          <option value="">Selecciona servicio</option>
          <option>Corte</option>
          <option>Corte + barba</option>
          <option>Barba</option>
        </select>

        <select
          name="barbero"
          value={form.barbero}
          onChange={handleBarberoChange}
          required
          className="w-full p-3 border rounded"
        >
          <option value="">Selecciona barbero</option>
          <option>Juan</option>
          <option>Pedro</option>
        </select>

        <input
          type="date"
          name="fecha"
          value={form.fecha}
          onChange={handleFechaChange}
          required
          className="w-full p-3 border rounded"
        />

        <select
          name="hora"
          value={form.hora}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded"
        >
          <option value="">Selecciona horario</option>

          {horarios.length === 0 ? (
            <option disabled>No hay horarios disponibles</option>
          ) : (
            horarios.map((hora) => (
              <option key={hora} value={hora}>
                {hora}
              </option>
            ))
          )}
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
        >
          {loading ? "Guardando..." : "Agendar cita"}
        </button>
      </form>
    </section>
  );
}