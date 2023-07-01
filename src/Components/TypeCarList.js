import React, { useState, useEffect } from "react";
import typeCarServices from "../services/typecarServices";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "./Loading";
import AuthServices from '../services/authServices';
import Paginate from './Paginate';

const TypeCarList = () => {
    const [TypeCar, setTypeCar] = useState([]);
    let navigate = useNavigate;
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;
    const [filtro, setFiltro] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        getList();
    }, []);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const paginatedTypeCars = TypeCar.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const handleFiltroChange = (event) => {
        setFiltro(event.target.value);
        filtroDescription();
    };

    const getList = () => {
        const token = AuthServices.getAuthToken();
        if (token) {
            typeCarServices.setAuthToken(token);
           
        } else {
            console.error("No se encontró un token válido");
            
            return;
        }
        typeCarServices
            .getAll()
            .then(response => {
                if (filtro) {
                    const filteredTypeCar = response.data.filter((TypeCar) =>
                    TypeCar.description.toLowerCase().includes(filtro.toLowerCase())
                    );
                    setTypeCar(filteredTypeCar);
                } else {
                    setTypeCar(response.data);
                }
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const filtroDescription = () => {
        const token = AuthServices.getAuthToken();
        if (token) {
            typeCarServices.setAuthToken(token);
        } else {
            console.error("No se encontró un token válido");
            return;
        }
        if (filtro != null) {
            typeCarServices.getFiltro(filtro)
                .then((response) => {
                    setTypeCar(response.data);
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

    const remove = (id_typeCar) => {
        const token = AuthServices.getAuthToken();
        if (token) {
            typeCarServices.setAuthToken(token);
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
        });

        swalWithBootstrapButtons.fire({
            title: '¿Deseas eliminar este archivo?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'No, cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                typeCarServices.remove(id_typeCar)
                    .then(response => {
                        console.log(response.data);
                        swalWithBootstrapButtons.fire(
                            'Eliminado',
                            'Tu archivo ha sido eliminado correctamente',
                            'success'
                        );
                        navigate(getList());
                    })
                    .catch(error => {
                        swalWithBootstrapButtons.fire(
                            'Error',
                            'Tu archivo está ligado a otro. Primero elimina el archivo ligado a este correctamente',
                            'error'
                        );
                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                    'Cancelado',
                    'No se ha eliminado ningún archivo',
                    'info'
                );
            }
        });
    };



    return (
        <div className="container ">
            {TypeCar.length === 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Loading />
                    <Link className="btn btn-primary" to={"/TypeCarCreate"}>
                        <i className="bi bi-plus-circle"> Registrar un Tipo de Vehiculo </i>
                    </Link>
                </div>
            ) : (
                <div className="card text bg-light mb-3">

                    <div className="card-header d-flex justify-content-between">
                        <Link className="btn btn-primary"  style={{height:"5vh"}} to={"/TypeCarCreate"}>
                            <i className="bi bi-plus-circle"> Registrar Tipo de Vehiculo </i>
                        </Link>
                    
                    <div className="ml-auto d-flex flex-column">
                        <div className="input-container">
                            <input
                                type="text"
                                className="form-control filtro flex-grow-1"
                                value={filtro}
                                onChange={handleFiltroChange}
                                onBlur={handleFiltroChange}
                                onKeyUp={handleFiltroChange}
                                placeholder="Seach for description"
                            />
                        </div>
                        {error && (
                            <small className="errorSmall" id="helpId" style={{marginTop:"1%"}}>
                                <i className="bi bi-exclamation-circle"> Descripción no encontrado</i>
                            </small>
                        )}
                      </div>
                    </div>

                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-striped border=1">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Descripción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {TypeCar &&
                                        paginatedTypeCars.map((typecar) => (
                                            <tr key={typecar.id_typeCar}>
                                                <th scope="row">{typecar.id_typeCar}</th>
                                                <td>{typecar.description}</td>
                                                <td>
                                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                                        <Link className="btn btn-secondary" to={"/TypeCarUpDate/" + typecar.id_typeCar}>
                                                            <i className="bi bi-gear"> Actualizar</i>
                                                        </Link>
                                                        <button className="btn btn-danger" onClick={() => remove(typecar.id_typeCar)}>
                                                            <i className="bi bi-trash3"> Eliminar</i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                            <Paginate
                                pageCount={Math.ceil(TypeCar.length / itemsPerPage)}
                                handlePageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TypeCarList;