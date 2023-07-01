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
    return http.get("/Log", config);
};

const getFiltroUsername = username => {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`, 
      },
    };
  
    return http.get(`/Log/filtrousername?username=${username}`, config);
  };

  
const getFiltroMetodo = metodo => {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`, 
      },
    };
  
    return http.get(`/Log/filtrometodo?metodo=${metodo}`, config);
  };

const logServices = {
    setAuthToken,
    getAll,
    getFiltroUsername,
    getFiltroMetodo,

};

export default logServices;