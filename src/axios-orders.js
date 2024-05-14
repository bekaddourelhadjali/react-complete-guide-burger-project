import axios from "axios";

const instance  = axios.create({
    baseURL : "https://react-course-burger-dad01-default-rtdb.europe-west1.firebasedatabase.app/"
});

export default instance;