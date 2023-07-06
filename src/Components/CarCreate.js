import React, { useState, useEffect } from "react";
import carServices from "../services/carServices";
import typeCarServices from "../services/typecarServices";
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import AuthServices from '../services/authServices';
import ModalLoadingContacto from "./ModalLoadingContacto";
 
const CarCreate = () => {

  const initialCarState = {
    licencePlate: "",
    description: "",
    imagen: "",
    cylinder_capacity: "",
    capacity: "",
    model_year: "",
    typeCar: "",
  };

  const [Car, setCar] = useState(initialCarState);
  const [TypeCar, setTypeCar] = useState([]);
  const [Type, setType] = useState(null);
  const [errors, setErrors] = useState({});
  const [errorType, setErrorType] = useState({});
  const [CarArray, setCarArray] = useState([]);
  const [Validat, setValidat] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCar({ ...Car, [name]: value });
  }

  const handleInputblur = event => {
    handleInputChange(event);
    setErrors(validationError(Car));
  }

  const handleInputType = event => {
    handleInputChange(event);
    setErrorType(validationTypeCar(Car));
  }

  const handleImageChange = (files) => {
    if (files.length > 0) {
      const file = files[0];
      setCar({ ...Car, imagen: file });
    }
  };

  const showModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  useEffect(() => {
    getList();
    getCar();
    if (Validat)
      newCar()
  }, [Validat]);

  const getList = () => {
    const token = AuthServices.getAuthToken();
    if (token) {
      typeCarServices.setAuthToken(token);
      console.log('Token :', token);
    } else {
      console.error("No se encontró un token válido");
      return;
    }
    typeCarServices.getAll()
      .then(response => {
        setTypeCar(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });

  };

  const getCar = () => {
    const token = AuthServices.getAuthToken();
    if (token) {
      carServices.setAuthToken(token);
      console.log('Token :', token);
    } else {
      console.error("No se encontró un token válido");
      return;
    }
    carServices.getAll()
      .then(response => {
        setCarArray(response.data);
        console(response.data);
      }).catch(e => {
        console.log(e);
      })
  }

  const createCar = (e) => {
    e.preventDefault();
    showModalHandler();
    const token = AuthServices.getAuthToken();
    if (token) {
      carServices.setAuthToken(token);
    } else {
      console.error("No se encontró un token válido");
      closeModalHandler();
      return;
    }
    setErrors(validationError(Car));
    setErrorType(validationTypeCar(Car));
    if (Object.keys(errors).length === 0 && Object.keys(errorType).length === 0) {
      carServices.create(Car.licencePlate, Car.description, Car.cylinder_capacity, Car.capacity, Car.model_year, Car.imagen, Type.id_typeCar)
        .then(response => {
          setCar({
            licencePlate: response.data.licencePlate, description: response.data.description,
            image: response.data.image, cylinder_capacity: response.data.cylinder_capacity,
            capacity: response.data.capacity, model_year: response.data.model_year, typeCar: response.data.Type
          });
          setValidat(true);
          console.log(response.data);
          closeModalHandler();
          Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Vehículo Registrado Correctamente',
            showConfirmButton: false,
            timer: 2200
          })
        })
        .catch(e => {
          console.log(e);
          closeModalHandler();
        })
    }
  }

  const newCar = () => {
    setCar(initialCarState);
    setTypeCar([]);
    setValidat(false);
  }

  const validationError = (Car) => {
    let errors = {}

    CarArray.forEach(car => {
      if (car.licencePlate === Car.licencePlate) {
        errors.licencePlate = "Este numero de placa ya existe";
      }
    })

    return errors;
  }

  const validationTypeCar = (Car) => {
    let errors = {}
    if (Car.typeCar === "") {
      errors.typeCar = "Seleccione un tipo de vehículo";
    }
    return errors;
  }



  return (
    <div className="container ">
      <div className="submit-form">
        <div className="card  ">


          <div className="card-body ">
            <h4>Registrar Vehículo</h4>
            <blockquote className="blockquote mb-0 ">

              <form onSubmit={createCar}
                className="row g-3 needs-validation my-3  border = 1" >

                <div className="col-md-3 position-relative">
                  <label for="licencePlate" className="form-label ">Placa</label>
                  <div className="input-group has-validation">
                    <span className="input-group-text">
                      <i className="bi bi-pencil-square"></i>
                    </span>
                    <input type="text" className={((errors.licencePlate) ? "is-invalid" : "") + " form-control"}
                      id="licencePlate"
                      value={Car.licencePlate}
                      placeholder="ABC - 1265"
                      onBlur={handleInputblur}
                      onKeyUp={handleInputblur}
                      onChange={handleInputChange}
                      name="licencePlate" required />
                    <small className="invalid-feedback" id="helpId" >
                      <i className="bi bi-exclamation-circle"> {errors.licencePlate}</i>
                    </small>

                  </div>
                </div>

                <div className="col-md-3 position-relative">
                  <label for="description" className="form-label ">Marca</label>
                  <div className="input-group has-validation">
                    <span className="input-group-text">
                      <i className="bi bi-pencil-square"></i>
                    </span>
                    <input type="text" className="form-control" id="description"
                      value={Car.description}
                      placeholder="Toyota, Porsche, etc..,"
                      onChange={handleInputChange}
                      name="description" required />

                  </div>
                </div>

                <div className="col-md-3 position-relative">
                  <label htmlFor="image" className="form-label">
                    Imagen
                  </label>
                  <div className="input-group has-validation">
                    <input
                      className="form-control"
                      type="file"
                      id="image"
                      onChange={(event) => handleImageChange(event.target.files)}
                      name="imagen"
                      multiple
                    />

                  </div>
                </div>

                <div className="col-md-3 position-relative">
                  <label for="cylinder_capacity" className="form-label">Cilindraje</label>
                  <div className="input-group has-validation">
                    <span className="input-group-text">
                      <i className="bi bi-gear-wide-connected"></i>
                    </span>
                    <input type="text" className="form-control" id="cylinder_capacity"
                      value={Car.cylinder_capacity}
                      placeholder="166 CV (124kW) 2694 cm 3. 2.8d"
                      onChange={handleInputChange}
                      name="cylinder_capacity"
                      required />

                  </div>

                </div>

                <div className="col-md-3 position-relative">
                  <label for="capacity" className="form-label">Capacidad</label>
                  <div className="input-group has-validation">
                    <span className="input-group-text">
                      <i className="bi bi-car-front"></i>
                    </span>
                    <input type="text" className="form-control" id="capacity"
                      value={Car.capacity}
                      placeholder="2, 4, 5, 7, etc..."
                      onChange={handleInputChange}
                      name="capacity"
                      required />

                  </div>
                </div>

                <div className="col-md-3 position-relative">
                  <label for="model_year" className="form-label">Modelo</label>
                  <div className="input-group has-validation">
                    <span className="input-group-text">
                      <i className="bi bi-calendar-date"></i>
                    </span>
                    <input type="text" className="form-control" id="model_year"
                      value={Car.model_year}
                      placeholder="Año 2020, 2022, 2018,etc..."
                      onChange={handleInputChange}
                      name="model_year"
                      required />

                  </div>
                </div>

                <div className="form-group">
                  <label for="typeCar" className="form-label">
                    <i className="bi bi-car-front-fill"> </i>Tipo de Vehículo</label>
                  <div className="form-group">

                    <select className={((errorType.typeCar) ? "is-invalid" : "") + " form-select"}
                      name="typeCar" id="typeCar"
                      onClick={handleInputType}
                      onBlur={handleInputType}
                      onMouseDown={handleInputType}
                      onMouseUp={handleInputType}
                      onChange={e => {
                        console.log(JSON.parse(e.target.value))
                        setType(JSON.parse(e.target.value))
                      }
                      }
                      style={{ width: '24%' }}
                      required>

                      <option selected required>Seleccioné un Tipo de Vehículo</option>
                      {TypeCar && TypeCar.map(
                        (typeCar) => (
                          <option required key={typeCar.id_typeCar} value={JSON.stringify(typeCar)}>{typeCar.description}</option>
                        ))}
                    </select>
                    <small className="invalid-feedback" id="helpId" >
                      <i className="bi bi-exclamation-circle"> {errorType.typeCar}</i>
                    </small>
                  </div>
                </div>

                <div className="col-12">
                  <button className="btn btn-success my-3  mx-2 " type="submit">
                    <i className="bi bi-person-plus"> Registrar</i>
                  </button>
                  <Link className="btn btn-danger" to={"/CarList"}>
                    <i className="bi bi-x-circle"> Cancelar</i>
                  </Link>
                </div>

              </form>

              {showModal && (
                <ModalLoadingContacto />
              )}
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCreate;

