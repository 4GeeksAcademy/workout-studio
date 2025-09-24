// src/components/HomeSection.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Play, Dumbbell, Compass, Sparkles, ShieldCheck, Star, Check, Crown, Zap, Clock,
  Plus, Minus, BadgeDollarSign
} from "lucide-react";
import FondosE from "../assets/img/FondosE.jpg"; // cambia a tu imagen si quieres

export default function HomeSection() {
  return (
    <div className="w-full bg-black text-white selection:bg-[#FFB901]/30 selection:text-white">
      <Hero />
      <SectionPadding>
        <SectionHeader
          eyebrow="Explora"
          title="Ejercicios de máquina con guía visual"
          subtitle="Encuentra ejercicios por músculo, equipo o nivel. GIFs, instrucciones y consejos en un solo lugar."
        />
        <ExplorePreview />
      </SectionPadding>

      <SectionPadding>
        <SectionHeader
          eyebrow="Empieza rápido"
          title="Rutinas listas para entrenar"
          subtitle="Full body, Push/Pull/Legs, Upper/Lower… generadas con nuestros ejercicios de máquina."
        />
        <RoutinesPreview />
      </SectionPadding>

      <SectionPadding>
        <Benefits />
      </SectionPadding>

      <LimitedOfferBanner />

      <SectionPadding>
        <SectionHeader
          eyebrow="Membresías"
          title="Elige tu plan y únete al Gym"
          subtitle="Planes flexibles y claros. Cancela cuando quieras. Elige mensual o anual con descuento."
        />
        <Pricing />
      </SectionPadding>

      <SectionPadding>
        <SectionHeader
          eyebrow="Confianza"
          title="Lo que dicen nuestros miembros"
          subtitle="Resultados reales en ambientes increíbles."
        />
        <Testimonials />
      </SectionPadding>

      <SectionPadding>
        <SectionHeader
          eyebrow="Dudas"
          title="Preguntas frecuentes"
          subtitle="Todo lo que necesitas saber antes de unirte."
        />
        <FAQ />
      </SectionPadding>

      <CallToAction />
    </div>
  );
}

/* ----------------------------- HERO ----------------------------- */
function Hero() {
  return (
    <section className="relative">
      {/* Fondo */}
      <div className="absolute inset-0 -z-10">
        <img src={FondosE} alt="" className="w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black" />
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="max-w-3xl">
          <p className="text-sm tracking-wider uppercase text-white/60">Entrena con claridad</p>
          <h1 className="mt-3 text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1]">
            <span className="bg-gradient-to-b from-[#FFB901] to-[#FFB901] bg-clip-text text-transparent">
              Domina tus rutinas
            </span>{" "}
            y alcanza resultados reales
          </h1>
          <p className="mt-4 text-white/80 sm:text-lg leading-relaxed">
            Únete al gym, explora ejercicios de máquina con guía visual y sigue planes listos para tu objetivo.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              to="/routines"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold bg-[#FFB901] hover:bg-red-800 text-white transition-colors"
            >
              Crear mi rutina <ArrowRight size={18} />
            </Link>
            <Link
              to="/exercises"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300/20 bg-gray-300/10 hover:bg-gray-300/20 backdrop-blur-md transition-colors"
            >
              Ver ejercicios <Dumbbell size={18} />
            </Link>
            <Link
              to="/checkout?plan=pro"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#FFB901]/40 bg-[#FFB901]/10 hover:bg-[#FFB901]/20 backdrop-blur-md transition-colors"
            >
              Unirme ahora <BadgeDollarSign size={18} />
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
            <Stat num="1,300+" label="Ejercicios" />
            <Stat num="5+" label="Tipos de máquina" />
            <Stat num="95%" label="Miembros satisfechos" />
            <Stat num="24/7" label="Acceso al gym" />
          </div>
        </div>
      </div>
    </section>
  );
}
function Stat({ num, label }) {
  return (
    <div className="rounded-xl border border-gray-300/20 bg-gray-300/10 backdrop-blur-md px-4 py-3 text-center">
      <div className="text-2xl font-extrabold">{num}</div>
      <div className="text-xs text-white/70">{label}</div>
    </div>
  );
}

/* --------------------------- SECTIONS --------------------------- */
function SectionPadding({ children }) {
  return <section className="py-12 sm:py-16">{children}</section>;
}
function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 mb-6 sm:mb-8">
      <div className="text-sm tracking-wider uppercase text-white/60">{eyebrow}</div>
      <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">
        <span className="bg-gradient-to-b from-[#FFB901] to-[#FFB901] bg-clip-text text-transparent">
          {title}
        </span>
      </h2>
      <p className="mt-2 text-white/80 max-w-2xl">{subtitle}</p>
    </div>
  );
}

