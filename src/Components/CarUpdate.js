import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import carServices from "../services/carServices";
import typeCarServices from "../services/typecarServices";
import Swal from "sweetalert2";



const CarUpdate = props => {
    const { idCar } = useParams();
    

    const initialCarState = {
        idCar: null,
        licencePlate: "",
        description: "",
        image: "",
        cylinder_capacity: "",
        capacity: "",
        model_year: "",
        typeCar: {}

    }

    const [Car, setCar] = useState(initialCarState);
    const [TypeCar, setTypeCar] = useState([]);
  

    const getCar = (idCar) => {
        carServices.get(idCar)
            .then(response => {
                setCar(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    useEffect(() => {
        getList();
        if (idCar)
            getCar(idCar);
    }, [idCar]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCar({ ...Car, [name]: value });
    }


    const getList = () => {
        typeCarServices.getAll()
            .then(response => {
                setTypeCar(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });

    };

    const updateCar = () => {
        
        carServices.update(Car.idCar, Car)
            .then(response => {
                console.log(response.data);
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Vehiculo Actualizado Correctamente',
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
                <h4>Actualizar Vehículo del Id : {Car.idCar}</h4>
                <blockquote className="blockquote mb-0 ">

                    <form novalidate onSubmit={e => {
                        e.preventDefault()
                        updateCar()
                    }}


                        className="row g-3 needs-validation my-3  border = 1" >

                        <div className="col-md-3 position-relative">
                            <label for="licencePlate" className="form-label ">Placa</label>
                            <div className="input-group has-validation">
                                <span className="input-group-text">
                                    <i className="bi bi-pencil-square"></i>
                                </span>
                                <input type="text" className="form-control" id="licencePlate" value={Car.licencePlate}
                                    onChange={handleInputChange} name="licencePlate" required />
                                <div className="valid-tooltip">
                                    ""
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 position-relative">
                            <label for="description" className="form-label ">Marca</label>
                            <div className="input-group has-validation">
                                <span className="input-group-text">
                                    <i className="bi bi-pencil-square"></i>
                                </span>
                                <input type="text" className="form-control" id="description" value={Car.description}
                                    onChange={handleInputChange} name="description" required />
                                <div className="valid-tooltip">
                                    ""
                                </div>
                            </div>
                        </div>



                        <div className="col-md-3 position-relative">
                            <label for="image" className="form-label ">Imagen</label>
                            <div className="input-group has-validation">
                                <span className="input-group-text">
                                    <i className="bi bi-image"></i>
                                </span>
                                <input type="text" className="form-control" id="image" value={Car.image}
                                    onChange={handleInputChange} name="image"  />
                                <div className="invalid-tooltip">
                                    ""
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 position-relative">
                            <label for="cylinder_capacity" className="form-label">Cilindraje</label>
                            <div className="input-group has-validation">
                                <span className="input-group-text">
                                    <i className="bi bi-gear-wide-connected"></i>
                                </span>
                                <input type="text" className="form-control" id="cylinder_capacity" value={Car.cylinder_capacity}
                                    onChange={handleInputChange} name="cylinder_capacity" required />
                                <div className="invalid-tooltip">
                                    ""
                                </div>
                            </div>

                        </div>



                        <div className="col-md-3 position-relative">
                            <label for="capacity" className="form-label">Capacidad</label>
                            <div className="input-group has-validation">
                                <span className="input-group-text">
                                    <i className="bi bi-car-front"></i>
                                </span>
                                <input type="text" className="form-control" id="capacity" value={Car.capacity}
                                    onChange={handleInputChange} name="capacity" required />
                                <div className="invalid-tooltip">
                                    ""
                                </div>
                            </div>
                        </div>


                        <div className="col-md-3 position-relative">
                            <label for="model_year" className="form-label">Modelo</label>
                            <div className="input-group has-validation">
                                <span className="input-group-text">
                                    <i className="bi bi-calendar-date"></i>
                                </span>
                                <input type="text" className="form-control" id="model_year" value={Car.model_year}
                                    onChange={handleInputChange} name="model_year" required />
                                <div className="invalid-tooltip">
                                    ""
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 position-relative">
                            <label for="typeCar" className="form-label">Tipo</label>
                            <div className="input-group has-validation">
                                <span className="input-group-text">
                                    <i className="bi bi-car-front-fill"></i>
                                </span>
                               

                                <select className="form-select" name="typeCar" id="typeCar"
                                    onChange={e => {                                    
                                        setCar({...Car, typeCar : JSON.parse(e.target.value)})
                                    }}>
                                     <option value={{...Car.type}}>{Car.typeCar.description}</option>
                                    {TypeCar && TypeCar.map(
                                        (type) => (
                                            <option key={type.id_typeCar}value={JSON.stringify(type)}>{type.description}</option>
                                        ))}
                                </select>



                                <div className="invalid-tooltip">
                                    ""
                                </div>
                            </div>
                        </div>


                        <div className="col-12">
                            <button className="btn btn-secondary my-3  mx-2 " type="submit">
                                <i className="bi bi-person-plus"> Actualizar</i>
                            </button>
                            <Link className="btn btn-danger" to={"/CarList"}>
                                <i className="bi bi-x-circle"> Cancelar</i>
                            </Link>
                        </div>

                    </form>



                </blockquote>
            </div>
        </div>




    );
};

export default CarUpdate;