import { create } from "zustand";
import TourService from "../API/TourService";

export const useTourStore = create(set => ({
    tours: [],
    setTours: (tours) => set({ tours: tours }),
    fetchTours: async () => {
        try {
            const response = await TourService.getTours(true)
            if (response?.status === 200)
                set({ tours: response.data })
        } catch (e) {
            console.log(e)
        }
    },

    tourRequests: [],
    setTourRequests: (requests) => set({ tourRequests: requests }),

    tourDates: [],
    setTourDates: (dates) => set({ tourDates: dates }),
    fetchTourDates: async () => {
        try {
            const response = await TourService.getTourDates()
            if (response?.status === 200)
                set({ tourDates: response.data })
        } catch (e) {
            console.log(e)
        }
    },
}))
