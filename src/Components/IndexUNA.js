import React, { useState, useEffect } from "react";
import carServices from "../services/carServices";
import logo from '../assets/img/Logo.PNG';
import prado from '../assets/img/prado.jpg';
import hyundai from '../assets/img/hyundai.jpg';
import jimmy from '../assets/img/jimny.jpg';
import './IndexUNA.css';
import { Link, useNavigate } from "react-router-dom";

const IndexUNA = () => {
    const [Car, setCar] = useState([]);

    let navigate = useNavigate;

    useEffect(() => {
        getList();

    }, []);

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

        <div className="index">
            <h1 className="title">Go-Tico Car Rentals</h1>
            <div className="containerCarousel ">
                <div >
                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" >
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={logo} className="d-block w-100" alt="logo" />
                        </div>

                        <div className="carousel-item">
                            <img src={prado} className="d-block w-100" alt="prado" />
                        </div>

                        <div className="carousel-item">
                            <img src={hyundai} className="d-block w-100" alt="hyundai" />
                        </div>

                        <div className="carousel-item">
                            <img src={jimmy} className="d-block w-100" alt="jimmy" />
                        </div>
                    </div>

                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>

                </div>
                </div>
            </div>
            <div className="info" >
                <div className="container">
                <div >
                    <h2 className="h2-style">
                        La mejor opción para alquilar
                        <br />
                        un vehículo es con nosotros

                    </h2>
                </div>
                <div className=" d-flex flex-wrap" >
                    <p style={{ color: "white" }}>
                        "¡Descubre la libertad y la comodidad con nuestros excepcionales automóviles de alquiler!<br />
                        Nuestros vehículos ofrecen una combinación perfecta de estilos, rendimientos y practicidad.<br />
                        Con diseños elegantes y aerodinámicos, estos vehiculos llaman la atención por dondequiera que vayan.<br />
                        Confía en nosotros para satisfacer tus necesidades de transporte.<br />
                        Ya sea un viaje de negocios o unas vacaciones en familia, nuestros automóviles de alquiler estan listos<br />
                        para hacer que tu experiencia sea inolvidable. ¡Descubre la verdadera libertad de movimiento y reserva ahora<br />
                        para disfrutar de un viaje lleno de confort y emoción!"
                    </p>
                </div>
                <div className="d-flex flex-wrap ">
                    <Link className="btn btn-info" to={"/IndexRent"}
                        style={{ color: 'white', fontFamily: 'Arial, sans-serif' }}>
                        Ver Vehículos
                    </Link>
                    <span style={{ marginRight: '10px' }}></span>

                    <Link className="btn btn-danger" to={"/UserCreate"}
                        style={{ color: 'white', fontFamily: 'Arial, sans-serif' }}>
                        Regístrese
                    </Link>
                </div>
                </div>
            </div>
            <div className="continfobeneficios">
            <div className="container">
                <h2 class="rc-section-title" style={{ color: "white" }}>¿Por que alquilar con Nosotros?</h2>
                <table>
                    <tbody className="d-flex">
                        <tr className="d-flex flex-column">
                            <th className="d-flex flex-column align-items-center">
                                <label className="form-label" style={{ color: "white" }}>
                                    <i className="bi bi-currency-dollar" style={{ fontSize: "30px" }}></i>
                                </label>
                                <span className="rc-benefits--base-icon d-flex justify-content-center align-items-center">
                                </span>
                                <h4 style={{ color: "white" }}>El mejor precio</h4>
                            </th>
                            <td>
                                <p style={{ color: "white" }}>
                                    Constantemente presentamos ofertas especiales y descuentos promocionales. Algunas promociones como descuentos por reserva anticipada, tarifas especiales para periodos prolongados o paquetes.</p>
                            </td>
                        </tr>
                        <tr className="d-flex flex-column">
                            <th className="d-flex flex-column align-items-center">
                                <span className="rc-benefits--base-icon d-flex justify-content-center align-items-center">
                                    <label className="form-label" style={{ color: "white" }}>
                                    <i class="bi bi-collection"style={{ fontSize: "30px" }}></i>
                                    </label>
                                </span>
                                <h4 style={{ color: "white" }}>Amplia selección</h4>
                            </th>
                            <td>
                                <p style={{ color: "white" }}>
                                    Haz tu reserva con nosotros y te brindamos la posibilidad de elegir el vehículo que mejor se adapte a tus necesidades y preferencias. Puedes encontrar desde autos compactos hasta camionetas o vehículos de lujo.
                                </p>
                            </td>
                        </tr>

                        <tr className="d-flex flex-column">
                            <th className="d-flex flex-column align-items-center">
                                < span className="rc-benefits--base-icon d-flex justify-content-center align-items-center">
                                    <label className="form-label" style={{ color: "white" }}>
                                    <i class="bi bi-card-checklist" style={{ fontSize: "30px" }}></i>
                                    </label>
                                </span>
                                <h4 style={{ color: "white" }}>Servicios adicionales</h4>
                            </th>
                            <td>
                                <p style={{ color: "white" }}>
                                    Te Ofrecemos servicios adicionales que otras compañías no, como asistencia en carretera, GPS integrado, sillas para niños, conductor adicional, entre otros. Estos servicios pueden hacer tu viaje más seguro, cómodo y adaptado a tus necesidades específicas.
                                </p>
                            </td>
                        </tr>

                        <tr className="d-flex flex-column">
                            <th className="d-flex flex-column align-items-center">
                                <span className="rc-benefits--base-icon d-flex justify-content-center align-items-center">
                                    <label className="form-label" style={{ color: "white" }}>
                                        <i className="bi bi-car-front-fill" style={{ fontSize: "30px" }}></i>
                                    </label>
                                </span>
                                <h4 style={{ color: "white" }}>Comodidad y privacidad</h4>
                            </th>
                            <td>
                                <p style={{ color: "white" }}>
                                    Con nosotros, puedes disfrutar de mayor comodidad y privacidad durante tus desplazamientos. Además de la rapidez y comodidad del alquiler en Go-Tico Car Rentals, también puedes contar con la asistencia los 7 días de la semana de un equipo de servicio especializado listo para ayudarte cuando lo necesites.</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </div>

        </div>

    );
};

export default IndexUNA;
