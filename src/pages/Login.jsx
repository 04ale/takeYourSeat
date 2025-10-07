import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // 1. IMPORTA o novo hook de autenticação
import banner from "../assets/img/banner.jpg";
import logo from "../assets/img/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 2. PEGA a função 'login' do nosso AuthContext
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    // Validação simples
    if (!email || !password) {
      setError("Email e senha são obrigatórios.");
      setIsSubmitting(false);
      return;
    }

    try {
      // 3. CHAMA a função 'login' do contexto.
      // A própria função cuidará da chamada de API, de salvar o token e de redirecionar.
      await login(email, password);
      // A navegação agora acontece dentro da função 'login' no AuthContext
    } catch (err) {
      // O catch agora pega os erros da chamada de API feita pelo contexto
      setError("Falha no login. Verifique seu email e senha.");
      console.error("Erro de login:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-row items-center justify-center bg-[#F8F3ED]">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-12 lg:w-1/2 items-center justify-center w-screen p-4"
      >
        <div className="lg:w-[380px] w-full flex flex-col items-center gap-10">
          <Link to="/">
            <img src={logo} alt="Take Your Seat Logo" className="h-4" />
          </Link>
          <div className="flex flex-col gap-8 items-center w-full ">
            <h1 className="text-4xl font-bold text-rose-300">LOGIN</h1>
            <div className="flex flex-col w-full justify-center items-center gap-4">
              <input
                className="bg-rose-300/20 p-4 w-full max-lg:w-[340px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-400"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                className="bg-rose-300/20 p-4 w-full max-lg:w-[340px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-400"
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            {error && <p className="text-red-500 font-semibold">{error}</p>}
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-7 duration-300 transition-all cursor-pointer font-semibold p-4 bg-rose-300 text-white rounded-2xl hover:bg-rose-400 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Entrando..." : "Login"}
            </button>
            <Link
              to="/register"
              className="text-rose-300 font-semibold cursor-pointer hover:underline"
            >
              Cadastrar novo usuário
            </Link>
          </div>
        </div>
      </form>
      <div className="max-lg:hidden lg:w-1/2 h-screen">
        <img src={banner} className="h-full w-full object-cover" alt="Banner" />
      </div>
    </div>
  );
};

export default Login;