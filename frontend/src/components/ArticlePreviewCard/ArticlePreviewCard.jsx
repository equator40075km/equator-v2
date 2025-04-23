import React from 'react'
import cl from './ArticlePreviewCard.module.css'
import { Box, Flex, Skeleton, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import ImageWithLoader from '../ImageWithLoader/ImageWithLoader'

function ArticlePreviewCard({article, ...props}) {
    if (!article)
        return <Skeleton className={cl.skeleton} />

    return (
        <Link to={`/articles/${article.id}`} className={cl.wrapper}>
            <Box
                {...props}
                className={cl.wrapper}
            >
                <ImageWithLoader
                    src={article.img}
                    alt='Article image'
                    gradient='linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0))'
                />
                <Flex className={cl.title}>
                    <Text>{article.title}</Text>
                </Flex>
            </Box>
        </Link>
    )
}

export default ArticlePreviewCard
