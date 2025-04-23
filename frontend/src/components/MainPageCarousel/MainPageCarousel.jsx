import React, { useEffect } from 'react'
import cl from './MainPageCarousel.module.css'
import { Box, Button, Flex, Grid, Heading } from '@chakra-ui/react'
import Slider from 'react-slick'
import "./MainPageCarousel.css"
import { useArticlesStore } from '../../store/articles'
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from 'react-router-dom'
import { useFetching } from '../../hooks/useFetching'
import ArticlePreviewCard from '../ArticlePreviewCard/ArticlePreviewCard'

const settings = {
    dots: false,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    swipe: false,
    swipeToSlide: false,
    arrows: false,
    lazyLoad: 'progressive',
}

function MainPageCarousel() {
    const navigate = useNavigate()
    const bestArticles = useArticlesStore(state => state.bestArticles)
    const _fetchBestArticles = useArticlesStore(state => state.fetchBestArticles)
    const skeletonArticles = bestArticles.length < 3 ? [...bestArticles, ...[null, null, null].slice(bestArticles.length)]
                                                     : bestArticles
    const sliderRef = React.useRef(null)
    const [fetchBestArticles, isLoading, fetchError] = useFetching(_fetchBestArticles)

    useEffect(() => {
        fetchBestArticles()
    }, [])

    return (
        <Grid className={cl.container}>
            <Flex className={cl.title}>
                <Heading size='3xl'>Лучшие статьи по версии EQUATOR</Heading>
                <Flex className={cl.buttons}>
                    <Button
                        variant='carousel'
                        onClick={() => sliderRef?.current?.slickPrev()}
                    >
                        <IoIosArrowBack />
                    </Button>
                    <Button
                        variant='carousel'
                        onClick={() => sliderRef?.current?.slickNext()}
                    >
                        <IoIosArrowForward />
                    </Button>
                </Flex>
            </Flex>
            
            <Box className='main-carousel'>
                <Slider {...settings} ref={sliderRef} >
                    {skeletonArticles.map((article, index) => (
                        <ArticlePreviewCard
                            article={article}
                            key={`main-carousel-${index}`}
                            h='600px'
                        />
                    ))}
                </Slider>
            </Box>

            <Button
                variant='greenOutline'
                m='0 auto'
                onClick={() => navigate('/articles')}
            >
                Посмотреть все
            </Button>
        </Grid>
    )
}

export default MainPageCarousel
