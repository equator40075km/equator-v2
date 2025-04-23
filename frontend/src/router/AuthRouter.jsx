import React from 'react'
import { Route, Routes } from 'react-router-dom'

const Login = React.lazy(() => import('../pages/Login/Login'))
const VerifyEmail = React.lazy(() => import('../pages/VerifyEmail/VerifyEmail'))

function AuthRouter() {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/verify-email' element={<VerifyEmail />} />
            <Route path='/*' element={<Login />} />
        </Routes>
    )
}

export default AuthRouter
