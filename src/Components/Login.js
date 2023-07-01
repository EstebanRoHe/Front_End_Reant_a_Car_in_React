import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthServices from '../services/authServices';
import './Login.css';

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await AuthServices.login({ username, password });
      const { token, Role, Username } = response.data;
      AuthServices.setAuthToken(token);
      AuthServices.setRole(Role);
      AuthServices.setUsername(Username);
      setIsLoggedIn(true);
      setErrors(false);
      navigate('/');
    } catch (error) {
      setErrors(true);
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="content">
        <h2 style={{ color: 'white' }}>Inicio de Sesión</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-person"></i>
              </span>
              <input
                type="text"
                className="form-control"
                id="username"
                aria-describedby="emailHelp"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                style={{ width: '300px' }}
              />
            </div>
          </div>
          <div className="mb-3">
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-lock"></i>
              </span>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
          </div>
          {errors && (
            <div className='errorDiv'>
              <small className="errorSmall" id="helpId" >
                <i className="bi bi-exclamation-circle"> Usuario o contraseña incorrecta</i>

              </small>
            </div>
          )}
          <button type="submit" className="btn btn-secondary">
            Iniciar sesión
          </button>
        </form>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Link className="btn btn-primary" style={{ marginTop: '5%' }} to={'/UserCreate'}>
            <i className="bi bi-person-plus"> Registrarse</i>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
