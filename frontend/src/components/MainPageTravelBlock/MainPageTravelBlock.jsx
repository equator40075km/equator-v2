import React from 'react'
import cl from './MainPageTravelBlock.module.css'
import { Grid, GridItem, Text } from '@chakra-ui/react'
import Logo from '../UI/Logo'
import { mainPageCardLinks } from '../../utils/constants'
import ImageCardLink from '../ImageCardLink/ImageCardLink'

function MainPageTravelBlock() {
    return (
        <Grid className={cl.container}>
            <Grid className={cl.title}>
                <Text>Путешествуйте вместе с</Text>
                <Logo black pointer={false} />
            </Grid>

            <Grid className={cl.body}>
                <GridItem colSpan={2}>
                    <ImageCardLink card={mainPageCardLinks[0]} />
                </GridItem>
                <ImageCardLink card={mainPageCardLinks[1]} />
                <ImageCardLink card={mainPageCardLinks[2]} />
            </Grid>
        </Grid>
    )
}

export default MainPageTravelBlock
