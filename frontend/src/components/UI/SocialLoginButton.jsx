import { Button, Image } from '@chakra-ui/react'
import React from 'react'

function SocialLoginButton({iconSrc, alt, children, ...props}) {
    return (
        <Button
            {...props}
            variant='socialIcon'
            colorPalette='gray'
        >
            <Image
                src={iconSrc}
                alt={alt}
                h='24px'
            />
            {children}
        </Button>
    )
}

export default SocialLoginButton
