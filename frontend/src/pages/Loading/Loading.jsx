import { Flex } from '@chakra-ui/react'
import React from 'react'
import EquatorLoader from '../../components/EquatorLoader/EquatorLoader'

function Loading() {
    return (
        <Flex
            position='absolute'
            left={0}
            top={0}
            h='100vh'
            w='100%'
            justify='center'
            align='center'
        >
            <EquatorLoader />
        </Flex>
    )
}

export default Loading
