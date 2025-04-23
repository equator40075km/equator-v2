import React, { useEffect, useState } from 'react'
import cl from './ImageCardLink.module.css'
import { Box, Heading, Skeleton, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom';

function ImageCardLink({card}) {
    const descriptionRef = React.useRef(null)
    const [descriptionHeight, setDescriptionHeight] = useState(0)

    useEffect(() => {
        if (descriptionRef.current)
            setDescriptionHeight(descriptionRef.current.offsetHeight)
    }, [])

    if (!card || !card?.title || !card.image)
        return <Skeleton borderRadius='var(--border-radius)' height='100%' />

    return (
        <Link to={card.url} target={card.external ? '_blank' : '_self'}>
            <Box
                className={cl.container}
                _hover={{
                    '& h2': {
                        transform: `translateY(-${descriptionHeight}px)`
                    }
                }}
            >
                <Box
                    className={cl.image}
                    backgroundImage={`linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0.15)), url(${card.image})`}
                />

                <Heading size='2xl' className={cl.title}>
                    {card.title}
                </Heading>

                <Text className={cl.description} ref={descriptionRef}>
                    {card.description}
                </Text>
            </Box>
        </Link>
    )
}

export default ImageCardLink
