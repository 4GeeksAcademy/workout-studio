// src/components/TrainerDashboard.jsx
import { useMemo, useState } from "react";
import {
  Search, Filter, Plus, MoreHorizontal, CalendarDays, Clock, Target,
  BadgeCheck, ChevronDown, Dumbbell, Activity, FileText, NotebookPen, X
} from "lucide-react";

const studentsMock = [
  {
    id: "st-01",
    name: "María González",
    goal: "Pérdida de grasa",
    plan: "Pro",
    level: "Intermedio",
    nextSession: "Lun 10:00",
    progress: 62,
    tags: ["Cardio", "Full body"],
    avatar: "https://i.pravatar.cc/100?img=5",
  },
  {
    id: "st-02",
    name: "Luis Martínez",
    goal: "Hipertrofia",
    plan: "Elite",
    level: "Avanzado",
    nextSession: "Mar 19:00",
    progress: 44,
    tags: ["Push/Pull/Legs"],
    avatar: "https://i.pravatar.cc/100?img=11",
  },
  {
    id: "st-03",
    name: "Paola Rivera",
    goal: "Fuerza",
    plan: "Basic",
    level: "Principiante",
    nextSession: "Mié 08:30",
    progress: 28,
    tags: ["Upper/Lower"],
    avatar: "https://i.pravatar.cc/100?img=32",
  },
  {
    id: "st-04",
    name: "Jorge Salas",
    goal: "Rehabilitación",
    plan: "Pro",
    level: "Intermedio",
    nextSession: "Jue 18:00",
    progress: 71,
    tags: ["Pierna", "Core"],
    avatar: "https://i.pravatar.cc/100?img=22",
  },
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
              <span className="bg-gradient-to-b from-amber-300 to-amber-500 bg-clip-text text-transparent">Panel del entrenador</span>
            </h1>
            <p className="text-white/70 mt-1">Gestiona a tus alumnos, sesiones y planes en un lugar claro y bonito.</p>
          </div>

          {/* Acciones */}
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md text-sm transition">
              <Filter size={16} /> Filtros
            </button>
            <button className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-semibold text-sm transition">
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
            <Search className="absolute left-3 top-2.5 text-white/60" size={18} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nombre, objetivo o etiqueta…"
              className="w-full rounded-xl pl-9 pr-3 py-2.5 bg-white/5 border border-white/10 outline-none focus:border-white/20 placeholder:text-white/50"
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
                    ? "border-amber-300/40 bg-amber-300/10"
                    : "border-white/10 bg-white/5 hover:bg-white/10",
                ].join(" ")}
              >
                {p}
              </button>
            ))}
          </div>

          <button className="ml-auto inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-sm">
            Ordenar <ChevronDown size={16} className="text-white/70" />
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
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4">
      <div className="text-xs uppercase tracking-wider text-white/60">{title}</div>
      <div className="text-2xl font-extrabold mt-1">{value}</div>
    </div>
  );
}

