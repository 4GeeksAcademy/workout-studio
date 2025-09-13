// src/components/RoutineCard.jsx
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import RoutineModal from "./RoutineModal";
import FondosE from "../assets/img/FondosE.jpg";

export default function RoutineCard({ routine }) {
  const [open, setOpen] = useState(false);
  const cover = routine.exercises[0]?.gifUrl || FondosE;

  return (
    <>
      <div className="relative w-full sm:w-80 m-4 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl overflow-hidden shadow-lg transition transform hover:-translate-y-1 hover:shadow-2xl">
        <img src={cover} alt={routine.title} className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none" />
        <div className="relative z-10 p-6 space-y-3">
          <h3 className="text-2xl font-extrabold">{routine.title}</h3>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-full border border-white/15 bg-white/10">Goal: {routine.goal}</span>
            <span className="px-2.5 py-1 rounded-full border border-white/15 bg-white/10">Difficulty: {routine.difficulty}</span>
          </div>
          <p className="text-white/80 text-sm">{routine.scheme}</p>

          <div className="flex flex-wrap gap-2 pt-1">
            {routine.blocks.slice(0, 3).map((b) => (
              <span key={b.label} className="px-2.5 py-1 rounded-full border border-white/15 bg-white/10 text-xs">
                {b.label}
              </span>
            ))}
            {routine.blocks.length > 3 && (
              <span className="px-2.5 py-1 rounded-full border border-white/15 bg-white/10 text-xs">+ more</span>
            )}
          </div>

          <button
            onClick={() => setOpen(true)}
            className="mt-2 inline-flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition"
          >
            Ver rutina <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <RoutineModal open={open} onClose={() => setOpen(false)} routine={routine} />
    </>
  );
}
