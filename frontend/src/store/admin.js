import { create } from "zustand";
import TourService from "../API/TourService";

export const useAdminStore = create((set, get) => ({
    tourRequests: [],
    setTourRequests: (requests) => set({ tourRequests: requests }),
    updateTourRequest: (request) => set({
        tourRequests: get().tourRequests.map(r => {
            if (r.id === request.id)
                return {...r, ...request}
            return r
        })
    }),
    deleteTourRequest: (requestId) => set({
        tourRequests: get().tourRequests.filter(r => r.id !== requestId)
    }),

    adminTours: [],
    setAdminTours: (tours) => ({ adminTours: tours }),
    fetchAdminTours: async () => {
        const response = await TourService.getTours()
        if (response?.status === 200)
            set({ adminTours: response.data })
    },
    updateAdminTours: (tour) => set({
        adminTours: get().adminTours.map(t => {
            if (t.id === tour.id)
                return {...t, ...tour}
            return t
        })
    }),
    addAdminTour: (tour) => set({ adminTours: [tour, ...get().adminTours] }),

    adminUsers: null,
    setAdminUsers: (users) => set({ adminUsers: users }),
    updateAdminUser: (user) => set({
        adminUsers: {...get().adminUsers, results: get().adminUsers.results.map(u => {
            if (u.id === user.id)
                return {...u, ...user}
            return u
        })}
    }),
    addRoleAdminUser: (user, role) => set({
        adminUsers: {...get().adminUsers, results: get().adminUsers.results.map(u => {
            if (u.id === user.id)
                return {...u, roles: [...u.roles, role]}
            return u
        })}
    }),
    deleteRoleAdminUser: (user, role) => set({
        adminUsers: {...get().adminUsers, results: get().adminUsers.results.map(u => {
            if (u.id === user.id)
                return {...u, roles: u.roles.filter(r => r.id !== role.id)}
            return u
        })}
    }),
}))
