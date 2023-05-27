import http from "../http-common";

const getAll = ()=>{
    return http.get("/User")
}

const get = idUser =>{
    return http.get(`/User/${idUser}`);
};

const create = data => {
    return http.post("/User",data);
};

const update =(idUser, data)=>{
    return http.put(`/User`,data);
};

const remove = idUser => {
    return http.delete(`/User/${idUser}`);
};

const UserServices = {
    getAll,
    get,
    create,
    update,
    remove
};
export default UserServices;
