import React from 'react'
import cl from './ArticleListItem.module.css'
import { Flex, Grid, Heading, Tag, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import ImageWithLoader from '../ImageWithLoader/ImageWithLoader'

function ArticleListItem({article}) {
    return (
        <Link to={`/articles/${article.id}`}>
            <Grid className={cl.container}>
                <ImageWithLoader
                    src={article.img}
                    alt={`Article list item`}
                    borderRadius='var(--border-radius)'
                />

                <Flex className={cl.article}>
                    <Flex>
                        {/* Flex потому что в перспективе может быть несколько категорий */}
                        <Tag.Root>
                            <Tag.Label>{article.category}</Tag.Label>
                        </Tag.Root>
                    </Flex>
                    <Heading size='2xl' lineClamp="2">
                        {article.title}
                    </Heading>
                    <Text textStyle='lg' lineClamp="3">
                        {article.preview}
                    </Text>
                </Flex>
            </Grid>
        </Link>
    )
}

export default ArticleListItem
