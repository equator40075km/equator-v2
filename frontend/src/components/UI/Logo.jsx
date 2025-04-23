import { Image } from '@chakra-ui/react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Logo({black, pointer = true, ...props}) {
    // const navigate = useNavigate()
    const src = black ? '/static/img/logo-black.svg' : '/static/img/logo-white.svg'

    return (
        <Link to='/'>
            <Image
                // onClick={() => pointer && navigate('/')}
                width='100%'
                cursor={pointer ? 'pointer' : 'default'}
                src={src}
                alt="Equator logo"
                {...props}
            />
        </Link>
    )
}

export default Logo
