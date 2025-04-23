import { create } from 'zustand'
import ArticleService from '../API/ArticleService'

export const useArticlesStore = create((set, get) => ({
    articles: [],
    setArticles: (articles) => set({ articles: articles }),
    
    bestArticles: [],
    setBestArticles: (bestArticles) => set({ bestArticles: bestArticles }),
    fetchBestArticles: async () => {
        const response = await ArticleService.getBestArticles()
        if (response?.status === 200)
            set({ bestArticles: response.data })
    },
}))
