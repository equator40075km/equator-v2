import React from 'react'
import cl from './Development.module.css'
import { Box, Heading, Text } from '@chakra-ui/react'

function Development() {
    return (
        <Box className={cl.container}>
            <Heading>Ёлки-иголки...</Heading>
            <Heading as='h3'>Данная страница находится в разработке</Heading>
            <Text>если честно, не думали, что вы так далеко зайдёте...</Text>
        </Box>
    )
}

export default Development