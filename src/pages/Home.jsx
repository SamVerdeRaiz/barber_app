import { Link } from "react-router-dom"; // 👈 nuevo

import Hero from "../components/Hero";
import Benefits from "../components/Benefits";
import Services from "../components/Services";
import HowItWork from "../components/HowItWork";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Location from "../components/Location";
import WhatsAppFloat from "../components/WhatsAppFloat";
import BookingForm from "../components/BookingForm";

export default function Home() {
  return (
    <>
      {/* BOTÓN ADMIN (flotante arriba derecha) */}
      <div className="fixed top-4 right-4 z-50">
        <Link
          to="/login"
          className="bg-black/80 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition"
        >
          Admin
        </Link>
      </div>

      <Hero />
      <Benefits />
      <Services />
      <HowItWork />
      <Testimonials />
      <CTA />
      <BookingForm />
      <Location />
      <WhatsAppFloat />
    </>
  );
}