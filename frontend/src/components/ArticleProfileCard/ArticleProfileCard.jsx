import React, { useState } from 'react'
import cl from './ArticleProfileCard.module.css'
import { Button, Flex, Grid, Heading, Tag, Text } from '@chakra-ui/react'
import ImageWithLoader from '../ImageWithLoader/ImageWithLoader'
import { useNavigate } from 'react-router-dom'
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { toaster } from '../UI/chakra/toaster'
import ArticleService from '../../API/ArticleService'
import { FaCheck } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";

function ArticleProfileCard({article, canLike, withStatus, ...props}) {
    const navigate = useNavigate()
    const [isLiked, setIsLiked] = useState(true)
    const [likeLoading, setLikeLoading] = useState(false)

    const like = (e) => {
        e.stopPropagation()
        setLikeLoading(true)
        toaster.promise(
            isLiked ? ArticleService.unlikeArticle(article.id) : ArticleService.likeArticle(article.id),
            {
                success: () => {
                    setIsLiked(!isLiked)
                    return { title: isLiked ? 'Статья удалена из избранного' : 'Статья вернулась в избранное' }
                },
                error: (e) => {
                    if (e?.status === 401)
                        return {
                            title: 'Ошибка авторизации', description: 'Обновите страницу и войдите в профиль заново'
                        }
                    return {
                        title: isLiked ? 'Не удалось удалить статью из избранного' : 'Не удалось вернуть статью в избранное'
                    }
                },
                loading: {
                    title: isLiked ? 'Удаляем статью из избранного' : 'Возвращаем статью в избранное',
                },
                finally: () => setLikeLoading(false)
            }
        )
    }

    return (
        <Grid
            {...props}
            className={cl.container}
            onClick={() => navigate(`/articles/${article.id}`)}
        >
            <Flex className={cl.info}>
                <Flex>
                    <Tag.Root>
                        <Tag.Label>{article.category}</Tag.Label>
                    </Tag.Root>
                    {
                        canLike &&
                        <Button
                            variant='icon'
                            disabled={likeLoading}
                            onClick={like}
                        >
                            {isLiked ? <MdFavorite /> : <MdFavoriteBorder />}
                        </Button>
                    }
                </Flex>
                <Heading lineClamp="2">
                    {article.title}
                </Heading>
                <Text lineClamp="3">
                    {article.preview}
                </Text>
                {
                    withStatus &&
                    <Tag.Root
                        variant={article.approved ? 'green' : 'orange'}
                        size='lg'
                        marginRight='auto'
                    >
                        <Tag.StartElement>
                            {article.approved ? <FaCheck/> : <MdAccessTimeFilled/>}
                        </Tag.StartElement>
                        <Tag.Label>
                            {article.approved ? 'опубликована' : 'на проверке'}
                        </Tag.Label>
                    </Tag.Root>
                }
            </Flex>
            <ImageWithLoader
                src={article.img}
                alt='Article image'
                borderRadius='var(--border-radius)'
            />
        </Grid>
    )
}

export default ArticleProfileCard
