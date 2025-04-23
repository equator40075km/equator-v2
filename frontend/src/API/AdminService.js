import axios from "axios";
import Service from "./Service";

export default class AdminService extends Service {
    static async getUsers(filters) {
        return await axios.get(
            this.url('/users'),
            {
                params: filters,
                withCredentials: true,
            }
        )
    }

    static async patchUser(userId, data) {
        return await axios.patch(
            this.url(`/users/${userId}`),
            data,
            { withCredentials: true }
        )
    }

    static async addRoleToUser(userId, roleId) {
        return await axios.post(
            this.url(`/users/${userId}/roles/${roleId}`),
            {},
            { withCredentials: true }
        )
    }

    static async deleteRoleFromUser(userId, roleId) {
        return await axios.delete(
            this.url(`/users/${userId}/roles/${roleId}`),
            { withCredentials: true }
        )
    }

    static async createTour(data) {
        return await axios.post(
            this.url('/tours'),
            data,
            { withCredentials: true },
        )
    }

    static async updateTour(tourId, data) {
        return await axios.patch(
            this.url(`/tours/${tourId}`),
            data,
            { withCredentials: true },
        )
    }

    static async addDateToTour(tourId, dateId) {
        return await axios.post(
            this.url(`/tours/${tourId}/dates/${dateId}`),
            {},
            { withCredentials: true }
        )
    }

    static async deleteDateFromTour(tourId, dateId) {
        return await axios.delete(
            this.url(`/tours/${tourId}/dates/${dateId}`),
            { withCredentials: true }
        )
    }

    static async getAllTourRequests(filters, page = 1, pageSize = 10) {
        return await axios.get(
            this.url('/tours/requests/all'),
            {
                params: {
                    page_size: pageSize,
                    page: page,
                    ...filters,
                },
                withCredentials: true,
            }
        )
    }

    static async approveRequest(requestId) {
        return await axios.post(
            this.url(`/tours/requests/${requestId}/approve`),
            {},
            { withCredentials: true },
        )
    }

    static async deleteRequest(requestId) {
        return await axios.delete(
            this.url(`/tours/requests/${requestId}`),
            { withCredentials: true },
        )
    }

    static async createTourDate(start, end) {
        return await axios.post(
            this.url('/tours/dates'),
            { start: start, end: end },
            { withCredentials: true }
        )
    }

    static async deleteTourDate(dateId) {
        return await axios.delete(
            this.url(`/tours/dates/${dateId}`),
            { withCredentials: true }
        )
    }
}