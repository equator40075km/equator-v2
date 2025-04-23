import React, { useEffect, useState } from 'react'
import cl from './ProfileTourRequests.module.css'
import { Flex, Heading } from '@chakra-ui/react'
import { useAdminStore } from '../../store/admin'
import { useFetching } from '../../hooks/useFetching'
import AdminService from '../../API/AdminService'
import InfiniteScroll from 'react-infinite-scroll-component'
import EquatorLoader from '../EquatorLoader/EquatorLoader'
import { toaster } from '../UI/chakra/toaster'
import ProfileTourRequest from './ProfileTourRequest'

function ProfileTourRequests() {
    const requests = useAdminStore(state => state.tourRequests)
    const setRequests = useAdminStore(state => state.setTourRequests)
    const [nextUrl, setNextUrl] = useState('init')
    const [filters, setFilters] = useState({})

    const [fetchRequests, _, fetchError] = useFetching(async () => {
        const response = nextUrl === 'init'
            ? await AdminService.getAllTourRequests(filters)
            : await AdminService.get(nextUrl)
        if (response?.status === 200) {
            setRequests([...requests, ...response.data.results])
            setNextUrl(response.data.next)
        }
    })

    useEffect(() => {
        if (requests?.length < 1)
            fetchRequests()
    }, [])

    useEffect(() => {
        if (fetchError)
            toaster.error({ title: 'Не удалось подгрузить заявки' })
    }, [fetchError])

    if (requests.length < 1)
        return (
            <Heading textAlign='center' color='var(--equator-green)'>
                Заявок нет
            </Heading>
        )

    return (
        <InfiniteScroll
            dataLength={requests.length}
            next={fetchRequests}
            hasMore={nextUrl && nextUrl !== 'init'}
            loader={<EquatorLoader />}
            className={cl.container}
        >
            <Flex direction='column' gap='var(--big-gap)'>
                {requests.map(request => (
                    <ProfileTourRequest request={request} key={request.id} />
                ))}
            </Flex>
        </InfiniteScroll>
    )
}

export default ProfileTourRequests
