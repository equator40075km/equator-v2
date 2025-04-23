import axios from "axios"
import Service from "./Service"

export default class ArticleService extends Service {
    static async getArticles(page = 1, pageSize = 10) {
        return await axios.get(
            this.url('/articles'),
            {
                params: {
                    page_size: pageSize,
                    page: page,
                },
            }
        )
    }

    static async createArticle(data) {
        return await axios.post(
            this.url('/articles'),
            data,
            { withCredentials: true },
        )
    }

    static async getById(id) {
        return await axios.get(this.url(`/articles/${id}`))
    }

    static async getBestArticles(limit) {
        return await axios.get(
            this.url(`/articles/best`),
            { params: { limit: limit } }
        )
    }

    static async getUnapprovedArticles() {
        return await axios.get(
            this.url(`/articles/unapproved`),
            { withCredentials: true }
        )
    }

    static async likeArticle(articleId) {
        return await axios.post(
            this.url(`/articles/${articleId}/like`),
            {},
            { withCredentials: true }
        )
    }

    static async unlikeArticle(articleId) {
        return await axios.delete(
            this.url(`/articles/${articleId}/like`),
            { withCredentials: true }
        )
    }
    static async approveArticle(articleId) {
        return await axios.patch(
            this.url(`/articles/${articleId}/approve`),
            {},
            { withCredentials: true }
        )
    }
}
