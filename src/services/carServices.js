import http from "../http-common";

let authToken = null;

const setAuthToken = (token) => {
  authToken = token;
};
const getAll = () => {
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };
  return http.get("/Car", config);
};

const get = idCar => {
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };
  return http.get(`/Car/${idCar}`, config);
};



const create = (licencePlate, description, cylinder_capacity, capacity, model_year,imagen, price, typeCar) => {
  const formData = new FormData();

  formData.append("licencePlate", licencePlate);
  formData.append("description", description);
  formData.append("cylinder_capacity", cylinder_capacity);
  formData.append("capacity", capacity);
  formData.append("model_year", model_year);
  formData.append("imagen", imagen); 
  formData.append("price", price); 
  formData.append("typeCar", typeCar);

  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "multipart/form-data", 
    },
  };

 return http.post(`/Car`, formData, config);
};


const update = (idCar, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };
  return http.put(`/Car`, data, config);
};

const remove = idCar => {
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };
  return http.delete(`/Car/${idCar}`, config);
};

const getFiltro = licencePlate => {
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };
  return http.get(`/Car/filtro?licencePlate=${licencePlate}`, config);
};

const getFiltroDescription = description => {
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  return http.get(`/Car/filtrodescription?description=${description}`, config);
};
const CarServices = {
  getAll,
  get,
  create,
  update,
  remove,
  setAuthToken,
  getFiltro,
  getFiltroDescription
};

export default CarServices;