import React from 'react'
import cl from './Footer.module.css'
import { Grid } from '@chakra-ui/react'
import Logo from '../UI/Logo'
import ContactLink from '../UI/ContactLink'

function Footer() {
    return (
        <Grid className={cl.container}>
            <Logo />
            <ContactLink
                iconSrc='/static/icons/vk-contact-icon.svg'
                href='https://vk.com/aequator'
                text='Наша группа'
            />
            <ContactLink
                iconSrc='/static/icons/tg-contact-icon.svg'
                href='https://t.me/equator_channel'
                text='Наш телеграм'
            />
        </Grid>
    )
}

export default Footer
