import { useState } from "react";
import { AuthProvider, useAuth } from "../context/AuthContext";

function LoginForm() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      window.location.href = "/";
    } catch (err) {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-2xl w-full max-w-md shadow-xl">
        <h1 className="text-3xl font-bold text-green-400 mb-2 text-center">Respawn</h1>
        <p className="text-gray-400 text-center mb-6">Inicia sesión en tu cuenta</p>

        {error && (
          <p className="bg-red-500/20 text-red-400 text-sm p-3 rounded-lg mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            className="bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            className="bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <button
            type="submit"
            className="bg-green-400 text-gray-950 font-bold py-3 rounded-lg hover:bg-green-300 transition"
          >
            Iniciar sesión
          </button>
        </form>

        <p className="text-gray-400 text-center mt-4 text-sm">
          ¿No tienes cuenta?{" "}
          <a href="/register" className="text-green-400 hover:underline">Regístrate</a>
        </p>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <AuthProvider>
      <LoginForm />
    </AuthProvider>
  );
}