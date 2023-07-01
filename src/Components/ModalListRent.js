import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import rentServices from "../services/rentServices";
import Swal from "sweetalert2";
import Loading from "./Loading"
import AuthServices from '../services/authServices';
import './Modal.css'
import Paginate from './Paginate';

const ModalListRent = (props) => {
    const { onClose } = props;
    const [Rent, setRent] = useState([]);
    const [user, setUser] = useState([]);
    let navigate = useNavigate;
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;


    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const paginated = Rent.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    useEffect(() => {
        const username = AuthServices.getUsername();
        setUser(username);
        if (username != null)
            getListByUsername(username);
    }, []);

    const getListByUsername = (username) => {
        const token = AuthServices.getAuthToken();
        if (token) {
            rentServices.setAuthToken(token);
        } else {
            return;
        }
        rentServices.getByUsername(username)
            .then(response => {
                setRent(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });

    };

    const remove = (idRent) => {
        const token = AuthServices.getAuthToken();
        if (token) {
            rentServices.setAuthToken(token);
        } else {
            console.error("No se encontró un token válido");
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
                rentServices.remove(idRent)
                    .then(response => {
                        console.log(response.data);
                        navigate(getListByUsername(user));
                    })
                swalWithBootstrapButtons.fire(

                    'Eliminado!',
                    'Tu archivo ha sido eliminado',
                    'Correctamente'
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
        <div className="modal  modal-right" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={onClose}
                        >
                            <i class="bi bi-x-lg"></i>
                        </button>
                    </div>
                    <div className="modal-body">

                        <div className="container ">
                            {Rent.length === 0 ? (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <div className=" custom-loading" style={{ marginLeft: "22%" }}>
                                        <Loading />
                                    </div>
                                    <i className="bi bi-exclamation-circle"
                                     style={{color:"red"}}> Este usuario no cuenta con ningún vehículo alquilado. 
                                    </i>

                                    <Link className="btn btn-primary" to={"/RentCreate/" + null} onClick={onClose}>
                                        <i className="bi bi-card-checklist"> Rentar un Vehiculo</i>
                                    </Link>

                                </div>
                            ) : (
                                <div className="card text bg-light mb-3">

                                    <div className="card-body ">
                                        <div className="table-responsive">
                                            <table className="table table-striped border = 1">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Usuario</th>
                                                        <th scope="col">Vehiculo</th>
                                                        <th scope="col">Fecha</th>

                                                    </tr>

                                                </thead>
                                                <tbody>

                                                    {Rent
                                                        && paginated.map(
                                                            (rent) => (
                                                                <tr key={rent.idRent}>
                                                                    <td>{rent.username.username}</td>
                                                                    <td>{rent.car.licencePlate}</td>
                                                                    <td>{rent.dateRent}</td>

                                                                    <td>
                                                                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                                                            <Link className="btn btn-secondary"
                                                                                to={"/RentUpdate/" + rent.idRent}
                                                                                onClick={onClose}
                                                                            >
                                                                                <i className="bi bi-gear"> Actualizar</i>
                                                                            </Link>

                                                                            <button className="btn btn-danger" onClick={() => remove(rent.idRent)}>
                                                                                <i className="bi bi-trash3"> Eliminar</i>
                                                                            </button>
                                                                        </div>

                                                                    </td>
                                                                </tr>

                                                            ))}
                                                </tbody>

                                            </table>
                                            <Paginate
                                                pageCount={Math.ceil(Rent.length / itemsPerPage)}
                                                handlePageChange={handlePageChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>



                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-warning" data-dismiss="modal" onClick={onClose}>
                            Cerrar
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalListRent;