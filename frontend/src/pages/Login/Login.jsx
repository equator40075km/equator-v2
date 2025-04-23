import React, { useEffect, useState } from 'react'
import cl from './Login.module.css'
import { Box, Button, Grid, Heading, Input, Link, Separator, Text } from '@chakra-ui/react'
import { loginPageTexts } from '../../utils/constants'
import AuthService from '../../API/AuthService'
import { useNavigate } from 'react-router-dom'
import Logo from '../../components/UI/Logo'
import SocialLoginButton from '../../components/UI/SocialLoginButton'
import { toaster } from '../../components/UI/chakra/toaster'
import BlurLoadImage from '../../components/BlurLoadImage/BlurLoadImage'
import { useFetching } from '../../hooks/useFetching'

function Login() {
    const navigate = useNavigate()
    const [isRegister, setIsRegister] = useState(false)
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
    })
    const text = isRegister ? loginPageTexts.register : loginPageTexts.login

    const [register, registerLoading, registerError] = useFetching(async (formData) => {
        const response = await AuthService.register(formData)
        if (response?.status === 201) {
            toaster.create({
                type: 'success',
                title: 'Успешно',
                description: 'На вашу почту отправлена инструкция для заавершения регистрации',
                duration: 7500,
            })
            setIsRegister(false)
        }
        clearInputs()
    })

    const [token, tokenLoading, tokenError] = useFetching(async (formData) => {
        const response = await AuthService.token(formData)
        if (response?.status === 200)
            navigate('/')
    })

    useEffect(() => {
        if (tokenError) {
            switch (tokenError?.status) {
                case 401:
                    toaster.error({ title: 'Неверные данные' })
                    break
                case 406:
                    toaster.error({
                        title: 'Ваш профиль деактивирован', 
                        description: 'Возможно, ваша почта не была подтверждена'
                    })
                    break
                case 500:
                    toaster.error({ title: 'Ошибка сервера', description: 'Попробуйте позже' })
                    break
                default:
                    toaster.error({ title: 'Неизвестная ошибка', description: 'Пожалуйста, сообщите о ней администраторам' })
            }
        }
    }, [tokenError])

    useEffect(() => {
        if (registerError) {
            switch (registerError?.status) {
                case 400:
                    toaster.error({
                        title: 'Ошибка регистраации',
                        description: registerError?.response?.data?.detail
                    })
                    break
                case 409:
                    toaster.error({
                        title: 'Ошибка регистрации',
                        description: 'Пользователь с таким логином или почтой уже зарегистрирован'
                    })
                    break
                case 422:
                    // TODO: вынести проверку в отедльную функцию utils
                    if (registerError?.response?.data?.detail?.length > 0) {
                        const detail = registerError.response.data.detail[0]
                        if (detail.msg.includes('not a valid email address'))
                            toaster.error({ title: 'Невалидная почта' })
                        if (detail.type === 'string_too_short')
                            toaster.error({
                                title: `${detail.loc[1] === 'password' ? 'Пароль' : 'Логин'} ` +
                                       `должен быть длиннее ${detail.ctx.min_length}`
                            })
                    }
                    break
                case 500:
                    toaster.error({ title: 'Ошибка сервера', description: 'Попробуйте позже' })
                    break
                case 503:
                    toaster.error({ title: 'Ошибка сервера', description: registerError?.response?.data?.detail })
                    break
                default:
                    toaster.error({ title: 'Неизвестная ошибка', description: 'Пожалуйста, сообщите о ней администраторам' })
            }
        }
    }, [registerError])

    const clearInputs = () => {
        setData({
            username: "",
            email: "",
            password: "",
        })
    }

    const toggleIsRegister = () => {
        setIsRegister(!isRegister)
        clearInputs()
    }

    const onAuthBtn = async () => {
        if ( !data.email || !data.password || (isRegister && !data.username) ) {
            toaster.create({ type: "error", title: "Поля не могут быть пустыми" })
            return
        }

        const formData = new FormData()
        formData.append("email", data.email)
        formData.append("password", data.password)

        if (isRegister) {
            formData.append("username", data.username)
            await register(formData)
            return
        }

        await token(formData)
        clearInputs()
    }

    return (
        <Box className={cl.wrapper}>
            <BlurLoadImage
                src='/static/img/login-background.png'
                tinySrc='/static/img/login-background-tiny.png'
                blackout={0.5}
                className={cl.background}
            />
            <Grid className={cl.container}>
                <Logo w="300px" m="0 auto" />
                <Grid className={cl.outbox}>
                    <Heading size="2xl" textAlign='center'>{text.title}</Heading>
                    <SocialLoginButton
                        iconSrc='/static/icons/google-icon.png'
                        alt='Google login button'
                    >
                        {text.google}
                    </SocialLoginButton>
                    <SocialLoginButton
                        iconSrc='/static/icons/vk-icon.png'
                        alt='Vk login button'
                    >
                        {text.vk}
                    </SocialLoginButton>

                    <Separator />

                    {isRegister && <Input
                        name='username'
                        type='text'
                        value={data.username}
                        onChange={(e) => setData({...data, username: e.target.value.trim()})}
                        placeholder='Ваш логин'
                        variant='gray'
                    />}
                    <Input
                        name='email' 
                        type='email'
                        value={data.email}
                        onChange={(e) => setData({...data, email: e.target.value.trim()})}
                        placeholder='Ваша почта'
                        variant='gray'
                    />
                    <Input
                        name='password'
                        type='password'
                        value={data.password}
                        onChange={(e) => setData({...data, password: e.target.value.trim()})}
                        placeholder={text.password}
                        variant='gray'
                    />
                    <Button
                        variant="green"
                        disabled={registerLoading || tokenLoading}
                        onClick={onAuthBtn}
                    >
                        {text.btn}
                    </Button>

                    <Text textAlign='center'>
                        {text.link_text}
                        <Link
                            color="var(--equator-green)"
                            onClick={toggleIsRegister}
                        >
                            {text.link}
                        </Link>
                    </Text>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Login
