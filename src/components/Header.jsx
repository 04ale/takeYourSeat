import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, User, Menu, X, LogIn, LogOut } from "lucide-react"; // Importe os novos ícones
import logo from "../assets/img/logo.png";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const { isLoggedIn, logout } = useAuth();

  const activeLinkStyle = {
    color: "#E11D48",
    fontWeight: "bold",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    navigate(`/search?query=${searchValue}`);
    setSearchValue("");
    setIsMenuOpen(false);
  };
  
  const handleLogout = () => {
    logout();
    setIsMenuOpen(false); // Fecha o menu mobile após o logout
  };

  return (
    <header className="bg-rose-100 text-[#333] shadow-md sticky top-0 z-50 ">
      <div className="container mx-auto flex justify-between items-center p-4 gap-4">
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <img src={logo} alt="Take Your Seat Logo" className="h-12 md:h-16" />
        </Link>
        
        {/* Barra de pesquisa (agora é a mesma para mobile e desktop) */}
        <form onSubmit={handleSubmit} className="relative hidden sm:block">
          <input
            type="text"
            placeholder="Pesquisar filme"
            className="border border-gray-300 bg-white/30 rounded-full py-1.5 pl-10 pr-4 focus:outline-none focus:border-rose-400 w-48 md:w-[500px]"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button type="submit" aria-label="Buscar">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
          </button>
        </form>

        {/* 4. RENDERIZAÇÃO CONDICIONAL DA NAVEGAÇÃO DESKTOP */}
        <nav className="hidden md:flex items-center gap-6">
          {isLoggedIn ? (
            <>
              <NavLink to="/wishlist" className="font-semibold hover:text-rose-500 duration-300 transition-all" style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}>
                Lista de Desejos
              </NavLink>
              <NavLink to="/my-reviews" className="font-semibold hover:text-rose-500 duration-300 transition-all" style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}>
                Avaliações
              </NavLink>
              <NavLink to="/profile" className="font-semibold hover:text-rose-500 duration-300 transition-all" style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}>
                Perfil
              </NavLink>
              <button onClick={handleLogout} className="font-semibold hover:text-rose-500 flex items-center gap-1 duration-300 transition-all cursor-pointer">
                <LogOut size={20} /> Sair
              </button>
            </>
          ) : (
            <Link to="/login" className="font-semibold hover:text-rose-500 flex items-center gap-1 bg-rose-200 px-4 py-2 rounded-lg">
              <LogIn size={20} /> Login
            </Link>
          )}
        </nav>

        <button
          className="md:hidden flex-shrink-0"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* 5. RENDERIZAÇÃO CONDICIONAL DO MENU MOBILE */}
      {isMenuOpen && (
        <div className="md:hidden bg-rose-100 pb-4 px-4 border-t border-rose-200">
          <nav className="flex flex-col items-center gap-4 pt-4">
            {isLoggedIn ? (
              <>
                <NavLink to="/wishlist" className="font-semibold" style={({ isActive }) => (isActive ? activeLinkStyle : undefined)} onClick={() => setIsMenuOpen(false)}>
                  Lista de Desejos
                </NavLink>
                <NavLink to="/my-reviews" className="font-semibold" style={({ isActive }) => (isActive ? activeLinkStyle : undefined)} onClick={() => setIsMenuOpen(false)}>
                  Avaliações
                </NavLink>
                <button onClick={handleLogout} className="font-semibold flex items-center gap-2">
                  <LogOut size={20} /> Sair
                </button>
              </>
            ) : (
              <Link to="/login" className="font-semibold flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                <LogIn size={20} /> Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;