import React from 'react'
import cl from './AvatarPersona.module.css'
import { Avatar, Box, Grid, Text } from '@chakra-ui/react'

function AvatarPersona({user}) {
    const hasName = user?.last_name && user?.first_name

    return (
        <Grid className={cl.container}>
            <Avatar.Root size='2xl' className={cl.avatar}>
                <Avatar.Fallback name={hasName && `${user.last_name} ${user.first_name}`} />
                <Avatar.Image src={user.avatar} />
            </Avatar.Root>
            <Box>
                <Text fontWeight='medium' whiteSpace='nowrap'>
                    {hasName ? `${user.last_name} ${user.first_name}` : user.username}
                </Text>
                <Text color='fg.muted' textStyle='sm'>
                    {user?.city ? user.city : ''}
                </Text>
            </Box>
        </Grid>
    )
}

export default AvatarPersona
