// src/components/TrainerDashboard.jsx
import { useMemo, useState } from "react";
import {
  Search, Filter, Plus, MoreHorizontal, CalendarDays, Clock, Target,
  BadgeCheck, ChevronDown, Dumbbell, Activity, FileText, NotebookPen, X
} from "lucide-react";

const studentsMock = [
  { id: "st-01", name: "María González", goal: "Pérdida de grasa", plan: "Pro", level: "Intermedio", nextSession: "Lun 10:00", progress: 62, tags: ["Cardio", "Full body"], avatar: "https://i.pravatar.cc/100?img=5" },
  { id: "st-02", name: "Luis Martínez", goal: "Hipertrofia", plan: "Elite", level: "Avanzado", nextSession: "Mar 19:00", progress: 44, tags: ["Push/Pull/Legs"], avatar: "https://i.pravatar.cc/100?img=11" },
  { id: "st-03", name: "Paola Rivera", goal: "Fuerza", plan: "Basic", level: "Principiante", nextSession: "Mié 08:30", progress: 28, tags: ["Upper/Lower"], avatar: "https://i.pravatar.cc/100?img=32" },
  { id: "st-04", name: "Jorge Salas", goal: "Rehabilitación", plan: "Pro", level: "Intermedio", nextSession: "Jue 18:00", progress: 71, tags: ["Pierna", "Core"], avatar: "https://i.pravatar.cc/100?img=22" },
];

export default function TrainerDashboard() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Todos"); // Todos | Basic | Pro | Elite
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return studentsMock.filter((s) => {
      const matchesPlan = filter === "Todos" ? true : s.plan === filter;
      const matchesQuery =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.goal.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q));
      return matchesPlan && matchesQuery;
    });
  }, [query, filter]);

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <div className="max-w-screen-2xl mx-auto px-4 pt-20 pb-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-[#b30000] via-gray-300 to-[#b30000] bg-clip-text text-transparent">
                Panel del entrenador
              </span>
            </h1>
            <p className="text-gray-300 mt-1">Gestiona a tus alumnos, sesiones y planes en un lugar claro y bonito.</p>
          </div>

          {/* Acciones */}
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-300/30 bg-gray-300/10 hover:bg-gray-300/20 backdrop-blur-md text-sm transition">
              <Filter size={16} /> Filtros
            </button>
            <button className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-[#b30000] to-gray-300 text-black font-semibold text-sm transition hover:from-gray-300 hover:to-[#b30000]">
              <Plus size={16} /> Nuevo alumno
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          <StatCard title="Alumnos activos" value="24" />
          <StatCard title="Sesiones semana" value="38" />
          <StatCard title="Asistencia" value="92%" />
          <StatCard title="Satisfacción" value="4.8/5" />
        </div>

        {/* Controles */}
        <div className="mt-6 flex flex-col md:flex-row md:items-center gap-3">
          <div className="relative md:w-96">
            <Search className="absolute left-3 top-2.5 text-gray-300" size={18} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nombre, objetivo o etiqueta…"
              className="w-full rounded-xl pl-9 pr-3 py-2.5 bg-gray-300/10 border border-gray-300/30 outline-none focus:border-[#b30000] placeholder:text-gray-300"
            />
          </div>

          <div className="flex items-center gap-2">
            {["Todos", "Basic", "Pro", "Elite"].map((p) => (
              <button
                key={p}
                onClick={() => setFilter(p)}
                className={[
                  "px-3 py-1.5 rounded-lg border text-sm transition",
                  filter === p
                    ? "border-[#b30000]/50 bg-[#b30000]/10 text-[#b30000]"
                    : "border-gray-300/30 bg-gray-300/10 hover:bg-gray-300/20",
                ].join(" ")}
              >
                {p}
              </button>
            ))}
          </div>

          <button className="ml-auto inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-300/30 bg-gray-300/10 hover:bg-gray-300/20 text-sm">
            Ordenar <ChevronDown size={16} className="text-gray-300" />
          </button>
        </div>

        {/* Grid de alumnos */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((s) => (
            <StudentCard
              key={s.id}
              student={s}
              onOpen={() => {
                setActive(s);
                setOpen(true);
              }}
            />
          ))}
        </div>

        {/* Modal alumno */}
        {open && active && (
          <StudentModal
            student={active}
            onClose={() => {
              setOpen(false);
              setActive(null);
            }}
          />
        )}
      </div>
    </div>
  );
}

