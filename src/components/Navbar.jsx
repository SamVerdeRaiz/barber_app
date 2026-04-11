import { useState, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // 🔒 BLOQUEAR SCROLL
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-black/70 backdrop-blur-md text-white">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          
          {/* LOGO */}
          <h1 className="font-bold text-lg">💈 BarberPro</h1>

          {/* LINKS DESKTOP */}
          <div className="hidden md:flex gap-6 text-sm">
            <a href="#inicio">Inicio</a>
            <a href="#services">Servicios</a>
            <a href="#how">Cómo funciona</a>
            <a href="#testimonials">Opiniones</a>
            <a href="#location">Ubicación</a>
          </div>

          {/* CTA DESKTOP */}
          <a
            href="#booking"
            className="hidden md:block bg-green-500 px-4 py-2 rounded-lg text-sm font-semibold"
          >
            Agendar
          </a>

          {/* 🍔 BOTÓN MOBILE */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-2xl"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* 🔥 OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40"
        ></div>
      )}

      {/* 📂 MENÚ LATERAL */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-black text-white z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          
          {/* ❌ CERRAR */}
          <button
            onClick={() => setOpen(false)}
            className="text-right text-2xl mb-6"
          >
            ✕
          </button>

          {/* LINKS */}
          <div className="flex flex-col gap-4 text-lg">
            <a href="#Hero" onClick={() => setOpen(false)}>Inicio</a>
            <a href="#BookingForm" onClick={() => setOpen(false)}>Agendar</a>
            <a href="#Benefist" onClick={() => setOpen(false)}>Conocenos</a>
            
            <a href="#Services" onClick={() => setOpen(false)}>Servicios</a>
            
            <a href="#Testimonials" onClick={() => setOpen(false)}>Opiniones</a>
            <a href="#Location" onClick={() => setOpen(false)}>Ubicación</a>
            
          </div>

          {/* 👇 ESPACIO */}
          <div className="mt-auto pt-10 border-t border-gray-700">
            
            {/* ADMIN */}
            <a
              href="/admin"
              className="block text-center mt-6 text-gray-400 hover:text-white"
            >
              Admin
            </a>
          </div>

        </div>
      </div>
    </>
  );
}