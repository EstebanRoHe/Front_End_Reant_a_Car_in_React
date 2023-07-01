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
    return http.get("/Rent", config);
};

const get = idRent =>{
    const config = {
        headers: {
          Authorization: `Bearer ${authToken}`, 
        },
      };
    return http.get(`/Rent/${idRent}`, config);
};

const create = data =>{
    const config = {
        headers: {
          Authorization: `Bearer ${authToken}`, 
        },
      };
    return http.post("/Rent",data, config);
};

const update = (idRent,data) =>{
    const config = {
        headers: {
          Authorization: `Bearer ${authToken}`, 
        },
      };
    return http.put(`/Rent`,data, config);
};

const remove = idRent => {
    const config = {
        headers: {
          Authorization: `Bearer ${authToken}`, 
        },
      };
    return http.delete(`/Rent/${idRent}`, config);
};

const getFiltro = username => {
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`, 
    },
  };
  return http.get(`/Rent/filtro?username=${username}`, config);
};

const getByUsername = username =>{
  const config = {
      headers: {
        Authorization: `Bearer ${authToken}`, 
      },
    };
  return http.get(`/Rent/username/${username}`, config);
};

const RentServices = {
    getAll,
    get,
    create,
    update,
    remove,
    setAuthToken,
    getFiltro,
    getByUsername
};

export default RentServices;