import { useState, useEffect } from "react";

const images = [
  "https://cdn.pixabay.com/photo/2017/08/07/14/02/man-2604149_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/01/09/11/22/fitness-594143_1280.jpg",
  "https://cdn.pixabay.com/photo/2019/01/20/00/48/weights-3942914_1280.jpg"
];

export default function JumbotronCarousel() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () =>
    setCurrent((current - 1 + images.length) % images.length);
  const nextSlide = () => setCurrent((current + 1) % images.length);

  // Transición automática cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <section className="w-full h-screen bg-black flex flex-col justify-center items-center">
      <h1 className="text-yellow-400 text-4xl md:text-6xl font-bold mb-6 text-center px-4">
        ¡Bienvenido a Workout Studio!
      </h1>

      <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
        <img
          src={images[current]}
          alt={`Imagen ${current + 1}`}
          className="w-full h-full object-cover transition-all duration-700 ease-in-out"
        />

        {/* Botón anterior */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-yellow-500 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
          aria-label="Anterior"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Botón siguiente */}
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-yellow-500 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
          aria-label="Siguiente"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Indicadores */}
      <div className="flex gap-2 mt-6">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-4 h-4 rounded-full transition-all ${
              current === idx ? "bg-yellow-400 scale-110" : "bg-gray-600"
            }`}
            aria-label={`Ir a la imagen ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
