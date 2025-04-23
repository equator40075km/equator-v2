import React from 'react'
import cl from './ArticleNewEdit.module.css'
import { Grid } from '@chakra-ui/react'
import ArticleEditor from '../../components/ArticleEditor/ArticleEditor'

function ArticleNewEdit() {
    return (
        <Grid className={cl.container}>
            <ArticleEditor />
        </Grid>
    )
}

export default ArticleNewEdit
