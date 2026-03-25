import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-card/90 backdrop-blur-sm border-b border-border transition-shadow">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="font-display font-800 text-xl text-primary">
          cadus
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/cadastro" className="btn-outline text-sm py-2 px-4">
            Entrar
          </Link>
          <Link to="/cadastro" className="btn-primary text-sm py-2 px-4">
            Cadastrar
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden btn-ghost p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-card p-4 flex flex-col gap-3">
          <Link to="/cadastro" className="btn-outline text-center" onClick={() => setMenuOpen(false)}>
            Entrar
          </Link>
          <Link to="/cadastro" className="btn-primary text-center" onClick={() => setMenuOpen(false)}>
            Cadastrar
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
