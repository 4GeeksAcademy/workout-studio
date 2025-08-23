import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import CardExercises from "./CardExercises";

const ExercisesSection = () => {
  const [selected, setSelected] = useState("All machines");
  const [open, setOpen] = useState(false);
  const options = ["All machines", "Machine 1", "Machine 2", "Machine 3"];

  const ref = useRef(null);

  // cerrar con click fuera / ESC
  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <div className="max-w-screen-2xl mx-auto px-4 pt-8">
        {/* Header + control */}
        <div className="flex items-start gap-4 mt-20">
          <h1 className="text-5xl font-bold tracking-tight">
            <span className="bg-gradient-to-b from-amber-300 to-amber-500 bg-clip-text text-transparent drop-shadow-sm">
              Exercises
            </span>
          </h1>

          {/* dropdown */}
          <div ref={ref} className="relative mt-3">
            <button
              onClick={() => setOpen((v) => !v)}
              className={[
                "inline-flex items-center gap-2",
                "px-3 py-2 rounded-md text-[13px]",
                "border border-white/10 bg-black",
                "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]",
                "backdrop-blur-sm",
                "hover:border-white/20 hover:bg-white/10",
                "transition-colors",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
              ].join(" ")}
              aria-haspopup="listbox"
              aria-expanded={open}
            >
              <span className="text-slate-200">{selected}</span>
              <ChevronDown
                size={16}
                className={`text-slate-300 transition-transform ${open ? "rotate-180" : ""}`}
              />
            </button>

            {/* menú */}
            <div
              className={[
                "absolute left-0 mt-2 w-44 z-50 origin-top",
                "transition-all duration-150",
                open ? "opacity-100 scale-100" : "pointer-events-none opacity-0 scale-95"
              ].join(" ")}
            >
              <div className="overflow-hidden rounded-md border border-white/10 bg-black backdrop-blur-md shadow-xl">
                {options.map((opt) => {
                  const active = opt === selected;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setSelected(opt);
                        setOpen(false);
                      }}
                      role="option"
                      aria-selected={active}
                      className={[
                        "w-full text-left px-3 py-2 text-[13px] transition-colors",
                        active
                          ? "bg-white/10 text-white"
                          : "text-slate-200 hover:bg-white/10 hover:text-white"
                      ].join(" ")}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* contenido */}
        <div className="mt-8">
          <div className="flex flex-row flex-wrap justify-center gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <CardExercises key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExercisesSection;