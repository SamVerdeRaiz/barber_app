import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);
    };

    checkUser();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-white bg-gray-900">
        Cargando...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}