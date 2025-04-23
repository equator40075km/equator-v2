import { create } from "zustand";

export const useLoginDialogStore = create((set) => ({
    dialog: null,
    setDialog: (dialog) => set({ dialog: dialog }),
}))

export const useTourDialogStore = create((set) => ({
    dialog: null,
    setDialog: (dialog) => set({ dialog: dialog }),

    tour: null,
    setTour: (tour) => set({ tour: tour }),

    isChange: false,
    setIsChange: (isChange) => set({ isChange: isChange }), 
}))

export const useAddDateToTourDialogStore = create((set) => ({
    dialog: null,
    setDialog: (dialog) => set({ dialog: dialog }),

    tour: null,
    setTour: (tour) => set({ tour: tour }),
}))

export const useArticleDetailDialogStore = create((set) => ({
    dialog: null,
    setDialog: (dialog) => set({ dialog: dialog }),

    article: null,
    setArticle: (article) => set({ article: article }),
}))
