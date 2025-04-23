import React, { useState } from 'react'
import cl from './ArticleEditor.module.css'
import { Button, Field, Flex, Grid, Heading, Input, Link, Show } from '@chakra-ui/react'
import MDEditor, { commands } from '@uiw/react-md-editor'
import ArticleService from '../../API/ArticleService'
import { useNavigate } from 'react-router-dom'
import { toaster } from '../UI/chakra/toaster'

function ArticleEditor() {
    const navigate = useNavigate()
    const [showPreview, setShowPreview] = useState(false)
    const [article, setArticle] = useState({
        title: "",
        preview: "",
        img: "",
        text: "",
        category: "",
    })
    const [isCreating, setIsCreating] = useState(false)

    const createArticle = async () => {
        const response = await ArticleService.createArticle(article)
        if (response?.status === 200) {
            navigate('/profile')
        }
    }

    const onSaveButton = async () => {
        setIsCreating(true)
        toaster.promise(createArticle, {
            loading: {
                title: "Загрузка статьи...",
                description: "Пожалуйста, подождите",
            },
            success: {
                title: "Спасибо!",
                description: "Статья будет опубликована сразу после проверки",
            },
            error: {
                title: "Не удалось создать статью",
            },
            finally: () => setIsCreating(false),
        })
    }

    return (
        <Grid gap='var(--big-gap)' data-color-mode="light">
            <Heading size='2xl'>Создание новой статьи</Heading>
            <Field.Root>
                <Field.Label fontSize='md' fontWeight='bold'>
                    Название статьи
                </Field.Label>
                <Input
                    size='sm'
                    type='text'
                    value={article.title}
                    onChange={e => setArticle({...article, title: e.target.value})}
                />

                <Field.Label fontSize='md' fontWeight='bold'>
                    Ссылка на изображение-заставку
                </Field.Label>
                <Input
                    size='sm'
                    type='url'
                    value={article.img}
                    onChange={e => setArticle({...article, img: e.target.value})}
                />

                <Field.Label fontSize='md' fontWeight='bold'>
                    Категория статьи
                </Field.Label>
                <Input
                    size='sm'
                    type='text'
                    value={article.category}
                    onChange={e => setArticle({...article, category: e.target.value})}
                />

                <Field.Label fontSize='md' fontWeight='bold'>
                    Превью статьи
                </Field.Label>
                <Input
                    size='sm'
                    type='text'
                    value={article.preview}
                    onChange={e => setArticle({...article, preview: e.target.value})}
                />
                <Field.HelperText>
                    Одно-два предложения, кратко описывающие содержание статьи (можно скопировать начало статьи)
                </Field.HelperText>

                <Field.Label fontSize='md' fontWeight='bold'>
                    Текст статьи
                </Field.Label>
                <MDEditor
                    className={cl.editor}
                    height={300}
                    minHeight={300}
                    extraCommands={[commands.fullscreen]}
                    preview='edit'
                    value={article.text}
                    onChange={(value) => setArticle({...article, text: value})}
                />
                <Field.HelperText>
                    {'Текст статьи в формате '}
                    <Link href='https://www.markdownguide.org/basic-syntax/'>Markdown</Link>
                    {' с возможностью форматирования текста, вставки изображений, ссылок и т.д. '}
                    {'Вы можете растянуть окно, нажав на правый нижний угол и потянув вниз'} 
                </Field.HelperText>
            </Field.Root>

            <Grid className={cl.preview}>
                <Flex align='center' justify='space-between' gap='var(--gap)'>
                    <Heading>Предпросмотр текста статьи</Heading>
                    <Button
                        size='sm'
                        variant='greenOutline'
                        onClick={() => setShowPreview(!showPreview)}
                    >
                        {showPreview ? "Скрыть" : "Показать"}
                    </Button>
                </Flex>
                <Show when={showPreview}>
                    <MDEditor.Markdown source={article.text} />
                </Show>
            </Grid>

            <Button
                disabled={isCreating}
                variant='green'
                onClick={onSaveButton}
            >
                Сохранить
            </Button>
        </Grid>
    )
}

export default ArticleEditor
