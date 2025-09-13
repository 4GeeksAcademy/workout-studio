// src/components/RoutineModal.jsx
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import FondosE from "../assets/img/FondosE.jpg";

export default function RoutineModal({ open, onClose, routine }) {
  const [isClosing, setIsClosing] = useState(false);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!(open || isClosing)) return;
    const onKey = (e) => e.key === "Escape" && handleClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setTimeout(() => closeBtnRef.current?.focus(), 0);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, isClosing]);

  if (!open && !isClosing) return null;

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => { setIsClosing(false); onClose?.(); }, 180);
  };

  const hero = routine.exercises[0]?.gifUrl || FondosE;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-200 ${open && !isClosing ? "opacity-100" : "opacity-0"}`}
      onClick={handleClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        className={`relative w-[100vw] h-[100dvh] sm:w-[min(1100px,95vw)] sm:h-[min(90vh,900px)] sm:rounded-2xl rounded-none
                    border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl overflow-hidden
                    ${open && !isClosing ? "animate-[modalIn_160ms_ease-out]" : "animate-[modalOut_180ms_ease-in]"}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={routine.title}
      >
        {/* fondo */}
        <div className="absolute inset-0">
          <img src={hero} alt="" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black/70" />
        </div>

        {/* header sticky */}
        <div className="sticky top-0 z-20">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10 bg-black/50 backdrop-blur-xl">
            <div className="min-w-0">
              <h3 className="text-xl sm:text-3xl font-extrabold tracking-tight truncate">{routine.title}</h3>
              <div className="mt-2 flex flex-wrap gap-2 text-xs sm:text-sm">
                <span className="px-2.5 py-1 rounded-full border border-white/15 bg-white/10">Goal: {routine.goal}</span>
                <span className="px-2.5 py-1 rounded-full border border-white/15 bg-white/10">Difficulty: {routine.difficulty}</span>
                <span className="px-2.5 py-1 rounded-full border border-white/15 bg-white/10">{routine.scheme}</span>
              </div>
            </div>

            <button
              ref={closeBtnRef}
              onClick={handleClose}
              className="p-3 sm:p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* body */}
        <div className="relative z-10 h-[calc(100%-60px)] sm:h-[calc(100%-84px)] overflow-y-auto">
          <section className="p-4 sm:p-8">
            {routine.blocks.map((b) => (
              <div key={b.label} className="mb-8">
                <h4 className="text-lg font-semibold mb-3">{b.label}</h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {b.exercises.map((ex) => (
                    <div key={ex.id ?? ex.name} className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                      <div className="flex gap-3 p-3">
                        <img
                          src={ex.gifUrl || FondosE}
                          alt={ex.name}
                          className="w-28 h-24 object-cover rounded-lg border border-white/10"
                          loading="lazy"
                        />
                        <div className="min-w-0">
                          <div className="font-semibold truncate">{ex.name}</div>
                          <div className="flex flex-wrap gap-1 mt-1 text-[11px]">
                            <span className="px-2 py-0.5 rounded-full border border-white/10 bg-white/10">Target: {ex.target}</span>
                            <span className="px-2 py-0.5 rounded-full border border-white/10 bg-white/10">Body: {ex.bodyPart}</span>
                            <span className="px-2 py-0.5 rounded-full border border-white/10 bg-white/10">Equip: {ex.equipment}</span>
                          </div>
                          <div className="mt-2 text-xs text-white/80">
                            3×10–12 · 60–90s rest
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>

      <style>{`
        @keyframes modalIn { from { opacity:0; transform: translateY(12px) scale(0.985);} to {opacity:1; transform: translateY(0) scale(1);} }
        @keyframes modalOut{ from { opacity:1; transform: translateY(0) scale(1);} to {opacity:0; transform: translateY(10px) scale(0.985);} }
      `}</style>
    </div>
  );
}
