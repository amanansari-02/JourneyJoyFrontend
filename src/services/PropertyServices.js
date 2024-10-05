import axios from "axios"
import { AUTHORIZE_API_PATHS } from "@/constants/api-paths"

const apiUrl = import.meta.env.VITE_API_URL

class PropertyServices {
    static addProperty(data, token) {
        return axios.post(`${apiUrl}${AUTHORIZE_API_PATHS.PROPERTY}`, data,
            { headers: { 'Authorization': `Bearer ${token}` } }
        )
    }

    static getProperty(token) {
        return axios.get(`${apiUrl}${AUTHORIZE_API_PATHS.PROPERTY}`,
            { headers: { 'Authorization': `Bearer ${token}` } }
        )
    }

    static getPropertyById(id, token) {
        return axios.get(`${apiUrl}${AUTHORIZE_API_PATHS.PROPERTY}/${id}`,
            { headers: { 'Authorization': `Bearer ${token}` } }
        )
    }

    static updateProperty(id, data, token) {
        return axios.put(`${apiUrl}${AUTHORIZE_API_PATHS.PROPERTY}/${id}`, data,
            { headers: { 'Authorization': `Bearer ${token}` } }
        )
    }

    static daleteProperty(id, token) {
        return axios.delete(`${apiUrl}${AUTHORIZE_API_PATHS.PROPERTY}/${id}`,
            { headers: { 'Authorization': `Bearer ${token}` } }
        )
    }

    static getLatestProperty(token) {
        return axios.get(`${apiUrl}${AUTHORIZE_API_PATHS.LATEST_PROPERTY}`,
            { headers: { 'Authorization': `Bearer ${token}` } }
        )
    }

    static getPropertyDataBySearch(data, token) {
        return axios.get(`${apiUrl}${AUTHORIZE_API_PATHS.PROPERTY_BY_SEARCH}`,
            {
                params: {
                    location: data.location,
                    price: data.price
                },
                headers: { 'Authorization': `Bearer ${token}` }
            }
        )
    }
}

export default PropertyServices;