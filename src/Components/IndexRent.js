import React, { useState, useEffect } from "react";
import carServices from "../services/carServices";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading"
import Paginate from './Paginate';

const IndexRent = () => {
    const [Car, setCar] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10

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
        carServices.getAll()
            .then(response => {
                setCar(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });

    };


    return (


        <div className="container ">
            <h2 style={{ fontFamily: 'Roboto', fontWeight: 'bold', textAlign: "center", color: "white" }}>The best vehicle option to rent with us</h2>
            {Car.length === 0 ? (
                <Loading />
            ) : (
                <div className=" d-flex flex-wrap">
                    {Car && Car.map(
                        (car) => (

                            <div key={car.id_car} className="card col-md-3 col-lg-3 mb-3" style={{ margin: "1%", marginLeft: "6%" }}>
                                <img src={car.image} className="card-img-top" alt="..." />

                                <div className="card-body">
                                    <h5 className="card-title" key={car.id_car}><i className="bi bi-car-front-fill"> </i>{car.description}</h5>
                                    {car.typeCar.description == "4x4" ? (
                                        <i className="bi bi-pencil-square"> Descripción :
                                            Vehículo {car.typeCar.description},
                                            para uso off road, uso familiar para llevar a toda la familia con las mayor comodidad
                                        </i>) : (
                                        <i className="bi bi-pencil-square"> Descripción :
                                            Vehículo {car.typeCar.description}, para uso familiar para llevar a toda la familia con la mayor comodidad</i>)}

                                </div>
                                <ul className="list-group list-group-flush bg-dark">
                                    <li className="list-group-item"><i className="bi bi-gear-wide-connected"> </i>Cilindraje : {car.cylinder_capacity}</li>
                                    <li className="list-group-item"><i className="bi bi-car-front"> </i>Capacidad : {car.capacity} Personas</li>
                                    <li className="list-group-item"><i className="bi bi-calendar-date"> </i>Modelo : {car.model_year}</li>
                                    <li className="list-group-item"><i className="bi bi-car-front-fill"> </i>Tipo : {car.typeCar.description}</li>
                                    <li className="list-group-item"><i className="bi bi-card-text"> </i>Placa : {car.licencePlate}</li>
 
                                </ul>
                                <div className="card-body ">
                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">

                                        <Link className="btn btn-success" to={"/RentCreate"}>
                                            <i className="bi bi-plus-circle"> Alquilar</i>
                                        </Link>

                                    </div>
                                </div>


                            </div>



                        ))}
                </div>
                
            )}
        </div>

    );
};

export default IndexRent;
