import http from "../http-common";
let authToken = null;

const setAuthToken = (token) => {
  authToken = token;
};


const create = data =>{
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`, 
    },
  };
    return http.post("/Email/sendMessage",data,config);
};


const contactServices = {
    setAuthToken,
    create,

};

export default contactServices;