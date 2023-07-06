import React, { useState, useEffect } from "react";
import UserServices from "../services/usernameServices";
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import ModalLoadingContacto from "./ModalLoadingContacto";

const UserCreate = () => {

    const initialUserState = {
        idUser: null,
        name: "",
        lastName: "",
        username: "",
        password: "",
        email: "",
    }

    const [User, setUser] = useState(initialUserState);
    const [emailArray, setEmailArray] = useState([]);
    const [usernameArray, setUsernameArray] = useState([]);
    const [errors, setErrors] = useState({});
    const [validPassword, setValidPassword] = useState({});
    const [Validat, setValidat] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...User, [name]: value });

    };

    const handleInputblur = (event) => {
        handleInputChange(event);
        setErrors(validationErrror(User));

    };

    const handleInputblurPassword = (event) => {
        handleInputChange(event);
        setValidPassword(validationPassword(User));

    };

    useEffect(() => {
        getListEmail();
        getListUsername();
        if (Validat) {
            newUser();
        }
    // eslint-disable-next-line
    }, [Validat]);

    const getListEmail = () => {
        UserServices.getAllEmail()
            .then(response => {
                setEmailArray(response.data);
            }).catch(e => {
                console.log(e);
            })
    }

    const getListUsername = () => {
        UserServices.getAllUsername()
            .then(response => {
                setUsernameArray(response.data);
            }).catch(e => {
                console.log(e);
            })
    }

    const createUser = (e) => {
        e.preventDefault();
        showModalHandler();
        var data = {
            idUser: User.idUser, name: User.name, lastName: User.lastName,
            username: User.username, password: User.password, email: User.email
        };
        setErrors(validationErrror(User));
        setValidPassword(validationPassword(User));

        if (Object.keys(errors).length === 0 && Object.keys(validPassword).length === 0) {
            UserServices.create(data)
                .then(response => {
                    setUser({
                        name: response.data.name, lastName: response.data.lastName,
                        username: response.data.username, password: response.data.password, email: response.data.email
                    });
                    setValidat(true);
                    console.log(response.data);
                    closeModalHandler();
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: 'Usuario Registrado Correctamente',
                        showConfirmButton: false,
                        timer: 2200,
                    })
                })
                .catch(e => {
                    console.log(e);
                    closeModalHandler();
                });
        }else{
            closeModalHandler();
        }
    };

    const newUser = () => {
        setUser(initialUserState);
        setValidat(false);
    }

    const validationErrror = (User) => {
        let errors = {}
        emailArray.forEach(email => {
            if (email === User.email) {
                errors.email = "Email ya resgistrado"
                console.log("email array : ", errors)
            }
        })
        usernameArray.forEach(username => {
            if (username === User.username) {
                errors.username = "Username ya resgistrado"
            }
        })
        return errors;
    }

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

    const showModalHandler = () => {
        setShowModal(true);
    };

    const closeModalHandler = () => {
        setShowModal(false);
    };



    return (
        <div className="container ">
            <div className="submit-form ">

                <div className="card  ">

                    <div className="card-body ">
                        <h4>Registrar</h4>
                        <blockquote className="blockquote mb-0 ">

                            <form onSubmit={createUser}
                                className="row g-3 needs-validation my-3  border = 1">

                                <div className="col-md-3 position-relative">
                                    <label for="name" className="form-label ">Nombre</label>
                                    <div className="input-group has-validation">
                                        <span className="input-group-text">
                                            <i className="bi bi-pencil-square"></i>
                                        </span>
                                        <input type="text" className="form-control" id="name" value={User.name}
                                            placeholder="John"
                                            onChange={handleInputChange} name="name" required />
                                    </div>
                                </div>

                                <div className="col-md-3 position-relative">
                                    <label for="lastName" className="form-label ">Apellido</label>
                                    <div className="input-group has-validation">
                                        <span className="input-group-text">
                                            <i className="bi bi-pencil-square"></i>
                                        </span>
                                        <input type="text" className="form-control" id="lastName" value={User.lastName}
                                            placeholder="Rodríguez"
                                            onChange={handleInputChange} name="lastName" required />
                                    </div>
                                </div>

                                <div className="col-md-6 position-relative">
                                    <label for="email" className="form-label ">Email</label>
                                    <div className="input-group has-validation ">
                                        <span className="input-group-text">
                                            <i className="bi bi-envelope-at"></i>
                                        </span>
                                        <input type="email" className={((errors.email) ? "is-invalid" : "") + " form-control"}
                                            id="email" value={User.email}
                                            placeholder="john@gmail.com"
                                            onBlur={handleInputblur}
                                            onChange={handleInputChange}
                                            onKeyUp={handleInputblur}
                                            name="email" required />
                                        <small className="invalid-feedback" id="helpId" >
                                            <i className="bi bi-exclamation-circle"> {errors.email}</i>
                                        </small>
                                    </div>
                                </div>

                                <div className="col-md-3 position-relative">
                                    <label for="username" className="form-label">Usuario</label>
                                    <div className="input-group has-validation">
                                        <span className="input-group-text">
                                            <i className="bi bi-person"></i>
                                        </span>
                                        <input type="text" className={((errors.username) ? "is-invalid" : "") + " form-control"}
                                            id="username" value={User.username}
                                            placeholder="john@123"
                                            onBlur={handleInputblur}
                                            onChange={handleInputChange}
                                            onKeyUp={handleInputblur}
                                            name="username" required />
                                        <small className="invalid-feedback" id="helpId" >
                                            <i className="bi bi-exclamation-circle"> {errors.username}</i>
                                        </small>
                                    </div>
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
                                    <button className="btn btn-success my-3  mx-2 " type="submit">
                                        <i className="bi bi-person-plus"> Registrar</i>
                                    </button>
                                    <Link className="btn btn-danger" to={"/"}>
                                        <i className="bi bi-x-circle"> Cancelar</i>
                                    </Link>
                                </div>

                            </form>
                            {showModal && (
                                <ModalLoadingContacto />
                            )}

                        </blockquote>
                    </div>

                </div>
            </div>

        </div>
    );
};
export default UserCreate;



