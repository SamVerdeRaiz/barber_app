import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      navigate("/admin"); // 👈 aquí conectas login → admin
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-8 rounded-2xl w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Login Admin 🔐
        </h2>

        <input
          type="email"
          placeholder="Correo"
          className="w-full mb-4 p-3 rounded bg-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="w-full mb-6 p-3 rounded bg-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-green-500 py-3 rounded-lg hover:bg-green-600">
          Entrar
        </button>
      </form>
    </div>
  );
}