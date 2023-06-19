import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import AuthServices from '../services/authServices';
import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await AuthServices.login({ username, password });
            const token = response.data.token;
            AuthServices.setAuthToken(token); 
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (

        <div className="login-container">
            <div className="content">
                <h2 style={{ color: "white" }} >Inicio de Seccion</h2>
                <form onSubmit={handleLogin}>
                    <div class="mb-3" >
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
                                style={{ width: "300px" }} // Cambia el valor según el ancho deseado
                            />
                        </div>



                    </div>
                    <div class="mb-3">
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="bi bi-lock"></i>
                            </span>
                            
                            <input type="password"
                                class="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                            />
                        </div>
                    </div>
                    <button type="submit" class="btn btn-secondary">Iniciar sesión</button>

                </form>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Link className="btn btn-primary " style={{ marginTop: "5%" }} to={"/UserCreate"}>
                        <i className="bi bi-person-plus"> Registrarse</i>
                    </Link>
                </div>



            </div>
        </div>
    );

}
export default Login;
