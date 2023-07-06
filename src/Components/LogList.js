import React, { useState, useEffect } from "react";
import logServices from "../services/logServices";
import Loading from "./Loading";
import AuthServices from "../services/authServices";
import Paginate from "./Paginate";

const LogList = () => {
    const [log, setLog] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;
    const [filtro, setFiltro] = useState("");
    const [error, setError] = useState(false);

    
    useEffect(() => {
        getList();
    // eslint-disable-next-line
    }, []);
 
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const paginated = log.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const handleFiltroChange = (event) => {
        setFiltro(event.target.value);
        filtroUsername();
    };

    const getList = () => {
        const token = AuthServices.getAuthToken();
        if (token) {
            logServices.setAuthToken(token);
        } else {
            console.error("No se encontró un token válido");
            return;
        }
        logServices
            .getAll()
            .then((response) => {
                if (filtro) {
                    const filteredUsername= response.data.filter((log) =>
                    log.usuario.toLowerCase().includes(filtro.toLowerCase())
                    );
                    setLog(filteredUsername);
                } else {
                    setLog(response.data);
                }
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const filtroUsername = () => {
        const token = AuthServices.getAuthToken();
        if (token) {
            logServices.setAuthToken(token);
        } else {
            console.error("No se encontró un token válido");
            return;
        }
        if (filtro != null) {
            logServices.getFiltroUsername(filtro)
                .then((response) => {
                    setLog(response.data);
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
 

    return (
        <div className="container">
            {log.length === 0 ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Loading />
                </div>
            ) : (
                <div className="card text bg-light mb-3">
                    <div className="card-header d-flex justify-content-between">
                        <div className="ml-auto d-flex flex-column">
                            <div className="input-container">
                                <input
                                    type="text"
                                    className="form-control filtro flex-grow-1"
                                    value={filtro}
                                    onChange={handleFiltroChange}
                                    onBlur={handleFiltroChange}
                                    onKeyUp={handleFiltroChange}
                                    placeholder="Seach for username"
                                />
                            </div>
                            {error && (
                                <small className="errorSmall" id="helpId" style={{marginTop:"1%"}}>
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
                                        <th scope="col">Fecha</th>
                                        <th scope="col">Metodo</th>
                                        <th scope="col">Usuario</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {log &&
                                        paginated.map((log) => (
                                            <tr key={log.id_log}>
                                                <th scope="row">{log.id_log}</th>
                                                <td>{log.fecha }</td>
                                                <td>{log.metodo}</td>
                                                <td>{log.usuario}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                            <Paginate
                             pageCount={Math.ceil(log.length / itemsPerPage)}
                             handlePageChange={handlePageChange} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LogList;
