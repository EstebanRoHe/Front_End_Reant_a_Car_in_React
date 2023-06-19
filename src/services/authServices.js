import http from '../http-common';

const login = credentials => {
  return http.post('/login', credentials);
};

const setAuthToken = token => {
  // Aquí puedes almacenar el token en localStorage, sessionStorage o en una cookie
  // Ejemplo con localStorage:
  localStorage.setItem('authToken', token);
};

const getAuthToken = () => {
  // Aquí obtienes el token almacenado previamente
  // Ejemplo con localStorage:
  return localStorage.getItem('authToken');
};

const removeAuthToken = () => {
  // Aquí remueves el token almacenado
  // Ejemplo con localStorage:
  localStorage.removeItem('authToken');
};

const AuthServices = {
  login,
  setAuthToken,
  getAuthToken,
  removeAuthToken
};

export default AuthServices;