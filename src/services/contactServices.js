import http from "../http-common";
let authToken = null;

const setAuthToken = (token) => {
  authToken = token;
};


const create = data =>{
  
    return http.post(`/Email/sendMessage`,data);
};


const contactServices = {
    setAuthToken,
    create,

};

export default contactServices;