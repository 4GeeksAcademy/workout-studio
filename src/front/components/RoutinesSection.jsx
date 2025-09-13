// src/components/RoutinesSection.jsx
import { useEffect, useState } from "react";
import { fetchMachineExercises } from "./exerciseService";
import { buildRoutinesFromExercises } from "./routineBuilder";
import RoutineCard from "./RoutineCard";

export default function RoutinesSection() {
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const ex = await fetchMachineExercises();
        const rts = buildRoutinesFromExercises(ex);
        setRoutines(rts);
      } catch (e) {
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-black text-white">
        <div className="max-w-screen-2xl mx-auto px-4 pt-28">
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-b from-amber-300 to-amber-500 bg-clip-text text-transparent drop-shadow-sm">
              Routines
            </span>
          </h1>
          <div className="flex flex-row flex-wrap justify-center gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-full sm:w-80 h-64 m-4 animate-pulse rounded-2xl bg-white/5 border border-white/10" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (err) {
    return (
      <div className="min-h-screen w-full bg-black text-white">
        <div className="max-w-screen-2xl mx-auto px-4 pt-28">
          <p className="text-red-300 bg-red-900/20 border border-red-500/30 px-3 py-2 rounded">
            Error cargando rutinas: {err}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <div className="max-w-screen-2xl mx-auto px-4 pt-28">
        <div className="flex items-start gap-4 mb-2">
          <h1 className="text-5xl font-bold tracking-tight">
            <span className="bg-gradient-to-b from-amber-300 to-amber-500 bg-clip-text text-transparent drop-shadow-sm">
              Routines
            </span>
          </h1>
        </div>

        <div className="flex flex-row flex-wrap justify-center gap-8">
          {routines.map((r) => (
            <RoutineCard key={r.id} routine={r} />
          ))}
        </div>
      </div>
    </div>
  );
}
