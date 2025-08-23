import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo_white_01.png";

const Navbar = () => {
  const menuBackdropRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const listItems = document.querySelectorAll("#landing-header li");
    const menuBackDrop = menuBackdropRef.current;

    const handleMouseEnter = (e) => {
      const item = e.currentTarget;
      const { left, top, width, height } = item.getBoundingClientRect();
      menuBackDrop.style.setProperty("--left", `${left}px`);
      menuBackDrop.style.setProperty("--top", `${top}px`);
      menuBackDrop.style.setProperty("--width", `${width}px`);
      menuBackDrop.style.setProperty("--height", `${height}px`);
      menuBackDrop.style.opacity = "1";
      menuBackDrop.style.visibility = "visible";
    };

    const handleMouseLeave = () => {
      menuBackDrop.style.opacity = "0";
      menuBackDrop.style.visibility = "hidden";
    };

    listItems.forEach((item) => {
      item.addEventListener("mouseenter", handleMouseEnter);
      item.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      listItems.forEach((item) => {
        item.removeEventListener("mouseenter", handleMouseEnter);
        item.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  // IntersectionObserver para cambiar color dinámicamente
  useEffect(() => {
    const header = headerRef.current;

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.9,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const color = entry.target.getAttribute("data-header-color");
          if (color) {
            header.style.color = color;
          }
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll(".landing-section");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <header
      ref={headerRef}
      id="landing-header"
      className="py-3 px-10 flex items-center fixed top-0 w-full justify-between z-40 bg-black transition-colors duration-500 rounded-b-3xl"
    >
      {/* Logo */}
      <div className="flex flex-grow basis-0">
        <ul>
          <li>
            <Link to="/">
              <img className="w-10 h-10 rounded" src={logo} alt="logo" />
            </Link>
          </li>
        </ul>
      </div>

      {/* Menú central */}
      <nav>
        <ul className="flex text-sm text-yellow-400 [&>li>a]:transition-colors [&>li>a]:duration-500 [&>li>a]:text-current [&>li>a]:font-medium [&>li>a]:inline-block [&>li>a]:px-4 [&>li>a]:py-2">
          <li><Link to="/">INICIO</Link></li>
          <li><Link to="/">MEMBRESIA</Link></li>
          <li><Link to="/section">MACHINES</Link></li>
          <li><Link to="/">ACERCA DE</Link></li>
        </ul>
      </nav>

      {/* Menú derecho */}
      <nav className="flex flex-grow basis-0 justify-end">
        <ul className="flex text-sm text-yellow-400 [&>li>a]:transition-colors [&>li>a]:duration-500 [&>li>a]:text-current [&>li>a]:font-medium [&>li>a]:inline-block [&>li>a]:px-4 [&>li>a]:py-2">
          <li><Link to="/">ENTRENADORES</Link></li>
          <li><Link to="/login">CUENTA</Link></li>
        </ul>
      </nav>

      {/* Backdrop */}
      <div
        ref={menuBackdropRef}
        id="menu-backdrop"
        className="absolute bg-white/20 backdrop-blur-lg rounded translate-x-[var(--left)] translate-y-[var(--top)] w-[var(--width)] h-[var(--height)] left-0 top-0 transition-all duration-300 ease-in-out opacity-0 -z-10"
      ></div>
    </header>
  );
};

export default Navbar;
