import axios from "axios";
import Service from "./Service";

export default class TourService extends Service {
    static async getTours(active = null, limit = null) {
        return await axios.get(
            this.url('/tours'),
            { params: { active: active, limit: limit } }
        )
    }

    static async getTourDates() {
        return await axios.get(
            this.url('/tours/dates'),
            { withCredentials: true },
        )
    }

    static async getTourRequests() {
        return await axios.get(
            this.url('/tours/requests'),
            { withCredentials: true },
        )
    }

    static async createTourRequest(tourId, dateId, contact) {
        return await axios.post(
            this.url('/tours/requests'),
            {
                tour_id: Number(tourId),
                date_id: Number(dateId),
                contact: contact,
            },
            { withCredentials: true },
        )
    }
}