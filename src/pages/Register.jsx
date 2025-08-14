// src/pages/Register.jsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem!");
      return;
    }

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await api.post("/api/auth/register", {
        username,
        email,
        password,
      });

      setSuccess(
        "Cadastro realizado com sucesso! Você será redirecionado para o login."
      );

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("Erro completo da API:", err.response);

      if (err.response && err.response.data) {
        const errorMessage =
          typeof err.response.data === "object" && err.response.data.message
            ? err.response.data.message
            : err.response.data;
        setError(errorMessage);
      } else {
        setError("Ocorreu um erro durante o cadastro. Tente novamente.");
      }
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F8F3ED]">
      <form
        onSubmit={handleRegister}
        className="p-8 bg-white rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Criar Conta</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && (
          <p className="text-green-500 text-center mb-4">{success}</p>
        )}

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
        <div className="mb-4">
          <label className="block mb-2">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2">Confirmar Senha:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-rose-300 text-gray-800 font-bold py-2 rounded-lg hover:bg-rose-400 transition-colors"
          disabled={!!success}
        >
          Registrar
        </button>

        <p className="text-center mt-4">
          Já tem uma conta?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Faça o login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
