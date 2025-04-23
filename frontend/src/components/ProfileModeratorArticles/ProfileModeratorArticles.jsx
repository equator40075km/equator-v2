import React, { useEffect } from 'react'
import cl from './ProfileModeratorArticles.module.css'
import { Flex, Heading } from '@chakra-ui/react'
import { useModeratorStore } from '../../store/moderator'
import ProfileModeratorArticle from './ProfileModeratorArticle'
import ArticleDetailDialog from '../Dialogs/ArticleDetailDialog'

function ProfileModeratorArticles() {
    const unapprovedArticles = useModeratorStore(state => state.unapprovedArticles)
    const fetchUnapprovedArticles = useModeratorStore(state => state.fetchUnapprovedArticles)

    useEffect(() => {
        if (unapprovedArticles.length < 1)
            fetchUnapprovedArticles()
    }, [])

    if (unapprovedArticles.length < 1)
        return (
            <Heading textAlign='center' color='var(--equator-green)'>
                Нет новых статей для проверки
            </Heading>
        )

    return (
        <Flex className={cl.container}>
            <ArticleDetailDialog />
            {unapprovedArticles.map(article => (
                <ProfileModeratorArticle article={article} key={article.id} />
            ))}
        </Flex>
    )
}

export default ProfileModeratorArticles
