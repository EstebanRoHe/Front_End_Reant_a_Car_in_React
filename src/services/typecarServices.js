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
    return http.get("/TypeCar", config);
};

const get = id_typeCar =>{
    const config = {
        headers: {
          Authorization: `Bearer ${authToken}`, 
        },
      };
    return http.get(`/TypeCar/${id_typeCar}`, config);
};

const create = data => {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`, 
      },
    };
    return http.post("/TypeCar", data, config); 
  };

const update = (id_typeCar,data) =>{
    const config = {
        headers: {
          Authorization: `Bearer ${authToken}`, 
        },
      };
    return http.put(`/TypeCar`,data, config);
};

const remove = id_typeCar => {
    const config = {
        headers: {
          Authorization: `Bearer ${authToken}`, 
        },
      };
    return http.delete(`/TypeCar/${id_typeCar}`, config);
};

const TypeCarServices = {
    getAll,
    get,
    create,
    update,
    remove,
    setAuthToken,
};

export default TypeCarServices;