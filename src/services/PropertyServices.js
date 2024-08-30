import axios from "axios"
import { AUTHORIZE_API_PATHS } from "@/constants/api-paths"

const apiUrl = import.meta.env.VITE_API_URL

class PropertyServices {
    static addProperty(data) {
        return axios.post(`${apiUrl}${AUTHORIZE_API_PATHS.PROPERTY}`, data)
    }
}

export default PropertyServices;