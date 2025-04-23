import { create } from "zustand";
import ArticleService from '../API/ArticleService'

export const useModeratorStore = create((set, get) => ({
    unapprovedArticles: [],
    setUnapprovedArticles: (articles) => set({ unapprovedArticles: articles }),
    fetchUnapprovedArticles: async () => {
        const response = await ArticleService.getUnapprovedArticles()
        if (response?.status === 200)
            set({ unapprovedArticles: response.data })
    },
    deleteUnapprovedArticle: (articleId) => set({
        unapprovedArticles: get().unapprovedArticles.filter(a => a.id !== articleId)
    }),
}))
