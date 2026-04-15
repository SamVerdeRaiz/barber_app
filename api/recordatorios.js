import { createClient } from "@supabase/supabase-js";

// 🔐 Cliente seguro para backend (usa variables de entorno en Vercel)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  try {
    // 📅 Fecha de mañana
    const manana = new Date();
    manana.setDate(manana.getDate() + 1);
    const fecha = manana.toISOString().split("T")[0];

    // 🔎 Obtener citas de mañana
    const { data, error } = await supabase
      .from("citas")
      .select("*")
      .eq("fecha", fecha);

    if (error) {
      console.error("Error Supabase:", error);
      return res.status(500).json({ ok: false, error });
    }

    if (!data || data.length === 0) {
      console.log("No hay citas para mañana");
      return res.status(200).json({ ok: true, message: "Sin citas" });
    }

    // 🔁 Enviar recordatorios
    for (const cita of data) {
      const mensaje = `Hola ${cita.nombre}, te recordamos tu cita mañana a las ${cita.hora} 💈`;

      const telefono = (cita.telefono || "").replace(/\D/g, "");

      if (!telefono) continue;

      try {
        await fetch(
          `https://api.callmebot.com/whatsapp.php?phone=52${telefono}&text=${encodeURIComponent(mensaje)}&apikey=sb_publishable_VT8zMemcFqijDaeU1mANDw_SiqasjjE`
        );

        console.log(`✅ Enviado a ${telefono}`);
      } catch (err) {
        console.error("Error enviando mensaje:", err);
      }
    }

    return res.status(200).json({ ok: true });

  } catch (err) {
    console.error("Error general:", err);
    return res.status(500).json({ ok: false });
  }
}