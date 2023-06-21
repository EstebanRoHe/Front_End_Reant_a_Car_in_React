import React, { useState, useEffect } from "react";
import rentServices from "../services/rentServices";
import carServices from "../services/carServices";
import userServices from "../services/usernameServices";
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';
import AuthServices from '../services/authServices';
const RentCreate = () => {
    const initialRentState = {
        idRent: null,
        username: null,
        car: null,
        dateRent: ""
    }

    const [Rent, setRent] = useState(initialRentState);
    const [RentArray, setRentRentArray] = useState([]);
    const [Username, setUsername] = useState([]);
    const [UserSelect, setUserSelect] = useState(null);
    const [Car, setCar] = useState([]);
    const [CarSelect, setCarSelect] = useState(null);
    const [Validat, setValidat] = useState(false);
    const [errors, setErrors] = useState({});
    const [errorsDateAndUser, setErrorsDateAndUser] = useState({});

    const handleInputUserAndDate = event => {
        const { name, value } = event.target;
        setRent({ ...Rent, [name]: value });
        setErrorsDateAndUser(validationErrorsDateAndUser(UserSelect, { ...Rent, [name]: value }));
    };


    const handleInputblurCar = event => {
        setCarSelect(JSON.parse(event.target.value))
        setErrors(validationErrror(CarSelect, Rent));
    }


    useEffect(() => {
        getListUser();
        getListCar();
        getListRent();
        if (Validat)
            newRent();
    }, [Validat]);

    const getListUser = () => {
        const token = AuthServices.getAuthToken();
        if (token) {
            userServices.setAuthToken(token);
            console.log('Token :', token);
        } else {
            console.error("No se encontró un token válido");
            console.log('Token :', token);
            return;
        }
        userServices.getAll()
            .then(response => {
                setUsername(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });

    };

    const getListCar = () => {
        const token = AuthServices.getAuthToken();
        if (token) {
            carServices.setAuthToken(token);
            console.log('Token :', token);
        } else {
            console.error("No se encontró un token válido");
            console.log('Token :', token);
            return;
        }
        carServices.getAll()
            .then(response => {
                setCar(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });

    };

    const getListRent = () => {
        const token = AuthServices.getAuthToken();
        if (token) {
            rentServices.setAuthToken(token);
            console.log('Token :', token);
        } else {
            console.error("No se encontró un token válido");
            console.log('Token :', token);
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
        const token = AuthServices.getAuthToken();
        if (token) {
            rentServices.setAuthToken(token);
            console.log('Token :', token);
        } else {
            console.error("No se encontró un token válido");
            console.log('Token :', token);
            return;
        }
        e.preventDefault();
        var data = { idRent: Rent.idRent, username: UserSelect, car: CarSelect, dateRent: Rent.dateRent }

        setErrorsDateAndUser(validationErrorsDateAndUser(UserSelect))
        setErrors(validationErrror(CarSelect));
        if (Object.keys(errors).length === 0 && Object.keys(errorsDateAndUser).length === 0) {
            rentServices.create(data)
                .then(response => {
                    setRent({ username: response.data.User, car: response.data.CarSelect, dateRent: response.data.dateRent });
                    setValidat(true);
                    console.log(response.data);
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: 'Se Rento el Vehiculo Correctamente',
                        showConfirmButton: false,
                        timer: 2200
                    })
                })
                .catch(e => {
                    console.log(e);
                })
        }

    }

    const newRent = () => {
        setRent(initialRentState);
        setUsername([]);
        setCar([]);
        setValidat(false);

    }



    const validationErrror = (CarSelect) => {
        let errors = {};

        RentArray.forEach(rent => {
            if (rent.car.idCar === CarSelect.idCar) {
                errors.CarSelect = "Vehículo ya alquilado";

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
        <div className="container ">
        <div className="submit-form"
            onMouseUp={handleInputUserAndDate}
            onMouseOut={handleInputUserAndDate}
        >
            <div className="card  "  >
                <div className="card-body "  >
                    <h4>Alquilar</h4>
                    <blockquote className="blockquote mb-0 ">

                        <form onSubmit={createRent}
                            className="row g-3 needs-validation my-3  border = 1" >


                            <div className="form-group">
                                <label for="username" className="form-label"> <i className="bi bi-person-add"> </i>Usuario</label>
                                <div className={`input-group has-validation ${ 
                                  Rent.username !=null &&   Rent.username !== "Seleccioné un Usuario" && !errorsDateAndUser.User ? "input-success" : ""}`}>
                                    <select className={((errorsDateAndUser.User) ? "is-invalid" : "") + " form-select"} name="username" id="username"
                                        onBlur={handleInputUserAndDate}
                                        onClick={handleInputUserAndDate}
                                        onChange={e => {
                                            setUserSelect(JSON.parse(e.target.value));
                                        }}
                                        style={{
                                            borderColor: Rent.username !=null && Rent.username !=="Seleccioné un Usuario" && !errorsDateAndUser.User ? "green" :"",
                                        }}
                                        >
                                        <option selected>Seleccioné un Usuario</option>
                                        {Username && Username.map(
                                            (username) => (
                                                <option value={JSON.stringify(username)}>{username.username}</option>
                                            ))}
                                    </select>
                                    <small className="invalid-feedback" id="helpId" >
                                        <i className="bi bi-exclamation-circle"> {errorsDateAndUser.User}</i>
                                    </small>
                                </div>
                            </div>


                            <div className="form-group">

                                <label for="car" className="form-label"> <i className="bi bi-car-front-fill"> </i>Vehículo</label>
                                <div className="form-group">

                                    <select className={((errors.CarSelect) ? "is-invalid" : "") + " form-select"} name="car" id="car"
                                        onBlur={handleInputblurCar}
                                        onClick={handleInputblurCar}
                                        onChange={e => {
                                            setCarSelect(JSON.parse(e.target.value));
                                        }}>


                                        <option selected>Seleccioné un Vehículo</option>
                                        {Car && Car.map(
                                            (car) => (
                                                <option value={JSON.stringify(car)}>{car.licencePlate}</option>
                                            ))}
                                    </select>
                                    <small className="invalid-feedback" id="helpId" >
                                        <i className="bi bi-exclamation-circle"> {errors.CarSelect}</i>
                                    </small>
                                </div>
                            </div>

                            <div className="col-md-3 position-relative">
                                <label htmlFor="dateRent" className="form-label">
                                    <i className="bi bi-calendar-date"></i> Fecha
                                </label>
                                <div className={`input-group has-validation ${Rent.dateRent !== '' && !errorsDateAndUser.User ? 'input-success' : ''}`}>
                                    <span className="input-group-text">
                                        <i className="bi bi-pencil-square"></i>
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
                                        <i className="text-success fs-5">No se puede alquilar más de un vehículo por persona en las mismas fechas!</i>
                                    </div>
                                ) : (
                                    <div>
                                    </div>
                                )}
                            </div>

                            <div className="col-12">
                                <button className="btn btn-secondary my-3  mx-2 " type="submit">
                                    <i className="bi bi-person-plus"> Alquilar</i>
                                </button>
                                <Link className="btn btn-danger" to={"/RentList"}>
                                    <i className="bi bi-x-circle"> Cancelar</i>
                                </Link>
                            </div>

                        </form>



                    </blockquote>
                </div >
            </div >
        </div >
        </div>
    );
};

export default RentCreate;