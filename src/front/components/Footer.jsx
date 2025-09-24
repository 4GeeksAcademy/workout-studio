// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { Instagram, Twitter, Youtube, Mail, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-14 bg-black text-white">
      {/* Glow sutil */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-[38rem] rounded-full bg-[#FFB901]/10 blur-3xl" />

      <div className="max-w-screen-2xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="inline-flex items-center gap-2">
              <div className="text-lg font-extrabold tracking-tight">
                <span className="bg-gradient-to-b from-[#ff4d4d] to-[#FFB901] bg-clip-text text-transparent">
                  Gyron
                </span>
                Studio
              </div>
            </div>
            <p className="mt-3 text-sm text-white/70">
              Entrena con claridad: ejercicios, rutinas y un diseño que motiva.
            </p>

            {/* Social */}
            <div className="mt-4 flex items-center gap-3">
              <a
                href="#"
                className="p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-[#FFB901]/20 transition"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-[#FFB901]/20 transition"
              >
                <Twitter size={16} />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-[#FFB901]/20 transition"
              >
                <Youtube size={16} />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-[#FFB901]/20 transition"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80">
              Producto
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  className="text-white/70 hover:text-[#ff4d4d] transition"
                  to="/exercises"
                >
                  Ejercicios
                </Link>
              </li>
              <li>
                <Link
                  className="text-white/70 hover:text-[#ff4d4d] transition"
                  to="/routines"
                >
                  Rutinas
                </Link>
              </li>
              <li>
                <Link
                  className="text-white/70 hover:text-[#ff4d4d] transition"
                  to="/memberships"
                >
                  Membresías
                </Link>
              </li>
              <li>
                <a
                  className="text-white/70 hover:text-[#ff4d4d] transition"
                  href="#"
                >
                  App móvil
                </a>
              </li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80">
              Compañía
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  className="text-white/70 hover:text-[#ff4d4d] transition"
                  href="#"
                >
                  Nosotros
                </a>
              </li>
              <li>
                <a
                  className="text-white/70 hover:text-[#ff4d4d] transition"
                  href="#"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  className="text-white/70 hover:text-[#ff4d4d] transition"
                  href="#"
                >
                  Soporte
                </a>
              </li>
              <li>
                <a
                  className="text-white/70 hover:text-[#ff4d4d] transition"
                  href="#"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80">
              Recibe novedades
            </h4>
            <p className="mt-3 text-sm text-white/70">
              Consejos de entrenamiento y ofertas. Sin spam.
            </p>
            <div className="mt-3 flex items-center gap-2">
              <input
                type="email"
                placeholder="tu@email.com"
                className="w-full rounded-xl px-3 py-2 bg-white/5 border border-white/10 outline-none focus:border-[#FFB901]/50 placeholder:text-white/50"
              />
              <button className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#FFB901] hover:bg-red-800 text-white font-semibold transition">
                Enviar <ArrowRight size={16} />
              </button>
            </div>
            <p className="mt-2 text-[11px] text-white/50">
              Al enviar aceptas nuestros términos y privacidad.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-screen-2xl mx-auto px-4 h-14 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/60">
          <div>
            © {new Date().getFullYear()} Gyron Studio — Todos los derechos
            reservados.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-[#ff4d4d] transition">
              Privacidad
            </a>
            <a href="#" className="hover:text-[#ff4d4d] transition">
              Términos
            </a>
            <a href="#" className="hover:text-[#ff4d4d] transition">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
