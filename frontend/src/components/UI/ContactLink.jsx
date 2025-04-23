import React from 'react'
import { Flex, Image, Link, Text } from '@chakra-ui/react'

function ContactLink({iconSrc, href, text}) {
    return (
        <Link
            isExternal
            href={href}
            margin='0 auto'
            _hover={{ textDecoration: 'underline', textDecorationColor: 'white' }}
        >
            <Flex gap='var(--small-gap)' align='center' justify='center'>
                <Image src={iconSrc} alt='Contact link' />
                <Text color='white' whiteSpace='nowrap'>{text}</Text>
            </Flex>
        </Link>
    )
}

export default ContactLink
