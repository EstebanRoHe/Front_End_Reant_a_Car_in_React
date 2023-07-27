import React, { useState, useEffect } from "react";
import carServices from "../services/carServices";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import AuthServices from "../services/authServices";
import ReactPaginate from 'react-paginate';
import './Paginate.css';
import ContactoFooter from './ContactoFooter';
import './IndexRent.css'

const IndexRent = () => {
    const [Car, setCar] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6;
    const [filtro, setFiltro] = useState("");
    const [error, setError] = useState(false);
    const isLoggedIn = AuthServices.getAuthToken();
    const offset = currentPage * itemsPerPage;
    const paginatedCars = Car.slice(offset, offset + itemsPerPage);
    
    
    useEffect(() => {
        getList();
    // eslint-disable-next-line
    }, []);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const handleFiltroChange = (event) => {
        setFiltro(event.target.value);
        filtrodescription();
    };

    const getList = () => {

        carServices.getAll()
            .then(response => {
                if (filtro) {
                    const filteredCar = response.data.filter((Car) =>
                        Car.description.toLowerCase().includes(filtro.toLowerCase())
                    );
                    setCar(filteredCar);
                } else {
                    setCar(response.data);
                }
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });

    };

    const filtrodescription = () => {

        if (filtro != null) {
            carServices.getFiltroDescription(filtro)
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

    return (
        <><div className="container">
            {Car.length === 0 ? (
                <Loading />
            ) : (
                <>
            <div className="headerIndexRenr">
                <h2 style={{ fontFamily: 'Roboto', fontWeight: 'bold', textAlign: "center", color: "white" }}>
                La mejor opción para alquilar un vehículo es con nosotros
                    </h2>
                <div className="ml-auto d-flex align-items-end justify-content-end">
                    <div className="input-container">
                        <input
                            type="text"
                            className="form-control"
                            value={filtro}
                            onChange={handleFiltroChange}
                            onBlur={handleFiltroChange}
                            onKeyUp={handleFiltroChange}
                            placeholder="Search for tipo ej: 4x4 "
                        />
                        {error && (
                            <small className="errorSmall" id="helpId" style={{ marginTop: "1%" }}>
                                <i className="bi bi-exclamation-circle"> Descripción no encontrada</i>
                            </small>
                        )}
                    </div>

                </div>
            </div>

            
                    <div className="d-flex flex-wrap card-container">
                        {paginatedCars && paginatedCars.map((car) => (
                            <div key={car.idCar} className="card col-md-3 col-lg-3 mb-3 card-rent" >
                                <img src={car.image} className="card-img-top imagen-rent " alt="..." />
                         
                                
                                <ul className="list-group descripcion-rent ">
                                <li className="list-group-item"> <h5 className="card-title" key={car.idCar} style={{color:"white"}}>
                                    <i className="bi bi-car-front-fill"> </i>{car.description}</h5></li>
                                    <li className="list-group-item"><i className="bi bi-gear-wide-connected"> </i>Cilindraje: {car.cylinder_capacity}</li>
                                    <li className="list-group-item"><i className="bi bi-car-front"> </i>Capacidad: {car.capacity} Personas</li>
                                    <li className="list-group-item"><i className="bi bi-calendar-date"> </i>Modelo: {car.model_year}</li>
                                    <li className="list-group-item"><i className="bi bi-car-front-fill"> </i>Tipo: {car.typeCar.description}</li>
                                    <li className="list-group-item"><i className="bi bi-card-text"> </i>Placa: {car.licencePlate}</li>
                                </ul>
                               
                                <div className="card-body">
                                    <div className="d-flex justify-content-center">
                                        {isLoggedIn ? (
                                            <Link className="btn btn-success" to={"/RentCreate/" + car.idCar}>
                                                <i className="bi bi-plus-circle"> Alquilar</i>
                                            </Link>
                                        ) : (
                                            <Link className="btn btn-success" to={"/Login"}>
                                                <i className="bi bi-plus-circle"> Alquilar</i>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pagination-container">

                        <ReactPaginate
                            previousLabel={<i className="bi bi-arrow-left-circle-fill left-paginate-arrow-indexrent"> </i>}
                            nextLabel={<i className="bi bi-arrow-right-circle-fill rigth-paginate"> </i>}
                            pageCount={Math.ceil(Car.length / itemsPerPage)}
                            onPageChange={handlePageChange}
                            containerClassName={'pagination'}
                            activeClassName={'active'}
                            previousClassName={'left-paginate-arrow-indexrent'}
                            nextClassName={'rigth-paginate'}
                            pageClassName={'indexrent-page-count'} />

                    </div>
                </>
            )}
        </div>
            <ContactoFooter /></>
    );
};

export default IndexRent;

