import http from '../http-common';

const login = credentials => {
  return http.post('/login', credentials);
};

const setAuthToken = token => {

  localStorage.setItem('authToken', token);
};

const getAuthToken = () => {

  return localStorage.getItem('authToken');
};

const setRole = role => {
  localStorage.setItem('userRole', role);
};

const getRole = () => {
  return localStorage.getItem('userRole');
};

const removeAuthToken = () => {

  localStorage.removeItem('authToken');
  localStorage.removeItem('userRole');
};


const AuthServices = {
  login,
  setAuthToken,
  getAuthToken,
  setRole,
  getRole,
  removeAuthToken
};

export default AuthServices;