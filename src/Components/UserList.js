import React, { useState, useEffect } from "react";
import userServices from "../services/usernameServices";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "./Loading";
import AuthServices from "../services/authServices";
import Paginate from "./Paginate";
import ModalLoadingContacto from "./ModalLoadingContacto";

const UserList = (props) => {
    const [User, setUser] = useState([]);
    let navigate = useNavigate;
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [filtro, setFiltro] = useState("");
    const [error, setError] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        getList();
    }, []);


    const handleUserSelection = (username) => {
        props.handleSelectUser(username);
    };


    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const paginated = User.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const handleFiltroChange = (event) => {
        setFiltro(event.target.value);
        filtroName();
    };

    const showModalHandler = () => {
        setShowModal(true);
    };

    const closeModalHandler = () => {
        setShowModal(false);
    };

    const getList = () => {
        const token = AuthServices.getAuthToken();
        if (token) {
            userServices.setAuthToken(token);

        } else {
            console.error("No se encontró un token válido");

            return;
        }
        userServices
            .getAll()
            .then((response) => {
                if (filtro) {
                    const filteredUsers = response.data.filter((user) =>
                        user.name.toLowerCase().includes(filtro.toLowerCase())
                    );
                    setUser(filteredUsers);
                } else {
                    setUser(response.data);
                }
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };


    const filtroName = () => {
        const token = AuthServices.getAuthToken();
        if (token) {
            userServices.setAuthToken(token);

        } else {
            console.error("No se encontró un token válido");

            return;
        }
        if (filtro != null) {
            userServices.getFiltro(filtro)
                .then((response) => {
                    setUser(response.data);
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

    const remove = (idUser) => {
        const token = AuthServices.getAuthToken();
        if (token) {
            userServices.setAuthToken(token);
        } else {
            console.error("No se encontró un token válido");
            return;
        }
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger",
            },
            buttonsStyling: false,
        });

        swalWithBootstrapButtons
            .fire({
                title: "Deseas eliminar este archivo?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Si, eliminar!",
                cancelButtonText: "No, cancelar!",
                reverseButtons: true,
            })
            .then((result) => {
                showModalHandler();
                if (result.isConfirmed) {
                    userServices.remove(idUser).then((response) => {
                        console.log(response.data);
                        getList();
                        closeModalHandler();
                        swalWithBootstrapButtons.fire(
                            "Eliminado!",
                            "Tu archivo ha sido eliminado",
                            "Correctamente"
                        )
                      // navigate(getList());
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
                        "Cancelado",
                        "No se ha eliminado nungun archivo"
                    );
                }
            });
    }; 

    return (
        <div className="container">
            {User.length === 0 ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Loading />
                    <Link className="btn btn-primary" to={"/UserCreate"}>
                        <i className="bi bi-person-plus"> Registrar</i>
                    </Link>
                </div>
            ) : (
                <div className="card text bg-light mb-3">

                    <div className="card-header d-flex justify-content-between">
                        {!props.hideButtons && (
                            <Link className="btn btn-primary " style={{ height: "5vh" }} to={"/UserCreate"}>
                                <i className="bi bi-person-plus"> Registrar</i>
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
                                    placeholder="Seach for name"
                                />
                            </div>
                            {error && (
                                <small className="errorSmall" id="helpId" style={{ marginTop: "1%" }}>
                                    <i className="bi bi-exclamation-circle"> Usuario no encontrado</i>
                                </small>
                            )}
                        </div>
                    </div>

                    <div className="card-body">
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
                                    {User &&
                                        paginated.map((username) => (
                                            <tr key={username.idUser}>
                                                <th scope="row">{username.idUser}</th>
                                                <td>{username.name}</td>
                                                <td>{username.lastName}</td>
                                                <td>{username.username}</td>
                                                <td>{username.email}</td>
                                                <td>
                                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                                        {!props.hideButtons ? (
                                                            <>
                                                                <Link className="btn btn-secondary" to={"/UserUpdate/" + username.idUser}>
                                                                    <i className="bi bi-gear"> Actualizar</i>
                                                                </Link>
                                                                <button className="btn btn-danger" onClick={() => remove(username.idUser)}>
                                                                    <i className="bi bi-trash3"> Eliminar</i>
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <button className="btn btn-success"
                                                                    onClick={() => { handleUserSelection(username,onclose) }}
                                                                    style={{ height: "10vh" }}
                                                                >
                                                                    <i className="bi bi-plus-circle"> Agregar</i>
                                                                </button>
                                                            </>

                                                        )}

                                                    </div>

                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                            <Paginate
                                pageCount={Math.ceil(User.length / itemsPerPage)}
                                handlePageChange={handlePageChange}
                            />
                        </div>
                    </div>
                    {showModal && (
                        <ModalLoadingContacto />
                    )}
                </div>
            )}
        </div >
    );
};

export default UserList;
