import http from "../http-common";

const getAll = () =>{
    return http.get("/Rent");
};

const get = idRent =>{
    return http.get(`/Rent/${idRent}`);
};

const create = data =>{
    return http.post("/Rent",data);
};

const update = (idRent,data) =>{
    return http.put(`/Rent`,data);
};

const remove = idRent => {
    return http.delete(`/Rent/${idRent}`);
};

const RentServices = {
    getAll,
    get,
    create,
    update,
    remove
};

export default RentServices;