import React, { useEffect } from 'react'
import { useGlobalStore } from '../../store/global'
import { useFetching } from '../../hooks/useFetching'
import AuthService from '../../API/AuthService'
import { useNavigate } from 'react-router-dom'

function ProfileExit() {
    const setUser = useGlobalStore(state => state.setUser)
    const setProfileChapter = useGlobalStore(state => state.setProfileChapter)
    const navigate = useNavigate()

    const [logout] = useFetching(async () => {
        const response = await AuthService.logout()
        if (response?.status === 200) {
            setUser(null)
            setProfileChapter('favorites')
            navigate('/')
        }
    })

    useEffect(() => {
        logout()
    }, [])

    return <></>
}

export default ProfileExit
