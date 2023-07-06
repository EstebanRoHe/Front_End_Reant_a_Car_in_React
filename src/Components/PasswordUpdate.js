import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import UserServices from "../services/usernameServices";
import Swal from "sweetalert2";
import AuthServices from '../services/authServices';
import './PasswordUpdate.css'
import ModalLoadingContacto from "./ModalLoadingContacto";

const PasswordUpdate = () => {
    const navigate = useNavigate();
    const { idUser } = useParams();

    const initialPasswordState = {
        id: idUser,
        currentPassword: "",
        newPassword: ""
    }

    const [password, setPassword] = useState(initialPasswordState);
    const [validPassword, setValidPassword] = useState({});
    const [showModal, setShowModal] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setPassword({ ...password, [name]: value });
    };

    const handleInputblurPassword = (event) => {
        handleInputChange(event);
        setValidPassword(validationPassword(password));
    };

    const showModalHandler = () => {
        setShowModal(true);
    };

    const closeModalHandler = () => {
        setShowModal(false);
    };

    const validationPassword = (password) => {
        let validPassword = {}

        if (
            password.newPassword.length < 8 ||
            !/[A-Z]/.test(password.newPassword) ||
            !/[0-9]/.test(password.newPassword) ||
            !/[!@#$%^&*]/.test(password.newPassword)
        ) {
            validPassword.password =
                "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, un número y un carácter especial";
        }

        return validPassword;
    }

    const passwordUpdate = (e) => {
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
        setValidPassword(validationPassword(password));
        if (Object.keys(validPassword).length === 0) {
            UserServices.updatePassword(password)
                .then(response => {
                    console.log(response.data);
                    closeModalHandler();
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: 'contraseña Actualizada Correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(
                        navigate("/")
                    )
                })
                .catch(e => {
                    console.log(e);
                    closeModalHandler();
                    Swal.fire('Digite la actual contraseña correcta')
                });
        }

    };

    return (
        <div className="password-container">
            <div className="card">
            <div className="card-body ">
                <div className="content">
                    <h3>Cambiar Contraseña</h3>
                    <hr className="dropdown-divider" />
                    <form onSubmit={passwordUpdate}>
                        <div className="mb-3">
                            <label className="form-label">Contraseña Actual</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <i className="bi bi-key"></i>
                                </span>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Contraseña Actual"
                                    id="currentPassword"
                                    name="currentPassword"
                                    value={password.currentPassword}
                                    onChange={handleInputChange}
                                    required
                                    style={{ width: '300px' }}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Nueva contraseña</label>
                            <div className={"input-group has-validation " + (validPassword.password ? "is-invalid" : "")}>
                                <span className="input-group-text">
                                    <i className="bi bi-lock"></i>
                                </span>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="newPassword"
                                    name="newPassword"
                                    placeholder="Ejemplo1*"
                                    value={password.newPassword}
                                    onBlur={handleInputblurPassword}
                                    onChange={handleInputChange}
                                    onKeyUp={handleInputblurPassword}
                                    required
                                />
                                <small className="invalid-feedback" id="helpId">
                                    <i className="bi bi-exclamation-circle"> {validPassword.password}</i>
                                </small>
                            </div>
                        </div>
                        <div className="col-12">
                            <button className="btn btn-secondary my-3 mx-2" type="submit">
                                <i className="bi bi-gear"></i> Actualizar
                            </button>
                            <Link className="btn btn-danger" to={"/"}>
                                <i className="bi bi-x-circle"></i> Cancelar
                            </Link>
                        </div>
                    </form>
                  
                    {showModal && (
                            <ModalLoadingContacto />
                        )}
                </div>
            </div>
            </div>
        </div>



    );
};

export default PasswordUpdate;