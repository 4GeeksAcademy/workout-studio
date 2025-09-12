import { FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-gray-500 py-8 mt-16">
      <div className="container mx-auto flex flex-col items-center gap-6">
        <nav aria-label="Redes sociales" className="flex gap-8 text-[#b30000]">
          <a
            href="#"
            aria-label="Twitter"
            className="transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#b30000] rounded"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="#"
            aria-label="Facebook"
            className="transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#b30000] rounded"
          >
            <FaFacebookF size={24} />
          </a>
          <a
            href="https://www.instagram.com/studio_gyron"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#b30000] rounded"
          >
            <FaInstagram size={24} />
          </a>
        </nav>

        <nav aria-label="Enlaces legales" className="flex gap-8 text-sm">
          <a
            href="#"
            className="hover:text-[#b30000] transition-colors focus:outline-none focus:underline"
          >
            Privacidad
          </a>
          <a
            href="#"
            className="hover:text-[#b30000] transition-colors focus:outline-none focus:underline"
          >
            Términos
          </a>
          <a
            href="#"
            className="hover:text-[#b30000] transition-colors focus:outline-none focus:underline"
          >
            Contacto
          </a>
        </nav>

        <p className="text-xs text-gray-500 text-center">
          © {currentYear} Company, Inc. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
