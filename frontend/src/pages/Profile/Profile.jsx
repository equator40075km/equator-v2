import React from 'react'
import cl from './Profile.module.css'
import { Grid } from '@chakra-ui/react'
import { useGlobalStore } from '../../store/global'
import { profileButtons } from '../../utils/profile'
import ProfileMenu from '../../components/ProfileMenu/ProfileMenu'
import Development from '../../components/Development/Development'

function Profile() {
    const chapter = useGlobalStore(state => state.profileChapter)

    const renderChapter = () => {
        for (let btn of profileButtons)
            if (btn.name === chapter)
                return <btn.component />
        return <Development />
    }

    return (
        <Grid className={cl.container}>
            <ProfileMenu />
            {renderChapter()}
        </Grid>
    )
}

export default Profile
