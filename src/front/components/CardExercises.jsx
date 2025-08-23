import FondosE from "../assets/img/FondosE.jpg";
import FondoEj from "../assets/img/FondoEj.jpg";
import { useState, useEffect } from "react";

const CardExercises = () => {
    const regionImages = {
        kanto: FondosE,
        johto: FondoEj,
        hoenn: FondosE,
        sinnoh: FondoEj,
        unova: FondosE,
        kalos: FondosE,
        alola: FondosE,
        galar: FondosE,
        paldea: FondosE,
        hisui: FondosE,
    };
    ;

    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    return (
        <>
                <div
                    className="relative w-full h-100 sm:w-80 m-4 backdrop-blur-md bg-white/10 dark:bg-white/5 border border-white/30 rounded-2xl shadow-lg overflow-hidden transition transform hover:-translate-y-2 hover:shadow-2xl duration-300"
                >
                    <img
                        src={FondosE}
                        alt="Fondo"
                        className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
                    />
                    <div className="relative z-10 p-6 flex flex-col justify-between h-full">
                        <h2 className="text-3xl font-bold text-white drop-shadow-lg">
                            Name Machine
                        </h2>
                        {/* <p className="text-white/80 mt-2 text-sm md:text-base">
                            Juegos: {region.version_groups.length}
                        </p> */}
                        <p className="text-white/80 text-sm">
                            Type:
                            <span className="ml-2 inline-block bg-white-500/20 text-white-300 text-xs px-3 py-1 rounded-full border border-white-400/30 backdrop-blur-sm">
                                Strength
                            </span>
                        </p>
                        <div className="mt-4 flex flex-col sm:flex-row sm:justify-between items-center gap-3">
                            <div className="flex flex-wrap gap-2 pt-3">

                                <span className="inline-block bg-blue-500/20 text-blue-300 text-xs px-3 py-1 rounded-full border border-blue-400/30 backdrop-blur-sm">
                                    High
                                </span>
                                <span className="inline-block bg-green-500/20 text-green-300 text-xs px-3 py-1 rounded-full border border-green-400/30 backdrop-blur-sm">
                                    Biceps
                                </span>
                                <span className="inline-block bg-green-500/20 text-green-300 text-xs px-3 py-1 rounded-full border border-green-400/30 backdrop-blur-sm">
                                    Beginner
                                </span>
                            </div>
                        </div>
                        <div>
                            <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition duration-300 w-full sm:w-auto">
                                View
                            </button>
                        </div>
                    </div>
                </div>
        </>
    );
};

export default CardExercises;
