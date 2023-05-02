import http from "../http-common";

const getAll = () =>{
    return http.get("/Rent");
};

const get = id_rent =>{
    return http.get(`/Rent/${id_rent}`);
};

const create = data =>{
    return http.post("/Rent",data);
};

const update = (id_rent,data) =>{
    return http.put(`/Rent`,data);
};

const remove = id_rent => {
    return http.delete(`/Rent/${id_rent}`);
};

const RentServices = {
    getAll,
    get,
    create,
    update,
    remove
};

export default RentServices;