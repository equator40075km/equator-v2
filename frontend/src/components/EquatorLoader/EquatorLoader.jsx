import React from 'react'
import cl from './EquatorLoader.module.css'
import { Flex, Heading } from '@chakra-ui/react'

function EquatorLoader({...props}) {
    return (
        <Flex
            alignItems='center'
            justifyContent='center'
            direction='column'
            animation='pulse'
            color='var(--equator-green)'
            gap="4px"
            textDecoration='none'
            {...props}
        >
            <span className={cl.points}></span>
            <Heading
                as='p'
                animation='pulse'
                size='2xl'
            >
                EQUATOR
            </Heading>
        </Flex>
    )
}

export default EquatorLoader
