import http from "../http-common";

const getAll = () =>{
    return http.get("/Car");
};

const get = idCar =>{
    return http.get(`/Car/${idCar}`);
};

const create = data =>{
    return http.post("/Car",data);
};

const update = (idCar,data) =>{
    return http.put(`/Car`,data);
};

const remove = idCar => {
    return http.delete(`/Car/${idCar}`);
};

const CarServices = {
    getAll,
    get,
    create,
    update,
    remove
};

export default CarServices;