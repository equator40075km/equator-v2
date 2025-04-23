import React from 'react'
import cl from './ProfileFavorites.module.css'
import { Flex, Heading } from '@chakra-ui/react'
import { useGlobalStore } from '../../store/global'
import ArticleProfileCard from '../ArticleProfileCard/ArticleProfileCard'

function ProfileFavorites() {
    const user = useGlobalStore(state => state.user)

    if (user?.liked_articles?.length < 1)
        return (
            <Heading textAlign='center' color='var(--equator-green)'>
                У вас нет избранных статей
            </Heading>
        )

    return (
        <Flex className={cl.container}>
            {user?.liked_articles.map(article => (
                <ArticleProfileCard
                    article={article}
                    canLike={true}
                    key={article.id}
                />
            ))}
        </Flex>
    )
}

export default ProfileFavorites
