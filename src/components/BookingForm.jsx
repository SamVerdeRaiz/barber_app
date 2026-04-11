import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const horariosBase = [
  "10:00","11:00","12:00","13:00","14:00",
  "15:00","16:00","17:00","18:00",
];

// 💰 PRECIOS
const precios = {
  "Corte": 100,
  "Corte + barba": 150,
  "Barba": 80,
};

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
  const [bloqueado, setBloqueado] = useState(false);

  const [barberos, setBarberos] = useState([]);

  useEffect(() => {
    const fetchBarberos = async () => {
      const { data } = await supabase
        .from("barberos")
        .select("*")
        .eq("activo", true);

      setBarberos(data || []);
    };

    fetchBarberos();
  }, []);

  const actualizarHorarios = async (fecha, barbero) => {
    if (!fecha || !barbero) return;

    const { data: bloqueo } = await supabase
      .from("bloqueos")
      .select("*")
      .eq("fecha", fecha);

    if (bloqueo.length > 0) {
      setBloqueado(true);
      setHorarios([]);
      return;
    } else {
      setBloqueado(false);
    }

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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFechaChange = async (e) => {
    const fecha = e.target.value;

    setForm({
      ...form,
      fecha,
      hora: "",
    });

    actualizarHorarios(fecha, form.barbero);
  };

  const handleBarberoChange = async (e) => {
    const barbero = e.target.value;

    setForm({
      ...form,
      barbero,
      hora: "",
    });

    actualizarHorarios(form.fecha, barbero);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (bloqueado) {
      alert("Este día no hay servicio ❌");
      setLoading(false);
      return;
    }

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
      .insert([
        {
          ...form,
          estado: "pendiente",
          precio: precios[form.servicio] || 0, // 💰 AQUÍ SE AGREGA
        },
      ]);

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
  const marcarRealizado = async (cita) => {
  // 🔥 tabla de precios
  const precios = {
    "Corte": 100,
    "Corte + barba": 150,
    "Barba": 80
  };

  const precio = precios[cita.servicio] || 0;

await supabase
  .from("citas")
  .update({ 
    estado: "realizado",
    precio: Number(precio) // 👈 fuerza número
  })
  .eq("id", cita.id);
};

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
        () => {
          setTimeout(() => {
            actualizarHorarios(form.fecha, form.barbero);
          }, 0);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <section id="BookingForm" className="py-16 px-4 bg-gray-100">
      <h2 className="text-3xl font-serif text-center mb-6">
        Agenda tu cita
      </h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto space-y-4 bg-white p-6 rounded-xl shadow"
      >

        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required className="w-full p-3 border rounded"/>

        <input name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} required className="w-full p-3 border rounded"/>

        <select name="servicio" value={form.servicio} onChange={handleChange} required className="w-full p-3 border rounded">
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

          {barberos.map((b) => (
            <option key={b.id} value={b.nombre}>
              {b.nombre}
            </option>
          ))}
        </select>

        <input type="date" name="fecha" value={form.fecha} onChange={handleFechaChange} required className="w-full p-3 border rounded"/>

        {bloqueado && (
          <p className="text-red-500 text-center">
            🚫 No hay servicio este día
          </p>
        )}

        <select name="hora" value={form.hora} onChange={handleChange} required disabled={bloqueado} className="w-full p-3 border rounded">
          <option value="">Selecciona horario</option>

          {horarios.length === 0 ? (
            <option disabled>No disponible</option>
          ) : (
            horarios.map((hora) => (
              <option key={hora} value={hora}>{hora}</option>
            ))
          )}
        </select>

        <button
          type="submit"
          disabled={loading || bloqueado}
          className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
        >
          {loading ? "Guardando..." : "Agendar cita"}
        </button>
      </form>
    </section>
  );
}