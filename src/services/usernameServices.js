import http from "../http-common";
let authToken = null;

const setAuthToken = (token) => {
  authToken = token;
};
const getAll = ()=>{
    const config = {
        headers: {
          Authorization: `Bearer ${authToken}`, 
        },
      };
    return http.get("/User", config)
}

const get = idUser =>{
    const config = {
        headers: {
          Authorization: `Bearer ${authToken}`, 
        },
      };
    return http.get(`/User/${idUser}`, config);
};

const create = data => {
    const config = {
        headers: {
          Authorization: `Bearer ${authToken}`, 
        },
      };
    return http.post("/User",data, config);
};

const update =(idUser, data)=>{
    const config = {
        headers: {
          Authorization: `Bearer ${authToken}`, 
        },
      };
    return http.put(`/User`,data, config);
};

const remove = idUser => {
    const config = {
        headers: {
          Authorization: `Bearer ${authToken}`, 
        },
      };
    return http.delete(`/User/${idUser}`, config);
};

const UserServices = {
    getAll,
    get,
    create,
    update,
    remove,
    setAuthToken,
};
export default UserServices;
