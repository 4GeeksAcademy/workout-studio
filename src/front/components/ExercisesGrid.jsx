// src/components/ExercisesGrid.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import CardExercises from "./CardExercises";

const BASE = "https://exercisedb.p.rapidapi.com";
const EQUIPMENTS = [
  "machine",
  "assisted",
  "leverage machine",
  "sled machine",
  "smith machine",
];
const BATCH = 12;

const norm = (s = "") => String(s).toLowerCase();
const isAll = (v, label) => norm(v) === norm(label);

export default function ExercisesGrid({
  search = "",
  target = "All muscles",
  bodyPart = "All body parts",
}) {
  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(BATCH);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const sentinelRef = useRef(null);

  // ---- Fetch de ejercicios ----
  useEffect(() => {
    const load = async () => {
      try {
        const headers = {
          "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
          "x-rapidapi-host": "exercisedb.p.rapidapi.com",
        };

        const results = await Promise.all(
          EQUIPMENTS.map(async (eq) => {
            try {
              const res = await fetch(
                `${BASE}/exercises/equipment/${encodeURIComponent(eq)}`,
                { headers, cache: "no-store" }
              );
              if (!res.ok) return [];
              const data = await res.json();
              return Array.isArray(data) ? data : [];
            } catch {
              return [];
            }
          })
        );

        let merged = results.flat();

        if (!merged.length) {
          const res = await fetch(`${BASE}/exercises/equipmentList`, {
            headers,
            cache: "no-store",
          });
          merged = res.ok ? await res.json() : [];
        }

        // Deduplicar
        const seen = new Set();
        const unique = merged.filter((x) => {
          const key = x.id ?? norm(x.name);
          if (!key || seen.has(key)) return false;
          seen.add(key);
          return true;
        });

        setItems(unique);
        setVisible(Math.min(BATCH, unique.length));
      } catch (e) {
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // ---- Filtros ----
  const filtered = useMemo(() => {
    const q = norm(search);
    const tgt = norm(target);
    const bp = norm(bodyPart);
    return items.filter((x) => {
      const okTarget = isAll(target, "All muscles")
        ? true
        : norm(x.target) === tgt;
      const okBody = isAll(bodyPart, "All body parts")
        ? true
        : norm(x.bodyPart) === bp;
      const okSearch = q ? norm(x.name).includes(q) : true;
      return okTarget && okBody && okSearch;
    });
  }, [items, search, target, bodyPart]);

  // Reset visibles cuando cambian los filtros
  useEffect(() => {
    setVisible(Math.min(BATCH, filtered.length));
  }, [filtered.length, search, target, bodyPart]);

  // ---- Scroll infinito ----
  useEffect(() => {
    if (!sentinelRef.current) return;
    const el = sentinelRef.current;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible((v) => Math.min(v + BATCH, filtered.length));
        }
      },
      { rootMargin: "200px 0px" }
    );

    obs.observe(el);
    return () => obs.unobserve(el);
  }, [filtered.length]);

  // ---- Loading ----
  if (loading) {
    return (
      <div className="flex flex-row flex-wrap justify-center gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="w-full sm:w-80 h-64 m-4 animate-pulse rounded-2xl bg-[#111] border border-[#b30000]/40"
          />
        ))}
      </div>
    );
  }

  // ---- Error ----
  if (err) {
    return (
      <p className="text-[#ffcccc] bg-[#b30000]/20 border border-[#b30000]/40 px-3 py-2 rounded-lg text-center">
        Error cargando ejercicios: {err}
      </p>
    );
  }

  // ---- No resultados ----
  if (!filtered.length) {
    return (
      <p className="text-white/80 text-center italic">
        No se encontraron resultados. Prueba con otros filtros o búsqueda.
      </p>
    );
  }

  const visibleItems = filtered.slice(0, visible);
  const allLoaded = visibleItems.length >= filtered.length;

  return (
    <>
      {/* Contador */}
      <div className="flex justify-center mb-4 text-sm text-white/70">
        Mostrando{" "}
        <span className="mx-1 font-semibold text-[#b30000]">
          {visibleItems.length}
        </span>
        de{" "}
        <span className="mx-1 font-semibold text-white">
          {filtered.length}
        </span>{" "}
        ejercicios
      </div>

      {/* Grid */}
      <div className="flex flex-row flex-wrap justify-center gap-8">
        {visibleItems.map((ex, idx) => (
          <CardExercises key={`${ex.id || ex.name}-${idx}`} data={ex} />
        ))}
      </div>

      {/* Sentinel */}
      <div
        ref={sentinelRef}
        className="h-12 w-full flex items-center justify-center text-sm text-white/60 select-none"
      >
        {allLoaded ? (
          <span className="text-[#b30000] font-semibold">Todos cargados</span>
        ) : (
          "Cargando más…"
        )}
      </div>
    </>
  );
}
