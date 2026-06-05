import axios from "axios";
import {BACKEND_URL} from "root/shared/constants/common.constants.js";

const api = axios.create({
    baseURL: BACKEND_URL
});

export {api};
