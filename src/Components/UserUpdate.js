import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import UserServices from "../services/usernameServices";
import Swal from "sweetalert2";
import AuthServices from '../services/authServices';
import ModalLoadingContacto from "./ModalLoadingContacto";

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
    const [emailArray, setEmailArray] = useState([]);
    const [role, setRole] = useState(null);
    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);

    const showModalHandler = () => {
        setShowModal(true);
    };

    const closeModalHandler = () => {
        setShowModal(false);
    };

    const getUser = idUser => {
        showModalHandler()
        const token = AuthServices.getAuthToken();
        if (token) {
            UserServices.setAuthToken(token);
        } else {
            console.error("No se encontró un token válido");
            closeModalHandler();
            return;
        }
        UserServices.get(idUser)
            .then(response => {
                setUser(response.data);
                closeModalHandler();
            })
            .catch(e => {
                console.log(e);
                closeModalHandler();
            });
    };

    useEffect(() => {
        const roles = AuthServices.getRole();
        setRole(roles);
        getListEmail();
        if (idUser){
            getUser(idUser);
        }
    // eslint-disable-next-line
    }, [idUser]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUser({ ...User, [name]: value });
    };

    const handleInputblur = (event) => {
        handleInputChange(event);
        setErrors(validationErrror(User));

    };

    const getListEmail = () => {
        UserServices.getAllEmail()
            .then(response => {
                setEmailArray(response.data);
            }).catch(e => {
                console.log(e);
            })
    }

    const updateUser = (e) => {
        e.preventDefault();
        showModalHandler();
        const token = AuthServices.getAuthToken();
        if (token) {
            UserServices.setAuthToken(token);
        } else {
            console.error("No se encontró un token válido");
            closeModalHandler();
            return;
        }
   
        if (Object.keys(errors).length === 0) {
            UserServices.update(User.idUser, User)
                .then(response => {
                    console.log(response.data);
                    closeModalHandler();
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
                    closeModalHandler();
                });
        }else{
            closeModalHandler();
        }
    };

    const validationErrror = (User) => {
        let errors = {}
        emailArray.forEach(email => {
            if (email === User.email) {
                errors.email = "Email ya resgistrado"
                console.log("email array : ", errors)
            }
        })
        return errors;
    }


    return (
        <div className="container ">
            <div className="card ">

                <div className="card-body ">
                    {role === 'ROLE_ADMIN' ? (
                        <h5>Actualizar Usuario del Id : {User.idUser}</h5>
                    ) : (
                        <h5>Perfil de : {User.username}</h5>
                    )}
                    <blockquote className="blockquote mb-0 ">

                        <form onSubmit={
                            updateUser
                        }
                            className="row g-3 needs-validation my-3  border = 1">

                            <div className="col-md-3 position-relative">
                                <label className="form-label ">Nombre</label>
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
                                <label className="form-label ">Apellido</label>
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
                                <label className="form-label ">Email</label>
                                <div className="input-group has-validation">
                                    <span className="input-group-text">
                                        <i className="bi bi-envelope-at"></i>
                                    </span>
                                    <input type="email" className={((errors.email) ? "is-invalid" : "") + " form-control"}
                                        id="email"
                                        value={User.email}
                                        onChange={handleInputChange}
                                        onKeyUp={handleInputblur}
                                        name="email"
                                        required />
                                    <small className="invalid-feedback" id="helpId" >
                                        <i className="bi bi-exclamation-circle"> {errors.email}</i>
                                    </small>
                                </div>
                            </div>


                            <div className="col-md-3 position-relative">
                                <label className="form-label">Usuario</label>
                                <div className="input-group has-validation">
                                    <span className="input-group-text">
                                        <i className="bi bi-person"></i>
                                    </span>
                                    <span className="input-group-text">
                                        <label className="form-label"> {User.username}</label>
                                    </span>
                                </div>
                                <p style={{ color: 'red', fontSize: "15px" }}>¡Este campo no se puede modificar por seguridad!</p>
                            </div>

                            <div className="col-md-3 position-relative">
                                <label className="form-label">Cambiar contraseña</label>
                                <Link className="btn btn-danger" to={"/PasswordUpdate/" + User.idUser}>
                                    <i className="bi bi-key"> </i>
                                    Cambiar contraseña
                                </Link>
                            </div>

                            <div className="col-12">
                                <button className="btn btn-secondary my-3 mx-2" type="submit" >
                                    <i className="bi bi-gear"> Actualizar</i>
                                </button>
                                {role === 'ROLE_ADMIN' ? (
                                    <Link className="btn btn-danger" to={"/UserList"}>
                                        <i className="bi bi-x-circle"> Cancelar</i>
                                    </Link>
                                ) : (
                                    <Link className="btn btn-danger" to={"/"}>
                                        <i className="bi bi-x-circle"> Cancelar</i>
                                    </Link>
                                )}
                            </div>
                        </form>
                        {showModal && (
                            <ModalLoadingContacto />
                        )}
                    </blockquote>
                </div>


            </div>
        </div>
    );
};

export default UserUpdate;
