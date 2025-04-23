import React, { useState } from 'react'
import cl from './TourPreview.module.css'
import { Box, Button, Flex, Heading, Image, Skeleton } from '@chakra-ui/react'

function TourPreview({tour, number, scrollRef}) {
    const [imgLoaded, setImgLoaded] = useState(false)

    const scrollToRef = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
        }
    }

    return (
        <Box className={cl.container}>
            <Box position='relative' height='100%'>
                <Image
                    src={tour.img}
                    alt='Tour preview'
                    onLoad={() => setImgLoaded(true)}
                    style={{ opacity: imgLoaded ? 1 : 0 }}
                    className={cl.background}
                />
                <Skeleton
                    height='100%'
                    className={cl.background}
                    style={{ display: imgLoaded ? 'none' : 'block' }}
                />
                <Box className={cl.number}>
                    {number}
                </Box>
                <Flex className={cl.content}>
                    <Heading size='6xl'>{tour.title}</Heading>
                    <Button
                        variant='white'
                        marginRight='auto'
                        onClick={scrollToRef}
                    >
                        Начать путешествие
                    </Button>
                </Flex>
            </Box>
        </Box>
    )
}

export default TourPreview
