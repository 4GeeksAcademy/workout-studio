// src/components/ExercisesSection.jsx
import { useEffect, useRef, useState, useMemo } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import ExercisesGrid from "./ExercisesGrid";

const TARGET_LIST_URL = "https://exercisedb.p.rapidapi.com/exercises/targetList";
const BODYPART_LIST_URL = "https://exercisedb.p.rapidapi.com/exercises/bodyPartList";

const cap = (s = "") => s.charAt(0).toUpperCase() + s.slice(1);

function Dropdown({ label, value, setValue, options }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="relative mt-3" ref={ref}>
      <button
        onClick={() => setOpen(v => !v)}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-[13px]
                   border border-white/10 bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]
                   backdrop-blur-sm hover:border-white/20 hover:bg-white/10 transition-colors
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
        aria-expanded={open}
      >
        <span className="text-slate-400">{label}:</span>
        <span className="text-slate-200 truncate max-w-[10rem]">{value}</span>
        <ChevronDown size={16} className={`text-slate-300 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <div className={`absolute left-0 mt-2 z-50 origin-top w-56 max-h-[60vh] overflow-auto
                      transition-all duration-150 ${open ? "opacity-100 scale-100" : "pointer-events-none opacity-0 scale-95"}`}>
        <div className="overflow-hidden rounded-md border border-white/10 bg-black/90 backdrop-blur-md shadow-xl">
          {options.map(opt => {
            const active = opt === value;
            return (
              <button
                key={opt}
                onClick={() => { setValue(opt); setOpen(false); }}
                className={`w-full text-left px-3 py-2 text-[13px] transition-colors
                           ${active ? "bg-white/10 text-white" : "text-slate-200 hover:bg-white/10 hover:text-white"}`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function ExercisesSection() {
  const [target, setTarget] = useState("All muscles");
  const [bodyPart, setBodyPart] = useState("All body parts");
  const [targets, setTargets] = useState(["All muscles"]);
  const [bodyParts, setBodyParts] = useState(["All body parts"]);
  const [search, setSearch] = useState("");

  // Cargar listas
  useEffect(() => {
    (async () => {
      try {
        const headers = {
          "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
          "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
        };
        const [rt, rb] = await Promise.all([
          fetch(TARGET_LIST_URL, { headers }),
          fetch(BODYPART_LIST_URL, { headers }),
        ]);
        const t = await rt.json();
        const b = await rb.json();
        setTargets(["All muscles", ...((Array.isArray(t) ? t : []).map(cap).sort())]);
        setBodyParts(["All body parts", ...((Array.isArray(b) ? b : []).map(cap).sort())]);
      } catch (e) {
        console.warn("List fetch error:", e);
      }
    })();
  }, []);

  // estado para deshabilitar "Limpiar filtros"
  const canClear = useMemo(() => {
    return search.trim() !== "" || target !== "All muscles" || bodyPart !== "All body parts";
  }, [search, target, bodyPart]);

  const clearFilters = () => {
    setSearch("");
    setTarget("All muscles");
    setBodyPart("All body parts");
  };

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <div className="max-w-screen-2xl mx-auto px-4 pt-8">
        {/* Header + controles */}
        <div className="flex flex-wrap items-start gap-4 mt-20">
          <h1 className="text-5xl font-bold tracking-tight">
            <span className="bg-gradient-to-b from-amber-300 to-amber-500 bg-clip-text text-transparent drop-shadow-sm">
              Exercises
            </span>
          </h1>

          {/* Search */}
          <div className="relative mt-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-md text-sm border border-white/10 bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-sm focus-within:ring-2 focus-within:ring-white/20 transition">
              <Search size={16} className="text-slate-300" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search exercise…"
                className="bg-transparent outline-none placeholder:text-slate-400 text-slate-100 w-56"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="ml-1 p-1 rounded hover:bg-white/10 transition-colors"
                  aria-label="Clear search"
                >
                  <X size={14} className="text-slate-300" />
                </button>
              )}
            </div>
          </div>

          {/* Dropdowns */}
          <Dropdown label="Target" value={target} setValue={setTarget} options={targets} />
          <Dropdown label="Body part" value={bodyPart} setValue={setBodyPart} options={bodyParts} />

          {/* Limpiar filtros */}
          <div className="mt-3">
            <button
              onClick={clearFilters}
              disabled={!canClear}
              className={[
                "inline-flex items-center gap-2 px-3 py-2 rounded-md text-[13px]",
                "border border-white/10 bg-white/5 text-white/90",
                "backdrop-blur-sm shadow-sm",
                "hover:bg-white/10 hover:border-white/20",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "transition-colors"
              ].join(" ")}
            >
              <X size={14} />
              Limpiar filtros
            </button>
          </div>
        </div>

        {/* contenido */}
        <div className="mt-8">
          <ExercisesGrid search={search} target={target} bodyPart={bodyPart} />
        </div>
      </div>
    </div>
  );
}
