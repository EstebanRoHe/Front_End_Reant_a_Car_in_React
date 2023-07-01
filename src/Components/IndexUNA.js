import React, { useState, useEffect } from "react";
import carServices from "../services/carServices";
import logo from '../assets/img/Logo.PNG';
import prado from '../assets/img/prado.jpg';
import hyundai from '../assets/img/hyundai.jpg';
import jimmy from '../assets/img/jimny.jpg';
import './IndexUNA.css';
import { Link} from "react-router-dom";
import ContactoFooter from './ContactoFooter';
const IndexUNA = () => {
 
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

                    <h2 className="h2-style">
                        La mejor opción para alquilar
                        <br />
                        un vehículo es con nosotros

                    </h2>

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

                    <h2 className="rc-section-title">¿Por qué alquilar con nosotros?</h2>
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <div className="benefit-item">
                                    <i class="bi bi-cash-coin incoSize" style={{color : "#82CD54"}}></i>
                                    <h4>El mejor precio</h4>
                                <p className="text-justify">
                                    Constantemente presentamos ofertas especiales y descuentos promocionales. Algunas promociones como descuentos por reserva anticipada, tarifas especiales para periodos prolongados o paquetes.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="benefit-item">
                                <i className="bi bi-collection incoSize" style={{color : "#F07DCB"}}></i>
                                <h4>Amplia selección</h4>
                                <p className="text-justify">
                                    Haz tu reserva con nosotros y te brindamos la posibilidad de elegir el vehículo que mejor se adapte a tus
                                    necesidades y preferencias. Puedes encontrar desde autos compactos hasta camionetas o vehículos de lujo.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="benefit-item">
                                <i className="bi bi-card-checklist incoSize" style={{color: "#DAC2AA"}}></i>
                                <h4>Servicios adicionales</h4>
                                <p className="text-justify">
                                    Te ofrecemos servicios adicionales que otras compañías no, como asistencia en carretera, GPS integrado,
                                    sillas para niños, conductor adicional, entre otros. Estos servicios pueden hacer tu viaje más seguro,
                                    cómodo y adaptado a tus necesidades específicas.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="benefit-item">
                                <i className="bi bi-car-front-fill incoSize" style={{color: "#9FCDEA"}}></i>
                                <h4>Comodidad y privacidad</h4>
                                <p className="text-justify">
                                    Con nosotros, puedes disfrutar de mayor comodidad y privacidad durante tus desplazamientos. Además de la
                                    rapidez y comodidad del alquiler en Go-Tico Car Rentals, también puedes contar con la asistencia los 7 días
                                    de la semana de un equipo de servicio especializado listo para ayudarte cuando lo necesites.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ContactoFooter />
        </div>
        

    )
}

export default IndexUNA;
