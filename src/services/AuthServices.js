import { AUTHORIZE_API_PATHS } from "@/constants/api-paths"
import axios from "axios"

const apiUrl = import.meta.env.VITE_API_URL

class AuthServices {
    static userLogin(data) {
        return axios.post(`${apiUrl}${AUTHORIZE_API_PATHS.LOGIN}`, data)
    }

    static contactUsForm(data) {
        return axios.post(`${apiUrl}${AUTHORIZE_API_PATHS.CONTACT_US}`, data)
    }
}


export default AuthServices