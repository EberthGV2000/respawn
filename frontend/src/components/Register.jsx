import { useState } from "react";
import { AuthProvider, useAuth } from "../context/AuthContext";

function RegisterForm() {
  const { register } = useAuth();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form.username, form.email, form.password);
      window.location.href = "/";
    } catch (err) {
      setError("Error al registrarse, intenta de nuevo");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-2xl w-full max-w-md shadow-xl">
        <h1 className="text-3xl font-bold text-green-400 mb-2 text-center">Respawn</h1>
        <p className="text-gray-400 text-center mb-6">Crea tu cuenta gamer</p>

        {error && (
          <p className="bg-red-500/20 text-red-400 text-sm p-3 rounded-lg mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            value={form.username}
            onChange={handleChange}
            className="bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
            required
          />
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
            Crear cuenta
          </button>
        </form>

        <p className="text-gray-400 text-center mt-4 text-sm">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="text-green-400 hover:underline">Inicia sesión</a>
        </p>
      </div>
    </div>
  );
}

export default function Register() {
  return (
    <AuthProvider>
      <RegisterForm />
    </AuthProvider>
  );
}