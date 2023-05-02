import http from "../http-common";

const getAll = ()=>{
    return http.get("/User")
}

const get = id_username =>{
    return http.get(`/User/${id_username}`);
};

const create = data => {
    return http.post("/User",data);
};

const update =(id_username, data)=>{
    return http.put(`/User`,data);
};

const remove = id_username => {
    return http.delete(`/User/${id_username}`);
};

const UserServices = {
    getAll,
    get,
    create,
    update,
    remove
};
export default UserServices;
