export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-400 mb-4">Respawn</h1>
        <p className="text-gray-400 mb-6">Tu red social gamer</p>
        <div className="flex gap-4 justify-center">
          <a href="/login" className="bg-green-400 text-gray-950 font-bold px-6 py-3 rounded-lg hover:bg-green-300 transition">
            Iniciar sesión
          </a>
          <a href="/register" className="bg-gray-800 text-white font-bold px-6 py-3 rounded-lg hover:bg-gray-700 transition">
            Registrarse
          </a>
        </div>
      </div>
    </div>
  );
}