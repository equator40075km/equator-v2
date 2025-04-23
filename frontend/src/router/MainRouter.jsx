import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { privateRoutes, publicRoutes } from '.'
import { useCurrentPage } from '../hooks/useCurrentPage'
import { useUser } from '../hooks/useUser'
import Loading from '../pages/Loading/Loading'

const MainWrapper = React.lazy(() => import('../components/MainWrapper/MainWrapper'))

function MainRouter() {
    useCurrentPage()

    /* TODO: если был токен и устарел, то можно поазать toast типа "Войдите заново" */
    const [user, userIsLoading] = useUser()

    if (userIsLoading)
        return <Loading />

    return (
        <MainWrapper>
            <Routes>
                {user && privateRoutes.map(route => (
                    <Route
                        path={route.path}
                        element={<route.element/>}
                        key={`private-route-${route.path}`}
                    />
                ))}
                {publicRoutes.map(route => (
                    <Route
                        path={route.path}
                        element={<route.element/>}
                        key={`public-route-${route.path}`}
                    />
                ))}
            </Routes>
        </MainWrapper>
    )
}

export default MainRouter
