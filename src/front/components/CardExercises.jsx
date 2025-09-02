// src/components/CardExercises.jsx
import { useEffect, useRef, useState } from "react";
import ExerciseModal from "./ExerciseModal";
import FondosE from "../assets/img/FondosE.jpg";

const LS_KEY = "favExercises";

const CardExercises = ({ data, onToggleFavorite }) => {
  const [open, setOpen] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [favBurst, setFavBurst] = useState(false); // animación al marcar favorito
  const [inView, setInView] = useState(false);     // scroll reveal

  const cardRef = useRef(null);

  const cap = (s = "") => s.charAt(0).toUpperCase() + s.slice(1);

  const id = data?.id ?? data?._id ?? data?.name;
  const name = data?.name || "Exercise";
  const type = data?.equipment ? cap(data.equipment) : "Machine";
  const bodyPart = data?.bodyPart ? cap(data.bodyPart) : "—";
  const target = data?.target ? cap(data.target) : "—";
  const gifUrl = data?.gifUrl;

  // Estado inicial de favoritos
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return;
      const set = new Set(JSON.parse(raw));
      setIsFav(set.has(id));
    } catch {}
  }, [id]);

  // Scroll reveal con IntersectionObserver
  useEffect(() => {
    if (!cardRef.current) return;
    const el = cardRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Toggle favorito + animación
  const toggleFav = () => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      const set = new Set(arr);
      let next;
      if (set.has(id)) {
        set.delete(id);
        next = false;
      } else {
        set.add(id);
        next = true;
      }
      localStorage.setItem(LS_KEY, JSON.stringify([...set]));
      setIsFav(next);
      onToggleFavorite?.(id, next, data);
      // animación sutil al marcar
      if (next) {
        setFavBurst(true);
        setTimeout(() => setFavBurst(false), 450);
      }
    } catch {}
  };

  return (
    <>
      <div
        ref={cardRef}
        className={[
          "relative w-full h-100 sm:w-80 m-4 overflow-hidden rounded-2xl border border-white/30",
          "backdrop-blur-md bg-white/10 dark:bg-white/5 shadow-lg",
          "transition-all duration-500 will-change-transform",
          // scroll reveal
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          // hover lift
          "hover:-translate-y-2",
          // border glow dinámico
          "hover:[box-shadow:0_0_0_1px_rgba(255,255,255,0.18),0_0_24px_rgba(250,204,21,0.28)]"
        ].join(" ")}
      >
        {/* Fondo */}
        <img
          src={gifUrl || FondosE}
          alt={name}
          className={`absolute inset-0 w-full h-full object-cover ${
            gifUrl ? "opacity-25" : "opacity-30"
          } pointer-events-none transition-transform duration-500`}
          loading="lazy"
        />

        {/* Botón favorito */}
        <button
          type="button"
          aria-pressed={isFav}
          aria-label={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
          title={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
          onClick={(e) => {
            e.stopPropagation();
            toggleFav();
          }}
          className={[
            "absolute right-3 top-3 z-20 h-9 w-9 grid place-items-center rounded-xl",
            "border border-white/30 bg-black/30 backdrop-blur-md",
            "transition-all duration-200 hover:scale-105 active:scale-95"
          ].join(" ")}
        >
          {/* ping/burst al marcar */}
          {favBurst && (
            <span className="absolute inset-0 rounded-xl animate-ping bg-yellow-400/20" />
          )}
          <svg
            viewBox="0 0 24 24"
            className={`h-5 w-5 transition-all duration-300 ${
              isFav
                ? "fill-yellow-400 stroke-yellow-400 scale-110"
                : "fill-transparent stroke-yellow-400"
            }`}
            strokeWidth="1.6"
          >
            <path d="M12 17.27 6.18 20.5l1.12-6.54L2 9.24l6.59-.96L12 2l3.41 6.28 6.59.96-4.77 4.72 1.12 6.54L12 17.27z" />
          </svg>
        </button>

        {/* Contenido */}
        <div className="relative z-10 p-6 flex flex-col justify-between h-full">
          <h2 className="text-3xl font-bold text-white drop-shadow-lg">
            {cap(name)}
          </h2>

          <p className="text-white/80 text-sm mt-2">
            Type:
            <span className="ml-2 inline-block bg-white-500/20 text-white-300 text-xs px-3 py-1 rounded-full border border-white-400/30 backdrop-blur-sm">
              {type}
            </span>
          </p>

          <div className="mt-4 flex flex-col sm:flex-row sm:justify-between items-center gap-3">
            <div className="flex flex-wrap gap-2 pt-3">
              <span className="inline-block bg-blue-500/20 text-blue-300 text-xs px-3 py-1 rounded-full border border-blue-400/30 backdrop-blur-sm">
                {bodyPart}
              </span>
              <span className="inline-block bg-green-500/20 text-green-300 text-xs px-3 py-1 rounded-full border border-green-400/30 backdrop-blur-sm">
                {target}
              </span>
              <span className="inline-block bg-emerald-500/20 text-emerald-300 text-xs px-3 py-1 rounded-full border border-emerald-400/30 backdrop-blur-sm">
                Machine
              </span>
            </div>
          </div>

          <div className="mt-4">
            <button
              onClick={() => setOpen(true)}
              className="bg-yellow-300/50 backdrop-blur-lg hover:bg-gray-700/50 text-white px-4 py-2 rounded-lg transition duration-300 w-full sm:w-auto"
            >
              View
            </button>
          </div>
        </div>
      </div>

      <ExerciseModal open={open} onClose={() => setOpen(false)} data={data} />
    </>
  );
};

export default CardExercises;
