import React from 'react'

const Main = React.lazy(() => import('../pages/Main/Main'))
const Articles = React.lazy(() => import('../pages/Articles/Articles'))
const Tours = React.lazy(() => import('../pages/Tours/Tours'))
const Projects = React.lazy(() => import('../pages/Projects/Projects'))
const About = React.lazy(() => import('../pages/About/About'))
const Profile = React.lazy(() => import('../pages/Profile/Profile'))
const Development = React.lazy(() => import('../components/Development/Development'))
const ArticleNewEdit = React.lazy(() => import('../pages/ArticleNewEdit/ArticleNewEdit'))
const ArticleDetail = React.lazy(() => import('../pages/ArticleDetail/ArticleDetail'))

export const publicRoutes = [
    { path: '/', element: Main },
    { path: '/articles', element: Articles },
    { path: '/tours', element: Tours },
    { path: '/projects', element: Projects },
    { path: '/about', element: About },
    { path: '/articles/:id', element: ArticleDetail },
    { path: '/*', element: Development },
]

export const privateRoutes = [
    { path: '/profile', element: Profile },
    { path: '/article/new', element: ArticleNewEdit },
]
