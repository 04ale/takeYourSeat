import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    if (!token) {
      navigate("/login");
      return;
    }
    const decodedToken = jwtDecode(token);
    setUser({ username: decodedToken.sub });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("jwt_token");
    window.location.href = "/login";
  };

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto p-4 md:p-8 bg-[#F8F3ED] min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 bg-white p-6 rounded-lg shadow">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Perfil de {user.username}
          </h1>
          <p className="text-gray-500">
            Aqui você pode gerenciar suas informações.
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-600 transition-colors mt-4 sm:mt-0"
        >
          Logout
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold">Informações da Conta</h2>
        <p className="mt-2">
          <strong>Nome de usuário:</strong> {user.username}
        </p>
      </div>
    </div>
  );
};

export default Profile;
