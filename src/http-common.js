import axios from "axios";

export default axios.create({
baseURL:"https://back-end-rent-a-car-in-spring-boot.onrender.com/",
headers: {
"Content-type": "application/json"
}
});



