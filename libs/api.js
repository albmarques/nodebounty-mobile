import axios from 'axios';
class AppError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AppError';
  }
}

const API_BASE_URL = 'http://localhost:8080'; 

export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.registerInterceptTokenManager = (signOut) => {
  api.interceptors.response.use(
    (response) => response, 
    async (requestError) => {

      if (
        requestError.response?.status === 403 ||
        requestError.response?.data?.message ===
          'Cliente não encontrado no sistema'
      ) {
        signOut();
        return Promise.reject(requestError);
      }

      if (requestError.response && requestError.response.data) {
        return Promise.reject(new AppError(requestError.response.data.message));
      } else {
        return Promise.reject(requestError);
      }
    }
  );
};
  