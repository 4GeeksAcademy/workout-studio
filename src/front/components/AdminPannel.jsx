// src/App.jsx
import React from 'react';

const AdminPannel = ()=> {
  const membersBars = [20, 40, 60, 80, 100, 120, 140];
  const progressBars = [50, 30, 70, 90, 60, 110, 80];
  const upcomingClasses = ["09:00 AM Spinning", "10:00 AM Yoga", "03:00 PM HIIT"];
  const trainerAvailability = ["Carlos - 10:00 AM", "Ana - 12:00 PM", "Luis - 4:00 PM"];

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans">
      {/* Header */}
      <header className="bg-[#b30000] p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">🏋️‍♂️ Gym Admin Panel</h1>
        <div className="space-x-4">
          <button className="text-white">🔔</button>
          <button className="text-white">👤</button>
        </div>
      </header>

      {/* Sidebar + Main */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 p-4">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">Alexander Pierce</h2>
            <p className="text-gray-400 text-sm">Admin</p>
          </div>
          <nav className="space-y-3">
            <a href="#" className="flex items-center text-gray-300 hover:text-white">
              <span className="mr-2">🏠</span> Dashboard
            </a>
            <a href="#" className="flex items-center text-gray-300 hover:text-white">
              <span className="mr-2">💪</span> Miembros
            </a>
            <a href="#" className="flex items-center text-gray-300 hover:text-white">
              <span className="mr-2">📅</span> Clases
            </a>
            <a href="#" className="flex items-center text-gray-300 hover:text-white">
              <span className="mr-2">📊</span> Reportes
            </a>
            <a href="#" className="flex items-center text-gray-300 hover:text-white">
              <span className="mr-2">⚙️</span> Configuración
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-900">
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-[#b30000] p-4 rounded shadow">
              <h3 className="text-sm text-gray-300">Miembros</h3>
              <p className="text-2xl font-bold text-white">2,540</p>
            </div>
            <div className="bg-gray-700 p-4 rounded shadow">
              <h3 className="text-sm text-gray-300">Nuevos registros</h3>
              <p className="text-2xl font-bold text-white">124</p>
            </div>
            <div className="bg-gray-700 p-4 rounded shadow">
              <h3 className="text-sm text-gray-300">Asistencia</h3>
              <p className="text-2xl font-bold text-white">86%</p>
            </div>
            <div className="bg-gray-700 p-4 rounded shadow">
              <h3 className="text-sm text-gray-300">Ingresos</h3>
              <p className="text-2xl font-bold text-white">$6,720</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-800 p-4 rounded shadow">
              <h3 className="text-sm text-gray-300 mb-2">Miembros por mes</h3>
              <div className="flex items-end space-x-2 h-32">
                {membersBars.map((height, i) => (
                  <div key={i} className="bg-[#b30000] w-6" style={{ height: `${height}px` }}></div>
                ))}
              </div>
            </div>
            <div className="bg-gray-800 p-4 rounded shadow">
              <h3 className="text-sm text-gray-300 mb-2">Progreso mensual</h3>
              <div className="flex items-end space-x-2 h-32">
                {progressBars.map((height, i) => (
                  <div key={i} className="bg-[#b30000] w-6" style={{ height: `${height}px` }}></div>
                ))}
              </div>
            </div>
          </div>

          {/* Schedule Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-4 rounded shadow">
              <h3 className="text-sm text-gray-300 mb-2">Clases próximas</h3>
              <ul className="space-y-1">
                {upcomingClasses.map((item, i) => (
                  <li key={i} className="text-gray-400">{item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-800 p-4 rounded shadow">
              <h3 className="text-sm text-gray-300 mb-2">Disponibilidad de entrenadores</h3>
              <ul className="space-y-1">
                {trainerAvailability.map((item, i) => (
                  <li key={i} className="text-gray-400">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminPannel;