import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './ContactoFooter.css';
import Swal from "sweetalert2";
import contactServices from "../services/contactServices";

import ModalLoadingContacto from "./ModalLoadingContacto";
const ContactoFooter = () => {
  
  const initialEmailState = {
    toUser: [],
    subjet: "Contacto e Información de Go-Tico Car Rentals",
    message: "",
  }

  const [email, setEmail] = useState(initialEmailState);
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "toUser") {
      setEmail({ ...email, [name]: [value, "rentacarspringboot@gmail.com"] });
    } else {
      setEmail({ ...email, [name]: value });
    }
  };

  const createEmail = () => {
    console.log("enviando... ");
    showModalHandler();
    var date = { toUser: email.toUser, subjet: email.subjet, message: email.message }
    contactServices.create(date)
      .then(response => {
        setEmail({ toUser: response.data.toUser, subjet: response.data.subjet, message: response.data.message });
        console.log(response.data);
        closeModalHandler();
        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: 'Email enviado Correctamente',
          showConfirmButton: false,
          timer: 2000
        }).then(
          newEmail()
        );
      })
      .catch(e => {
        console.log(e);
        closeModalHandler();
        //newEmail();
      })
  };

  const newEmail = () => {
    setEmail({ ...initialEmailState, toUser: [] });
  };

  const showModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  return (

    <div className="contactoFooter">

      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="aboutFooter">

              <h3>ABOUT US</h3>
              <hr className="linea" />
              <p>
                Somos una empresa de alquiler de autos dedicada a brindar un servicio confiable y de calidad. Nos
                especializamos en ofrecer soluciones de movilidad a nuestros clientes ya sea que necesiten un vehiculo
                para un viaje de negocios, unas vacaciones en familia o simplemente para desplazarse por la ciudad.
              </p>
              <div className="social-icons">
                <a href="https://www.facebook.com/kayak/" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-facebook" style={{ fontSize: "30px", color: "#1877F2", marginRight: "3%" }}></i>
                </a>
                <a href="https://twitter.com/KAYAK" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-twitter" style={{ fontSize: "30px", color: "#1D9BF0", marginRight: "3%" }}></i>
                </a>
                <a href="https://www.instagram.com/kayak/" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-instagram" style={{ fontSize: "30px", color: "#C13584", marginRight: "3%" }}></i>
                </a>
                <a href="https://www.youtube.com/channel/UCs36_o9B5NadGYfiHwT-ekQ" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-youtube" style={{ fontSize: "30px", color: "#FF0000", marginRight: "3%" }}></i>
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="adressFooter">
              <h3>ADDRESS</h3>
              <hr className="linea" />
              <p>
                <i className="bi bi-geo-alt-fill"></i> Alajuela, Costa Rica.
              </p>
              <p>
                <i className="bi bi-telephone-fill"></i> (+506) 8080 80 80
              </p>
              <p>
                <i className="bi bi-envelope-at-fill"></i> rentacarspringboot@gmail.com
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-12">
            <div className="menssageFooter">
              <h3>CONTACT US</h3>
              <hr className="linea" />
              <form onSubmit={e => {
                e.preventDefault();
                createEmail();
              }}>
                <div className="mb-3">
                  <label htmlFor="FormControlInput1" className="form-label">
                    Email
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    id="toUser"
                    name="toUser"
                    placeholder="ejemplo@gmail.com"
                    value={email.toUser && email.toUser[0] ? email.toUser[0] : ""}
                    onChange={handleInputChange}
                    required
                  />

                </div>

                <div className="mb-3">
                  <label htmlFor="FormControlMenssage" className="form-label">
                    Message
                  </label>
                  <textarea className="form-control" rows="3"
                    id="message"
                    name="message"
                    value={email.message}
                    onChange={handleInputChange}
                    required
                  >

                  </textarea>
                </div>
                <div className="d-flex flex-wrap">

                  <button className="btn btn-info my-3  mx-2 "
                    type="submit"
                    style={{ color: 'white', fontFamily: 'Arial, sans-serif' }}>
                    <i className="bi bi-send-plus"> </i>
                    Enviar
                  </button>



                  <span style={{ marginRight: '10px' }}></span>
                </div>
              </form>

              {showModal && (
                            <ModalLoadingContacto />
                        )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactoFooter;
