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

const setUsername = username => {
  localStorage.setItem('username', username);
};

const getUsername = () => {
  return localStorage.getItem('username');
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
  setUsername,
  getUsername,
  removeAuthToken,
};

export default AuthServices;