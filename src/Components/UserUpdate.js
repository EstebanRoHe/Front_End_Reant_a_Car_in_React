import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import UserServices from "../services/usernameServices";
import Swal from "sweetalert2";
import AuthServices from '../services/authServices';
const UserUpdate = () => {
    const { idUser } = useParams();

    const initialUserState = {
        idUser: null,
        name: "",
        lastName: "",
        username: "",
        password: "",
        email: ""
    };
    const [User, setUser] = useState(initialUserState);
    const [validPassword, setValidPassword] = useState({});

    const getUser = idUser => {
        const token = AuthServices.getAuthToken();
        if (token) {
            UserServices.setAuthToken(token);
            console.log('Token :', token);
        } else {
            console.error("No se encontró un token válido");
            console.log('Token :', token);
            return;
        }
        UserServices.get(idUser)
            .then(response => {
                setUser(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {

        if (idUser)
            getUser(idUser);
    }, [idUser]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUser({ ...User, [name]: value });
    };

    //para hacer handleInputblur y validar el password
    const handleInputblurPassword = (event) => {
        handleInputChange(event);
        setValidPassword(validationPassword(User));

    };


    const updateUser = (e) => {

        e.preventDefault()
        const token = AuthServices.getAuthToken();
        if (token) {
            UserServices.setAuthToken(token);
            console.log('Token :', token);
        } else {
            console.error("No se encontró un token válido");
            console.log('Token :', token);
            return;
        }
        setValidPassword(validationPassword(User));

        if (Object.keys(validPassword).length === 0) {
            UserServices.update(User.idUser, User)
            .then(response => {
                console.log(response.data);
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Usuario Actualizado Correctamente',
                    showConfirmButton: false,
                    timer: 2200
                })

            })
            .catch(e => {
                console.log(e);
            });
        }

    };

     //validar Password
     const validationPassword = (User) => {
        let validPassword = {}

        if (
            User.password.length < 8 ||
            !/[A-Z]/.test(User.password) ||
            !/[0-9]/.test(User.password) ||
            !/[!@#$%^&*]/.test(User.password)
        ) {
            validPassword.password =
                "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, un número y un carácter especial";
        }

        return validPassword;
    }



    return (
        <div className="card ">

            <div className="card-body ">

                <h5>Actualizar Usuario del Id : {User.idUser}</h5>

                <blockquote className="blockquote mb-0 ">

                    <form onSubmit={
                        updateUser
                    }
                        className="row g-3 needs-validation my-3  border = 1">

                        <div className="col-md-3 position-relative">
                            <label for="name" className="form-label ">Nombre</label>
                            <div className="input-group has-validation">
                                <span className="input-group-text">
                                    <i className="bi bi-pencil-square"></i>
                                </span>
                                <input type="text" className="form-control" id="name"
                                    value={User.name}
                                    onChange={handleInputChange}
                                    name="name" required />


                            </div>
                        </div>

                        <div className="col-md-3 position-relative">
                            <label for="lastName" className="form-label ">Apellido</label>
                            <div className="input-group has-validation">
                                <span className="input-group-text">
                                    <i className="bi bi-pencil-square"></i>
                                </span>
                                <input type="text" className="form-control" id="lastName"
                                    value={User.lastName}
                                    onChange={handleInputChange}
                                    name="lastName" required />

                            </div>
                        </div>

                        <div className="col-md-6 position-relative">
                            <label for="email" className="form-label ">Email</label>
                            <div className="input-group has-validation">
                                <span className="input-group-text">
                                    <i className="bi bi-envelope-at"></i>
                                </span>
                                <input type="email" className=" form-control" id="email"
                                    value={User.email}
                                    onChange={handleInputChange}
                                    name="email" required />
                            </div>
                        </div>


                        <div className="col-md-3 position-relative">
                            <label for="username" className="form-label">Usuario</label>
                            <div className="input-group has-validation">
                                <span className="input-group-text">
                                    <i className="bi bi-person"></i>
                                </span>
                                <input type="text" className="form-control" id="username"
                                    value={User.username}
                                    name="username" required />
                            </div>        
                                <p style={{color: 'red' , fontSize:"15px"}}>¡Este campo no se puede modificar por seguridad!</p>
                        </div>

                        <div className="col-md-3 position-relative">
                                <label for="password" className="form-label">Password</label>
                                <div className="input-group has-validation">
                                    <span className="input-group-text">
                                        <i className="bi bi-key"></i>
                                    </span>
                                    <input type="password" className={((validPassword.password) ? "is-invalid" : "") + " form-control"}
                                        id="password" value={User.password}
                                        placeholder="Digite una contraseña"
                                        onBlur={handleInputblurPassword}
                                        onChange={handleInputChange}
                                        onKeyUp={handleInputblurPassword}
                                        name="password" required />

                                    <small className="invalid-feedback" id="helpId">
                                        <i className="bi bi-exclamation-circle"> {validPassword.password}</i>
                                    </small>


                                </div>
                            </div>


                        <div className="col-12">
                            <button className="btn btn-secondary my-3 mx-2" type="submit" >

                                <i className="bi bi-gear"> Actualizar</i>
                            </button>

                            <Link className="btn btn-danger" to={"/UserList"}>
                                <i className="bi bi-x-circle"> Cancelar</i>
                            </Link>

                        </div>
                    </form>



                </blockquote>
            </div>


        </div>
    );
};

export default UserUpdate;
