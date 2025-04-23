import { create } from 'zustand'
import UserService from '../API/UserService'

export const useGlobalStore = create((set, get) => ({
    user: null,
    setUser: (user) => set({ user: user }),

    currentPage: '/',
    setCurrentPage: (page) => set({ currentPage: page }),

    profileChapter: 'favorites',
    setProfileChapter: (chapter) => set({ profileChapter: chapter }),

    roles: [],
    setRoles: (roles) => set({ roles: roles }),
    fetchRoles: async () => {
        if (get().roles.length > 0)
            return
        const response = await UserService.getRoles()
        if (response?.status === 200)
            set({ roles: response.data })
    },
}))
