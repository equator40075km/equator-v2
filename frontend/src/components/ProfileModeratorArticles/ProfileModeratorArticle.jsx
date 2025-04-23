import React from 'react'
import cl from './ProfileModeratorArticle.module.css'
import { Button, Flex, Grid, Heading, Tag } from '@chakra-ui/react'
import ImageWithLoader from '../ImageWithLoader/ImageWithLoader'
import { useArticleDetailDialogStore } from '../../store/dialogs'

function ProfileModeratorArticle({article}) {
    const dialog = useArticleDetailDialogStore(state => state.dialog)
    const setDialogArticle = useArticleDetailDialogStore(state => state.setArticle)

    return (
        <Grid className={cl.container}>
            <Flex className={cl.info}>
                <Tag.Root marginRight='auto'>
                    <Tag.Label>{article.category}</Tag.Label>
                </Tag.Root>
                <Heading>{article.title}</Heading>
                <Button
                    variant='green'
                    size='sm'
                    onClick={() => {
                        setDialogArticle(article)
                        dialog.setOpen(true)
                    }}
                >
                    Подробнее
                </Button>
            </Flex>
            <ImageWithLoader
                src={article.img}
                alt='Article image'
                borderRadius='var(--border-radius)'
            />
        </Grid>
    )
}

export default ProfileModeratorArticle