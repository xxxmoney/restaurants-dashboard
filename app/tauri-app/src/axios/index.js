import {BACKEND_URL} from "@/common/constants/common.constants.js";
import axios from "axios";

const api = axios.create({
    baseURL: BACKEND_URL
});

export {api};
