import React, { useEffect } from 'react'
import cl from './BestArticles.module.css'
import { useArticlesStore } from '../../store/articles'
import { useFetching } from '../../hooks/useFetching'
import { Grid, GridItem, Heading } from '@chakra-ui/react'
import ArticlePreviewCard from '../ArticlePreviewCard/ArticlePreviewCard'

function BestArticles() {
    const bestArticles = useArticlesStore(state => state.bestArticles)
    const _fetchBestArticles = useArticlesStore(state => state.fetchBestArticles)
    const [fetchBestArticles, isLoading, fetchError] = useFetching(_fetchBestArticles)

    useEffect(() => {
        fetchBestArticles()
    }, [])

    const getArticleByIndex = (index) => {
        if (isLoading || bestArticles.length <= index)
            return null
        return bestArticles[index]
    }

    return (
        <Grid className={cl.container}>
            <Heading size='3xl'>Лучшие статьи по версии EQUATOR</Heading>
            <Grid className={cl.articles}>
                <GridItem rowSpan={2} h='100%'>
                    <ArticlePreviewCard article={getArticleByIndex(0)} />
                </GridItem>
                <ArticlePreviewCard article={getArticleByIndex(1)} />
                <ArticlePreviewCard article={getArticleByIndex(2)} />
            </Grid>
        </Grid>
    )
}

export default BestArticles
