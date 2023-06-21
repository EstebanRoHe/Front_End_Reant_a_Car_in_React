import React, { useState, useEffect } from "react";
import userServices from "../services/usernameServices";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "./Loading"
import AuthServices from '../services/authServices';
import Paginate from './Paginate';

const UserList = () => {
    const [User, setUser] = useState([]);
    let navigate = useNavigate;
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    useEffect(() => {
        getList();
    }, []);
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const paginated = User.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const getList = () => {
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
                setUser(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });

    };

    const remove = (idUser) => {
        const token = AuthServices.getAuthToken();
        if (token) {
            userServices.setAuthToken(token);
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
                userServices.remove(idUser)
                    .then(response => {
                        console.log(response.data);
                        swalWithBootstrapButtons.fire(
                            'Eliminado!',
                            'Tu archivo ha sido eliminado',
                            'Correctamente'
                        )
                        navigate(getList());
                    })
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

        <div>
            {User.length === 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Loading />
                    <Link className="btn btn-primary" style={{marginBottom:"50%"}} to={"/UserCreate"}>
                    <i className="bi bi-person-plus"> Registrarse</i>
                    </Link>
                </div>
            ) : (
                <div className="card text bg-light mb-3">
                    <div className="card-header">
                        <Link className="btn btn-secondary"  to={"/UserCreate"}>
                            <i className="bi bi-person-plus"> Registrarse</i>
                        </Link>

                    </div>

                    <div className="card-body ">
                        <div className="table-responsive">
                            <table className="table table-striped border = 1">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Apellidos</th>
                                        <th scope="col">Usuario</th>
                                        <th scope="col">Email</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {User && paginated.map(
                                        (username) => (
                                            <tr key={username.idUser}>
                                                <th scope="row">{username.idUser}</th>
                                                <td>{username.name}</td>
                                                <td>{username.lastName}</td>
                                                <td>{username.username}</td>
                                                <td>{username.email}</td>

                                                <td>
                                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                                        <Link className="btn btn-secondary" to={"/UserUpdate/" + username.idUser}>
                                                            <i className="bi bi-gear"> Actualizar</i>
                                                        </Link>
                                                        <button className="btn btn-danger" onClick={() => remove(username.idUser)}>
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
                                pageCount={Math.ceil(User.length / itemsPerPage)}
                                handlePageChange={handlePageChange}
                            />

                        </div>
                    </div>
                </div>
            )}
        </div>






    );
};

export default UserList;