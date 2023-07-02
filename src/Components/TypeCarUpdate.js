import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import typeCarServices from "../services/typecarServices";
import Swal from "sweetalert2";
import AuthServices from '../services/authServices';

const TypeCarUpDate = () => {
    
    const { id_typeCar } = useParams();

    const initialTypeCarState = {
        id_typeCar: null,
        description: ""
    }

    const [TypeCar, setTypeCar] = useState(initialTypeCarState);

    const getTypeCar = id_typeCar => {
        const token = AuthServices.getAuthToken();
        if (token) {
            // Agrega el token a los encabezados de la solicitud
            typeCarServices.setAuthToken(token);
            console.log('Token :', token);
        } else {
            // Maneja el caso cuando no hay un token válido
            console.error("No se encontró un token válido");
            console.log('Token :', token);
            return;
        }
        typeCarServices.get(id_typeCar)
            .then(response => {
                setTypeCar(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    useEffect(() => {
        if (id_typeCar)
            getTypeCar(id_typeCar);
    }, [id_typeCar]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setTypeCar({ ...TypeCar, [name]: value });
    }

    const updateTypeCar = () => {
        const token = AuthServices.getAuthToken();
        if (token) {
            typeCarServices.setAuthToken(token);
            console.log('Token :', token);
        } else {
            console.error("No se encontró un token válido");
            console.log('Token :', token);
            return;
        }
        typeCarServices.update(TypeCar.id_typeCar, TypeCar)
            .then(response => {
                console.log(response.data);
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Tipo de Vehiculo Actualizado Correctamente',
                    showConfirmButton: false,
                    timer: 2200
                  })
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div className="container ">
        <div className="card  ">
            <div className="card-body ">
                <h5>Actualizar Tipo de Vehículo del Id : {TypeCar.id_typeCar}</h5>
                <blockquote className="blockquote mb-0 ">

                    <form novalidate onSubmit={e=>{
                        e.preventDefault()
                        updateTypeCar()
                    }}
                        className="row g-3 needs-validation my-3  border = 1" >

                        <div className="col-md-3 position-relative">
                            <label for="description" className="form-label ">Descripción</label>
                            <div className="input-group has-validation">
                                <span className="input-group-text">
                                    <i className="bi bi-pencil-square"></i>
                                </span>
                                <input type="text" className="form-control" id="description" value={TypeCar.description} onChange={handleInputChange} name="description" required />
                                
                            </div>
                        </div>


                        <div className="col-12">
                            <button className="btn btn-secondary my-3 mx-2" type="submit">
                                <i className="bi bi-gear"> Actualizar</i>
                            </button>
                            <Link className="btn btn-danger" to={"/TypeCarList"}>
                                <i className="bi bi-x-circle"> Cancelar</i>
                            </Link>
                        </div>

                    </form>



                </blockquote>
            </div>
        </div>
        </div>

    );
};

export default TypeCarUpDate;

