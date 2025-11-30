import axios from "axios";
import {BACKEND_API_URL} from '../config';

export default axios.create({
    baseURL: `${BACKEND_API_URL}/api/`,
});