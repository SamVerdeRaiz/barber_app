import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const [citas, setCitas] = useState([]);
  const [filtroFecha, setFiltroFecha] = useState("todas");
  const [fechaCustom, setFechaCustom] = useState("");
  const [filtroBarbero, setFiltroBarbero] = useState("");

  const navigate = useNavigate();

  const hoy = new Date().toISOString().split("T")[0];

  const fetchCitas = async () => {
    const { data, error } = await supabase
      .from("citas")
      .select("*")
      .order("fecha", { ascending: true })
      .order("hora", { ascending: true });

    if (!error) setCitas(data);
  };

  // 🔥 REALTIME
  useEffect(() => {
    fetchCitas();

    const channel = supabase
      .channel("admin-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "citas" },
        () => fetchCitas()
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const eliminarCita = async (id) => {
    if (!confirm("¿Eliminar esta cita?")) return;
    await supabase.from("citas").delete().eq("id", id);
  };

  const confirmarCita = async (cita) => {
    await supabase
      .from("citas")
      .update({ estado: "confirmado" })
      .eq("id", cita.id);

    const mensaje = `Hola ${cita.nombre}, tu cita para ${cita.servicio} con ${cita.barbero} ha sido CONFIRMADA 💈 el día ${cita.fecha} a las ${cita.hora}.`;

    const telefono = cita.telefono.replace(/\D/g, "");
    window.open(`https://wa.me/52${telefono}?text=${encodeURIComponent(mensaje)}`, "_blank");
  };

  // 🔥 NUEVO: MARCAR COMO REALIZADO
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
      precio: precio // 🔥 AQUÍ ESTÁ LA CLAVE
    })
    .eq("id", cita.id);
};

  const enviarWhatsApp = (cita) => {
    const mensaje = `Hola ${cita.nombre}, te recordamos tu cita para ${cita.servicio} con ${cita.barbero} 💈 el día ${cita.fecha} a las ${cita.hora}.`;

    const telefono = cita.telefono.replace(/\D/g, "");
    window.open(`https://wa.me/52${telefono}?text=${encodeURIComponent(mensaje)}`, "_blank");
  };

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  // 🔥 FILTROS
  let citasFiltradas = [...citas];

  if (filtroFecha === "hoy") {
    citasFiltradas = citasFiltradas.filter(c => c.fecha === hoy);
  }

  if (filtroFecha === "custom" && fechaCustom) {
    citasFiltradas = citasFiltradas.filter(c => c.fecha === fechaCustom);
  }

  if (filtroBarbero) {
    citasFiltradas = citasFiltradas.filter(c => c.barbero === filtroBarbero);
  }

  // 🔥 MÉTRICAS
  const total = citasFiltradas.length;
  const confirmadas = citasFiltradas.filter(c => c.estado === "confirmado").length;
  const pendientes = citasFiltradas.filter(c => c.estado !== "confirmado").length;

  const citasHoy = citas.filter(c => c.fecha === hoy).length;

  // 💰 INGRESOS
  const ingresosHoy = citas
    .filter(c => c.fecha === hoy && c.estado === "realizado")
    .reduce((acc, c) => acc + (c.precio || 0), 0);

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-20 py-10">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl md:text-5xl font-serif">Panel de Citas</h1>
          <p className="text-gray-400">Control total del negocio</p>
        </div>

        <button
          onClick={logout}
          className="border border-red-500 px-4 py-2 rounded-lg text-red-400 hover:bg-red-500 hover:text-black transition"
        >
          Cerrar sesión
        </button>
      </div>

      {/* FILTROS */}
      <div className="flex flex-wrap gap-4 mb-8">

        <select
          onChange={(e) => setFiltroFecha(e.target.value)}
          className="bg-gray-900 border border-white/10 p-2 rounded"
        >
          <option value="todas">Todas</option>
          <option value="hoy">Hoy</option>
          <option value="custom">Elegir fecha</option>
        </select>

        {filtroFecha === "custom" && (
          <input
            type="date"
            onChange={(e) => setFechaCustom(e.target.value)}
            className="bg-gray-900 border border-white/10 p-2 rounded"
          />
        )}

        <input
          placeholder="Filtrar por barbero"
          onChange={(e) => setFiltroBarbero(e.target.value)}
          className="bg-gray-900 border border-white/10 p-2 rounded"
        />

      </div>

      {/* DASHBOARD */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">

        <div className="bg-gray-900 p-4 rounded-xl">
          <p className="text-gray-400">Total</p>
          <h2 className="text-2xl">{total}</h2>
        </div>

        <div className="bg-gray-900 p-4 rounded-xl">
          <p className="text-gray-400">Pendientes</p>
          <h2 className="text-2xl text-yellow-400">{pendientes}</h2>
        </div>

        <div className="bg-gray-900 p-4 rounded-xl">
          <p className="text-gray-400">Confirmadas</p>
          <h2 className="text-2xl text-green-400">{confirmadas}</h2>
        </div>

        <div className="bg-gray-900 p-4 rounded-xl">
          <p className="text-gray-400">Hoy</p>
          <h2 className="text-2xl text-blue-400">{citasHoy}</h2>
        </div>

        <div className="bg-gray-900 p-4 rounded-xl">
          <p className="text-gray-400">Ingresos Hoy</p>
          <h2 className="text-2xl text-green-400">${ingresosHoy}</h2>
        </div>

      </div>

      {/* LISTA */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {citasFiltradas.map((cita) => (
          <div key={cita.id} className="bg-gray-900 p-5 rounded-2xl border border-white/5">

            <h2 className="text-xl font-semibold">{cita.nombre}</h2>

            <p className="text-gray-400 text-sm">{cita.servicio}</p>

            <p className="text-sm text-yellow-400">
              💈 {cita.barbero || "Sin asignar"}
            </p>

            <p className="text-gray-500 text-sm">
              {cita.fecha} - {cita.hora}
            </p>

            <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full
              ${cita.estado === "confirmado"
                ? "bg-green-500/20 text-green-400"
                : cita.estado === "realizado"
                ? "bg-blue-500/20 text-blue-400"
                : "bg-yellow-500/20 text-yellow-400"}
            `}>
              {cita.estado}
            </span>

            <div className="flex flex-wrap gap-2 mt-4">

              <button
                onClick={() => confirmarCita(cita)}
                className="border border-green-500 px-3 py-2 text-sm rounded hover:bg-green-500 hover:text-black transition"
              >
                Confirmar
              </button>

              <button
                onClick={() => marcarRealizado(cita)}
                className="border border-blue-500 px-3 py-2 text-sm rounded hover:bg-blue-500 hover:text-black transition"
              >
                Hecho 💰
              </button>

              <button
                onClick={() => enviarWhatsApp(cita)}
                className="border border-green-700 px-3 py-2 text-sm rounded hover:bg-green-700 transition"
              >
                WhatsApp
              </button>

              <button
                onClick={() => eliminarCita(cita.id)}
                className="border border-red-500 px-3 py-2 text-sm rounded hover:bg-red-500 hover:text-black transition"
              >
                Eliminar
              </button>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
}