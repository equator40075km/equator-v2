import React from 'react'
import cl from './ProfileMyArticles.module.css'
import { Button, Flex } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useGlobalStore } from '../../store/global'
import ArticleProfileCard from '../ArticleProfileCard/ArticleProfileCard'

function ProfileMyArticles() {
    const navigate = useNavigate()
    const user = useGlobalStore(state => state.user)

    return (
        <Flex className={cl.container}>
            <Button
                marginRight='auto'
                variant='green'
                onClick={() => navigate('/article/new')}
            >
                Новая статья
            </Button>
            {user?.articles.map(article => (
                <ArticleProfileCard
                    article={article}
                    canLike={false}
                    withStatus={true}
                    key={article.id}
                />
            ))}
        </Flex>
    )
}

export default ProfileMyArticles
