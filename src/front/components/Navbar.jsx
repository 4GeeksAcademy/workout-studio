import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/LOGO HORIZONTAL/Recurso 9ldpi.png";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Navbar = () => {
  const menuBackdropRef = useRef(null);
  const headerRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const {store} = useGlobalReducer()

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) return;
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

  useEffect(() => {
    const header = headerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const color = entry.target.getAttribute("data-header-color");
            if (color) header.style.color = color;
          }
        });
      },
      { threshold: 0.9 }
    );
    document.querySelectorAll(".landing-section").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onResize = () => window.innerWidth >= 768 && setMobileOpen(false);
    const onKey = (e) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const NAV_ITEMS = [
    { to: "/", label: "INICIO" },
    { to: "/", label: "MEMBRESIA" },
    { to: "/section", label: "MACHINES" },
    { to: "/about", label: "ACERCA DE" },
    ...(store.profile ? [{ to: "/adminpannel", label: "ADMIN" }] : []),
    { to: "/", label: "ENTRENADORES" },
    { to: "/login", label: "CUENTA" },
    { to: "/user", label: "RUTINAS" },
  ];

  const NavCenter = () => (
    <ul className="flex gap-0 text-sm text-white
      [&>li>a]:transition-colors [&>li>a]:duration-500
      [&>li>a]:text-current [&>li>a]:font-medium
      [&>li>a]:inline-block [&>li>a]:px-4 [&>li>a]:py-2">
      <li><Link to="/">INICIO</Link></li>
      <li><Link to="/member">MEMBRESIA</Link></li>
      <li><Link to="/section">MACHINES</Link></li>
      {store.profile&&<li><Link to="/adminpannel">ADMIN</Link></li>}
      <li><Link to="/user">RUTINAS</Link></li>
      <li><Link to="/about">ACERCA DE</Link></li>

    </ul>
  );

  const NavRight = () => (
    <ul className="flex gap-0 text-sm text-white
      [&>li>a]:transition-colors [&>li>a]:duration-500
      [&>li>a]:text-current [&>li>a]:font-medium
      [&>li>a]:inline-block [&>li>a]:px-4 [&>li>a]:py-2">
      <li><Link to="/pruebadash">ENTRENADORES</Link></li>
      <li><Link to="/login">CUENTA</Link></li>
    </ul>
  );

  useEffect(() => {
    const updateHH = () => {
      const h = headerRef.current?.getBoundingClientRect().height ?? 64;
      document.documentElement.style.setProperty("--hh", `${h}px`);
    };
    updateHH();
    window.addEventListener("resize", updateHH);
    return () => window.removeEventListener("resize", updateHH);
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        id="landing-header"
        className="py-3 px-4 md:px-10 flex items-center sticky top-0 w-full justify-between
             bg-gradient-to-r from-[#b30000] via-black to-gray-500
             backdrop-blur-sm transition-colors duration-500 rounded-b-2xl md:rounded-b-3xl
             z-50"
      >
        <div className="flex flex-grow basis-0">
          <ul>
            <li>
              <Link to="/" aria-label="Inicio">
                <img className="w-30 h-10 rounded" src={logo} alt="logo" />
              </Link>
            </li>
          </ul>
        </div>

        <nav className="hidden md:block">
          <NavCenter />
        </nav>

        <nav className="hidden md:flex flex-grow basis-0 justify-end">
          <NavRight />
        </nav>

        <button
          className="md:hidden relative h-10 w-10 grid place-items-center rounded-xl border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/60"
          aria-controls="mobile-menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span
            aria-hidden
            className={`absolute left-1/2 -translate-x-1/2 h-[2px] w-5 rounded-full bg-white transition-all duration-300
            ${mobileOpen ? "translate-y-0 rotate-45" : "-translate-y-[6px] rotate-0"}`}
          />
          <span
            aria-hidden
            className={`absolute left-1/2 -translate-x-1/2 h-[2px] w-5 rounded-full bg-white transition-all duration-200
            ${mobileOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"}`}
          />
          <span
            aria-hidden
            className={`absolute left-1/2 -translate-x-1/2 h-[2px] w-5 rounded-full bg-white transition-all duration-300
            ${mobileOpen ? "translate-y-0 -rotate-45" : "translate-y-[6px] rotate-0"}`}
          />
        </button>

        <div
          ref={menuBackdropRef}
          id="menu-backdrop"
          className="pointer-events-none absolute bg-white/10 backdrop-blur-lg rounded-xl
                     translate-x-[var(--left)] translate-y-[var(--top)]
                     w-[var(--width)] h-[var(--height)] left-0 top-0
                     transition-all duration-300 ease-in-out opacity-0 -z-10 hidden md:block"
        />
      </header>

      <div
        className={`fixed left-0 right-0 bottom-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden
              top-[var(--hh,64px)] ${mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setMobileOpen(false)}
      />

      <div
        id="mobile-menu"
        aria-hidden={!mobileOpen}
        className={`md:hidden fixed left-0 right-0 z-40 will-change-transform transition-transform duration-300
              top-[var(--hh,64px)]
              ${mobileOpen ? "translate-y-0" : "-translate-y-full pointer-events-none"}`}
      >
        <div
          className="mx-4 pb-3 pt-3 px-3
                     bg-gradient-to-r from-[#b30000] via-black to-gray-500 backdrop-blur-sm border border-white/10
                     rounded-2xl shadow-xl"
        >
          <ul className="grid grid-cols-1 gap-1 text-white text-sm">
            {NAV_ITEMS.map((it) => (
              <li key={it.label}>
                <Link
                  to={it.to}
                  onClick={() => setMobileOpen(false)}
                  className="block w-full px-4 py-3 rounded-xl hover:bg-white/10 transition-colors"
                >
                  {it.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
   
    </>
  );
};

export default Navbar;