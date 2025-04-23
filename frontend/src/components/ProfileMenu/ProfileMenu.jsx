import React from 'react'
import cl from './ProfileMenu.module.css'
import { Button, Grid, Separator } from '@chakra-ui/react'
import { useGlobalStore } from '../../store/global'
import { profileButtons } from '../../utils/profile'
import AvatarPersona from '../AvatarPersona/AvatarPersona'
import { userHasAccess } from '../../utils/logic'

function ProfileMenu() {
    const user = useGlobalStore(state => state.user)
    const chapter = useGlobalStore(state => state.profileChapter)
    const setChapter = useGlobalStore(state => state.setProfileChapter)

    if (!user)
        return <></>

    return (
        <Grid className={cl.container}>
            <AvatarPersona user={user} />

            <Grid className={cl.buttons}>
                {profileButtons.map(btn => (
                    (!btn.role || userHasAccess(user, btn.role))
                    &&
                    <React.Fragment key={`pofile-btn-${btn.name}`}>
                        {btn.name === 'settings' && <Separator/>}
                        <Button
                            variant='profile'
                            onClick={() => setChapter(btn.name)}
                            style={btn.name === chapter ? { background: 'var(--equator-lightgray)' } : {}}
                        >
                            <btn.icon/>{btn.text}
                        </Button>
                    </React.Fragment>
                ))}
            </Grid>
        </Grid>
    )
}

export default ProfileMenu
