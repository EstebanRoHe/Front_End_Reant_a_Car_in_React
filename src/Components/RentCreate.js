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
import { differenceInDays, parseISO } from 'date-fns';


const RentCreate = () => {
    const { idCar } = useParams();
    const roleToken = AuthServices.getRole();
    const initialRentState = {
        idRent: null,
        username: null,
        car: null,
        dateRent: "",
        dateRentFinal: "",
        rentPrice: ""
    }

    const [Rent, setRent] = useState(initialRentState);
    const [Validat, setValidat] = useState(false);
    const [errors, setErrors] = useState({});
    const [role, setRole] = useState(roleToken);
    const [showModal, setShowModal] = useState(false);
    const [showModalCar, setShowModalCar] = useState(false);
    const [Car, setCar] = useState(null);
    const [User, setUser] = useState(null);
    const [showModalLoading, setShowModalLoading] = useState(false);
    const [arryRent, setArryRent] = useState([]);
    const [rentPriceTotal, setRentPriceTotal] = useState(0);

    const handleInputUserAndDate = event => {
        const { name, value } = event.target;
        setRent({ ...Rent, [name]: value });
        setErrors(validationDate(Car, { ...Rent, [name]: value }));

        const days = calcularDiferenciaEnDias();
        if (Car && Car.price != null) {
            if (days === 0) {
                setRentPriceTotal(Car.price)
            } else {
                setRentPriceTotal(Car.price * days)
            }
        }

    };

    const handleInputblur = event => {
        handleInputUserAndDate(event);
        setErrors(validationDate(Car));

    }

    useEffect(() => {
        const loggedInUsername = AuthServices.getUsername();
        const roles = AuthServices.getRole();
        setUser(loggedInUsername);
        setRole(roles);
        getRent();
        if (idCar)
            getCar(idCar)

        if (Validat)
            newRent();

        if (roles !== 'ROLE_ADMIN') {
            getByUsername(loggedInUsername)
        }

        // eslint-disable-next-line
    }, [idCar, Validat]);

    const getByUsername = (loggedInUsername) => {
        showModalHandlerLoading();
        const token = AuthServices.getAuthToken();
        if (token) {
            userServices.setAuthToken(token);
        } else {
            closeModalHandlerLoading();
            return;
        }
        userServices.getByUsername(loggedInUsername)
            .then(response => {
                setUser(response.data);
                closeModalHandlerLoading();
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

    const getRent = () => {
        const token = AuthServices.getAuthToken();
        if (token) {
            rentServices.setAuthToken(token);
        } else {
            return;
        }
        rentServices.getAll()
            .then(response => {
                setArryRent(response.data);
                console.log(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    }

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

        setErrors(validationDate(Car));
        if (Object.keys(errors).length === 0) {
            var data = { idRent: Rent.idRent, username: User, car: Car, dateRent: Rent.dateRent, dateRentFinal: Rent.dateRentFinal, rentPrice: rentPriceTotal }
            validationDate(Car);
            rentServices.create(data)
                .then(response => {
                    setRent({
                        username: response.data.User, car: response.data.Car,
                        dateRent: response.data.dateRent, dateRentFinal: response.dateRentFinal,
                        rentPrice: response.data.rentPrice
                    });
                    setValidat(true);
                    console.log(response.data);
                    setRentPriceTotal(0);
                    closeModalHandlerLoading();
                    Swal.fire({
                        position: 'center',
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
        } else {
            closeModalHandlerLoading();
        }
    }

    const newRent = () => {
        setRent(initialRentState);
        setCar([]);
        setValidat(false);
    }

    const validationDate = (Car) => {
        let errors = {};
        arryRent.forEach((rent) => {
            if (rent.car != null && Car != null) {
                const rentDate = new Date(rent.dateRent);
                const rentDateFinal = new Date(rent.dateRentFinal);
                const inputrentDate = new Date(Rent.dateRent);
                const inputrentDateFinal = new Date(Rent.dateRentFinal);
                if (rent.car.idCar == Car.idCar) {
                    if (
                        (inputrentDate >= rentDate && inputrentDate <= rentDateFinal) ||
                        (inputrentDateFinal >= rentDate && inputrentDateFinal <= rentDateFinal)
                    ) {
                        errors.dateRent = "¡Carro alquilado para estas fechas!";
                    }
                }
            }
        });
        return errors;
    };

    const calcularDiferenciaEnDias = () => {
        const fechaInicial = parseISO(Rent.dateRent);
        const fechaFinal = parseISO(Rent.dateRentFinal);
        if (fechaInicial != "Invalid Date" && fechaFinal != "Invalid Date") {
            const diferenciaDias = differenceInDays(fechaFinal, fechaInicial);
            return 1 + diferenciaDias;
        }
        else {
            return 0;
        }
    }


    const showModalHandler = () => {
        setShowModal(true);
    };

    const closeModalHandler = () => {
        setShowModal(false);
    };

    const handleSelectUser = (username) => {
        setUser(username);
    };

    const showModalCarHandler = () => {
        setShowModalCar(true);
    };


    const closeModalCarHandler = () => {
        setShowModalCar(false);
    };

    const handleSelectCar = (car) => {
        setCar(car);
    };

    const showModalHandlerLoading = () => {
        setShowModalLoading(true);
    };

    const closeModalHandlerLoading = () => {
        setShowModalLoading(false);
    };



    return (
        <div className="container"  >
            <div className="submit-form  "
                onMouseUp={handleInputUserAndDate}
                onMouseOut={handleInputUserAndDate}
            >
                <div className="card"  >
                    <div className="card-body  "  >
                        <h4><i className="bi bi-car-front"> Alquiler de vehículos</i></h4>
                        <form onSubmit={createRent} className="row  needs-validation my-3  border = 1"

                        >

                            {role === 'ROLE_ADMIN' ? (
                                <>
                                    {User == null ? (
                                        <label type="text" id="username" className="form-label">
                                            <i className="bi bi-person-add"> </i> Usuario
                                        </label>
                                    ) : (
                                        <label type="text" id="username" className="form-label">
                                            <i className="bi bi-person-add"> </i>Usuario : <strong>{User.username}</strong>
                                        </label>
                                    )}

                                    <Link className="btn btn-primary custom-select-width"
                                        style={{ marginTop: "1%", marginLeft: "1%" }}
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
                                            <i className="bi bi-person-add"></i> Usuario : <strong>{User.username}</strong>
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
                                            className="is-invalid form-label  "
                                            value={Car}
                                        >
                                            <i className="bi bi-car-front-fill"> </i>
                                            Vehículo : <strong>{Car.licencePlate}</strong>
                                        </label>

                                    </div>

                                </>
                            )}


                            <Link className="btn btn-primary custom-select-width "
                                style={{ marginLeft: "1%" }}
                                onClick={showModalCarHandler}
                            >
                                <i className="bi bi-search"> Seleccionar un Vehículo</i>
                            </Link>

                            <div className=" form-group">
                                <div className="row">
                                    <div className="col-md-3">

                                        <label htmlFor="dateRent" className="form-label">
                                            <i className="bi bi-calendar-date"></i> Inicio del Alquiler
                                        </label>
                                        <div className="custom-select-date input-group ">
                                            <span className="input-grouil-p-text">
                                                <i className="bi bi-pencsquare"></i>
                                            </span>

                                            <input type="date" className={((errors.dateRent) ? "is-invalid" : "") + " form-control"}
                                                id="dateRent"
                                                value={Rent.dateRent}
                                                onMouseUp={handleInputUserAndDate}
                                                onMouseOut={handleInputUserAndDate}
                                                onChange={handleInputUserAndDate}
                                                onBlur={handleInputblur}
                                                name="dateRent"
                                                required
                                            />

                                            <small className="invalid-feedback" id="helpId" >
                                                <i className="bi bi-exclamation-circle"> {errors.dateRent}</i>
                                            </small>
                                        </div>
                                    </div>


                                    <div className="col-md-3">

                                        <label htmlFor="dateRent" className="form-label">
                                            <i className="bi bi-calendar-date"></i> Fecha de devolución
                                        </label>
                                        <div className="custom-select-date input-group ">
                                            <span className="input-grouil-p-text">
                                                <i className="bi bi-pencsquare"></i>
                                            </span>
                                            <input type="date" className={((errors.dateRent) ? "is-invalid" : "") + " form-control"}
                                                id="dateRentFinal"
                                                value={Rent.dateRentFinal}
                                                onMouseUp={handleInputUserAndDate}
                                                onMouseOut={handleInputUserAndDate}
                                                onChange={handleInputUserAndDate}
                                                onBlur={handleInputblur}
                                                onKeyUp={handleInputblur}
                                                name="dateRentFinal"
                                                required
                                            />


                                        </div>
                                    </div>
                                </div>

                            </div>

                            <small style={{ fontSize: "18px", marginTop: "1%" }}
                                id="rentPrice"
                            >
                                <i className="bi bi-exclamation-circle"> </i>
                                Total a pagar por {calcularDiferenciaEnDias()} días
                                <i className="bi bi-currency-dollar"> </i> <strong>{rentPriceTotal}</strong>
                            </small>


                            <div >
                                <button className="btn btn-success my-2  mx-1 " type="submit">
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
                                errors={errors}
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

