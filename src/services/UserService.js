import { AUTHORIZE_API_PATHS } from "@/constants/api-paths"
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL

class UserService {
    static userCreate(data) {
        return axios.post(`${apiUrl}${AUTHORIZE_API_PATHS.USER}`, data)
    }

}

export default UserService;