import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import rentServices from "../services/rentServices";
import userServices from "../services/usernameServices";
import carServices from "../services/carServices";
import Swal from "sweetalert2";

const RentUpdate = props => {
    const { id_rent } = useParams();

    const initialRentState = {
        id_rent: null,
        username: {},
        car: {},
        date_rent: ""
    }

    const [Rent, setRent] = useState(initialRentState);
    const [username, setUsername] = useState([]);
    const [car, setCar] = useState([]);
    
    const getRent = id_rent => {
        rentServices.get(id_rent)
            .then(response => {
                setRent(response.data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    useEffect(() => {
        getListUser();
        getListCar();
        if (id_rent)
            getRent(id_rent);
    }, [id_rent]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setRent({ ...Rent, [name]: value });
    }


    const getListUser = () => {
        userServices.getAll()
            .then(response => {
                setUsername(response.data);
            })
            .catch(e => {
                console.log(e);
            });

    };

    const getListCar = () => {
        carServices.getAll()
            .then(response => {
                setCar(response.data);
            })
            .catch(e => {
                console.log(e);
            });

    };

    const updateRent = () => {
        rentServices.update(Rent.id_rent, Rent , Rent.username, Rent.car) 
            .then(response => {
                console.log(response.data);
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
            });
    };


    return (

        <div className="card  ">


            <div className="card-body ">
                <h4>Actualizar Fecha de Alquiler del Id : {Rent.id_rent}</h4>
                <blockquote className="blockquote mb-0 ">

                    <form novalidate onSubmit={e=>{
                        e.preventDefault()
                        updateRent()
                    }}


                        className="row g-3 needs-validation my-3  border = 1" >


                        <div className="col-md-3 position-relative">
                            <label for="username" className="form-label">Usuario</label>
                            <div className="input-group has-validation">
                                <span className="input-group-text">
                                <i className="bi bi-person-add"> </i>
                                </span>

                                <select className="form-select" name="username" id="username"
                                    onChange={e => {                                    
                                        setRent({...Rent, username : JSON.parse(e.target.value)})
                                    }}>
                                     <option value={{...Rent.username}}>{Rent.username.username}</option>

                                 {username && username.map(
                                    (user)=>(
                                        <option key={user.id_username} value={JSON.stringify(user)}>{user.username}</option>
                                 ))}    
                                 </select>

                                <div className="invalid-tooltip">
                                    Please provide a valid password.
                                </div>
                            </div>
                        </div>


                        <div className="col-md-3 position-relative">
                            <label for="car" className="form-label">Vehículo</label>
                            <div className="input-group has-validation">
                                <span className="input-group-text">
                                <i className="bi bi-car-front-fill"> </i>
                                </span>
                                
                                <select className="form-select" name="username" id="username"
                                    onChange={e => {                                    
                                        setRent({...Rent, car : JSON.parse(e.target.value)})
                                    }}>   
                                     <option value={{...Rent, car}}>{Rent.car.licence_plate}</option>
                                {car && car.map(
                                    (car)=>(
                                        <option key={car.id_car} value={JSON.stringify(car)}>{car.licence_plate}</option>
                                ))}     
                                </select>  

                                <div className="invalid-tooltip">
                                    Please provide a valid password.
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 position-relative">
                            <label for="date_rent" className="form-label "> <i className="bi bi-calendar-date"> </i> Fecha</label>
                            <div className="input-group has-validation">
                                <span className="input-group-text">
                                    <i className="bi bi-pencil-square"></i>
                                </span>
                                <input type="date" className="form-control" id="date_rent" value={Rent.date_rent}
                                    onChange={handleInputChange} name="date_rent" required />
                                <div className="valid-tooltip">
                                    Looks good!
                                </div>
                            </div>
                        </div>




                        <div className="col-12">
                            <button className="btn btn-secondary my-3  mx-2 " type="submit">
                                <i className="bi bi-person-plus"> Actualizar</i>
                            </button>
                            <Link className="btn btn-danger" to={"/RentList"}>
                                <i className="bi bi-x-circle"> Cancelar</i>
                            </Link>
                        </div>

                    </form>



                </blockquote>
            </div>
        </div>




    );
};

export default RentUpdate;