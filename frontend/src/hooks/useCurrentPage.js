import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useGlobalStore } from "../store/global"

export const useCurrentPage = () => {
    const location = useLocation()
    const setCurrentPage = useGlobalStore(state => state.setCurrentPage)

    useEffect(() => {
        setCurrentPage(location.pathname)
    }, [location, setCurrentPage])
}
