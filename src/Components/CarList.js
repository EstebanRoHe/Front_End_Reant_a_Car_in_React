import React, { useState, useEffect } from "react";
import carServices from "../services/carServices";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "./Loading"
import AuthServices from '../services/authServices';
import Paginate from './Paginate';

const CarList = () => {
    const [Car, setCar] = useState([]);
    let navigate = useNavigate;
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    useEffect(() => {
        getList();
    }, []);
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const paginated = Car.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const getList = () => {
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

    const remove = (idCar) => {
        const token = AuthServices.getAuthToken();
        if (token) {
            carServices.setAuthToken(token);
            console.log('Token :', token);
        } else {
            console.error("No se encontró un token válido");
            console.log('Token :', token);
            return;
        }
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: 'Deseas eliminar este archivo?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'No, cancelar!',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                carServices.remove(idCar)
                .then(response => {
                    console.log(response.data);
                    swalWithBootstrapButtons.fire(
                        'Eliminado!',
                        'Tu archivo ha sido eliminado',
                        'Correctamente'
                      )
                    navigate(getList());
                }); 
              swalWithBootstrapButtons.fire(
            'Error!',
              'Tu archivo esta ligado a otro, Primero elimine el archivo ligado a este Correctamente'
              )
            } else if (
              
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelado',
                'No se ha eliminado nungun archivo'
              )
            }
          })
    };

    return (
        <div className="container ">
        {Car.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Loading />
                <Link className="btn btn-primary" style={{marginBottom:"50%"}} to={"/CarCreate"}>
                <i className="bi bi-plus-circle"> Registrar un Vehiculo </i>
                </Link>
            </div> 
        ) : (

        <div className="card text bg-light mb-3">
            <div className="card-header">
                <Link className="btn btn-secondary" to={"/CarCreate"}>
                <i className="bi bi-plus-circle"> Registrar un Vehiculo </i>
                    </Link>
 
            </div>

            <div className="card-body ">
                <div className="table-responsive">
                    <table className="table table-striped border = 1">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Placa</th>
                                <th scope="col">Descripción</th>
                                <th scope="col">Cilindraje</th>
                                <th scope="col">Capacidad</th>
                                <th scope="col">Modelo</th>
                                <th scope="col">Tipo</th>
                                <th scope="col">Link de Imagen</th>
                            
                            </tr>
                          
                        </thead>
                        <tbody>
                            {Car && paginated.map(
                                (car) => (
                                    <tr key={car.idCar}>
                                        <th scope="row">{car.idCar}</th>
                                        <td>{car.licencePlate}</td>
                                        <td>{car.description}</td>
                                        <td>{car.cylinder_capacity}</td>
                                        <td>{car.capacity}</td>
                                        <td>{car.model_year}</td>
                                        <td>{car.typeCar.description}</td>
                                        <td>{car.image}</td>

                                        <td>
                                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                                <Link className="btn btn-secondary" to={"/CarUpdate/" + car.idCar}>
                                                <i className="bi bi-gear"> Actualizar</i>
                                            </Link>
                                            <button className="btn btn-danger" onClick={() => remove(car.idCar)}>
                                            <i className="bi bi-trash3"> Eliminar</i>
                                           
                                            </button>
                                            </div>

                                            </td>
                                    </tr>

                                )
                            )}
                        </tbody>

                    </table>
                    <Paginate 
                                pageCount={Math.ceil(Car.length / itemsPerPage)}
                                handlePageChange={handlePageChange}
                            />
                </div>
            </div>
        </div>
        )}
        </div>






    );
};

export default CarList;