function StudentCard({ student, onOpen }) {
  const badgeStyles = {
    Basic: "border-white/15 bg-white/10",
    Pro: "border-amber-300/40 bg-amber-300/10 text-amber-200",
    Elite: "border-amber-400/60 bg-amber-400/15 text-amber-200",
  };

  return (
    <div className="relative rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md overflow-hidden shadow-lg hover:shadow-2xl transition">
      {/* Fondo decorativo */}
      <div className="pointer-events-none absolute -right-10 -top-8 h-32 w-32 rounded-full bg-amber-400/10 blur-3xl" />

      <div className="p-4">
        <div className="flex items-center gap-3">
          <img
            src={student.avatar}
            alt={student.name}
            className="h-12 w-12 rounded-xl object-cover border border-white/15"
          />
          <div className="min-w-0">
            <div className="font-semibold truncate">{student.name}</div>
            <div className="text-xs text-white/70 truncate">{student.goal}</div>
          </div>

          <span
            className={[
              "ml-auto text-[11px] px-2 py-0.5 rounded-full border",
              badgeStyles[student.plan] || "border-white/15 bg-white/10",
            ].join(" ")}
          >
            {student.plan}
          </span>
        </div>

        {/* Etiquetas */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {student.tags.map((t) => (
            <span key={t} className="text-[11px] px-2 py-0.5 rounded-full border border-white/10 bg-white/10">
              {t}
            </span>
          ))}
        </div>

        {/* Progreso + próxima sesión */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="flex items-center gap-2 text-xs text-white/70">
              <Activity size={14} /> Progreso
            </div>
            <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-amber-400"
                style={{ width: `${student.progress}%` }}
              />
            </div>
            <div className="mt-1 text-xs text-white/70">{student.progress}%</div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="flex items-center gap-2 text-xs text-white/70">
              <CalendarDays size={14} /> Próxima sesión
            </div>
            <div className="mt-2 font-semibold">{student.nextSession}</div>
          </div>
        </div>

        {/* Acciones */}
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={onOpen}
            className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-black font-semibold transition"
          >
            Ver alumno
          </button>
          <button className="p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10">
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
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        className="relative w-[min(1100px,95vw)] h-[min(90vh,900px)] rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl overflow-hidden animate-[modalIn_160ms_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-black/50 backdrop-blur-xl">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={student.avatar}
              alt={student.name}
              className="h-10 w-10 rounded-xl object-cover border border-white/15"
            />
            <div className="min-w-0">
              <div className="font-bold truncate">{student.name}</div>
              <div className="text-xs text-white/70 truncate">{student.goal}</div>
            </div>
            <span className="ml-2 text-[11px] px-2 py-0.5 rounded-full border border-amber-300/40 bg-amber-300/10 text-amber-200">
              {student.plan}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10"
            aria-label="Cerrar"
          >
            <X size={16} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10">
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
                  ? "border-amber-300/40 bg-amber-300/10"
                  : "border-white/10 bg-white/5 hover:bg-white/10",
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
      <div className="md:col-span-2 rounded-xl border border-white/10 bg-white/5 p-4">
        <h4 className="font-semibold">Resumen</h4>
        <div className="mt-3 grid sm:grid-cols-2 gap-3">
          <Info line icon={<Target size={16} />} label="Objetivo" value={student.goal} />
          <Info line icon={<BadgeCheck size={16} />} label="Nivel" value={student.level} />
          <Info line icon={<Clock size={16} />} label="Próxima sesión" value={student.nextSession} />
          <Info line icon={<FileText size={16} />} label="Plan" value={student.plan} />
        </div>

        <div className="mt-4">
          <div className="text-sm text-white/70 mb-1">Progreso global</div>
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full rounded-full bg-amber-400" style={{ width: `${student.progress}%` }} />
          </div>
          <div className="mt-1 text-xs text-white/70">{student.progress}%</div>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <h4 className="font-semibold">Etiquetas</h4>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {student.tags.map((t) => (
            <span key={t} className="text-[11px] px-2 py-0.5 rounded-full border border-white/10 bg-white/10">
              {t}
            </span>
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
        <div key={b.label} className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-2 text-sm text-white/80">
            <Dumbbell size={16} /> <span className="font-semibold">{b.label}</span>
          </div>
          <ul className="mt-2 space-y-2 text-sm">
            {b.items.map((it) => (
              <li key={it} className="flex items-center justify-between">
                <span>{it}</span>
                <span className="text-xs text-white/60">3×10–12</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function ProgressTab() {
  // Gráfica simple sin librerías
  const weeks = [
    { w: "Sem 1", val: 2 },
    { w: "Sem 2", val: 3 },
    { w: "Sem 3", val: 3.5 },
    { w: "Sem 4", val: 4.2 },
    { w: "Sem 5", val: 4.8 },
    { w: "Sem 6", val: 5.1 },
  ];
  const max = Math.max(...weeks.map((x) => x.val)) || 1;

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <h4 className="font-semibold">Progreso (carga relativa)</h4>
      <div className="mt-4 grid grid-cols-6 gap-3 items-end h-40">
        {weeks.map((x) => (
          <div key={x.w} className="flex flex-col items-center gap-2">
            <div
              className="w-8 rounded-t-lg bg-amber-400/80"
              style={{ height: `${(x.val / max) * 100}%` }}
              title={`${x.val} u.`}
            />
            <div className="text-[10px] text-white/70">{x.w}</div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-white/60">
        * Visual de ejemplo. Aquí puedes conectar PRs, volumen o adherencia real.
      </p>
    </div>
  );
}

function NotesTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2 rounded-xl border border-white/10 bg-white/5 p-4">
        <h4 className="font-semibold">Notas del entrenador</h4>
        <div className="mt-3 rounded-xl border border-white/10 bg-black/30 p-3 text-sm min-h-[120px]">
          • Mantener técnica en sentadilla  
          <br />• Aumentar descanso a 90s en empuje  
          <br />• Registrar sueño esta semana
        </div>
      </div>
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <h4 className="font-semibold">Checklist sesión</h4>
        <ul className="mt-2 space-y-2 text-sm">
          <li className="flex items-center gap-2"><input type="checkbox" className="accent-amber-400" /> Calentamiento</li>
          <li className="flex items-center gap-2"><input type="checkbox" className="accent-amber-400" /> Técnica principal</li>
          <li className="flex items-center gap-2"><input type="checkbox" className="accent-amber-400" /> Estiramientos</li>
        </ul>
      </div>
    </div>
  );
}

function Info({ icon, label, value, line }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <div className="flex items-center gap-2 text-xs text-white/70">
        {icon} {label}
      </div>
      <div className="mt-1 font-semibold">{value}</div>
      {line && <div className="mt-2 h-px bg-white/10" />}
    </div>
  );
}
