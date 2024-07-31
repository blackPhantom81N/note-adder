import axios from "axios";

//The baseURL containing the Backend Port
export default axios.create(
    {
        baseURL: "http://localhost:3002"
    }
)