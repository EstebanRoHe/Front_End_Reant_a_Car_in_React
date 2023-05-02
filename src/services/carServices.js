import http from "../http-common";

const getAll = () =>{
    return http.get("/Car");
};

const get = id_car =>{
    return http.get(`/Car/${id_car}`);
};

const create = data =>{
    return http.post("/Car",data);
};

const update = (id_car,data) =>{
    return http.put(`/Car`,data);
};

const remove = id_car => {
    return http.delete(`/Car/${id_car}`);
};

const CarServices = {
    getAll,
    get,
    create,
    update,
    remove
};

export default CarServices;