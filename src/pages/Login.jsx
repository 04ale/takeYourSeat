// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import banner from "../assets/img/banner.jpg";
import logo from "../assets/img/logo.png";

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
    <div className="w-screen h-screen flex flex-row items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-12 lg:w-1/2 items-center justify-center w-screen"
      >
        <div className="lg:w-[380px] w-full flex flex-col items-center gap-10">
          <img src={logo} alt="" className="h-4" />
          <div className="flex flex-col gap-8 items-center w-full ">
            <h1 className="text-4xl font-bold text-rose-300">LOGIN</h1>
            <div className="flex flex-col w-full justify-center items-center gap-4">
              <input
                className="bg-rose-300/20 p-4 w-full max-lg:w-[340px] rounded-2xl"
                type="email"
                placeholder="E-mail:"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="bg-rose-300/20 p-4 w-full max-lg:w-[340px] rounded-2xl"
                type="password"
                placeholder="Senha:"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="px-7 cursor-pointer font-semibold p-4 bg-rose-300 text-white rounded-2xl"
            >
              Login
            </button>
            <Link
              to="/register"
              className="text-rose-300 font-semibold cursor-pointer"
            >
              Cadastrar novo usuário
            </Link>
          </div>
        </div>
      </form>
      <div className="max-lg:hidden lg:w-1/2 h-screen">
        <img src={banner} className="h-full w-full " />
      </div>
    </div>
  );
};

export default Login;
