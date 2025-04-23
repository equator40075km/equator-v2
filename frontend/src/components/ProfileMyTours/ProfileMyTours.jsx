import React, { useEffect } from 'react'
import cl from './ProfileMyTours.module.css'
import { Flex, Grid, Heading, Tag } from '@chakra-ui/react'
import ImageWithLoader from '../ImageWithLoader/ImageWithLoader'
import { useTourStore } from '../../store/tours'
import { getFormatDay, getYearFromUTC } from '../../utils/datetime'
import { useFetching } from '../../hooks/useFetching'
import TourService from '../../API/TourService'
import EquatorLoader from '../EquatorLoader/EquatorLoader'
import { FaCheck } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";

function ProfileMyTours() {
    const tourRequests = useTourStore(state => state.tourRequests)
    const setTourRequests = useTourStore(state => state.setTourRequests)

    const [fetchTourRequests, isLoading] = useFetching(async () => {
        const response = await TourService.getTourRequests()
        if (response?.status === 200)
            setTourRequests(response.data)
    })

    useEffect(() => {
        if (tourRequests?.length < 1)
            fetchTourRequests()
    }, [])

    if (isLoading)
        return <EquatorLoader />

    if (tourRequests?.length < 1)
        return (
            <Heading textAlign='center' color='var(--equator-green)'>
                Нет активных поездок
            </Heading>
        )

    return (
        <Grid className={cl.wrapper}>
            {tourRequests.map(request => (
                <Grid className={cl.container}>
                    <Flex className={cl.content}>
                        <Heading size='xl' as='h3'>
                            {`${request.tour.title} ${getYearFromUTC(request.date.start)}`}
                        </Heading>
                        <Heading size='3xl'>
                            {`${getFormatDay(request.date.start)} – ${getFormatDay(request.date.end)}`}
                        </Heading>
                        {
                        request.approved
                        ?
                        <Tag.Root variant='green' size='lg' marginRight='auto'>
                            <Tag.StartElement>
                                <FaCheck />
                            </Tag.StartElement>
                            <Tag.Label>собирайте чемодан</Tag.Label>
                        </Tag.Root>
                        :
                        <Tag.Root variant='orange' size='lg' marginRight='auto'>
                            <Tag.StartElement>
                                <MdAccessTimeFilled />
                            </Tag.StartElement>
                            <Tag.Label>обработка</Tag.Label>
                        </Tag.Root>
                        }
                    </Flex>
                    <ImageWithLoader
                        src={request.tour.img}
                        alt="Tour image"
                        borderRadius='var(--border-radius)'
                    />
                </Grid>
            ))}
        </Grid>
    )
}

export default ProfileMyTours
