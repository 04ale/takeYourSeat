import axios from "axios";

// A baseURL foi REMOVIDA. Isso é crucial.
// Agora, chamadas como `publicApi.post('/auth/login')` se tornarão
// uma requisição para '/api/auth/login' por causa dos interceptors abaixo.

const publicApi = axios.create();
const privateApi = axios.create();

// Interceptor para garantir que TODAS as chamadas comecem com /api
const addApiPrefix = (config) => {
  if (config.url && !config.url.startsWith('/api')) {
    config.url = `/api${config.url}`;
  }
  return config;
};

publicApi.interceptors.request.use(addApiPrefix);
privateApi.interceptors.request.use(addApiPrefix);


// Interceptor que adiciona o token de autenticação APENAS à instância privada
privateApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { publicApi, privateApi };