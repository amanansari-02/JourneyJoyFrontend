import axios from "axios"
import { AUTHORIZE_API_PATHS } from "@/constants/api-paths"

const apiUrl = import.meta.env.VITE_API_URL

class BookingServices {
    static addBooking(data, token) {
        return axios.post(`${apiUrl}${AUTHORIZE_API_PATHS.BOOKING}`, data,
            { headers: { 'Authorization': `Bearer ${token}` } }
        )
    }

    static getBookingByPropertyId(propertyId, token) {
        return axios.get(`${apiUrl}${AUTHORIZE_API_PATHS.BOOKING_BY_PROPERTY_ID}/${propertyId}`,
            { headers: { 'Authorization': `Bearer ${token}` } }
        )
    }

    static getBookingByUserId(userId, token) {
        return axios.get(`${apiUrl}${AUTHORIZE_API_PATHS.BOOKING_BY_USER_ID}/${userId}`,
            { headers: { 'Authorization': `Bearer ${token}` } }
        )
    }

    static getAllBooking(token) {
        return axios.get(`${apiUrl}${AUTHORIZE_API_PATHS.ALL_BOOKING}`,
            { headers: { 'Authorization': `Bearer ${token}` } }
        )
    }

}

export default BookingServices;