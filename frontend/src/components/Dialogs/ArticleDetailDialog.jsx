import { Button, CloseButton, Dialog, Grid, Heading, Portal, Text, useDialog } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { toaster } from '../UI/chakra/toaster'
import ArticleService from '../../API/ArticleService'
import { useArticleDetailDialogStore } from '../../store/dialogs'
import MDEditor from '@uiw/react-md-editor'
import { useModeratorStore } from '../../store/moderator'

function ArticleDetailDialog() {
    const dialog = useDialog()
    const setDialog = useArticleDetailDialogStore(state => state.setDialog)
    const article = useArticleDetailDialogStore(state => state.article)
    const setArticle = useArticleDetailDialogStore(state => state.setArticle)
    const deleteUnapprovedArticle = useModeratorStore(state => state.deleteUnapprovedArticle)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setDialog(dialog)
    }, [])

    const approveArticle = () => {
        setLoading(true)
        toaster.promise(
            ArticleService.approveArticle(article.id),
            {
                success: () => {
                    deleteUnapprovedArticle(article.id)
                    dialog.setOpen(false)
                    return { title: 'Статья опубликована' }
                },
                error: { title: `Не удалось опубликовать статью` },
                loading: { title: `Размещаем статью на сайте...` },
                finally: () => setLoading(false)
            }
        )
    }

    return (
        <Dialog.RootProvider value={dialog} onExitComplete={() => setArticle(null)} size='xl'>
            <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content>
                <Dialog.Header>
                    <Dialog.Title>
                        Разрешение публикации статьи
                    </Dialog.Title>
                </Dialog.Header>
                <Dialog.Body data-color-mode="light">
                    <Grid gap='var(--small-gap)'>
                    <Heading>Превью статьи</Heading>
                    <Text>{article ? article.preview : ''}</Text>
                    <Heading>Текст статьи</Heading>
                    <MDEditor.Markdown source={article ? article.text : ''} />
                    </Grid>
                </Dialog.Body>
                <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                        <Button variant='blackOutline' size='sm'>
                            Отмена
                        </Button>
                    </Dialog.ActionTrigger>
                    <Button
                        variant='greenOutline'
                        size='sm'
                        disabled={loading}
                        onClick={approveArticle}
                    >
                        Разрешить публикацию
                    </Button>
                </Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                </Dialog.CloseTrigger>
                </Dialog.Content>
            </Dialog.Positioner>
            </Portal>
        </Dialog.RootProvider>
    )
}

export default ArticleDetailDialog
