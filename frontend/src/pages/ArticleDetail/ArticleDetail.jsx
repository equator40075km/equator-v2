import React, { useEffect, useState } from 'react'
import cl from './ArticleDetail.module.css'
import { useParams } from 'react-router-dom'
import { Box, Button, Flex, Grid, Heading, Image, Tag, Text } from '@chakra-ui/react'
import { useFetching } from '../../hooks/useFetching'
import ArticleService from '../../API/ArticleService'
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { RiShare2Line } from "react-icons/ri";
import MDEditor from '@uiw/react-md-editor'
import { getDateTimeFromUTC } from '../../utils/datetime'
import AvatarPersona from '../../components/AvatarPersona/AvatarPersona'
import { toaster } from '../../components/UI/chakra/toaster'
import EquatorLoader from '../../components/EquatorLoader/EquatorLoader'
import { useGlobalStore } from '../../store/global'

function ArticleDetail() {
    const { id } = useParams()
    const [article, setArticle] = useState(null)
    const user = useGlobalStore(state => state.user)
    const setUser = useGlobalStore(state => state.setUser)
    const [likeLoading, setLikeLoading] = useState(false)
    const isLiked = Boolean(user?.liked_articles?.find(a => a.id === article?.id))

    const [fetchArticle, articleLoading] = useFetching(async () => {
        const response = await ArticleService.getById(id)
        if (response?.status === 200)
            setArticle(response.data)
    })

    useEffect(() => {
        fetchArticle()
    }, [])

    const like = () => {
        setLikeLoading(true)
        toaster.promise(
            ArticleService.likeArticle(id),
            {
                success: () => {
                    setUser({...user, liked_articles: [...user.liked_articles, {
                        id: article.id,
                        title: article.title,
                        preview: article.preview,
                        img: article.img,
                        category: article.category,
                    }]})
                    setArticle({...article, like_count: article.like_count + 1})
                    return { title: 'Статья добавлена в избранное' }
                },
                error: (response) => {
                    if (response?.status === 401)
                        return { title: 'Авторизируйтесь, чтобы поставить лайк' }
                    else
                        return { title: 'Не удалось поставить лайк' }
                },
                loading: { title: 'Добавляем статью в избранное...' },
                finally: () => setLikeLoading(false),
            }
        )
    }

    const unlike = async () => {
        setLikeLoading(true)
        const response = await ArticleService.unlikeArticle(article.id)
        if (response?.status === 200) {
            setUser({...user, liked_articles: user.liked_articles.filter(a => a.id !== article.id)})
            setArticle({...article, like_count: article.like_count - 1})
            toaster.create({
                type: 'info',
                title: 'Статья удалена из избранного',
            })
        } else if (response?.status === 401) {
            toaster.error({ title: 'Ошибка авторизации', description: 'Авторизируйтесь и попробуйте снова' })
        } else {
            toaster.error({ title: 'Не удалось удалить статью из избранного' })
        }
        setLikeLoading(false)
    }

    if (!article || articleLoading)
        return (
            <Flex justify='center' align='center' h='calc(100vh - var(--header-navbar-height))'>
                <EquatorLoader />
            </Flex>
        )

    return (
        <Grid className={cl.container} data-color-mode="light">
            <Flex className={cl.preHeader}>
                <Flex>
                    {/* Flex потому что в перспективе может быть несколько категорий */}
                    <Tag.Root size='lg'>
                        <Tag.Label>{article.category}</Tag.Label>
                    </Tag.Root>
                </Flex>
                <Flex>
                    <Button
                        disabled={likeLoading}
                        variant='icon'
                        color={isLiked && 'red.600'}
                        _hover={{
                            color: 'red.500',
                        }}
                        onClick={isLiked ? unlike : like}
                    >
                        {article.like_count}
                        {isLiked ? <MdFavorite/> : <MdFavoriteBorder/>}
                    </Button>
                    <Button
                        variant='icon'
                        _hover={{
                            color: "var(--equator-darkgray)"
                        }}
                    >
                        <RiShare2Line />
                    </Button>
                </Flex>
            </Flex>

            <Grid className={cl.header}>
                <Flex direction='column' gap='6px'>
                    <Text textStyle='xs' color='var(--equator-darkgray)'>
                        {getDateTimeFromUTC(article.created_at)}
                    </Text>
                    <Heading size='3xl'>{article.title}</Heading>
                </Flex>
                <AvatarPersona user={article.author} />
            </Grid>

            <Box position='relative'>
                <Image
                    className={cl.image}
                    src={article.img}
                    alt='Aticle image'
                />
            </Box>

            <Box className={cl.text}>
                <MDEditor.Markdown source={article.text}/>
            </Box>
        </Grid>
    )
}

export default ArticleDetail
