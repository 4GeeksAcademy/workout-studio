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
    <div className="w-full bg-black text-white selection:bg-amber-300/30 selection:text-white">
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
            <span className="bg-gradient-to-b from-amber-300 to-amber-500 bg-clip-text text-transparent">
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold bg-amber-500 hover:bg-amber-600 text-black transition-colors"
            >
              Crear mi rutina <ArrowRight size={18} />
            </Link>
            <Link
              to="/exercises"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-colors"
            >
              Ver ejercicios <Dumbbell size={18} />
            </Link>
            <Link
              to="/checkout?plan=pro"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-amber-400/40 bg-amber-400/10 hover:bg-amber-400/20 backdrop-blur-md transition-colors"
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
    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md px-4 py-3 text-center">
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
        <span className="bg-gradient-to-b from-amber-300 to-amber-500 bg-clip-text text-transparent">
          {title}
        </span>
      </h2>
      <p className="mt-2 text-white/80 max-w-2xl">{subtitle}</p>
    </div>
  );
}

/* ------------------ Explore & Routines (placeholders) ------------------ */
function GlassCard({ children }) {
  return (
    <div className="w-full sm:w-80 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-lg p-3 sm:p-4 hover:shadow-2xl transition-shadow">
      {children}
    </div>
  );
}
function Chip({ children }) {
  return <span className="px-2 py-0.5 rounded-full border border-white/10 bg-white/10">{children}</span>;
}
function ExplorePreview() {
  const items = Array.from({ length: 6 }).map((_, i) => i);
  return (
    <div className="max-w-screen-2xl mx-auto px-4">
      <div className="flex flex-row flex-wrap justify-center gap-6">
        {items.map((i) => (
          <GlassCard key={i}>
            <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-white/5">
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
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-colors"
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
            <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-white/5">
              <img src={FondosE} alt="" className="w-full h-full object-cover opacity-70" loading="lazy" />
            </div>
            <div className="mt-3">
              <div className="font-semibold">{r.title}</div>
              <div className="text-sm text-white/70">{r.meta}</div>
            </div>
            <div className="mt-3">
              <Link
                to="/routines"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-black font-semibold transition-colors"
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

/* ----------------------------- BENEFITS ----------------------------- */
function Benefits() {
  return (
    <div id="benefits" className="max-w-screen-2xl mx-auto px-4">
      <div className="grid sm:grid-cols-3 gap-4">
        <Benefit
          icon={<Sparkles size={18} />}
          title="Diseño claro"
          text="UI glass/dark con tipografía legible, chips y sombras suaves para enfocarte en lo que importa."
        />
        <Benefit
          icon={<ShieldCheck size={18} />}
          title="Contenido confiable"
          text="Datos de ejercicios con guía visual e instrucciones para entrenar con seguridad."
        />
        <Benefit
          icon={<Dumbbell size={18} />}
          title="Rutinas al instante"
          text="Plantillas listas para empezar y modales con detalles y pasos."
        />
      </div>
    </div>
  );
}
function Benefit({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4 sm:p-5 hover:bg-white/10 transition-colors">
      <div className="inline-flex items-center gap-2 text-amber-300">
        {icon}
        <span className="text-sm tracking-wider uppercase">Ventaja</span>
      </div>
      <h3 className="mt-2 text-xl font-bold">{title}</h3>
      <p className="mt-1 text-white/80 text-sm">{text}</p>
    </div>
  );
}

/* ------------------------ LIMITED OFFER BANNER ------------------------ */
function LimitedOfferBanner() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4">
      <div className="rounded-2xl border border-amber-400/30 bg-amber-400/10 backdrop-blur-md p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Clock className="text-amber-300" size={18} />
          <p className="text-sm">
            <span className="font-semibold text-amber-300">Oferta limitada:</span> 30% OFF en plan anual. Cancela cuando quieras.
          </p>
        </div>
        <Link
          to="/checkout?plan=pro-annual"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-black font-semibold transition-colors"
        >
          Aprovechar ahora <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

/* ------------------------------- PRICING (mini Home) ------------------------------- */
function Pricing() {
  const [annual, setAnnual] = useState(true);
  const price = (m, y) => (annual ? y : m);

  const plans = [
    {
      id: "basic",
      name: "Basic",
      tagline: "Empieza hoy",
      priceMonthly: 19,
      priceYearly: 190,
      features: ["Acceso al gym (horario base)", "App de rutinas"],
      icon: <Dumbbell size={16} />,
      variant: "basic",
    },
    {
      id: "pro",
      name: "Pro",
      tagline: "El más popular",
      priceMonthly: 39,
      priceYearly: 390,
      features: ["Acceso 24/7", "Clases grupales"],
      icon: <Crown size={16} className="text-amber-300" />,
      variant: "pro",
      badge: "Popular",
      highlight: true,
    },
    {
      id: "elite",
      name: "Elite",
      tagline: "Resultados máximos",
      priceMonthly: 69,
      priceYearly: 690,
      features: ["Todo en Pro", "1:1 mensual"],
      icon: <Zap size={16} />,
      variant: "elite",
      badge: "Premium",
    },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto px-4">
      {/* Toggle mensual/anual compacto */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <span className="text-xs text-white/70">Mensual</span>
        <button
          onClick={() => setAnnual(v => !v)}
          className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
            annual ? "bg-amber-500" : "bg-white/10"
          }`}
          aria-label="Cambiar facturación"
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-black transition-transform ${
              annual ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
        <span className="text-xs text-white/70">
          Anual <span className="text-amber-300">–30%</span>
        </span>
      </div>

      {/* Cards mini (toda la tarjeta navega a /memberships) */}
      <div className="flex flex-row flex-wrap justify-center gap-5">
        {plans.map((p, idx) => (
          <Link
            key={p.id}
            to="/memberships"
            className={[
              "group relative w-full sm:w-64 rounded-2xl p-4 border backdrop-blur-xl shadow-lg",
              p.highlight
                ? "border-amber-400/40 bg-amber-400/10"
                : "border-white/20 bg-white/10",
              "transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl",
              "opacity-0 translate-y-2 animate-[miniIn_420ms_ease_1_forwards]",
            ].join(" ")}
            style={{ animationDelay: `${idx * 60}ms` }}
            aria-label={`Ver plan ${p.name}`}
          >
            {/* Badge */}
            {p.badge && (
              <span className="absolute right-3 top-3 text-[10px] px-2 py-0.5 rounded-full border border-amber-400/40 bg-amber-400/10 text-amber-300">
                {p.badge}
              </span>
            )}

            {/* Header */}
            <div className="flex items-center gap-2">
              {p.icon}
              <div className="text-base font-bold">{p.name}</div>
            </div>
            <div className="text-xs text-white/70">{p.tagline}</div>

            {/* Precio */}
            <div className="mt-3 flex items-end gap-1">
              <div className="text-2xl font-extrabold">
                ${price(p.priceMonthly, p.priceYearly)}
              </div>
              <div className="text-white/60 mb-0.5 text-xs">/{annual ? "año" : "mes"}</div>
            </div>

            {/* Bullets compactos */}
            <ul className="mt-3 space-y-1.5 text-xs text-white/85">
              {p.features.map((f) => (
                <li key={f} className="truncate">• {f}</li>
              ))}
            </ul>

            {/* CTA sutil */}
            <div className="mt-4 inline-flex items-center gap-1 text-sm text-amber-300">
              Ver planes <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </div>

            {/* Glow hover */}
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 h-24 w-40 rounded-full bg-amber-400/10 blur-3xl" />
            </div>

            <style>{`
              @keyframes miniIn {
                from { opacity: 0; transform: translateY(6px); }
                to   { opacity: 1; transform: translateY(0); }
              }
            `}</style>
          </Link>
        ))}
      </div>
    </div>
  );
}


/* ------------------------------ TESTIMONIALS ------------------------------ */
function Testimonials() {
  const data = [
    {
      name: "María G.",
      role: "Miembro Elite",
      quote: "En 8 semanas mejoré fuerza y técnica. Las rutinas y guías son clarísimas.",
      stars: 5,
    },
    {
      name: "Alex R.",
      role: "Miembro Pro",
      quote: "El ambiente, el diseño y la app: TODO te invita a entrenar. 10/10.",
      stars: 5,
    },
    {
      name: "Luis M.",
      role: "Miembro Basic",
      quote: "Vine por el precio, me quedé por los resultados. Súper recomendado.",
      stars: 4,
    },
  ];
  return (
    <div className="max-w-screen-2xl mx-auto px-4">
      <div className="flex flex-row flex-wrap justify-center gap-6">
        {data.map((t) => (
          <div key={t.name} className="w-full sm:w-[30%] min-w-[260px] rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4 sm:p-5">
            <div className="flex items-center gap-2 text-amber-300">
              {Array.from({ length: t.stars }).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <p className="mt-2 text-white/80 text-sm">{t.quote}</p>
            <div className="mt-3 text-sm font-semibold">{t.name}</div>
            <div className="text-xs text-white/60">{t.role}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------- FAQ --------------------------------- */
function FAQ() {
  const [open, setOpen] = useState(null);
  const items = [
    {
      q: "¿Puedo cancelar cuando quiera?",
      a: "Sí. Puedes cancelar en cualquier momento desde tu cuenta. No hay permanencias.",
    },
    {
      q: "¿El plan incluye clases?",
      a: "El plan Pro incluye clases grupales. Elite añade 1:1 mensual con entrenador personal.",
    },
    {
      q: "¿Puedo cambiar de plan después?",
      a: "Claro. Puedes subir o bajar de plan cuando quieras; el cambio prorratea el siguiente periodo.",
    },
    {
      q: "¿Tienen prueba gratuita?",
      a: "Lanzamos pruebas y cupones en temporadas. Revisa la oferta limitada actual o contáctanos.",
    },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto px-4">
      <div className="mx-auto max-w-3xl">
        {items.map((it, i) => {
          const isOpen = open === i;
          return (
            <div key={it.q} className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-4 mb-3">
              <button
                className="w-full flex items-center justify-between text-left"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <span className="font-semibold">{it.q}</span>
                {isOpen ? <Minus size={18} /> : <Plus size={18} />}
              </button>
              <div className={`grid transition-all duration-200 ${isOpen ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <p className="text-sm text-white/80">{it.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* --------------------------- CALL TO ACTION --------------------------- */
function CallToAction() {
  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-10 overflow-hidden relative">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-b from-amber-300/30 to-amber-500/30 blur-3xl pointer-events-none" />
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Construye tu mejor versión
          </h3>
          <p className="mt-2 text-white/80 max-w-2xl">
            Únete hoy, elige tu plan y empieza con una rutina lista. Si no te encanta, cancelas cuando quieras.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              to="/checkout?plan=pro"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold bg-amber-500 hover:bg-amber-600 text-black transition-colors"
            >
              Unirme ahora <ArrowRight size={18} />
            </Link>
            <Link
              to="/exercises"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-colors"
            >
              Ver ejercicios <Dumbbell size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
