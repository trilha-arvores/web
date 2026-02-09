import axios from "axios";
import { getBaseURL } from "../config/api.config";

export default axios.create({
    baseURL: getBaseURL()
});