import React, { useState, useEffect } from "react";
import { useWishlist } from "../context/WishlistContext";
import { privateApi } from "../api/api"; // Usaremos a API privada
import { User as UserIcon } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { logout } = useWishlist();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Busca os dados do usuário do nosso endpoint seguro
        const response = await privateApi.get("/api/users/me");
        setUser(response.data);
      } catch (error) {
        console.error("Falha ao buscar dados do usuário:", error);
        // Se a busca falhar (token inválido, etc.), desloga o usuário
        //logout();
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [logout]); // Adicionamos 'logout' como dependência para a função do linter

  if (loading) {
    return <div className="text-center p-10">Carregando perfil...</div>;
  }

  if (!user) {
    // Se o usuário não for encontrado ou houver erro, esta tela não será renderizada
    // pois o logout já terá redirecionado para /login
    return null;
  }

  // Formata a data de nascimento para o padrão brasileiro
  const formattedBirthDate = user.dateOfBirth
    ? new Date(user.dateOfBirth).toLocaleDateString("pt-BR", {
        timeZone: "UTC",
      })
    : "Não informado";

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Perfil de {user.username}
          </h1>
          <p className="text-gray-500">
            Suas informações e atividades na plataforma.
          </p>
        </div>
        <button
          onClick={logout}
          className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-600 transition-colors mt-4 sm:mt-0"
        >
          Sair
        </button>
      </div>

      {/* INFORMAÇÕES DA CONTA COM OS NOVOS DADOS */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <UserIcon size={24} /> Informações da Conta
        </h2>
        <div className="mt-4 space-y-3 text-gray-700">
          <p>
            <strong>Nome de usuário:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Data de Nascimento:</strong> {formattedBirthDate}
          </p>
        </div>
      </div>
      {/* Aqui você pode adicionar outros painéis no futuro, como "últimas avaliações", etc. */}
    </div>
  );
};

export default Profile;