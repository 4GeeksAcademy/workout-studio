import React from "react";
import {
  User, ClipboardList, CalendarDays, Dumbbell, Clock, DollarSign, LogOut
} from "lucide-react";

const UserDashboard = () => {
  return (
    <div className="relative h-screen bg-black text-white flex">
      {/* Fondo */}
      <div className="absolute inset-0 bg-[url('https://cdn.pixabay.com/photo/2024/03/30/19/29/ai-generated-8665327_1280.png')] bg-cover bg-center opacity-10 z-0"></div>

      {/* Panel izquierdo */}
      <div className="relative z-10 w-64 bg-black/80 backdrop-blur-md flex flex-col p-6">
        <h2 className="text-2xl font-bold text-red-800 mb-8">GYRON STUDIO</h2>
        <nav className="space-y-4 text-gray-300">
          <NavItem icon={<User size={18} />} label="Perfil" />
          <NavItem icon={<ClipboardList size={18} />} label="Mi Plan" />
          <NavItem icon={<CalendarDays size={18} />} label="Reservas" />
          <NavItem icon={<Dumbbell size={18} />} label="Rutinas" />
          <NavItem icon={<Clock size={18} />} label="Progreso" />
          <NavItem icon={<DollarSign size={18} />} label="Pagos" />
          <NavItem icon={<LogOut size={18} />} label="Salir" hoverColor="red-600" />
        </nav>
      </div>

      {/* Panel principal */}
      <div className="relative z-10 flex-1 p-8 overflow-y-auto">
        {/* Bienvenida */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-white mb-2">¡Hola, bienvenido a Gyron Studio!</h1>
          <p className="text-gray-300">Tu meta está más cerca de lo que piensas</p>
        </div>

        {/* Perfil y progreso */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Información del usuario */}
          <div className="flex flex-col items-center lg:items-start gap-4 bg-gray-900/50 backdrop-blur-md p-6 rounded-2xl border border-gray-300/30 shadow-lg w-full lg:w-1/3">
            <img
              src="https://png.pngtree.com/png-clipart/20191122/original/pngtree-physical-fitness-sport-gym-logo-bodybuilder-with-big-muscles-posing-isolated-png-image_5172932.jpg"
              alt="Gym Logo"
              className="w-32 h-32 rounded-full object-cover border-4 border-red-800"
            />
            <div className="text-center lg:text-left space-y-1">
              <h2 className="text-red-800 font-extrabold text-xl">USERNAME</h2>
              <p className="text-gray-300">Nombre: FIRST NAME LAST NAME</p>
              <p className="text-gray-300">Email: user@example.com</p>
            </div>
          </div>

          {/* Panel de progreso y plan */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Progreso */}
            <Card title="Progreso semanal">
              <ProgressBar label="Cardio" value={70} />
              <ProgressBar label="Fuerza" value={55} />
              <ProgressBar label="Flexibilidad" value={40} />
            </Card>

            {/* Plan actual */}
            <Card title="Mi plan actual">
              <div className="space-y-2">
                <div className="flex justify-between text-gray-300">
                  <span>Objetivo</span>
                  <span className="font-semibold text-white">Pérdida de grasa</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Plan</span>
                  <span className="font-semibold text-white">Pro</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Próxima sesión</span>
                  <span className="font-semibold text-white">Lun 10:00</span>
                </div>
              </div>
            </Card>

            {/* Rutinas recientes */}
            <Card title="Rutinas recientes" className="md:col-span-2">
              <ul className="space-y-2 text-gray-300">
                <li className="flex justify-between bg-gray-800/40 p-2 rounded-lg">
                  <span>Pecho y tríceps</span>
                  <span className="text-red-800 font-semibold">3×12</span>
                </li>
                <li className="flex justify-between bg-gray-800/40 p-2 rounded-lg">
                  <span>Espalda y bíceps</span>
                  <span className="text-red-800 font-semibold">3×10</span>
                </li>
                <li className="flex justify-between bg-gray-800/40 p-2 rounded-lg">
                  <span>Piernas</span>
                  <span className="text-red-800 font-semibold">4×15</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------- Componentes auxiliares -------------------- */

const NavItem = ({ icon, label, hoverColor = "red-800" }) => (
  <div className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:text-${hoverColor} transition`}>
    {icon} <span>{label}</span>
  </div>
);

const Card = ({ title, children, className = "" }) => (
  <div className={`bg-gray-900/50 backdrop-blur-md rounded-2xl border border-gray-300/30 p-4 shadow-lg ${className}`}>
    <h3 className="text-red-800 font-bold mb-3">{title}</h3>
    {children}
  </div>
);

const ProgressBar = ({ label, value }) => (
  <div className="mb-2">
    <div className="flex justify-between text-xs text-gray-300 mb-1">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="h-2 w-full rounded-full bg-gray-800/40 overflow-hidden">
      <div className="h-full rounded-full bg-gradient-to-r from-red-800 to-gray-300" style={{ width: `${value}%` }} />
    </div>
  </div>
);

export default UserDashboard;
