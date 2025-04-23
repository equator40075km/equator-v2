import React, { useEffect, useState } from 'react'
import cl from './VerifyEmail.module.css'
import { Box, Button, Flex, Heading } from '@chakra-ui/react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import BlurLoadImage from '../../components/BlurLoadImage/BlurLoadImage'
import EquatorLoader from '../../components/EquatorLoader/EquatorLoader'
import { useFetching } from '../../hooks/useFetching'
import AuthService from '../../API/AuthService'
import { toaster } from '../../components/UI/chakra/toaster'

function VerifyEmail() {
    const navigate = useNavigate()
    const [params, setParams] = useSearchParams()
    const [processiong, setProcessing] = useState(true)
    const [verifyEmail, isLoading, verifyError] = useFetching(async (verifyToken) => {
        const response = await AuthService.verifyEmail(verifyToken)
        if (response?.status === 200) {
            setParams({})
            setProcessing(false)
            toaster.success({
                title: 'Почта успешно подтверждена',
                description: 'Войдите в свой профиль для доступа к полному функционалу сайта',
            })
        }
    })

    useEffect(() => {
        const verifyToken = params.get("token")
        if (!verifyToken) {
            navigate('/auth')
            return
        }

        verifyEmail(verifyToken)
    }, [params])

    useEffect(() => {
        if (verifyError) {
            toaster.error({ title: 'Не удалось подтвердить почту' })
            navigate('/auth')
        }
    }, [verifyError])

    return (
        <Box className={cl.container}>
            <BlurLoadImage
                src='/static/img/login-background.png'
                tinySrc='/static/img/login-background-tiny.png'
                blackout={0.5}
                className={cl.background}
            />
            <Flex className={cl.contentWrapper}>
                <Flex className={cl.content}>
                    {
                    isLoading || processiong
                    ?
                    <EquatorLoader />
                    :
                    <>
                        <Heading>Почта подтверждена!</Heading>
                        <Link to='/auth/login'>
                            <Button variant='green'>
                                Войти
                            </Button>
                        </Link>
                    </>
                    }
                </Flex>
            </Flex>
        </Box>
    )
}

export default VerifyEmail
