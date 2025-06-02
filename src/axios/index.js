import axios from "axios";

export default axios.create({
    baseURL: "https://bioluxe-express-api.vercel.app/api/",
});