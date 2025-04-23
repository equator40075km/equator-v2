import React, { useEffect, useState } from 'react'
import cl from './ProfileAdminUsers.module.css'
import { Checkbox, Flex, Heading, Input, Table } from '@chakra-ui/react'
import { useFetching } from '../../hooks/useFetching'
import AdminService from '../../API/AdminService'
import { useAdminStore } from '../../store/admin'
import { useGlobalStore } from '../../store/global'
import ProfileAdminUsersRow from './ProfileAdminUsersRow'
import Pagination from '../UI/Pagination'
import { usePagination } from '../../hooks/usePagination'
import Select from '../UI/Select'

function ProfileAdminUsers() {
    const users = useAdminStore(state => state.adminUsers)
    const setUsers = useAdminStore(state => state.setAdminUsers)
    const roles = useGlobalStore(state => state.roles)
    const fetchRoles = useGlobalStore(state => state.fetchRoles)
    const [filters, setFilters] = useState({
        email: null,
        disabled: null,
        role: null,
    })
    const pagination = usePagination()
    const selectRoles = [{value: null, label: '-'}, ...roles.map(r => {return {...r, value: r.identifier, label: r.name}})]

    const [fetchUsers] = useFetching(async (page) => {
        const response = await AdminService.getUsers({
            page: page,
            ...filters
        })
        if (response?.status === 200) {
            setUsers(response.data)
            pagination.setMaxPage(Math.ceil(response.data.count / 10))
        }
    })

    useEffect(() => {
        fetchRoles()
    }, [])

    useEffect(() => {
        if (pagination.page === 1)
            fetchUsers(1)
        else
            pagination.setPage(1)
    }, [filters])

    useEffect(() => {
        fetchUsers(pagination.page)
    }, [pagination.page])

    if (!users)
        return (
            <Heading textAlign='center' color='var(--equator-green)'>
                Не удалось загрузить пользователей
            </Heading>
        )

    return (
        <Flex className={cl.container}>
            <Heading>
                {`Всего пользователей: ${users ? users.count : '-'}`}
            </Heading>

            <Flex className={cl.filters}>
                <Input
                    variant='green'
                    maxW='200px'
                    size='sm'
                    placeholder='Почта'
                    value={filters.email || ''}
                    onChange={e => setFilters({...filters, email: e.target.value.length === 0 ? null : e.target.value})}
                />
                <Checkbox.Root
                    checked={filters.disabled || false}
                    onCheckedChange={e => setFilters({...filters, disabled: !!e.checked === false ? null : !!e.checked})}
                    colorPalette='red'
                    size='sm'
                    _hover={{ cursor: 'pointer' }}
                >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label>Деактивированные</Checkbox.Label>
                </Checkbox.Root>
                <Select
                    className={cl.select}
                    isSearchable={false}
                    placeholder='Роль'
                    options={selectRoles}
                    defaultValue={filters.role}
                    value={selectRoles.find(r => r.identifier === filters.role)}
                    onChange={e => setFilters({...filters, role: e.identifier})}
                />
            </Flex>

            <Table.Root variant='outline'>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader>ID</Table.ColumnHeader>
                        <Table.ColumnHeader>Логин</Table.ColumnHeader>
                        <Table.ColumnHeader>Почта</Table.ColumnHeader>
                        <Table.ColumnHeader>Деактивирован</Table.ColumnHeader>
                        <Table.ColumnHeader>Роли</Table.ColumnHeader>
                        <Table.ColumnHeader>Фамилия</Table.ColumnHeader>
                        <Table.ColumnHeader>Имя</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {users.results.map(user => (
                        <ProfileAdminUsersRow user={user} key={user.id} />
                    ))}
                </Table.Body>
            </Table.Root>

            <Pagination pagination={pagination} />
        </Flex>
    )
}

export default ProfileAdminUsers
