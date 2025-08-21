import { useState } from "react";

const images = [
    // Imagenes del hermano de Ricardo
    "https://cdn.pixabay.com/photo/2017/08/07/14/02/man-2604149_1280.jpg",
    "https://cdn.pixabay.com/photo/2015/01/09/11/22/fitness-594143_1280.jpg",
    "https://cdn.pixabay.com/photo/2019/01/20/00/48/weights-3942914_1280.jpg"
];

export default function JumbotronCarousel() {
    const [current, setCurrent] = useState(0);

    const prevSlide = () => setCurrent((current - 1 + images.length) % images.length);
    const nextSlide = () => setCurrent((current + 1) % images.length);

    return (
        <section className="bg-black py-10">
            <div className="container mx-auto flex flex-col items-center">
                <h1 className="text-yellow-400 text-4xl font-bold mb-6 text-center">
                    ¡Bienvenido a Workout Studio!
                </h1>
                <div className="relative w-full max-w-2xl">
                    <img
                        src={images[current]}
                        alt={`Imagen ${current + 1}`}
                        className="rounded-lg shadow-lg w-full h-64 object-cover"
                    />
                    <button
                        onClick={prevSlide}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-yellow-400 text-black px-3 py-1 rounded-full shadow hover:bg-yellow-300 transition-colors"
                        aria-label="Anterior"
                    >
                        &#8592;
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-yellow-400 text-black px-3 py-1 rounded-full shadow hover:bg-yellow-300 transition-colors"
                        aria-label="Siguiente"
                    >
                        &#8594;
                    </button>
                </div>
                <div className="flex gap-2 mt-4">
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrent(idx)}
                            className={`w-3 h-3 rounded-full ${current === idx ? "bg-yellow-400" : "bg-gray-600"}`}
                            aria-label={`Ir a la imagen ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}