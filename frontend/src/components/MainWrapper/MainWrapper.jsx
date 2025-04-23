import React from 'react'
import cl from './MainWrapper.module.css'
import { Box, Flex } from '@chakra-ui/react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

function MainWrapper({children}) {
    return (
        <Flex className={cl.container}>
            <Header />
            <Box className={cl.content}>
                {children}
            </Box>
            <Footer />
        </Flex>
    )
}

export default MainWrapper
