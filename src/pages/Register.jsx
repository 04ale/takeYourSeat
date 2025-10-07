
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {publicApi} from "../api/api";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");

    if (password !== confirmPassword) {
      setErrors({ confirmPassword: "As senhas não coincidem!" });
      return;
    }

    try {
      await publicApi.post("/api/auth/register", {
        username,
        email,
        password,
        dateOfBirth,
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
        if (err.response.data.errors) {
          setErrors(err.response.data.errors);
        } else if (err.response.data.message) {
          setErrors({ form: err.response.data.message });
        } else {
          setErrors({ form: "Ocorreu um erro durante o cadastro. Tente novamente." });
        }
      } else {
        setErrors({ form: "Não foi possível conectar ao servidor. Verifique sua rede." });
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

        {errors.form && <p className="text-red-500 text-center mb-4">{errors.form}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        <div className="mb-4">
          <label className="block mb-2">Usuário:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
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
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
         <div>
                <label htmlFor="dob" className="block text-sm font-medium text-gray-600 mb-1">Data de Nascimento:</label>
                <input
                  id="dob"
                  className="bg-rose-300/20 p-4 w-full max-lg:w-[340px] rounded-2xl"
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
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
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
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
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
        </div>

        <button
          type="submit"
          className="w-full duration-300 bg-rose-300 text-gray-800 font-bold py-2 rounded-lg hover:bg-rose-400 transition-colors"
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