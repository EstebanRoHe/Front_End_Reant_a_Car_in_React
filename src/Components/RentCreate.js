import React, { useState, useEffect } from "react";
import rentServices from "../services/rentServices";
import carServices from "../services/carServices";
import userServices from "../services/usernameServices";
import Swal from "sweetalert2";
import { Link, useParams } from 'react-router-dom';
import AuthServices from '../services/authServices';
import './RentCreate.css'
import Modal from "./ModalListUser";
import ModalListCar from "./ModalListCar";
import ModalLoadingContacto from "./ModalLoadingContacto";

const RentCreate = () => {
    const { idCar } = useParams();

    const initialRentState = {
        idRent: null,
        username: null,
        car: null,
        dateRent: ""
    }

    const [Rent, setRent] = useState(initialRentState);
    const [RentArray, setRentRentArray] = useState([]);
    const [Validat, setValidat] = useState(false);
    const [errors, setErrors] = useState({});
    const [errorsDateAndUser, setErrorsDateAndUser] = useState({});
    const [role, setRole] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showModalCar, setShowModalCar] = useState(false);
    const [Car, setCar] = useState(null);
    const [User, setUser] = useState(null);
    const [showModalLoading, setShowModalLoading] = useState(false);

    const handleInputUserAndDate = event => {
        const { name, value } = event.target;
        setRent({ ...Rent, [name]: value });
        setErrorsDateAndUser(validationErrorsDateAndUser(User, { ...Rent, [name]: value }));
    };
   
    useEffect(() => {
        const loggedInUsername = AuthServices.getUsername();
        const roles = AuthServices.getRole();
        setUser(loggedInUsername);
        setRole(roles);

        if (idCar)
            getCar(idCar)

        getListRent();

        if (Validat)
            newRent();

        if (roles !== 'ROLE_ADMIN') {
            getByUsername(loggedInUsername)
        }
  // eslint-disable-next-line
    }, [idCar, Validat]);

    const getByUsername = (loggedInUsername) => {
        const token = AuthServices.getAuthToken();
        if (token) {
            userServices.setAuthToken(token);
        } else {
            return;
        }
        userServices.getByUsername(loggedInUsername)
            .then(response => {
                setUser(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const getCar = (idCar) => {
        const token = AuthServices.getAuthToken();
        if (token) {
            carServices.setAuthToken(token);
        } else {
            return;
        }
        carServices.get(idCar)
            .then(response => {
                setCar(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    const getListRent = () => {
        const token = AuthServices.getAuthToken();
        if (token) {
            rentServices.setAuthToken(token);

        } else {
            return;
        }
        rentServices.getAll()
            .then(response => {
                setRentRentArray(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const createRent = (e) => {
        showModalHandlerLoading();
        const token = AuthServices.getAuthToken();
        if (token) {
            rentServices.setAuthToken(token);
        } else {
            closeModalHandlerLoading();
            return;
        }
        e.preventDefault();
        var data = { idRent: Rent.idRent, username: User, car: Car, dateRent: Rent.dateRent }
        setErrorsDateAndUser(validationErrorsDateAndUser(User))
        setErrors(validationErrror(Car));
        if (Object.keys(errors).length === 0 && Object.keys(errorsDateAndUser).length === 0) {
            rentServices.create(data)
                .then(response => {
                    setRent({ username: response.data.User, car: response.data.Car, dateRent: response.data.dateRent });
                    setValidat(true);
                    console.log(response.data);
                    closeModalHandlerLoading();
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: 'Se Alquiló el Vehículo Correctamente',
                        showConfirmButton: false,
                        timer: 2200
                    })
                })
                .catch(e => {
                    console.log(e);
                    closeModalHandlerLoading();
                })
        }else{
            closeModalHandlerLoading();
        }
    }

    const newRent = () => {
        setRent(initialRentState);
        setCar([]);
        setValidat(false);
    }

    const validationErrror = (Car) => {
        let errors = {};
        RentArray.forEach(rent => {
            if (rent.car.idCar === Car.idCar) {
                errors.Car = "Vehículo ya alquilado";
            }
        })
        return errors;
    }

    const validationErrorsDateAndUser = (User) => {
        let errorsDateAndUser = {};
        RentArray.forEach(rent => {
            if (rent.username.idUser === User.idUser && rent.dateRent === Rent.dateRent) {
                errorsDateAndUser.User = "El usuario ya alquiló un vehículo para esta fecha";
            }
        })
        return errorsDateAndUser;
    }


    const showModalHandler = () => {
        setShowModal(true);
    };


    const closeModalHandler = () => {
        setShowModal(false);
    };

    const handleSelectUser = (username) => {
        setErrorsDateAndUser(validationErrorsDateAndUser(username, Rent))
        setUser(username);
    };

    const showModalCarHandler = () => {
        setShowModalCar(true);
    };


    const closeModalCarHandler = () => {
        setShowModalCar(false);
    };

    const handleSelectCar = (car) => {
        setErrors(validationErrror(car, Rent));
        setCar(car);
    };


    const showModalHandlerLoading = () => {
        setShowModalLoading(true);
    };

    const closeModalHandlerLoading = () => {
        setShowModalLoading(false);
    };

    return (
        <div className="container ">
            <div className="submit-form"
                onMouseUp={handleInputUserAndDate}
                onMouseOut={handleInputUserAndDate}
            >
                <div className="card">
                    <div className="card-body ">
                        <h4>Rentar</h4>
                        <form onSubmit={createRent} className="row g-3 needs-validation my-3  border = 1">

                            {role === 'ROLE_ADMIN' ? (
                                <>
                                    {User == null ? (
                                        <label type="text" id="username" className="form-label">
                                            <i className="bi bi-person-add"> </i> Usuario
                                        </label>
                                    ) : (
                                        <label type="text" id="username" className="form-label">
                                            <i className="bi bi-person-add"> </i>Usuario : {User.username}
                                        </label>
                                    )}

                                    <Link className="btn btn-primary custom-select-width"
                                        style={{ marginTop: "1%" }}
                                        onClick={showModalHandler}
                                    >
                                        <i className="bi bi-search"> Seleccionar un Usuario</i>
                                    </Link>

                                </>
                            ) : (
                                <>
                                    {User == null ? (
                                        <label type="text" id="username" className="form-label">
                                            <i className="bi bi-person-add"> </i>Usuario :
                                        </label>
                                    ) : (
                                        <label type="text" id="username" className="form-label">
                                            <i className="bi bi-person-add"></i> Usuario : {User.username}
                                        </label>
                                    )}
                                </>
                            )}

                            {Car == null ? (
                                <label type="text" className="form-label">
                                    <i className="bi bi-car-front-fill"> </i>Vehículo : </label>
                            ) : (
                                <>
                                    <div className="form-group">
                                        <label type="text"
                                            className={((errors.Car) ? "is-invalid" : "") + " form-label  custom-select-width"}
                                            value={Car}
                                        >
                                            <i className="bi bi-car-front-fill"> </i>
                                            Vehículo : {Car.licencePlate}
                                        </label>
                                        <small className="invalid-feedback" id="helpId" >
                                            <i className="bi bi-exclamation-circle"> {errors.Car}</i>
                                        </small>
                                    </div>

                                </>
                            )}

                            <div className="form-group">
                                <Link className="btn btn-primary custom-select-width"
                                    onClick={showModalCarHandler}
                                >
                                    <i className="bi bi-search"> Seleccionar un Vehículo</i>
                                </Link>

                            </div>
                            <div className="col-md-3 position-relative">
                                <label htmlFor="dateRent" className="form-label">
                                    <i className="bi bi-calendar-date"></i> Fecha
                                </label>
                                <div className={`input-group has-validation ${Rent.dateRent !== '' && !errorsDateAndUser.User ? 'input-success' : ''}`}>
                                    <span className="input-grouil-p-text">
                                        <i className="bi bi-pencsquare"></i>
                                    </span>
                                    <input
                                        type="date"
                                        className={((errorsDateAndUser.User) ? "is-invalid" : "") + " form-control"}
                                        id="dateRent"
                                        value={Rent.dateRent}
                                        onMouseUp={handleInputUserAndDate}
                                        onMouseOut={handleInputUserAndDate}
                                        onChange={handleInputUserAndDate}
                                        onBlur={handleInputUserAndDate}
                                        name="dateRent"
                                        required
                                        style={{
                                            borderColor: Rent.dateRent !== '' && !errorsDateAndUser.User ? 'green' : '',
                                        }}
                                    />

                                    <small className="invalid-feedback" id="helpId">
                                        <i className="bi bi-exclamation-circle"> {errorsDateAndUser.User}</i>
                                    </small>
                                </div>
                                {Rent.dateRent === '' ? (
                                    <div>
                                        <i className="text-success fs-10">No se puede alquilar más de un vehículo por persona en las mismas fechas!</i>
                                    </div>
                                ) : (
                                    <div>
                                    </div>
                                )}
                            </div>

                            <div className="col-12">
                                <button className="btn btn-success my-3  mx-2 " type="submit">
                                    <i className="bi bi-person-plus"> Alquilar</i>
                                </button>
                                {role === 'ROLE_ADMIN' ? (
                                    <Link className="btn btn-danger" to={"/RentList"}>
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
                            <Modal
                                onClose={closeModalHandler}
                                handleSelectUser={handleSelectUser}
                            />
                        )}

                        {showModalCar && (
                            <ModalListCar
                                onClose={closeModalCarHandler}
                                handleSelectCar={handleSelectCar}
                            />
                        )}

                        {showModalLoading && (
                            <ModalLoadingContacto />
                        )}

                    </div >
                </div >
            </div >
        </div >
    );
};

export default RentCreate;