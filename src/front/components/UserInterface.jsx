import React from 'react';

const UserInterface = () => {
  return (
    <div className="relative h-screen -">

      <div className="absolute inset-0 bg-[url('https://cdn.pixabay.com/photo/2024/03/30/19/29/ai-generated-8665327_1280.png')] bg-cover bg-center opacity-10 z-0"></div>


      <div className="relative z-10  ">
        <div className="max-w-4xl mx-auto mt-2 mb-2 place-items-center">
          <h1 className="font-bold text-white text-4xl">HOLA, BIENVENIDO A GYRON STUDIO</h1>
          <h3 className="text-white">TU META ESTÁ MÁS CERCA DE LO QUE PIENSAS</h3>
        </div>
        <div className="flex flex-row ">
          <div className="ms-5 mt-14 text-white space-y-2">
            <div className='hover:text-red-800'><i className="fa-solid fa-user"></i> PERFIL</div>
            <div className='hover:text-red-800'><i className="fa-solid fa-clipboard-list"></i> MI PLAN</div>
            <div className='hover:text-red-800'><i className="fa-solid fa-calendar-days"></i> RESERVAS</div>
            <div className='hover:text-red-800'><i className="fa-solid fa-dumbbell"></i> RUTINAS</div>
            <div className='hover:text-red-800'><i className="fa-solid fa-clock"></i> PROGRESO</div>
            <div className='hover:text-red-800'><i className="fa-solid fa-dollar-sign"></i> PAGOS</div>
            <div className='hover:text-red-800'><i className="fa-solid fa-right-from-bracket"></i> SALIR</div>
          </div>
          <div className='m-auto flex flex-row'>

            <div className='m-auto mt-14 ms-2 '>
              <img
                src="https://png.pngtree.com/png-clipart/20191122/original/pngtree-physical-fitness-sport-gym-logo-bodybuilder-with-big-muscles-posing-isolated-png-image_5172932.jpg"
                alt="Gym Logo"
                className="w-32 h-32 rounded-full object-cover"
              />
            </div>
            <div className='flex flex-row items-center'>
              <h1 className='p-2 text-red-800 font-extrabold'>USERNAME</h1>
              <h1 className='p-2 text-red-800 font-extrabold'>FIRST NAME</h1>
              <h1 className='p-2 text-red-800 font-extrabold'>LAST NAME</h1>
              <h1 className='p-2 text-red-800 font-extrabold'>Email</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInterface;
