import axios from "axios"

export default class Service {
    static baseUrl = process.env.REACT_APP_BACKEND_BASE_URL
    static apiPrefix = '/api/v1'

    static url(endpoint) {
        return `${this.baseUrl}${this.apiPrefix}${endpoint}`
    }

    static async get(endpoint, params) {
        return await axios.get(
            endpoint,
            {
                params: params,
                withCredentials: true,
            }
        )
    }
}
