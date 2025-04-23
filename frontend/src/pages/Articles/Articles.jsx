import React, { useEffect, useState } from 'react'
import cl from './Articles.module.css'
import { Flex } from '@chakra-ui/react'
import ArticleService from '../../API/ArticleService'
import InfiniteScroll from 'react-infinite-scroll-component'
import BestArticles from '../../components/BestArticles/BestArticles'
import ArticleListItem from '../../components/ArticleListItem/ArticleListItem'
import EquatorLoader from '../../components/EquatorLoader/EquatorLoader'

function Articles() {
    const [articles, setArticles] = useState([])
    const [nextUrl, setNextUrl] = useState('init')

    const fetchArticles = async () => {
        const response = nextUrl === 'init' 
            ? await ArticleService.getArticles(1)
            : await ArticleService.get(nextUrl)

        if (response?.status === 200) {
            setArticles([...articles, ...response.data.results])
            setNextUrl(response.data.next)
        }
    }

    useEffect(() => {
        if (articles?.length < 1)
            fetchArticles()
    }, [])

    return (
        <Flex className={cl.container}>
            <BestArticles />

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchArticles}
                hasMore={nextUrl && nextUrl !== 'init'}
                loader={<EquatorLoader />}
                className={cl.infiniteScroll}
            >
                <Flex direction='column' gap='var(--big-gap)'>
                    {articles.map(article => (
                        <ArticleListItem article={article} key={article.id} />
                    ))}
                </Flex>
            </InfiniteScroll>
        </Flex>
    )
}

export default Articles
