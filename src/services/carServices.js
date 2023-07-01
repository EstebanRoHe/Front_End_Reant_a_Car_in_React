import http from "../http-common";
let authToken = null;

const setAuthToken = (token) => {
  authToken = token;
};
const getAll = () =>{
    const config = {
        headers: {
          Authorization: `Bearer ${authToken}`, 
        },
      };
    return http.get("/Car", config);
};

const get = idCar =>{
    const config = {
        headers: {
          Authorization: `Bearer ${authToken}`, 
        },
      };
    return http.get(`/Car/${idCar}`, config);
};

const create = data =>{
    const config = {
        headers: {
          Authorization: `Bearer ${authToken}`, 
        },
      };
    return http.post("/Car",data, config);
};

const update = (idCar,data) =>{
    const config = {
        headers: {
          Authorization: `Bearer ${authToken}`, 
        },
      };
    return http.put(`/Car`,data, config);
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