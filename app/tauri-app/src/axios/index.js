import { BACKEND_URL } from "@/common/constants/commonConstants";
import axios from "axios";

const api = axios.create({
    baseURL: BACKEND_URL
});

export { api };
