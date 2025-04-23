import React, { useState } from 'react'
import { Checkbox, Flex, Table } from '@chakra-ui/react'
import { userHasRole } from '../../utils/logic'
import AdminService from '../../API/AdminService'
import { toaster } from '../UI/chakra/toaster'
import { useAdminStore } from '../../store/admin'
import { useGlobalStore } from '../../store/global'

function ProfileAdminUsersRow({user}) {
    const roles = useGlobalStore(state => state.roles)
    const updateAdminUser = useAdminStore(state => state.updateAdminUser)
    const addRoleAdminUser = useAdminStore(state => state.addRoleAdminUser)
    const deleteRoleAdminUser = useAdminStore(state => state.deleteRoleAdminUser)
    const [isLoading, setIsLoading] = useState(false)

    const patchUser = (data) => {
        setIsLoading(true)
        toaster.promise(
            AdminService.patchUser(user.id, data),
            {
                success: (response) => {
                    updateAdminUser(response.data)
                    return { title: 'Пользователь обновлён' }
                },
                error: { title: 'Не удалось обновить' },
                loading: { title: 'Обновление пользователя...' },
                finally: () => setIsLoading(false)
            }
        )
    }

    const changeUserRole = (identifier, value) => {
        setIsLoading(true)
        const role = roles.find(r => r.identifier === identifier)
        toaster.promise(
            value ? AdminService.addRoleToUser(user.id, role.id)
                  : AdminService.deleteRoleFromUser(user.id, role.id),
            {
                success: () => {
                    if (value)
                        addRoleAdminUser(user, role)
                    else
                        deleteRoleAdminUser(user, role)
                    return { title: value ? 'Роль добавлена' : 'Роль удалена' }
                },
                error: { title: 'Не удалось обновить роль' },
                loading: { title: 'Обновление роли...' },
                finally: () => setIsLoading(false)
            }
        )
    }

    return (
        <Table.Row>
            <Table.Cell>{user.id}</Table.Cell>
            <Table.Cell>{user.username}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>
                <Checkbox.Root
                    disabled={isLoading}
                    checked={user.disabled}
                    onCheckedChange={e => patchUser({disabled: !!e.checked})}
                    colorPalette='red'
                    size='sm'
                    _hover={{ cursor: 'pointer' }}
                >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                </Checkbox.Root>
            </Table.Cell>
            <Table.Cell>
                <Flex flexDirection='column' gap='4px'>
                    <Checkbox.Root
                        disabled={isLoading}
                        checked={userHasRole(user, 'admin')}
                        onCheckedChange={e => changeUserRole('admin', !!e.checked)}
                        colorPalette='green'
                        size='sm'
                        _hover={{ cursor: 'pointer' }}
                    >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control />
                        <Checkbox.Label>админ</Checkbox.Label>
                    </Checkbox.Root>
                    <Checkbox.Root
                        disabled={isLoading}
                        checked={userHasRole(user, 'moderator')}
                        onCheckedChange={e => changeUserRole('moderator', !!e.checked)}
                        colorPalette='green'
                        size='sm'
                        _hover={{ cursor: 'pointer' }}
                    >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control />
                        <Checkbox.Label>модератор</Checkbox.Label>
                    </Checkbox.Root>
                    <Checkbox.Root
                        disabled={isLoading}
                        checked={userHasRole(user, 'author')}
                        onCheckedChange={e => changeUserRole('author', !!e.checked)}
                        colorPalette='green'
                        size='sm'
                        _hover={{ cursor: 'pointer' }}
                    >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control />
                        <Checkbox.Label>автор</Checkbox.Label>
                    </Checkbox.Root>
                </Flex>
            </Table.Cell>
            <Table.Cell>{user.last_name}</Table.Cell>
            <Table.Cell>{user.first_name}</Table.Cell>
        </Table.Row>
    )
}

export default ProfileAdminUsersRow
