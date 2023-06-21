import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';

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
import AuthServices from './services/authServices';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const handleLogout = () => {
    AuthServices.removeAuthToken();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const token = AuthServices.getAuthToken();
    const userRole = AuthServices.getRole();
    setRole(userRole);
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const userRole = AuthServices.getRole();
      setRole(userRole);
    }
  }, [isLoggedIn]);

  return (

    <div className="app-container">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a href="/IndexUNA" className="navbar-brand mx-2"> UNA</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to={"/IndexRent"} className="nav-item nav-link active">Ver Vehiculos</Link>
              </li>

              {isLoggedIn && role === 'ROLE_ADMIN' && (
                <><>
                  <li className="nav-item">
                    <Link to={"/UserList"} className="nav-item nav-link active">Usuarios</Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/TypeCarList"} className="nav-item nav-link active">Tipo de Vehículos</Link>
                  </li></>
                  <li className="nav-item">
                    <Link to={"/CarList"} className="nav-item nav-link active">Vehículos</Link>
                  </li></>
              )}

              <li className="nav-item">
                <Link to={"/RentList"} className="nav-item nav-link active">Rentar</Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">

                {isLoggedIn ? (
                  <Link to={"/"} className="nav-item nav-link active" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right"></i> Cerrar sesión
                  </Link>
                ) : (
                  <Link to={"/Login"} className="nav-item nav-link active">
                    <i className="bi bi-person-fill"></i> Login
                  </Link>
                )}

              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-3 ">
        <Routes>
          <Route path="/" element={<IndexUNA />} />
          <Route path="/UserCreate" element={<UserCreate />} />

          {isLoggedIn && role === 'ROLE_ADMIN' ? (
            <>
              <Route path="/UserList" element={<UserList />} />
              <Route path="/UserUpdate/:idUser" element={<UserUpdate />} />
              <Route path="/TypeCarList" element={<TypeCarList />} />
              <Route path="/TypeCarCreate" element={<TypeCarCreate />} />
              <Route path="/TypeCarUpDate/:id_typeCar" element={<TypeCarUpDate />} />
              <Route path="/CarList" element={<CarList />} />
              <Route path="/CarCreate" element={<CarCreate />} />
              <Route path="/CarUpdate/:idCar" element={<CarUpdate />} />
            </>
          ) : (
            <>
              <Route path="/UserList" element={<Navigate to="/Login" />} />
              <Route path="/UserUpdate/:idUser" element={<Navigate to="/Login" />} />
              <Route path="/TypeCarList" element={<Navigate to="/Login" />} />
              <Route path="/TypeCarCreate" element={<Navigate to="/Login" />} />
              <Route path="/TypeCarUpDate/:id_typeCar" element={<Navigate to="/Login" />} />
              <Route path="/CarList" element={<Navigate to="/Login" />} />
              <Route path="/CarCreate" element={<Navigate to="/Login" />} />
              <Route path="/CarUpdate/:idCar" element={<Navigate to="/Login" />} />

            </>
          )}

          {isLoggedIn && role === 'ROLE_ADMIN' || role === 'ROLE_USER' ? (
            <>
              <Route path="/RentList" element={<RentList />} />
              <Route path="/RentCreate" element={<RentCreate />} />
              <Route path="/RentUpdate/:idRent" element={<RentUpdate />} />
            </>
          ) : (
            <>
              <Route path="/RentList" element={<Navigate to="/Login" />} />
              <Route path="/RentCreate" lement={<Navigate to="/Login" />} />
              <Route path="/RentUpdate" element={<Navigate to="/Login" />} />
            </>
          )}

          <Route path="/IndexRent" element={<IndexRent />} />
          <Route path="/IndexUNA" element={<IndexUNA />} />
          <Route path="/Login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

        </Routes>
        
      </div>
      <Footer />
    </div>
    );
};

export default App;




