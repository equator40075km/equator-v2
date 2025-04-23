import React from 'react'
import cl from './HeaderContent.module.css'
import { Box, Grid } from '@chakra-ui/react'
import { useGlobalStore } from '../../store/global'
import { showHeaderContent } from '../../utils/logic'
import BlurLoadImage from '../BlurLoadImage/BlurLoadImage'

function HeaderContent() {
    const currentPage = useGlobalStore(state => state.currentPage)

    if (!showHeaderContent(currentPage))
        return <></>

    return (
        <Grid className={cl.container}>
            {/* TODO: Место для контентной части (MainHeaderContent, MerchHeaderContent и т.д) */}
            <BlurLoadImage
                src='/static/img/header-background.jpg'
                tinySrc='/static/img/header-background-tiny.jpg'
                alt='Header background'
                className={cl.background}
            />
            <Box className={cl.gradient} />
        </Grid>
    )
}

export default HeaderContent
