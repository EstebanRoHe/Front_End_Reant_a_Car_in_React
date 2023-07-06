import http from "../http-common";
const create = data =>{
    return http.post(`/Email/sendMessage`,data);
};
const contactServices = {
    create,
};

export default contactServices;