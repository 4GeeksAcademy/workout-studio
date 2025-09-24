import React from 'react';

const AboutGyronStudio = () => {
  return (
    <section className="bg-black text-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6" style={{ color: '#FFB901' }}>
          Acerca de Gyron Studio
        </h1>

        <p className="text-lg mb-4">
          En <strong>Gyron Studio</strong>, redefinimos el concepto de gimnasio. Somos un espacio diseñado para potenciar tu cuerpo y mente, combinando entrenamiento funcional, fuerza, cardio y bienestar integral.
        </p>

        <p className="text-lg mb-4">
          Nuestra misión es ayudarte a alcanzar tus metas con un enfoque personalizado, tecnología de punta y un ambiente motivador. Creemos que el movimiento transforma vidas.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4" style={{ color: '#FFB901' }}>
          ¿Por qué elegirnos?
        </h2>
        <ul className="list-disc pl-6 text-gray-300">
          <li>Entrenadores certificados y apasionados</li>
          <li>Instalaciones modernas y seguras</li>
          <li>Clases grupales, personalizadas y virtuales</li>
          <li>Ambiente inclusivo y motivador</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4" style={{ color: '#FFB901' }}>
          Contáctanos
        </h2>
        <p className="text-gray-300">
          📍 San Miguel, Alajuela, Costa Rica<br />
          📧 contacto@gyronstudio.com<br />
          📱 +506 8888-8888
        </p>
      </div>
    </section>
  );
};

export default AboutGyronStudio;
