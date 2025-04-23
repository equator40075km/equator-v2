import React, { useState } from 'react'
import cl from './ProfileSettings.module.css'
import { Button, Field, GridItem, Input } from '@chakra-ui/react'
import { useGlobalStore } from '../../store/global'
import { toaster } from '../UI/chakra/toaster'
import UserService from '../../API/UserService'

function ProfileSettings() {
    const user = useGlobalStore(state => state.user)
    const setUser = useGlobalStore(state => state.setUser)
    const [userData, setUserData] = useState({})
    const [userUpdating, setUserUpdating] = useState(false)

    const saveChanges = async () => {
        setUserUpdating(true)
        toaster.promise(
            UserService.updateUser(userData),
            {
                success: () => {
                    setUser({...user, ...userData})
                    setUserData({})
                    return { title: 'Данные профиля обновлены' }
                },
                error: (e) => {
                    setUserData({})
                    if (e?.status === 401)
                        return { title: 'Ошибка авторизации', description: 'Обновите страницу и войдите в профиль заново' }
                    return { title: 'Не удалось обновить данные профиля' }
                },
                loading: { title: 'Обновляем данные профиля' },
                finally: () => setUserUpdating(false)
            }
        )
    }

    return (
        <Field.Root className={cl.container}>
            <GridItem display='grid' gap='4px'>
                <Field.Label>Фамилия</Field.Label>
                <Input
                    value={userData?.last_name || user?.last_name || ''}
                    onChange={e => setUserData({...userData, last_name: e.target.value}) }
                />
            </GridItem>
            <GridItem display='grid' gap='4px'>
                <Field.Label>Имя</Field.Label>
                <Input
                    value={userData?.first_name || user?.first_name || ''}
                    onChange={e => setUserData({...userData, first_name: e.target.value}) }
                />
            </GridItem>
            <GridItem display='grid' gap='4px'>
                <Field.Label>Город</Field.Label>
                <Input
                    value={userData?.city || user?.city || ''}
                    onChange={e => setUserData({...userData, city: e.target.value}) }
                />
            </GridItem>
            <GridItem display='grid' gap='4px'>
                <Field.Label>Дата рождения</Field.Label>
                <Input
                    type='date'
                    value={userData?.birthday || user?.birthday || ''}
                    onChange={e => setUserData({...userData, birthday: e.target.value}) }
                />
            </GridItem>
            <GridItem colSpan={2} display='grid' gap='4px'>
                <Field.Label>Ссылка на изображение-аватар</Field.Label>
                <Input
                    type='url'
                    value={userData?.avatar || user?.avatar || ''}
                    onChange={e => setUserData({...userData, avatar: e.target.value}) }
                />
            </GridItem>
            <GridItem colSpan={2} marginLeft='auto'>
                <Button
                    disabled={userUpdating}
                    variant='green'
                    onClick={saveChanges}
                >
                    Сохранить изменения
                </Button>
            </GridItem>
        </Field.Root>
    )
}

export default ProfileSettings
