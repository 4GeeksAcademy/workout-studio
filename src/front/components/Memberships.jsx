// src/components/Memberships.jsx
import { useMemo, useState } from "react";
import {
  Check,
  X,
  Crown,
  ArrowRight,
  BadgePercent,
  Dumbbell,
  Zap,
} from "lucide-react";

const currency = (n) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(n);

export default function Memberships({ onSelect }) {
  const [cycle, setCycle] = useState("monthly"); // "monthly" | "yearly"
  const DISCOUNT = 0.2; // 20%

  // ---------- Planes: Basic, Pro, Elite ----------
  const basePlans = useMemo(
    () => [
      {
        id: "basic",
        name: "Basic",
        tagline: "Empieza hoy",
        monthlyPrice: 299,
        features: [
          { ok: true, text: "Acceso ilimitado al gym (horario base)" },
          { ok: true, text: "Clases grupales esenciales" },
          { ok: true, text: "App con rutinas base" },
          { ok: true, text: "Lockers comunitarios" },
          { ok: false, text: "Acceso 24/7" },
          { ok: false, text: "Área Black & Lounge" },
          { ok: false, text: "Entrenador 1 a 1 mensual" },
        ],
        cta: "Elegir Basic",
        icon: <Dumbbell size={18} />,
        variant: "basic",
      },
      {
        id: "pro",
        name: "Pro",
        tagline: "El más popular",
        monthlyPrice: 599,
        features: [
          { ok: true, text: "Acceso 24/7" },
          { ok: true, text: "Clases premium (HIIT, Cycling, Boxing)" },
          { ok: true, text: "Plan personalizado y seguimiento" },
          { ok: true, text: "Área Black & Lounge" },
          { ok: true, text: "Sauna & Recovery Zone" },
          { ok: true, text: "Invitados (2/mes)" },
        ],
        cta: "Unirme a Pro",
        icon: <Crown size={18} className="text-yellow-300" />,
        variant: "pro",
        highlight: true,
        badge: "Popular",
      },
      {
        id: "elite",
        name: "Elite",
        tagline: "Resultados máximos",
        monthlyPrice: 899,
        features: [
          { ok: true, text: "Todo en Pro" },
          { ok: true, text: "Entrenador personal 1:1 mensual" },
          { ok: true, text: "Evaluación física trimestral" },
          { ok: true, text: "Invitados ilimitados en fines de semana" },
          { ok: true, text: "Suplemento de bienvenida" },
        ],
        cta: "Ir a Elite",
        icon: <Zap size={18} />,
        variant: "elite",
        badge: "Premium",
      },
    ],
    []
  );

  const plans = useMemo(() => {
    return basePlans.map((p) => {
      const yearlyTotal = Math.round(p.monthlyPrice * 12 * (1 - DISCOUNT));
      const yearlyPerMonth = Math.round(yearlyTotal / 12);
      return { ...p, yearlyTotal, yearlyPerMonth };
    });
  }, [basePlans]);

  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-10 py-10 bg-black mt-10 text-white">
      <div className="pointer-events-none absolute -top-20 -right-32 h-56 w-56 rounded-full bg-yellow-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-32 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

      <div className="mx-auto max-w-6xl flex flex-col items-center gap-6">
        <header className="text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Membresías
          </h2>
          <p className="text-white/70 mt-2">
            Elige el plan perfecto para tu entrenamiento
          </p>
        </header>

        {/* Toggle Mes | Año */}
        <div className="relative">
          <div
            role="group"
            aria-label="Facturación"
            className="relative grid grid-cols-2 rounded-2xl border border-white/15 bg-white/10 p-1 backdrop-blur-md"
          >
            <span
              className={`absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-xl bg-black/40 border border-white/10 backdrop-blur-xl transition-transform duration-300 ${
                cycle === "monthly" ? "translate-x-0" : "translate-x-full"
              }`}
              aria-hidden
            />
            <button
              type="button"
              aria-pressed={cycle === "monthly"}
              onClick={() => setCycle("monthly")}
              className={`relative z-10 py-2 px-6 text-sm font-semibold transition-colors ${
                cycle === "monthly"
                  ? "text-white"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Por mes
            </button>
            <button
              type="button"
              aria-pressed={cycle === "yearly"}
              onClick={() => setCycle("yearly")}
              className={`relative z-10 py-2 px-6 text-sm font-semibold transition-colors ${
                cycle === "yearly"
                  ? "text-white"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Por año
            </button>
          </div>

          <div className="mt-2 flex items-center justify-center gap-2 text-xs text-white/80">
            <BadgePercent size={16} className="opacity-80" />
            {cycle === "yearly" ? (
              <span className="transition-opacity duration-300">
                Ahorra <b>20%</b> pagando anual
              </span>
            ) : (
              <span className="transition-opacity duration-300 opacity-70">
                Cámbiate a anual y ahorra <b>20%</b>
              </span>
            )}
          </div>
        </div>

        {/* Cards */}
        <div className="mt-8 grid w-full max-w-6xl grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, idx) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              cycle={cycle}
              onSelect={() => onSelect?.(plan.id, cycle)}
              delay={idx * 60}
            />
          ))}
        </div>

        <p className="text-center text-xs text-white/60 mt-4">
          Sin contratos forzosos. Cancela cuando quieras. Impuestos incluidos.
        </p>
      </div>
    </section>
  );
}

