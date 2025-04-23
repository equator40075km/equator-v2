import React, { useEffect, useState } from 'react'
import cl from './TourDates.module.css'
import { Flex, Grid, Heading, Tag } from '@chakra-ui/react'
import { useTourStore } from '../../store/tours'
import { getDateFromUTC } from '../../utils/datetime'
import { useFetching } from '../../hooks/useFetching'
import { toaster } from '../UI/chakra/toaster'
import { IoMdAdd } from "react-icons/io";
import CreateDateDialog from '../Dialogs/CreateDateDialog'
import AdminService from '../../API/AdminService'

function TourDates() {
    const dates = useTourStore(state => state.tourDates)
    const setDates = useTourStore(state => state.setTourDates)
    const fetchDates = useTourStore(state => state.fetchTourDates)
    const [openDialog, setOpenDialog] = useState(false)

    useEffect(() => {
        if (dates.length < 1)
            fetchDates()
    }, [])

    const [deleteDate, isDeleting, deleteError] = useFetching(async (dateId) => {
        const response = await AdminService.deleteTourDate(dateId)
        if (response?.status === 200)
            setDates(dates.filter(d => d.id !== dateId))
    })

    useEffect(() => {
        if (deleteError)
            toaster.error({ title: 'Не удалось удалить даты' })
    }, [deleteError])

    return (
        <Grid className={cl.container}>
            <CreateDateDialog open={openDialog} setOpen={setOpenDialog} />
            <Heading>Все даты туров</Heading>
            <Flex gap='6px' flexWrap='wrap'>
                {dates.map(date => (
                    <Tag.Root size='lg' key={date.id}>
                        <Tag.Label>
                            {`${getDateFromUTC(date.start)} – ${getDateFromUTC(date.end)}`}
                        </Tag.Label>
                        <Tag.EndElement>
                            <Tag.CloseTrigger
                                disabled={isDeleting}
                                onClick={() => deleteDate(date.id)}
                                _hover={{ cursor: 'pointer' }}
                            />
                        </Tag.EndElement>
                    </Tag.Root>
                ))}
                <Tag.Root
                    size='lg'
                    onClick={() => setOpenDialog(true)}
                    _hover={{
                        bg: 'green.50',
                        cursor: 'pointer',
                    }}
                >
                    <IoMdAdd />
                </Tag.Root>
            </Flex>
        </Grid>
    )
}

export default TourDates
