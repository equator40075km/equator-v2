import React, { useEffect } from 'react'
import cl from './ProfileTourRequests.module.css'
import { Button, Flex, Grid, Heading, Tag, Text } from '@chakra-ui/react'
import { getDateFromUTC, getFormatDay, getYearFromUTC } from '../../utils/datetime'
import AvatarPersona from '../AvatarPersona/AvatarPersona'
import { useFetching } from '../../hooks/useFetching'
import AdminService from '../../API/AdminService'
import { toaster } from '../UI/chakra/toaster'
import { FaCheck } from "react-icons/fa";
import { useAdminStore } from '../../store/admin'

function ProfileTourRequest({request}) {
    const updateStoreTourRequest = useAdminStore(state => state.updateTourRequest)
    const deleteStoreTourRequest = useAdminStore(state => state.deleteTourRequest)

    const [approveRequest, isApproving, appoveError] = useFetching(async () => {
        const response = await AdminService.approveRequest(request.id)
        if (response?.status === 200) {
            updateStoreTourRequest(response.data)
            toaster.success({ title: 'Заявка одобрена' })
        }
    }) 

    const [deleteRequest, isDeleting, deleteError] = useFetching(async () => {
        const response = await AdminService.deleteRequest(request.id)
        if (response?.status === 200) {
            deleteStoreTourRequest(request.id)
            toaster.success({ title: 'Заявка удалена' })
        }
    })

    useEffect(() => {
        if (appoveError)
            toaster.error({ title: 'Не удалось одобрить заявку' })
    }, [appoveError])

    useEffect(() => {
        if (deleteError)
            toaster.error({ title: 'Не удалось удалить заявку' })
    }, [deleteError])

    return (
        <Grid className={cl.request} key={request.id}>
            <Flex className={cl.tour}>
                <Heading>
                    {`${request.tour.title} ${getYearFromUTC(request.date.start)}`}
                </Heading>
                <Heading as='h3'>
                    {`${getFormatDay(request.date.start)} – ${getFormatDay(request.date.end)}`}
                </Heading>
                {
                    request.approved
                    ?
                    <Tag.Root variant='green' margin='auto auto 0 0'>
                        <Tag.StartElement>
                            <FaCheck />
                        </Tag.StartElement>
                        одобрен
                    </Tag.Root>
                    :
                    <Flex className={cl.buttons}>
                        <Button
                            variant='green'
                            size='sm'
                            disabled={isApproving || isDeleting}
                            onClick={approveRequest}
                        >
                            Одобрить
                        </Button>
                        <Button
                            variant='greenOutline'
                            size='sm'
                            disabled={isApproving || isDeleting}
                            onClick={deleteRequest}
                        >
                            Удалить
                        </Button>
                    </Flex>
                }
            </Flex>
            <Flex className={cl.user}>
                <AvatarPersona user={request.user} />
                <Flex>
                    <Text>
                        <b>{'Почта: '}</b>
                        {request.user.email}
                    </Text>
                </Flex>
                {
                request.user.birthday &&
                <Flex>
                    <Text>
                        <b>{'Дата рождения: '}</b>
                        {getDateFromUTC(request.user.birthday)}
                    </Text>
                </Flex>
                }
                <Flex>
                    <Text>
                        <b>{'Контакт: '}</b>
                        {request.contact}
                    </Text>
                </Flex>
            </Flex>
        </Grid>
    )
}

export default ProfileTourRequest
