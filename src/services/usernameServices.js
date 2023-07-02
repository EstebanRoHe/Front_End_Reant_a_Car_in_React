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

const getAllUsername = ()=>{
  const config = {
      headers: {
        Authorization: `Bearer ${authToken}`, 
      },
    };
  return http.get("/User/username", config)
}

const getAllEmail = ()=>{
  const config = {
      headers: {
        Authorization: `Bearer ${authToken}`, 
      },
    };
  return http.get("/User/email", config)
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

const getFiltro = name => {
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`, 
    },
  };
  return http.get(`/User/name?name=${name}`, config);
};

const getByUsername = username =>{
  const config = {
      headers: {
        Authorization: `Bearer ${authToken}`, 
      },
    };
  return http.get(`/User/buscar/${username}`, config);
};

const updatePassword = (data) => {

  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };
  return http.put(`/User/updatePassword`, data, config);
};
 
const UserServices = {
    getAll,
    get,
    create,
    update,
    remove,
    setAuthToken,
    getFiltro,
    getAllUsername,
    getAllEmail,
    getByUsername,
    updatePassword

};
export default UserServices;
