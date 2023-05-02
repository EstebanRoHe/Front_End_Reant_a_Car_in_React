import React, { useState,useEffect} from "react";
import typeCarServices from "../services/typecarServices";
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";


const TypeCarCreate = () => {
    const initialTypeCarState = {
        id_typeCar: null,
        description: ""
    }

    const [TypeCar, setTypeCar] = useState(initialTypeCarState);
 

    const handleInputChange = event => {
        const {name, value } = event.target;
        setTypeCar({...TypeCar, [name]: value });
    }

    const createTypeCar = () => {
       
        var date = { id_typeCar: TypeCar.id_typeCar, description: TypeCar.description}
        typeCarServices.create(date)
            .then(response => {  
                setTypeCar({description: response.data.description});
                console.log(response.data);  
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Tipo de Vehiculo Registrado Correctamente',
                    showConfirmButton: false,
                    timer: 2200
                  }).then(
                    newTypeCar()
                  );
            })
            .catch(e => {
                console.log(e);
            })
    };

    const newTypeCar = ()=>{
        setTypeCar(initialTypeCarState);   
    }


    return (
        <div className="card  ">

            <div className="card-body ">
            <h4>Registrar Tipo de Vehículo</h4>
                <blockquote className="blockquote mb-0 ">

                    <form novalidate onSubmit={ e => {
                        e.preventDefault();
                        createTypeCar();
                    }}
                        className="row g-3 needs-validation my-3  border = 1" >

                        <div className="col-md-3 position-relative">
                            <label for="description" className="form-label ">Descripción</label>
                            <div className="input-group has-validation">
                                <span className="input-group-text">
                                <i className="bi bi-pencil-square"></i>
                                </span>
                            <input type="text" className="form-control" id="description" value={TypeCar.description}
                            placeholder="4x4, 4x2, sedán, coupe etc..."   
                            onChange={handleInputChange} name="description" required />
                            <div className="valid-tooltip">
                                Looks good!
                            </div>
                            </div>
                        </div>

                        
                        <div className="col-12">
                            <button className="btn btn-secondary my-3  mx-2 " type="submit">
                            <i className="bi bi-person-plus"> Registrar</i>
                            </button>
                            <Link className="btn btn-danger" to={"/TypeCarList"}>
                                <i className="bi bi-x-circle"> Cancelar</i>
                            </Link>
                        </div>

                    </form>



                </blockquote>
            </div>
        </div>

    );
};

export default TypeCarCreate;