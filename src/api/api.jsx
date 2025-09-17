import axios from "axios";

const baseURL = "http://localhost:8080";

// 1. Instância para chamadas PÚBLICAS (não envia o token)
// Use esta para: registro, login, busca de filmes, etc.
const publicApi = axios.create({
  baseURL,
});

// 2. Instância para chamadas PRIVADAS (envia o token)
// Use esta para: lista de desejos, criar/editar avaliações, perfil do usuário, etc.
const privateApi = axios.create({
  baseURL,
});

// O interceptor é adicionado APENAS à instância privada
privateApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt_token"); // Garanta que a chave é "jwt_token"
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Exporta as duas instâncias para serem usadas no resto da aplicação
export { publicApi, privateApi };
