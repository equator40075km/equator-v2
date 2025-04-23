import axios from "axios";
import Service from "./Service";

export default class AuthService extends Service {
    static async register(formData) {
        return await axios.post(
            this.url('/auth/register'),
            formData,
        )
    }

    static async token(formData) {
        return await axios.post(
            this.url('/auth/token'),
            formData,
        )
    }

    static async logout() {
        return await axios.post(
            this.url('/auth/logout')
        )
    }

    static async verifyEmail(verifyToken) {
        return await axios.post(
            this.url('/auth/verify-email'),
            {},
            { params: { verify_token: verifyToken } }
        )
    }
}
