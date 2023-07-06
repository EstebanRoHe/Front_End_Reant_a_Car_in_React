import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import typeCarServices from "../services/typecarServices";
import Swal from "sweetalert2";
import AuthServices from '../services/authServices';
import ModalLoadingContacto from "./ModalLoadingContacto";

const TypeCarUpdate = () => {
    
    const { id_typeCar } = useParams();

    const initialTypeCarState = {
        id_typeCar: null,
        description: ""
    }

    const [TypeCar, setTypeCar] = useState(initialTypeCarState);
    const [showModal, setShowModal] = useState(false);

    const showModalHandler = () => {
        setShowModal(true);
    };

    const closeModalHandler = () => {
        setShowModal(false);
    };

    const getTypeCar = id_typeCar => {
        showModalHandler();
        const token = AuthServices.getAuthToken();
        if (token) {
            typeCarServices.setAuthToken(token);
        } else {
            console.error("No se encontró un token válido");
            closeModalHandler();
            return;
        }
        typeCarServices.get(id_typeCar)
            .then(response => {
                setTypeCar(response.data);
                console.log(response.data);
                closeModalHandler();
            })
            .catch(e => {
                console.log(e);
                closeModalHandler();
            })
    }

    useEffect(() => {
        if (id_typeCar){
            getTypeCar(id_typeCar);
        }
    }, [id_typeCar]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setTypeCar({ ...TypeCar, [name]: value });
    }

    const updateTypeCar = () => {
        showModalHandler();
        const token = AuthServices.getAuthToken();
        if (token) {
            typeCarServices.setAuthToken(token);
            console.log('Token :', token);
        } else {
            console.error("No se encontró un token válido");
            closeModalHandler();
            return;
        }
        typeCarServices.update(TypeCar.id_typeCar, TypeCar)
            .then(response => {
                console.log(response.data);
                closeModalHandler();
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
                closeModalHandler();
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
                    {showModal && (
                            <ModalLoadingContacto />
                        )}
                </blockquote>
            </div>
        </div>
        </div>

    );
};

export default TypeCarUpdate;