/* ------------------ Explore & Routines ------------------ */
function GlassCard({ children }) {
  return (
    <div className="w-full sm:w-80 rounded-2xl border border-gray-300/20 bg-gray-300/10 backdrop-blur-xl shadow-lg p-3 sm:p-4 hover:shadow-2xl transition-shadow">
      {children}
    </div>
  );
}
function Chip({ children }) {
  return <span className="px-2 py-0.5 rounded-full border border-gray-300/20 bg-gray-300/10">{children}</span>;
}
function ExplorePreview() {
  const items = Array.from({ length: 6 }).map((_, i) => i);
  return (
    <div className="max-w-screen-2xl mx-auto px-4">
      <div className="flex flex-row flex-wrap justify-center gap-6">
        {items.map((i) => (
          <GlassCard key={i}>
            <div className="aspect-video w-full rounded-xl overflow-hidden border border-gray-300/20 bg-gray-300/10">
              <img
                src={FondosE}
                alt=""
                className="w-full h-full object-cover opacity-70 hover:opacity-90 transition-opacity"
                loading="lazy"
              />
            </div>
            <div className="mt-3">
              <div className="font-semibold truncate">Nombre del ejercicio</div>
              <div className="mt-1 flex flex-wrap gap-2 text-[11px]">
                <Chip>Target: Chest</Chip>
                <Chip>Body: Upper</Chip>
                <Chip>Machine</Chip>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <Link
          to="/exercises"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300/20 bg-gray-300/10 hover:bg-gray-300/20 backdrop-blur-md transition-colors"
        >
          Ver todos los ejercicios <Compass size={16} />
        </Link>
      </div>
    </div>
  );
}
function RoutinesPreview() {
  const items = [
    { title: "Full Body 45’", meta: "Beginner · 3×10–12" },
    { title: "Push · Pull · Legs", meta: "Intermediate · 3×8–10" },
    { title: "Upper / Lower", meta: "Intermediate · 3–4×8–12" },
  ];
  return (
    <div className="max-w-screen-2xl mx-auto px-4">
      <div className="flex flex-row flex-wrap justify-center gap-6">
        {items.map((r) => (
          <GlassCard key={r.title}>
            <div className="aspect-video w-full rounded-xl overflow-hidden border border-gray-300/20 bg-gray-300/10">
              <img src={FondosE} alt="" className="w-full h-full object-cover opacity-70" loading="lazy" />
            </div>
            <div className="mt-3">
              <div className="font-semibold">{r.title}</div>
              <div className="text-sm text-white/70">{r.meta}</div>
            </div>
            <div className="mt-3">
              <Link
                to="/routines"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FFB901] hover:bg-red-800 text-white font-semibold transition-colors"
              >
                Ver rutina <ArrowRight size={16} />
              </Link>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

/* ------------------ Benefits ------------------ */
function Benefits() {
  const features = [
    { icon: <Sparkles size={20} />, title: "Ejercicios detallados", text: "GIFs y explicaciones paso a paso." },
    { icon: <ShieldCheck size={20} />, title: "Ejecución segura", text: "Evita errores comunes en la máquina." },
    { icon: <Zap size={20} />, title: "Rutinas rápidas", text: "Creadas en segundos con IA." },
    { icon: <Crown size={20} />, title: "Planes pro", text: "Acceso a rutinas avanzadas y más beneficios." },
  ];
  return (
    <div className="max-w-screen-2xl mx-auto px-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {features.map((f) => (
        <div
          key={f.title}
          className="rounded-2xl border border-gray-300/20 bg-gray-300/10 backdrop-blur-md p-6 hover:shadow-xl transition"
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#FFB901]/20 text-[#FFB901]">
            {f.icon}
          </div>
          <div className="mt-4 font-semibold">{f.title}</div>
          <p className="text-sm text-white/70">{f.text}</p>
        </div>
      ))}
    </div>
  );
}

/* ------------------ Limited Offer ------------------ */
function LimitedOfferBanner() {
  return (
    <div className="relative my-12">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="rounded-3xl border border-[#FFB901]/40 bg-gradient-to-r from-[#FFB901]/20 to-transparent p-6 sm:p-10 text-center">
          <h3 className="text-2xl sm:text-3xl font-extrabold">
            Oferta limitada:{" "}
            <span className="bg-gradient-to-b from-[#FFB901] to-[#FFB901] bg-clip-text text-transparent">
              20% OFF en tu primer mes
            </span>
          </h3>
          <p className="mt-2 text-white/70">Válido solo esta semana. Aprovecha ahora y comienza a entrenar.</p>
          <div className="mt-4">
            <Link
              to="/checkout?plan=monthly"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl font-semibold bg-[#FFB901] hover:bg-red-800 text-white transition-colors"
            >
              Obtener oferta <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------ Pricing ------------------ */
function Pricing() {
  const plans = [
    {
      title: "Mensual",
      price: "$15",
      features: ["Acceso ilimitado", "Rutinas básicas", "Ejercicios detallados"],
      href: "/checkout?plan=monthly",
    },
    {
      title: "Pro Anual",
      price: "$120",
      features: ["Todo lo del mensual", "Rutinas Pro avanzadas", "20% de ahorro"],
      href: "/checkout?plan=annual",
      highlight: true,
    },
  ];
  return (
    <div className="max-w-screen-2xl mx-auto px-4 grid gap-6 sm:grid-cols-2">
      {plans.map((p) => (
        <div
          key={p.title}
          className={`rounded-2xl border ${
            p.highlight ? "border-[#FFB901]/60 bg-[#FFB901]/10" : "border-gray-300/20 bg-gray-300/10"
          } backdrop-blur-md p-6`}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">{p.title}</h3>
            {p.highlight && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#FFB901] text-white">Popular</span>
            )}
          </div>
          <div className="mt-2 text-3xl font-extrabold">{p.price}</div>
          <ul className="mt-4 space-y-2 text-sm">
            {p.features.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <Check size={16} className="text-[#FFB901]" /> {f}
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Link
              to={p.href}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold bg-[#FFB901] hover:bg-red-800 text-white transition-colors"
            >
              Elegir plan <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------ Testimonials ------------------ */
function Testimonials() {
  const reviews = [
    { name: "Ana", text: "Excelente experiencia, ahora entreno con más seguridad y resultados." },
    { name: "Carlos", text: "Las rutinas listas me ahorran tiempo y me mantienen motivado." },
    { name: "Lucía", text: "Los ejercicios con guía visual son lo mejor para aprender bien la técnica." },
  ];
  return (
    <div className="max-w-screen-2xl mx-auto px-4 grid gap-6 sm:grid-cols-3">
      {reviews.map((r) => (
        <div
          key={r.name}
          className="rounded-2xl border border-gray-300/20 bg-gray-300/10 backdrop-blur-md p-6 hover:shadow-lg transition"
        >
          <Star size={20} className="text-[#FFB901]" />
          <p className="mt-2 text-sm text-white/80">{r.text}</p>
          <div className="mt-3 font-semibold">{r.name}</div>
        </div>
      ))}
    </div>
  );
}

/* ------------------ FAQ ------------------ */
function FAQ() {
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: "¿Puedo cancelar en cualquier momento?", a: "Sí, sin compromisos ni penalizaciones." },
    { q: "¿El acceso incluye todas las máquinas?", a: "Sí, acceso completo al área de máquinas." },
    { q: "¿Tienen entrenadores?", a: "Sí, contamos con asistencia en piso y rutinas guiadas." },
  ];
  return (
    <div className="max-w-screen-lg mx-auto px-4 space-y-4">
      {faqs.map((f, i) => (
        <div
          key={i}
          className="rounded-xl border border-gray-300/20 bg-gray-300/10 backdrop-blur-md p-4"
        >
          <button
            className="w-full flex items-center justify-between text-left font-semibold"
            onClick={() => setOpen(open === i ? null : i)}
          >
            {f.q}
            {open === i ? <Minus size={18} /> : <Plus size={18} />}
          </button>
          {open === i && <p className="mt-2 text-sm text-white/70">{f.a}</p>}
        </div>
      ))}
    </div>
  );
}

/* ------------------ Call To Action ------------------ */
function CallToAction() {
  return (
    <div className="py-16 text-center bg-gradient-to-r from-[#FFB901]/20 to-transparent">
      <h2 className="text-3xl sm:text-4xl font-extrabold">
        ¿Listo para transformar tu{" "}
        <span className="bg-gradient-to-b from-[#FFB901] to-[#FFB901] bg-clip-text text-transparent">
          entrenamiento
        </span>
        ?
      </h2>
      <p className="mt-3 text-white/70 max-w-xl mx-auto">
        Únete hoy y empieza con rutinas listas y guía visual de cada máquina.
      </p>
      <div className="mt-5">
        <Link
          to="/checkout?plan=pro"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-[#FFB901] hover:bg-red-800 text-white transition-colors"
        >
          Empezar ahora <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
}
