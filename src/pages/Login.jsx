import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👁️ NUEVO

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Error: " + error.message);
    } else {
      navigate("/admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleLogin}
        className="bg-white text-black p-8 rounded-2xl w-full max-w-sm shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Login Admin 🔐
        </h2>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Correo"
          className="w-full mb-4 p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD CON OJITO */}
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* 👁️ BOTÓN */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-600 hover:text-black"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
          Entrar
        </button>
      </form>
    </div>
  );
}