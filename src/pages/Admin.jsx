import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const [citas, setCitas] = useState([]);
  const navigate = useNavigate();

  const fetchCitas = async () => {
    const { data, error } = await supabase
      .from("citas")
      .select("*")
      .order("fecha", { ascending: true });

    if (!error) setCitas(data);
  };

  const eliminarCita = async (id) => {
    if (!confirm("¿Eliminar esta cita?")) return;

    await supabase.from("citas").delete().eq("id", id);
    fetchCitas();
  };

  // 🔥 CONFIRMAR + WhatsApp
  const confirmarCita = async (cita) => {
    await supabase
      .from("citas")
      .update({ estado: "confirmado" })
      .eq("id", cita.id);

    const mensaje = `Hola ${cita.nombre}, tu cita para ${cita.servicio} con ${cita.barbero} ha sido CONFIRMADA 💈 el día ${cita.fecha} a las ${cita.hora}.`;

    const telefono = cita.telefono.replace(/\D/g, "");
    const url = `https://wa.me/52${telefono}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");

    fetchCitas();
  };

  // 🔥 WhatsApp manual
  const enviarWhatsApp = (cita) => {
    const mensaje = `Hola ${cita.nombre}, te recordamos tu cita para ${cita.servicio} con ${cita.barbero} 💈 el día ${cita.fecha} a las ${cita.hora}.`;

    const telefono = cita.telefono.replace(/\D/g, "");
    const url = `https://wa.me/52${telefono}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");
  };

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  useEffect(() => {
    fetchCitas();

    // 🔥 REALTIME SUPABASE
    const channel = supabase
      .channel("citas-realtime")
      .on(
        "postgres_changes",
        {
          event: "*", // INSERT, UPDATE, DELETE
          schema: "public",
          table: "citas",
        },
        (payload) => {
          console.log("Cambio en citas:", payload);

          // 🔥 refrescar lista automática
          fetchCitas();

          // 🔔 alerta solo cuando hay nueva cita
          if (payload.eventType === "INSERT") {
            const nueva = payload.new;

            alert(
              `Nueva cita 💈\n${nueva.nombre} - ${nueva.servicio} con ${nueva.barbero}`
            );
          }
        }
      )
      .subscribe();

    // 🧹 limpiar suscripción
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold">Panel de Citas 💈</h1>
          <p className="text-gray-400">Gestiona tus citas</p>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Cerrar sesión
        </button>
      </div>

      {/* LISTA */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {citas.map((cita) => (
          <div
            key={cita.id}
            className="bg-gray-800 p-5 rounded-2xl"
          >
            <h2 className="text-xl font-semibold">{cita.nombre}</h2>

            <p className="text-gray-300">{cita.servicio}</p>

            <p className="text-yellow-400 font-semibold">
              💈 {cita.barbero || "Sin asignar"}
            </p>

            <p className="text-gray-400">
              {cita.fecha} - {cita.hora}
            </p>

            <p
              className={`mt-2 font-bold ${
                cita.estado === "confirmado"
                  ? "text-green-400"
                  : "text-yellow-400"
              }`}
            >
              {cita.estado}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              <button
                onClick={() => confirmarCita(cita)}
                className="bg-green-500 px-3 py-2 rounded"
              >
                Confirmar
              </button>

              <button
                onClick={() => enviarWhatsApp(cita)}
                className="bg-green-700 px-3 py-2 rounded"
              >
                WhatsApp
              </button>

              <button
                onClick={() => eliminarCita(cita.id)}
                className="bg-red-500 px-3 py-2 rounded"
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