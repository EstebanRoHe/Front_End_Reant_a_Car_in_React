
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Offcanvas from 'react-bootstrap/Offcanvas';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import UserList from './Components/UserList';
import UserCreate from './Components/UserCreate';
import UserUpdate from './Components/UserUpdate';
import TypeCarList from './Components/TypeCarList';
import TypeCarCreate from './Components/TypeCarCreate';
import TypeCarUpDate from './Components/TypeCarUpdate';
import CarList from './Components/CarList';
import CarCreate from './Components/CarCreate';
import CarUpdate from './Components/CarUpdate';
import RentList from './Components/RentList';
import RentCreate from './Components/RentCreate';
import RentUpdate from './Components/RentUpdate';
import IndexRent from './Components/IndexRent';
import IndexUNA from './Components/IndexUNA';
import Footer from './Components/Footer';
import Login from './Components/Login';
import LogList from './Components/LogList';
import AuthServices from './services/authServices';
import userServices from "./services/usernameServices";
import ModalListRent from './Components/ModalListRent';
import PasswordUpdate from './Components/PasswordUpdate';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [user, setUser] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleOffcanvasClose = () => {
    setShowOffcanvas(false);
  };

  const handleShowcanvas = () => {
    setShowOffcanvas(true);
  };

  const handleLogout = () => {
    AuthServices.removeAuthToken();
    setIsLoggedIn(false);
    setRole("");
    setUsername("");
    handleOffcanvasClose();
  };


  useEffect(() => {
    const token = AuthServices.getAuthToken();
    const userRole = AuthServices.getRole();
    const userToken = AuthServices.getUsername();
    setUsername(userToken);
    setRole(userRole);
    setIsLoggedIn(!!token);
    if (userToken != null)
      getByUsername(userToken);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const userRole = AuthServices.getRole();
      setRole(userRole);
      const userToken = AuthServices.getUsername();
      setUsername(userToken);
      getByUsername(userToken);
    }
  }, [isLoggedIn]);

  const getByUsername = (username) => {
    const token = AuthServices.getAuthToken();
    if (token) {
      userServices.setAuthToken(token);
    } else {
      return;
    }
    userServices.getByUsername(username)
      .then(response => {
        setUser(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const showModalHandler = () => {
    setShowModal(true);
  };


  const closeModalHandler = () => {
    setShowModal(false);
  };



  return (

    <div className="app-container">

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a href="/IndexUNA" className="navbar-brand mx-2" onClick={handleOffcanvasClose}> UNA</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to={"/IndexRent"} className="nav-item nav-link active" onClick={handleOffcanvasClose}>Vehículos</Link>
              </li>

              {isLoggedIn && role === 'ROLE_ADMIN' && (
                <>
                  <li className="nav-item">
                    <Link to={"/UserList"} className="nav-item nav-link active" onClick={handleOffcanvasClose}>Usuarios</Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/TypeCarList"} className="nav-item nav-link active" onClick={handleOffcanvasClose}>Tipo de Vehículos</Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/CarList"} className="nav-item nav-link active" onClick={handleOffcanvasClose}>Vehículos admin</Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/RentList"} className="nav-item nav-link active" onClick={handleOffcanvasClose}>Rentar</Link>
                  </li>
                </>
              )}

              {isLoggedIn && role === 'ROLE_USER' && (
                <li className="nav-item">
                  <Link to={"/RentCreate/" + null} className="nav-item nav-link active" onClick={handleOffcanvasClose}>Rentar</Link>
                </li>
              )}

              {!isLoggedIn && (
                <li className="nav-item">
                  <Link to={"/Login"} className="nav-item nav-link active" onClick={handleOffcanvasClose}>Rentar</Link>
                </li>
              )}

              {isLoggedIn && role === 'ROLE_ADMIN' && (
                <li className="nav-item">
                  <Link to={"/LogList"} className="nav-item nav-link active" onClick={handleOffcanvasClose}>Logs</Link>
                </li>
              )}
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                {isLoggedIn ? (
                  <>
                    <li className="nav-item dropdown" >
                   {/* eslint-disable-next-line */}
                      <a href="#" className="nav-link dropdown-toggle" role="button" aria-expanded="false"
                        onClick={handleShowcanvas}
                      >
                        <i className="bi bi-person-circle" > </i>
                        {username}
                      </a>
                      <Offcanvas placement="end"
                        show={showOffcanvas}
                        onHide={handleOffcanvasClose}
                        backdrop={false}
                      >
                        <Offcanvas.Header closeButton style={{ backgroundColor: "#212529", color: 'white' }}>
                          <Offcanvas.Title style={{ color: "#8C939A" }}>
                            <i className="bi bi-person-circle">
                            </i> {username}
                          </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body style={{ backgroundColor: '#23272F', color: 'white' }}>

                          <ul className="navbar-nav">

                            <li className="nav-item" style={{ color: "#8C939A" }}>
                              <i className="bi bi-person"> </i>
                              {user.name} {user.lastName}
                            </li>
                            <li className="nav-item" style={{ color: "#8C939A" }}>
                              <i className="bi bi-envelope-at"> </i>
                              {user.email}
                            </li>

                            <li className="nav-item">
                              <Link to={"/UserUpdate/" + user.idUser} className="nav-item nav-link active" 
                                onClick={handleOffcanvasClose}>
                                <i className="bi bi-eye"> </i>Ver Perfil
                              </Link>
                            </li>

                            <li className="nav-item">
                              <Link className="nav-link" onClick={()=>{
                                showModalHandler();
                                handleOffcanvasClose();
                              }}
                                >
                                <i className="bi bi-car-front"></i> vehículo Alquilados
                              </Link>
                            </li>


                            <li className="nav-item">
                              <br />
                            </li>

                            <li className="nav-item">
                              <Link to={"/PasswordUpdate/" + user.idUser} className="nav-item nav-link active" 
                               onClick={handleOffcanvasClose}
                              style={{ color: "#BB2D3B" }}>
                                <i className="bi bi-key"> </i>
                                Cambiar contraseña
                              </Link>
                            </li>

                            <li className="nav-item">
                              <hr className="dropdown-divider" />
                            </li>

                            <li className="nav-item">
                              <Link to={"/"} className="nav-link" onClick={handleLogout}>
                                <i className="bi bi-box-arrow-right"></i> Cerrar sesión
                              </Link>
                            </li>
                          </ul>
                        </Offcanvas.Body>
                      </Offcanvas>
                    </li>
                  </>
                ) : (
                  <Link to={"/Login"} className="nav-item nav-link active" onClick={handleOffcanvasClose}>
                    <i className="bi bi-person-fill"></i> Login
                  </Link>
                )}

              </li>
            </ul>

          </div>
        </div>
      </nav>


      <div className="principal">
        <Routes>
          <Route path="/" element={<IndexUNA />} />
          <Route path="/UserCreate" element={<UserCreate />} />

          {isLoggedIn && role === 'ROLE_ADMIN' ? (
            <>
              <Route path="/UserList" element={<UserList />} />

              <Route path="/TypeCarList" element={<TypeCarList />} />
              <Route path="/TypeCarCreate" element={<TypeCarCreate />} />
              <Route path="/TypeCarUpDate/:id_typeCar" element={<TypeCarUpDate />} />
              <Route path="/CarList" element={<CarList />} />
              <Route path="/CarCreate" element={<CarCreate />} />
              <Route path="/CarUpdate/:idCar" element={<CarUpdate />} />
              <Route path="/LogList" element={<LogList />} />
            </>
          ) : (
            <>
              <Route path="/UserList" element={<Navigate to="/Login" />} />

              <Route path="/TypeCarList" element={<Navigate to="/Login" />} />
              <Route path="/TypeCarCreate" element={<Navigate to="/Login" />} />
              <Route path="/TypeCarUpDate/:id_typeCar" element={<Navigate to="/Login" />} />
              <Route path="/CarList" element={<Navigate to="/Login" />} />
              <Route path="/CarCreate" element={<Navigate to="/Login" />} />
              <Route path="/CarUpdate/:idCar" element={<Navigate to="/Login" />} />
              <Route path="/LogList" element={<Navigate to="/Login" />} />

            </>
          )}


            {isLoggedIn && (role === 'ROLE_ADMIN' || role === 'ROLE_USER') ? (

            <>
              <Route path="/UserUpdate/:idUser" element={<UserUpdate />} />
              <Route path="/PasswordUpdate/:idUser" element={<PasswordUpdate />} />
              <Route path="/RentList" element={<RentList />} />
              <Route path="/RentCreate/:idCar" element={<RentCreate />} />
              <Route path="/RentUpdate/:idRent" element={<RentUpdate />} />
            </>
          ) : (
            <>
              <Route path="/UserUpdate/:idUser" element={<Navigate to="/Login" />} />
              <Route path="/PasswordUpdate/:idUser" element={<Navigate to="/Login" />} />
              <Route path="/RentList" element={<Navigate to="/Login" />} />
              <Route path="/RentCreate/:idCar" lement={<Navigate to="/Login" />} />
              <Route path="/RentUpdate" element={<Navigate to="/Login" />} />
            </>
          )}

          <Route path="/IndexRent" element={<IndexRent />} />
          <Route path="/IndexUNA" element={<IndexUNA />} />
          <Route path="/Login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

        </Routes>
        {showModal && (
          <ModalListRent
            onClose={closeModalHandler}
          />
        )}

      </div>
      <Footer />
    </div>
  );
};

export default App;


