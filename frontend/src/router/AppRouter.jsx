import React from 'react'
import { Route, Routes } from 'react-router-dom'

const AuthRouter = React.lazy(() => import('./AuthRouter'))
const MainRouter = React.lazy(() => import('./MainRouter'))

function AppRouter() {
    return (
        <Routes>
            <Route path='/auth/*' element={<AuthRouter/>} />
            <Route path='/*' element={<MainRouter/>} />
        </Routes>
    )
}

export default AppRouter
