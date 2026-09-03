import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <a href="/" className="logo">
        NOMAD<span>.</span>
      </a>

      <nav className={menuOpen ? "nav-links active" : "nav-links"}>
        <a href="#explore" onClick={() => setMenuOpen(false)}>
          Explore
        </a>

        <a href="#journey" onClick={() => setMenuOpen(false)}>
          Plan a journey
        </a>

        <a href="#about" onClick={() => setMenuOpen(false)}>
          About
        </a>
      </nav>

      <button
        className="menu-button"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </header>
  );
};

export default Navbar;