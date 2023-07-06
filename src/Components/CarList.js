import React, { useState, useEffect } from "react";
import carServices from "../services/carServices";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "./Loading"
import AuthServices from '../services/authServices';
import Paginate from './Paginate';
import ModalLoadingContacto from "./ModalLoadingContacto";

const CarList = (props) => {
    const [Car, setCar] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;
    const [filtro, setFiltro] = useState("");
    const [error, setError] = useState(false);
    const [showModal, setShowModal] = useState(false);
    
    
    useEffect(() => {
        getList();
        // eslint-disable-next-line
      }, []);

    const handleCarSelection = (car) => {
        props.handleSelectCar(car);
    };

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const paginated = Car.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const handleFiltroChange = (event) => {
        setFiltro(event.target.value);
        filtroLicencePlate();
    };

    const showModalHandler = () => {
        setShowModal(true);
    };

    const closeModalHandler = () => {
        setShowModal(false);
    };

    const getList = () => {
        showModalHandler();
        const token = AuthServices.getAuthToken();
        if (token) {
            carServices.setAuthToken(token);
            console.log('Token :', token);
        } else {
            console.error("No se encontró un token válido");
            closeModalHandler();
            return;
        }
        carServices.getAll()
            .then(response => {
                if (filtro) {
                    const filteredCar = response.data.filter((Car) =>
                        Car.licencePlate.toLowerCase().includes(filtro.toLowerCase())
                    );
                    setCar(filteredCar);
                    closeModalHandler();
                } else {
                    setCar(response.data);
                    closeModalHandler();
                }
                console.log(response.data);
                closeModalHandler();
            })
            .catch(e => {
                console.log(e);
                closeModalHandler();
            });

    };

    const filtroLicencePlate = () => {
        const token = AuthServices.getAuthToken();
        if (token) {
            carServices.setAuthToken(token);
        } else {
            console.error("No se encontró un token válido");
            return;
        }
        if (filtro !== null) {
            carServices.getFiltro(filtro)
                .then((response) => {
                    setCar(response.data);
                    setError(false);
                    console.log(response.data);
                })
                .catch((e) => {
                    setError(true);
                    console.log(e);
                });
        } else {
            getList()
        }
    };

    const remove = (idCar) => {
        const token = AuthServices.getAuthToken();
        if (token) {
          carServices.setAuthToken(token);
        } else {
          console.error("No se encontró un token válido");
          closeModalHandler();
          return;
        }
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        });
    
        swalWithBootstrapButtons.fire({
          title: 'Deseas eliminar este archivo?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Si, eliminar!',
          cancelButtonText: 'No, cancelar!',
          reverseButtons: true
        }).then((result) => {
          showModalHandler();
          if (result.isConfirmed) {
            carServices.remove(idCar)
              .then(response => {
                console.log(response.data);
                closeModalHandler();
                getList();
                swalWithBootstrapButtons.fire(
                  'Eliminado!',
                  'Tu archivo ha sido eliminado',
                  'Correctamente'
                );
              })
              .catch(error => {
                closeModalHandler();
                swalWithBootstrapButtons.fire(
                  'Error',
                  'Tu archivo está ligado a otro. Primero elimina el archivo ligado a este correctamente',
                  'error'
                );
              });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            closeModalHandler();
            swalWithBootstrapButtons.fire(
              'Cancelado',
              'No se ha eliminado ningún archivo'
            );
          }
        });
      };
    return (
        <div className="container ">
            {Car.length === 0 && showModal === false? (
                <>
                    {!props.hideButtons ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Loading />
                            <i class="bi bi-info-circle" style={{color:"red" , marginBottom :"1%"}}> No se encuentra ningún Vehículo Registrado</i>
                            <Link className="btn btn-primary"  to={"/CarCreate"}>
                                <i className="bi bi-plus-circle"> Registrar un Vehículo </i>
                            </Link>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div className=" custom-loading" style={{ marginLeft: "22%" }}>
                                <Loading />

                            </div>
                            <i className="bi bi-exclamation-circle"
                                style={{ color: "red", justifyContent: "center" }}> No hay vehículo disponibles en este momento.
                            </i>

                        </div>

                    )}
                </>

            ) : (

                <div className="card text bg-light mb-3">

                    <div className="card-header d-flex justify-content-between">
                        {!props.hideButtons && (
                            <Link className="btn btn-primary"  to={"/CarCreate"}>
                                <i className="bi bi-plus-circle"> Registrar un Vehículo </i>
                            </Link>
                        )}
                        <div className="ml-auto d-flex flex-column">
                            <div className="input-container">
                                <input
                                    type="text"
                                    className="form-control filtro flex-grow-1"
                                    value={filtro}
                                    onChange={handleFiltroChange}
                                    onBlur={handleFiltroChange}
                                    onKeyUp={handleFiltroChange}
                                    placeholder="Seach for licence plate"
                                />
                            </div>
                            {error && (
                                <small className="errorSmall" id="helpId" style={{ marginTop: "1%" }}>
                                    <i className="bi bi-exclamation-circle"> Placa no encontrada</i>
                                </small>
                            )}
                        </div>
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
                                        {!props.hideButtons ? (
                                            <th scope="col">Link de Imagen</th>
                                        ) : (<></>)}
                                    </tr>

                                </thead>
                                <tbody>
                                    {Car
                                        && paginated.map(
                                            (car) => (
                                                <tr key={car.idCar}>
                                                    <th scope="row">{car.idCar}</th>
                                                    <td>{car.licencePlate}</td>
                                                    <td>{car.description}</td>
                                                    <td>{car.cylinder_capacity}</td>
                                                    <td>{car.capacity}</td>
                                                    <td>{car.model_year}</td>
                                                    <td>{car.typeCar.description}</td>
                                                    {!props.hideButtons ? (
                                                        <td>{car.image}</td>
                                                    ) : (<></>)}
                                                    <td>
                                                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                                            {!props.hideButtons ? (
                                                                <>
                                                                    <Link className="btn btn-secondary" to={"/CarUpdate/" + car.idCar}>
                                                                        <i className="bi bi-gear"> Actualizar</i>
                                                                    </Link>
                                                                    <button className="btn btn-danger" onClick={() => remove(car.idCar)}>
                                                                        <i className="bi bi-trash3"> Eliminar</i>

                                                                    </button>
                                                                </>
                                                            ) : (
                                                                <button
                                                                    className="btn btn-success"
                                                                    onClick={() => {
                                                                        handleCarSelection(car)
                                                                    }}
                                                                    style={{ height: "10vh" }}
                                                                >
                                                                    <i className="bi bi-plus-circle"> Agregar</i>

                                                                </button>

                                                            )}

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
                    {showModal && (
                        <ModalLoadingContacto />
                    )}
                </div>
            )}
        </div>






    );
};

export default CarList;