/* --------------------------------- Subcomponentes --------------------------------- */

function StatCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-gray-300/30 bg-gray-300/10 backdrop-blur-md p-4">
      <div className="text-xs uppercase tracking-wider text-gray-300">{title}</div>
      <div className="text-2xl font-extrabold mt-1">{value}</div>
    </div>
  );
}

function StudentCard({ student, onOpen }) {
  const badgeStyles = {
    Basic: "border-gray-300/30 bg-gray-300/10 text-gray-300",
    Pro: "border-[#b30000]/50 bg-[#b30000]/10 text-[#b30000]",
    Elite: "border-[#b30000]/70 bg-[#b30000]/20 text-[#b30000]",
  };

  return (
    <div className="relative rounded-2xl border border-gray-300/30 bg-gray-300/10 backdrop-blur-md overflow-hidden shadow-lg hover:shadow-2xl transition">
      <div className="pointer-events-none absolute -right-10 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-[#b30000]/20 to-gray-300/10 blur-3xl" />
      <div className="p-4">
        <div className="flex items-center gap-3">
          <img
            src={student.avatar}
            alt={student.name}
            className="h-12 w-12 rounded-xl object-cover border border-gray-300/30"
          />
          <div className="min-w-0">
            <div className="font-semibold truncate">{student.name}</div>
            <div className="text-xs text-gray-300 truncate">{student.goal}</div>
          </div>

          <span className={[ "ml-auto text-[11px] px-2 py-0.5 rounded-full border", badgeStyles[student.plan] || "border-gray-300/30 bg-gray-300/10" ].join(" ")}>
            {student.plan}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {student.tags.map((t) => (
            <span key={t} className="text-[11px] px-2 py-0.5 rounded-full border border-gray-300/30 bg-gray-300/10">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-gray-300/30 bg-gray-300/10 p-3">
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <Activity size={14} /> Progreso
            </div>
            <div className="mt-2 h-2 rounded-full bg-gray-300/20 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#b30000] to-gray-300"
                style={{ width: `${student.progress}%` }}
              />
            </div>
            <div className="mt-1 text-xs text-gray-300">{student.progress}%</div>
          </div>

          <div className="rounded-xl border border-gray-300/30 bg-gray-300/10 p-3">
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <CalendarDays size={14} /> Próxima sesión
            </div>
            <div className="mt-2 font-semibold">{student.nextSession}</div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={onOpen}
            className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-gradient-to-r from-[#b30000] to-gray-300 text-black font-semibold transition hover:from-gray-300 hover:to-[#b30000]"
          >
            Ver alumno
          </button>
          <button className="p-2 rounded-lg border border-gray-300/30 bg-gray-300/10 hover:bg-gray-300/20">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function StudentModal({ student, onClose }) {
  const [tab, setTab] = useState("overview"); // overview | plan | progress | notes

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        className="relative w-[min(1100px,95vw)] h-[min(90vh,900px)] rounded-2xl border border-gray-300/30 bg-black/60 backdrop-blur-xl shadow-2xl overflow-hidden animate-[modalIn_160ms_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-300/30 bg-black/50 backdrop-blur-xl">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={student.avatar}
              alt={student.name}
              className="h-10 w-10 rounded-xl object-cover border border-gray-300/30"
            />
            <div className="min-w-0">
              <div className="font-bold truncate">{student.name}</div>
              <div className="text-xs text-gray-300 truncate">{student.goal}</div>
            </div>
            <span className="ml-2 text-[11px] px-2 py-0.5 rounded-full border border-[#b30000]/50 bg-[#b30000]/10 text-[#b30000]">
              {student.plan}
            </span>
          </div>

          <button onClick={onClose} className="p-2 rounded-lg border border-gray-300/30 bg-gray-300/10 hover:bg-gray-300/20" aria-label="Cerrar">
            <X size={16} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 px-5 py-3 border-b border-gray-300/30">
          {[
            { id: "overview", label: "Overview", icon: BadgeCheck },
            { id: "plan", label: "Plan", icon: Dumbbell },
            { id: "progress", label: "Progreso", icon: Activity },
            { id: "notes", label: "Notas", icon: NotebookPen },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={[
                "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm border transition",
                tab === t.id
                  ? "border-[#b30000]/50 bg-[#b30000]/10"
                  : "border-gray-300/30 bg-gray-300/10 hover:bg-gray-300/20",
              ].join(" ")}
            >
              <t.icon size={16} />
              {t.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="h-[calc(100%-104px)] overflow-y-auto p-5">
          {tab === "overview" && <OverviewTab student={student} />}
          {tab === "plan" && <PlanTab student={student} />}
          {tab === "progress" && <ProgressTab student={student} />}
          {tab === "notes" && <NotesTab />}
        </div>
      </div>

      <style>{`
        @keyframes modalIn { from { opacity:0; transform: translateY(12px) scale(0.985);} to {opacity:1; transform: translateY(0) scale(1);} }
      `}</style>
    </div>
  );
}

/* ------------------------------- Tabs ------------------------------- */

function OverviewTab({ student }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2 rounded-xl border border-gray-300/30 bg-gray-300/10 p-4">
        <h4 className="font-semibold">Resumen</h4>
        <div className="mt-3 grid sm:grid-cols-2 gap-3">
          <Info line icon={<Target size={16} />} label="Objetivo" value={student.goal} />
          <Info line icon={<BadgeCheck size={16} />} label="Nivel" value={student.level} />
          <Info line icon={<Clock size={16} />} label="Próxima sesión" value={student.nextSession} />
          <Info line icon={<FileText size={16} />} label="Plan" value={student.plan} />
        </div>

        <div className="mt-4">
          <div className="text-sm text-gray-300 mb-1">Progreso global</div>
          <div className="h-2 rounded-full bg-gray-300/20 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-[#b30000] to-gray-300" style={{ width: `${student.progress}%` }} />
          </div>
          <div className="mt-1 text-xs text-gray-300">{student.progress}%</div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-300/30 bg-gray-300/10 p-4">
        <h4 className="font-semibold">Etiquetas</h4>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {student.tags.map((t) => (
            <span key={t} className="text-[11px] px-2 py-0.5 rounded-full border border-gray-300/30 bg-gray-300/10">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function PlanTab({ student }) {
  const blocks = [
    { label: "Empuje", items: ["Press banca máquina", "Extensión tríceps", "Elevación lateral"] },
    { label: "Tirón", items: ["Jalón al pecho", "Remo en máquina"] },
    { label: "Piernas", items: ["Prensa", "Curl femoral", "Elevación de talones"] },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {blocks.map((b) => (
        <div key={b.label} className="rounded-xl border border-gray-300/30 bg-gray-300/10 p-4">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Dumbbell size={16} /> <span className="font-semibold">{b.label}</span>
          </div>
          <ul className="mt-2 space-y-2 text-sm">
            {b.items.map((it) => (
              <li key={it} className="flex items-center justify-between">
                <span>{it}</span>
                <span className="text-xs text-gray-300">3×10–12</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function ProgressTab() {
  const weeks = [
    { w: "Sem 1", val: 40 }, { w: "Sem 2", val: 60 }, { w: "Sem 3", val: 80 }, { w: "Sem 4", val: 90 },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {weeks.map((w) => (
        <div key={w.w} className="rounded-xl border border-gray-300/30 bg-gray-300/10 p-3">
          <div className="flex justify-between text-xs text-gray-300 mb-1">{w.w} <span>{w.val}%</span></div>
          <div className="h-2 rounded-full bg-gray-300/20 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-[#b30000] to-gray-300" style={{ width: `${w.val}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function NotesTab() {
  return (
    <textarea
      placeholder="Escribe notas sobre el alumno..."
      className="w-full h-full resize-none rounded-xl border border-gray-300/30 bg-gray-300/10 p-4 text-sm text-gray-300 outline-none focus:border-[#b30000]"
    />
  );
}

/* ------------------------------- Helpers ------------------------------- */
function Info({ icon, label, value }) {
  return (
    <div className="flex items-center gap-2 text-xs text-gray-300">
      {icon} <span>{label}:</span> <span className="font-semibold text-white">{value}</span>
    </div>
  );
}