function PlanCard({ plan, cycle, onSelect, delay = 0 }) {
  const priceMonthly = plan.monthlyPrice;
  const priceYearlyPM = plan.yearlyPerMonth;
  const billedYearly = plan.yearlyTotal;

  // Variantes visuales: basic / pro / elite
  const variantStyles = {
    basic:
      "border-white/15 bg-[#151515]/90 hover:[box-shadow:0_0_0_1px_rgba(255,255,255,0.16),0_0_28px_rgba(0,0,0,0.35)]",
    pro:
      "border-yellow-400/40 bg-[rgba(255,204,0,0.06)] ring-1 ring-yellow-400/10 hover:[box-shadow:0_0_0_1px_rgba(250,204,21,0.5),0_0_28px_rgba(250,204,21,0.35)]",
    elite:
      "border-white/15 bg-[#151515]/90 hover:[box-shadow:0_0_0_1px_rgba(255,255,255,0.16),0_0_28px_rgba(0,0,0,0.35)]",
  };

  return (
    <div
      className={[
        "group relative overflow-hidden rounded-2xl",
        "backdrop-blur-md transition-all duration-500 hover:-translate-y-1",
        "p-6 sm:p-7",
        "opacity-0 translate-y-3 animate-[cardIn_500ms_ease_1_forwards]",
        variantStyles[plan.variant],
      ].join(" ")}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Badges */}
      {plan.badge && (
        <div className="absolute right-3 top-3 z-10">
          <span className="inline-flex items-center gap-1 rounded-full border border-yellow-400/40 bg-yellow-400/15 px-3 py-1 text-xs font-semibold text-yellow-300">
            {plan.id === "pro" ? <Crown size={14} /> : null}
            {plan.badge}
          </span>
        </div>
      )}

      {/* Header: icono + nombre */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-extrabold tracking-tight flex items-center gap-2">
            {/* Iconos por variante */}
            {plan.variant === "basic" && (
              <Dumbbell size={18} className="text-white" />
            )}
            {plan.variant === "pro" && (
              <Crown size={18} className="text-yellow-300" />
            )}
            {plan.variant === "elite" && (
              <Zap size={18} className="text-white" />
            )}
            {plan.name}
          </h3>
          <p className="text-white/70 text-sm">{plan.tagline}</p>
        </div>
      </div>

      {/* Precio (transición mensual/anual) */}
      <div className="relative mt-5 h-14">
        {/* Mensual */}
        <div
          className={[
            "absolute inset-0 flex items-end gap-1 transition-all duration-300",
            cycle === "monthly"
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2",
          ].join(" ")}
          aria-hidden={cycle !== "monthly"}
        >
          <span className="text-4xl font-black leading-none">
            {currency(priceMonthly)}
          </span>
          <span className="pb-1 text-white/70">/mes</span>
        </div>

        {/* Anual */}
        <div
          className={[
            "absolute inset-0 flex items-end gap-1 transition-all duration-300",
            cycle === "yearly"
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2",
          ].join(" ")}
          aria-hidden={cycle !== "yearly"}
        >
          <span className="text-4xl font-black leading-none">
            {currency(priceYearlyPM)}
          </span>
          <span className="pb-1 text-white/70">/mes</span>
        </div>
      </div>

      {cycle === "yearly" && (
        <div className="mt-1 text-xs text-white/70">
          Facturación anual:{" "}
          <span className="text-white">{currency(billedYearly)}</span>
        </div>
      )}

      {/* Features */}
      <ul className="mt-6 space-y-3">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-3">
            {f.ok ? (
              <span className="mt-0.5 rounded-md bg-green-500/20 p-1.5 border border-green-400/30 text-green-300">
                <Check size={14} />
              </span>
            ) : (
              <span className="mt-0.5 rounded-md bg-white/10 p-1.5 border border-white/15 text-white/50">
                <X size={14} />
              </span>
            )}
            <span className={f.ok ? "text-white/90" : "text-white/50 line-through"}>
              {f.text}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={onSelect}
        className={[
          "mt-7 inline-flex items-center justify-center gap-2 rounded-xl w-full px-4 py-3 font-semibold",
          "transition-all duration-200 border",
          plan.variant === "pro"
            ? "bg-yellow-400 text-black border-yellow-300 hover:bg-yellow-300"
            : "bg-white/10 text-white border-white/20 hover:bg-white/15",
          "group-hover:translate-y-[-1px]",
        ].join(" ")}
      >
        {plan.cta} <ArrowRight size={18} />
      </button>

      {/* Glow sutil en hover */}
      <div className="pointer-events-none absolute -z-10 inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 h-36 w-56 rounded-full bg-yellow-400/10 blur-3xl" />
      </div>

      <style>{`
        @keyframes cardIn{
          from{opacity:0; transform:translateY(8px)}
          to{opacity:1; transform:translateY(0)}
        }
      `}</style>
    </div>
  );
}
