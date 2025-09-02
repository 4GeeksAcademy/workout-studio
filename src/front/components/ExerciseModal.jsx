// src/components/ExerciseModal.jsx
import { useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import FondosE from "../assets/img/FondosE.jpg";

export default function ExerciseModal({ open, onClose, data, youtubeUrl = "", extraImages = [] }) {
  const [isClosing, setIsClosing] = useState(false);
  const [idx, setIdx] = useState(0);
  const closeBtnRef = useRef(null);
  const swipeRef = useRef({ x: 0, y: 0 });

  const cap = (s = "") => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "");
  const name = cap(data?.name ?? "");
  const bodyPart = cap(data?.bodyPart ?? "");
  const target = cap(data?.target ?? "");
  const equipment = cap(data?.equipment ?? "");
  const gifUrl = data?.gifUrl || data?.image || "";
  const secondaryMuscles = data?.secondaryMuscles || [];
  const instructions = Array.isArray(data?.instructions) ? data.instructions : [];

  const videoUrl = data?.video || youtubeUrl || "";
  const gallery = [gifUrl || FondosE, ...extraImages.filter(Boolean)];
  const hasGallery = gallery.length > 0;

  const prev = () => setIdx((p) => (p === 0 ? gallery.length - 1 : p - 1));
  const next = () => setIdx((p) => (p === gallery.length - 1 ? 0 : p + 1));
  const goTo = (i) => setIdx(i);

  // ESC / arrows / focus / scroll lock
  useEffect(() => {
    if (!(open || isClosing)) return;
    const onKey = (e) => {
      if (e.key === "Escape") handleClose();
      if (!hasGallery) return;
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setTimeout(() => closeBtnRef.current?.focus(), 0);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, isClosing, hasGallery]);

  if (!open && !isClosing) return null;

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose?.();
      setIdx(0);
    }, 180);
  };

  // Swipe móvil
  const onTouchStart = (e) => {
    const t = e.touches[0];
    swipeRef.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e) => {
    if (!hasGallery) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - swipeRef.current.x;
    const dy = t.clientY - swipeRef.current.y;
    if (Math.abs(dx) > 40 && Math.abs(dy) < 60) (dx < 0 ? next() : prev());
  };

  return (
    <div
      className={[
        "fixed inset-0 z-[100] flex items-center justify-center",
        "transition-opacity duration-200",
        open && !isClosing ? "opacity-100" : "opacity-0",
      ].join(" ")}
      onClick={handleClose}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className={[
          "relative w-[100vw] h-[100dvh] rounded-none",
          "sm:w-[min(1200px,95vw)] sm:h-[min(92vh,950px)] sm:rounded-2xl",
          "border border-white/10 bg-neutral-900/10 backdrop-blur-sm shadow-2xl overflow-hidden",
          open && !isClosing ? "animate-[modalIn_160ms_ease-out]" : "animate-[modalOut_180ms_ease-in]",
        ].join(" ")}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={name || "Exercise details"}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/*Fondo*/}
        <div className="absolute inset-0 pointer-events-none">
          {gifUrl ? (
            <img src={gifUrl} alt={name} className="w-full h-full object-cover opacity-10" loading="lazy" />
          ) : (
            <div className="w-full h-full" />
          )}
        </div>

        {/* HEADER sticky (lo dejamos igual) */}
        <div className="sticky top-0 z-20">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10 bg-black/50 backdrop-blur-xl">
            <div className="min-w-0">
              <h3 className="text-xl sm:text-3xl font-extrabold tracking-tight truncate">{name}</h3>
              <div className="mt-2 flex flex-wrap gap-2 text-xs sm:text-sm">
                {equipment && (
                  <span className="px-2.5 py-1 rounded-full border border-white/15 bg-white/10">
                    Equipment: {equipment}
                  </span>
                )}
                {bodyPart && (
                  <span className="px-2.5 py-1 rounded-full border border-white/15 bg-blue-500/20 text-blue-300">
                    Body: {bodyPart}
                  </span>
                )}
                {target && (
                  <span className="px-2.5 py-1 rounded-full border border-white/15 bg-green-500/20 text-green-300">
                    Target: {target}
                  </span>
                )}
                {!!secondaryMuscles.length && (
                  <span className="px-2.5 py-1 rounded-full border border-white/15 bg-red-500/20 text-red-300">
                    Secondary: {secondaryMuscles.map(cap).join(", ")}
                  </span>
                )}
              </div>
            </div>

            <button
              ref={closeBtnRef}
              onClick={handleClose}
              className="p-3 sm:p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* BODY scrollable */}
        <div className="relative z-10 h-[calc(100%-60px)] sm:h-[calc(100%-84px)] overflow-y-auto">
          {/* === NUEVO LAYOUT: split tipo ficha === */}
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

              {/* IZQUIERDA: Galería en tarjeta + thumbs */}
              <section className="lg:col-span-7">
                <h4 className="text-base sm:text-lg font-semibold mb-3">Gallery</h4>

                <div className="relative rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                  <div className="aspect-video w-full">
                    <img
                      key={idx}
                      src={gallery[idx]}
                      alt={`gallery-${idx}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Controles */}
                  {gallery.length > 1 && (
                    <>
                      <button
                        onClick={prev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 hover:bg-black/60 transition"
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        onClick={next}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 hover:bg-black/60 transition"
                        aria-label="Next image"
                      >
                        <ChevronRight size={18} />
                      </button>

                      {/* Dots */}
                      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
                        {gallery.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => goTo(i)}
                            className={[
                              "h-2.5 rounded-full transition-all",
                              i === idx ? "w-6 bg-white" : "w-2.5 bg-white/50 hover:bg-white/70",
                            ].join(" ")}
                            aria-label={`Go to ${i + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Thumbnails (si hay más de 1) */}
                {gallery.length > 1 && (
                  <div className="mt-3 grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {gallery.map((src, i) => (
                      <button
                        key={`thumb-${i}`}
                        onClick={() => goTo(i)}
                        className={[
                          "relative aspect-video overflow-hidden rounded-lg border",
                          i === idx
                            ? "border-yellow-400"
                            : "border-white/10 hover:border-white/30",
                        ].join(" ")}
                        aria-label={`Thumb ${i + 1}`}
                      >
                        <img src={src} alt={`thumb-${i}`} className="w-full h-full object-cover" loading="lazy" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Video opcional */}
                {videoUrl && (
                  <div className="mt-6">
                    <h4 className="text-base sm:text-lg font-semibold mb-3">Video</h4>
                    <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-white/5">
                      <iframe
                        className="w-full h-full"
                        src={videoUrl}
                        title="Exercise video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                      />
                    </div>
                  </div>
                )}
              </section>

              {/* DERECHA: Descripción + Specs tipo ficha */}
              <section className="lg:col-span-5">
                <h4 className="text-base sm:text-lg font-semibold mb-3">Description</h4>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
                  <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                    {name} focuses on <span className="text-white">{target || "the target muscle"}</span> within the{" "}
                    <span className="text-white">{bodyPart || "body area"}</span> using{" "}
                    <span className="text-white">{equipment || "specific equipment"}</span>.
                  </p>

                  {/* Specs estilo tarjetas redondas */}
                  <div className="mt-5 grid grid-cols-3 gap-3">
                    <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm py-3">
                      <div className="h-12 w-12 rounded-full border border-white/10 bg-white/5 grid place-items-center text-xs">
                        Body
                      </div>
                      <span className="mt-2 text-xs text-white/70 text-center px-2">{bodyPart || "—"}</span>
                    </div>
                    <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm py-3">
                      <div className="h-12 w-12 rounded-full border border-white/10 bg-white/5 grid place-items-center text-xs">
                        Target
                      </div>
                      <span className="mt-2 text-xs text-white/70 text-center px-2">{target || "—"}</span>
                    </div>
                    <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm py-3">
                      <div className="h-12 w-12 rounded-full border border-white/10 bg-white/5 grid place-items-center text-xs">
                        Equip.
                      </div>
                      <span className="mt-2 text-xs text-white/70 text-center px-2">{equipment || "—"}</span>
                    </div>
                  </div>

                  {/* Chips secundarias */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {secondaryMuscles.slice(0, 6).map((m, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-full border border-white/15 bg-white/10 text-xs text-white/80"
                      >
                        {cap(m)}
                      </span>
                    ))}
                  </div>

                  {/* Cómo usarla */}
                  <div className="mt-6">
                    <h5 className="font-semibold mb-2">How to use</h5>
                    {instructions.length ? (
                      <ol className="list-decimal pl-5 space-y-2 text-white/90 text-sm sm:text-base">
                        {instructions.map((s, i) => (
                          <li key={i}>{String(s).replace(/\.$/, "")}.</li>
                        ))}
                      </ol>
                    ) : (
                      <p className="text-white/70 text-sm">No instructions available.</p>
                    )}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(12px) scale(0.985); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
        @keyframes modalOut {
          from { opacity: 1; transform: translateY(0)    scale(1); }
          to   { opacity: 0; transform: translateY(10px) scale(0.985); }
        }
      `}</style>
    </div>
  );
}
