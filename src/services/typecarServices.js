import http from "../http-common";

const getAll = () =>{
    return http.get("/TypeCar");
};

const get = id_typeCar =>{
    return http.get(`/TypeCar/${id_typeCar}`);
};

const create = data =>{
    return http.post("/TypeCar",data);
};

const update = (id_typeCar,data) =>{
    return http.put(`/TypeCar`,data);
};

const remove = id_typeCar => {
    return http.delete(`/TypeCar/${id_typeCar}`);
};

const TypeCarServices = {
    getAll,
    get,
    create,
    update,
    remove
};

export default TypeCarServices;