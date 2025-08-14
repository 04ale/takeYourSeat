import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, User, Menu, X } from "lucide-react";
import logo from "../../img/Your_movie_guide-removebg.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const activeLinkStyle = {
    color: "#E11D48",
    fontWeight: "bold",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    navigate(`/search?q=${searchValue}`);
    setSearchValue("");
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-rose-100 text-[#333] shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4 gap-4">
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <img src={logo} alt="Take Your Seat Logo" className="h-12 md:h-16" />
          <span className="text-2xl font-bold text-rose-500 hidden sm:block">
            Take Your Seat
          </span>
        </Link>

        <form onSubmit={handleSubmit} className="relative md:hidden">
          <input
            type="text"
            placeholder="Pesquisar"
            className="w-48 border border-gray-300 rounded-full py-2 pl-9 pr-3 text-sm focus:outline-none focus:border-rose-400"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button type="submit" aria-label="Buscar">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
          </button>
        </form>

        <nav className="hidden md:flex items-center gap-6">
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              placeholder="Pesquisar filme"
              className="border border-gray-300 rounded-full py-1.5 pl-10 pr-4 focus:outline-none focus:border-rose-400"
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
          <NavLink
            to="/wishlist"
            className="font-semibold hover:text-rose-500"
            style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
          >
            Lista de Desejos
          </NavLink>
          <NavLink
            to="/my-reviews"
            className="font-semibold hover:text-rose-500"
            style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
          >
            Minhas Avaliações
          </NavLink>
          <Link to="/profile">
            <User className="w-8 h-8 p-1.5 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300" />
          </Link>
        </nav>

        <button
          className="md:hidden flex-shrink-0"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-rose-100 pb-4 px-4 border-t border-rose-200">
          <nav className="flex flex-col items-center gap-4 pt-4">
            <NavLink
              to="/wishlist"
              className="font-semibold"
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            >
              Lista de Desejos
            </NavLink>
            <NavLink
              to="/my-reviews"
              className="font-semibold"
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            >
              Minhas Avaliações
            </NavLink>
            <NavLink
              to="/profile"
              className="font-semibold flex items-center gap-2"
            >
              <User size={20} /> Perfil
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
