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

  // 🔥 NUEVO STATE
  const [barberosDisponibles, setBarberosDisponibles] = useState([]);

  // 🔥 NUEVA FUNCIÓN
  const actualizarBarberosDisponibles = async (fecha, hora) => {
    if (!fecha || !hora) return;

    const { data, error } = await supabase
      .from("citas")
      .select("barbero")
      .eq("fecha", fecha)
      .eq("hora", hora);

    if (error) {
      console.log(error);
      return;
    }

    const ocupados = data.map(c => c.barbero);

    const todos = ["Juan", "José", "Laura", "Rocío"];

    const disponibles = todos.filter(b => !ocupados.includes(b));

    setBarberosDisponibles(disponibles);
  };

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

  // 🔥 HANDLE CHANGE MODIFICADO
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });

    // 🔥 si cambia la hora → actualizar barberos
    if (name === "hora") {
      actualizarBarberosDisponibles(form.fecha, value);
    }
  };

  const handleFechaChange = async (e) => {
    const fecha = e.target.value;

    setForm({
      ...form,
      fecha,
      hora: "",
      barbero: "",
    });

    actualizarHorarios(fecha, form.barbero);

    // 🔥 NUEVO
    actualizarBarberosDisponibles(fecha, form.hora);
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

    const { data: existing, error: errorCheck } = await supabase
      .from("citas")
      .select("id")
      .eq("fecha", form.fecha)
      .eq("hora", form.hora)
      .eq("barbero", form.barbero);

    if (errorCheck) {
      console.log(errorCheck);
      setLoading(false);
      return;
    }

    if (existing && existing.length > 0) {
      alert("Ese horario ya está ocupado con ese barbero ❌");
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from("citas")
      .insert([
        {
          ...form,
          estado: "pendiente",
          precio: precios[form.servicio] || 0,
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
      setBarberosDisponibles([]);
    }

    setLoading(false);
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
            actualizarBarberosDisponibles(form.fecha, form.hora);
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

        {/* 🔥 NUEVO SELECT DINÁMICO */}
        <select
          name="barbero"
          value={form.barbero}
          onChange={handleBarberoChange}
          required
          className="w-full p-3 border rounded"
        >
          <option value="">Selecciona barbero</option>

          {barberosDisponibles.length === 0 ? (
            <option disabled>No disponibles</option>
          ) : (
            barberosDisponibles.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))
          )}
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