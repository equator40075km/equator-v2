import axios from "axios";
import Service from "./Service";

export default class UserService extends Service {
    static async getRoles() {
        return await axios.get(this.url('/users/roles'))
    }

    static async getMe() {
        return await axios.get(
            this.url('/users/me'),
            { withCredentials: true },
        )
    }

    static async updateUser(data) {
        return await axios.patch(
            this.url('/users/me'),
            data,
            { withCredentials: true }
        )
    }
}
