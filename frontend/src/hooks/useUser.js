import { useEffect } from "react";
import { useGlobalStore } from "../store/global";
import { useFetching } from "./useFetching";
import UserService from "../API/UserService";

export function useUser() {
    const user = useGlobalStore(state => state.user)
    const setUser = useGlobalStore(state => state.setUser)

    const [fetchUser, userIsLoading, userError] = useFetching(async () => {
        const response = await UserService.getMe()
        if (response?.status === 200) {
            setUser(response.data)
        }
    })

    useEffect(() => {
        if (!user)
            fetchUser()
    }, [])
    
    return [user, userIsLoading, userError]
}
