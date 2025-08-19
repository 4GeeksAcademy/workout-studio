import { FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black text-gold py-8 mt-16">
            <div className="container mx-auto flex flex-col items-center gap-6">

                <nav aria-label="Redes sociales" className="flex gap-8">
                    <a
                        href="#"
                        aria-label="Twitter"
                        className="hover:text-yellow-400 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
                    >
                        <FaTwitter size={24} />
                    </a>
                    <a
                        href="#"
                        aria-label="Facebook"
                        className="hover:text-yellow-400 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
                    >
                        <FaFacebookF size={24} />
                    </a>
                    <a
                        href="https://www.instagram.com/studio_gyron"
                        aria-label="Instagram"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-yellow-400 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
                    >
                        <FaInstagram size={24} />
                    </a>
                </nav>

                <nav aria-label="Enlaces legales" className="flex gap-8 text-sm">
                    <a
                        href="#"
                        className="hover:text-yellow-300 transition-colors focus:outline-none focus:underline"
                    >
                        Privacidad
                    </a>
                    <a
                        href="#"
                        className="hover:text-yellow-300 transition-colors focus:outline-none focus:underline"
                    >
                        Términos
                    </a>
                    <a
                        href="#"
                        className="hover:text-yellow-300 transition-colors focus:outline-none focus:underline"
                    >
                        Contacto
                    </a>
                </nav>

                <p className="text-xs text-gold text-center">
                    © {currentYear} Company, Inc. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
}