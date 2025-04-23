import React from 'react'
import cl from './Main.module.css'
import { Grid } from '@chakra-ui/react'
import MainPageCarousel from '../../components/MainPageCarousel/MainPageCarousel'
import MainPageTravelBlock from '../../components/MainPageTravelBlock/MainPageTravelBlock'

function Main() {
    return (
        <Grid className={cl.container}>
            <MainPageCarousel />
            <MainPageTravelBlock />
        </Grid>
    )
}

export default Main
