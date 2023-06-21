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

        <div className="container ">
            <h1 className="title">Go-Tico Car Rentals</h1>
            <div className="containerCarousel ">
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

            <div >
                <h2 className="h2-style">
                    The best vehicle option <br />to rent with us</h2>
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
                    style={{ color: 'white', fontFamily: 'Arial, sans-serif'}}>
                    Regístrese
                </Link>
            </div>


        </div>




    );
};

export default IndexUNA;
