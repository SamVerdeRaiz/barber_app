import { supabase } from "../lib/supabase";

export default async function handler(req, res) {
  const mañana = new Date();
  mañana.setDate(mañana.getDate() + 1);
  const fecha = mañana.toISOString().split("T")[0];

  const { data } = await supabase
    .from("citas")
    .select("*")
    .eq("fecha", fecha);

  data.forEach(cita => {
    const mensaje = `Hola ${cita.nombre}, te recordamos tu cita mañana a las ${cita.hora} 💈`;

    const telefono = cita.telefono.replace(/\D/g, "");

    fetch(`https://api.callmebot.com/whatsapp.php?phone=52${telefono}&text=${encodeURIComponent(mensaje)}&apikey=TU_API_KEY`);
  });

  res.status(200).json({ ok: true });
}