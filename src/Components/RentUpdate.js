import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import rentServices from "../services/rentServices";
import carServices from "../services/carServices";
import Swal from "sweetalert2";
import AuthServices from '../services/authServices';
import ModalLoadingContacto from "./ModalLoadingContacto";

const RentUpdate = props => {
    const { idRent } = useParams();

    const initialRentState = {
        idRent: null,
        username: {},
        car: {},
        dateRent: ""
    }

    const [Rent, setRent] = useState(initialRentState);
    const [car, setCar] = useState([]);
    const [role, setRole] = useState(null);
    const [errors, setErrors] = useState({});
    const [errorsDateAndUser, setErrorsDateAndUser] = useState({});
    const [RentArray, setRentRentArray] = useState([]);
    const [CarSelect, setCarSelect] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const showModalHandler = () => {
        setShowModal(true);
    };

    const closeModalHandler = () => {
        setShowModal(false);
    };

    const getRent = idRent => {
        showModalHandler();
        const token = AuthServices.getAuthToken();
        if (token) {
            rentServices.setAuthToken(token);
        } else {
            console.error("No se encontró un token válido");
            closeModalHandler();
            return;
        }
        rentServices.get(idRent)
            .then(response => {
                setRent(response.data);
                closeModalHandler();
            })
            .catch(e => {
                console.log(e);
                closeModalHandler();
            })
    }

    useEffect(() => {
        const roles = AuthServices.getRole();
        setRole(roles);
        getListRent();
        getListCar();
       
        if (idRent){
            getRent(idRent);
        }
    // eslint-disable-next-line
    }, [idRent]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRent({ ...Rent, [name]: value });
        setErrorsDateAndUser(validationErrorsDateAndUser(Rent.username, Rent));
    };

    const handleInputblurCar = event => {
        setCarSelect(JSON.parse(event.target.value))
        setErrors(validationErrror(CarSelect, Rent));
    }

    const getListCar = () => {
        const token = AuthServices.getAuthToken();
        if (token) {
            carServices.setAuthToken(token);
            console.log('Token :', token);
        } else {
            console.error("No se encontró un token válido");
            return;
        }
        carServices.getAll()
            .then(response => {
                setCar(response.data);
            })
            .catch(e => {
                console.log(e);
            });

    };

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

    const updateRent = () => {
        showModalHandler();
        const token = AuthServices.getAuthToken();
        if (token) {
            rentServices.setAuthToken(token);
        } else {
            console.error("No se encontró un token válido");
            closeModalHandler();
            return;
        }

        if (Object.keys(errors).length === 0 && Object.keys(errorsDateAndUser).length === 0) {
            rentServices.update(Rent.idRent, Rent)
                .then(response => {
                    console.log(response.data);
                    closeModalHandler();
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: 'Alquiler Actualizado Correctamente',
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
 
    const validationErrror = (CarSelect) => {
        let errors = {};
        RentArray.forEach(rent => {
           if(rent.car.idCar != null && CarSelect !=null ){ 
            if (rent.car.idCar === CarSelect.idCar) {
                errors.CarSelect = "Vehículo ya alquilado";
            }
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

    return (
        <div className="container " >
            <div className="card  ">
                <div className="card-body ">
                    <h4>Actualizar Alquiler del Usuario : {Rent.username.username}</h4>
                    <blockquote className="blockquote mb-0 ">

                        <form novalidate onSubmit={e => {
                            e.preventDefault()
                            updateRent()

                        }}
                            className="row g-3 needs-validation my-3  border = 1" >

                            <div className="col-md-3 position-relative">
                                <label for="username" className="form-label">Usuario</label>
                                <div className="input-group has-validation">

                                    <span className="input-group-text">
                                        <i className="bi bi-person-add"></i>
                                    </span>
                                    <span className="input-group-text">
                                        <label value={{ ...Rent.username }} for="username" >  {Rent.username.username}</label>
                                    </span>
                                </div>
                            </div>

                            <div className="col-md-3 position-relative">
                                <label for="car" className="form-label">Vehículo</label>
                                <div className="input-group has-validation">
                                    <span className="input-group-text">
                                        <i className="bi bi-car-front-fill"> </i>
                                    </span>
                                    <select className={((errors.CarSelect) ? "is-invalid" : "") + " form-select  custom-select-width"}
                                        name="car"
                                        id="car"
                                        onBlur={handleInputblurCar}
                                        onClick={handleInputblurCar}
                                        onMouseDown={handleInputblurCar}
                                        onMouseUp={handleInputblurCar}
                                        onChange={e => {
                                            setRent({ ...Rent, car: JSON.parse(e.target.value) })
                                        }}
                                        >
                                    
                                         <option value={JSON.stringify({ ...Rent, car: JSON.stringify(car) })}>
                                            {Rent.car.licencePlate}</option>

                                    
                                        {car && car.map(
                                            (car) => (
                                                <option key={car.id_car} value={JSON.stringify(car)}>{car.licencePlate}</option>
                                            ))}
                                    </select>

                                    <small className="invalid-feedback" id="helpId" >
                                        <i className="bi bi-exclamation-circle"> {errors.CarSelect}</i>
                                    </small>
                                </div>
                            </div>

                            <div className="col-md-3 position-relative" >
                                <label for="dateRent" className="form-label "> <i className="bi bi-calendar-date"> </i> Fecha</label>
                                <div className="input-group has-validation">
                                    <span className="input-group-text">
                                        <i className="bi bi-pencil-square"></i>
                                    </span>
                                    <input type="date" className={((errorsDateAndUser.User) ? "is-invalid" : "") + " form-control"}
                                        id="dateRent"
                                        name="dateRent"
                                        value={Rent.dateRent}
                                        onChange={handleInputChange}
                                        onBlur={handleInputChange}
                                        onKeyDown={handleInputChange}
                                        onKeyUp={handleInputChange}
                                        onClick={handleInputChange}

                                        required />
                                    <small className="invalid-feedback" id="helpId">
                                        <i className="bi bi-exclamation-circle"> {errorsDateAndUser.User}</i>
                                    </small>
                                </div>
                            </div>

                            <div className="col-12">
                                <button className="btn btn-secondary my-3  mx-2 " type="submit" >
                                    <i className="bi bi-person-plus"> Actualizar</i>
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
                            <ModalLoadingContacto />
                        )}
                    </blockquote>
                </div>
            </div>
        </div>

    );
};

export default RentUpdate;