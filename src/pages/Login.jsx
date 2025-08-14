// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/api/auth/login", {
        username,
        password,
      });
      localStorage.setItem("jwt_token", response.data.token);
      navigate("/");
    } catch (err) {
      setError("Falha no login. Verifique seu usuário e senha.");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#F8F3ED]">
      <form
        onSubmit={handleLogin}
        className="p-8 bg-white rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block mb-2">Usuário:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2">Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-rose-300 text-gray-800 font-bold py-2 rounded-lg hover:bg-rose-400"
        >
          Entrar
        </button>
        <p className="mt-4 text-center ">
          Ainda não tem conta?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Registre-se agora!
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
